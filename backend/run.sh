docker build . -t sara/app_node
docker run --rm --name backtest -p 8081:8081 sara/app_node