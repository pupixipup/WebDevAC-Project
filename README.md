# The course project for Web Development: Advanced Concepts

## Requirements

- Docker installed
- Modules installed: `npm install`
- .env file in the `server` folder

## Running entire project

- `npm start`

## Running separately

### Client

- `cd client` `npm run dev`

### Server

1. `cd server`
2. `docker compose up -d` launch mongodb in Docker container
3. `node main.js` start express app
