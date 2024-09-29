
#docker compose management
sudo docker-compose down
sudo docker-compose up -d

#copy file for inside the container
sudo docker cp create.sql postgres:/create.sql

#to execute commands inside the container for using bash
sudo docker exec -it postgres bash

#inside the container to execute file
psql -U myuser -d postgres -f /create.sql
exit