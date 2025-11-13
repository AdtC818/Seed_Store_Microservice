Seed Frontend
=============

This React frontend was generated from the uploaded ZIP file "Imitar Interfaz Gráfica.zip".
Files extracted from the archive were placed under `public/assets`.

How to use
----------
1. Copy this folder into your project (recommended next to your docker-compose.yml).
2. Build with Docker Compose or `docker build`:
   - `docker build -t seed-frontend:latest .`
   - Ensure it's connected to your `microservices-network` and environment variables point to your services.

Files created
-------------
- package.json
- src/ (React source: App, pages, api)
- public/index.html (original index.html from ZIP if found)
- public/assets/ (all files extracted from the uploaded ZIP)
- Dockerfile (builds React and serves with nginx)
- nginx.conf (basic SPA config)
- DOCKER_COMPOSE_SNIPPET.md (how to add to your compose)
