# Weather app

### How to deploy
Prerequisites: docker, npm
1. Build the frontend: `cd public/weather_app && npm run build`
2. Build Docker image: `docker build -t weather-app .`
3. Run docker-compose: `docker-compose up -d`