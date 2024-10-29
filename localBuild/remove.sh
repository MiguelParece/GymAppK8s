

docker-compose down

echo "Removing Calculator Service image..."


echo "Removing Calculator Service image..."
docker rm -f $(docker ps -a -q)



echo "Removing Calculator Service image..."
docker volume rm $(docker volume ls -q)

