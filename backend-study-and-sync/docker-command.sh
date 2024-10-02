
#docker compose management
sudo docker-compose down
sudo docker-compose up -d

#copy file for inside the container
sudo docker cp insert.sql postgresql:/insert.sql

#to execute commands inside the container for using bash
sudo docker exec -it postgresql bash

#inside the container to execute file
psql -U postgres -d postgres -f /insert.sql
exit