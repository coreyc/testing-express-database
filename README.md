# testing-express-database
Demo repo showing how to / why to remove database calls out of Express routes for cleaner separation of concerns and much easier testing

## Install Postgres (homebrew)
brew install postgres

## Start Postgres
pg_ctl -D /usr/local/var/postgres start

## Create database
createdb usertype