docker-compose down
docker volume rm $(docker volume ls -q)
cd SpringBootApp
./mvnw clean package -DskipTests        
cd ..
docker-compose up --build
