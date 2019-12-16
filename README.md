# typescript-vue-trello

Fullstack kanban board built with Vue, Typescript, Express.

## Getting started with development

### Requirments
- Need to have a font-awesome pro api key
- Docker and docker-compose needs to be installed

Open up a terminal in root folder for this repo

Run `cp .env.example .env` Most values can be left as they are, but for FONTAWESOME_NPM_AUTH_TOKEN you need to get a token.

Run `docker-compose up` this might take some time.

Run migrations `docker exec trello-board-api npx knex migrate:latest`

## Key features missing
- production version
- error handling frontend
- better test coverage 
- sharing boards with other users
- authorization, currently user A can delete user Bs boards