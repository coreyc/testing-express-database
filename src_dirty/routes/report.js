const superagent = require('superagent')
const { selectOne } = require('../utils/db-utils')

// Express route - Users
const report = async (req, res) => {
  const driverName = req.body.driver_name
  const vin = req.body.vin

  let dateOfLastReport, riskRating

  // pulling out service logic from express controllers/routes for easier testing
  try {
    const {dateOfLastReport, riskRating} = await selectOne('driver_history', driverName)
    dateOfLastReport = dateOfLastReport
    riskRating = riskRating
  } catch (e) {
    // fetching from database failed
    res.send(500)
    console.log(e)
  }

  const riskCutoff = 6;
  if (riskRating > riskCutoff) {
    res.send({
      report: true,
      approved: false,
      reason: 'too much of a risk'
    })
  }

  let new_report
  const withinLastYear = Date.now() - 31536000000;
  if (dateOfLastReport < withinLastYear) {
    // last report is too old, need to order new report
    new_report = await superagent
      .post('https://www.motorvehiclereport.com/api/report')
      .send({ vin: vin }) 
      .set('accept', 'json')
  }

  if (new_report.damages) {
    // too risky, we won't insure
    res.send({
      report: true,
      approved: false,
      reason: 'too many damages to vehicle'
    })
  }
}

module.exports = {
  report
}