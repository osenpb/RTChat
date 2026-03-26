# RealtimeChat


A real-time chat application built with Angular 20 and Spring Boot. Features instant messaging via WebSockets (STOMP/SockJS), with a clean and responsive UI.

Frontend Technologies



- Angular 20

- TypeScript

- Tailwind CSS 4

- STOMP.js & SockJS-client



## Features



- chat – Real-time messaging with WebSocket connection

- connection – STOMP protocol over SockJS for instant message delivery

- responsive – Clean interface with Tailwind CSS



## The Process



I wanted to build a real-time communication app that felt smooth and responsive. Started with the WebSocket connection concept and realized that STOMP over SockJS provided a more reliable messaging protocol. I added message handling and UI updates to make the experience feel natural and instant for the user.

## Architecture




-/app

  |-core
  |-interfaces
  |-services



## Running the Project

### With Docker Compose (Recommended)

- Clone this repository

- Build and run: docker-compose up --build

- Open http://localhost:4200 in your browser

### Manual Setup

- Clone this repository

- Install frontend dependencies: cd f_realtime_chat && npm install

- Run backend: cd b_realtime_chat && ./mvnw spring-boot:run

- Run frontend: cd f_realtime_chat && ng serve

- Open http://localhost:4200 in your browser



## Preview



(coming soon)
