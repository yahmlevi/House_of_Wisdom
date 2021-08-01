src - https://www.youtube.com/watch?v=eRWIJGF3Y2g&t=82s , https://github.com/marcel-dempers/docker-development-youtube-series/tree/master/jenkins


STEPS - 
1. create namespace called 'jenkins'
2. apply all yamls under jenkins_inside_cluster in namespace
3. port forward master pod using following command - 'kubectl -n jenkins port-forward <pod_name> 8080'
4. install kubernetes plugin
5. fill plugin's configuration (under configure clouds) using GIT's (https://github.com/marcel-dempers/docker-development-youtube-series/tree/master/jenkins) README file




ENABLE DOCKER COMMANDS WITHIN JOBS (WINDOWS HOST) - 
1. env var - DOCKER_HOST=tcp://host.docker.internal:2375
2. enable 'Expose daemon on tcp://localhost:2375 without TLS' from docker desktop GUI

