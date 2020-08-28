docker build . -t sara/app_front
docker run --rm --name fronttest -p 80:80 sara/app_front