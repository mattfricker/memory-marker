# memory-marker
## Overview
The purpose of this project is to store and retrieve helpful resources along with additional information that is relevant. A primary use case is to store a link to a website with a recipe, along with a note that details any alterations to the recipe that you prefer. In this case, you would create a "Marker" to store the link to the recipe and the note about alterations. This Marker could then have any number of custom "Topics" such as "Recipe", "Soup" or "Dessert" that are attached to it.

## Why it is being created
To try out a variety of technologies. The heart of this project will be the memory-marker-api which will serve as a REST API for experimentations with UI frameworks, server side rendering, and static site generation.

As an added bonus, this should make it so I no longer need to click through several search engine results before finding the recipe that I tried weeks or months earlier.

## How to run it
1. Use `git clone` to copy the repository to the target machine
2. Ensure that Docker is installed and running. If Docker is not yet installed, follow the instructions [here](https://docs.docker.com/get-docker/). If on Linux, make sure that Docker Compose is also installed.
3. Open a terminal and navigate to the `memory-marker` directory
4. Run `docker-compose up -d` (This could take a few minutes)
5. Run `docker ps` to see all running Docker containers. Copy the CONTAINER_ID for the memory-marker_memory-marker-api IMAGE.
6. Replacing ${CONTAINER_ID} with the container id that was copied in step #5, run `docker exec -it ${CONTAINER_ID} /bin/sh` to enter the running container for the API.
7. Inside the container, run `npm run migrateMock` to populate the database with mock entries
8. In a web browser, navigate to http://localhost:3000/markers/all
9. Exit the running container by typing `exit`
10. Stop the containers by running `docker-compose down`

## REST Endpoints
*GET* `/markers/all`

*GET* `/markers/:id`

*PUT* `/markers`

*DELETE* `/markers/:id`

*GET* `/topics/all`

*GET* `/topics/:id`

*PUT* `/topics`

*DELETE* `/topics/:id`
