# node-postgres-express-sequelize-todo

## Description
Building simple todo application with React, Node, Express, and Postgres and using Sequelize as an ORM. Application was built following tutorial [here](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)


## Steps to run locally
- Install on your local machine:
  - Postgres
  - Node
  - Sequelize (`npm i -g sequelize-cli`)
- Update the ORM/config/config.json directory with the appropriate db credentials
- Create the database (`createdb todos-dev`)
- Migrate the files to setup the database (`sequelize db:migrate`
- Run the app locally (`npm run start:dev`)
