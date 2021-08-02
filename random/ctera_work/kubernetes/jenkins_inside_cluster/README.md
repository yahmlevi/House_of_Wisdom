---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------
src - https://www.youtube.com/watch?v=eRWIJGF3Y2g&t=82s , https://github.com/marcel-dempers/docker-development-youtube-series/tree/master/jenkins


STEPS - 
1. create namespace called 'jenkins'
2. apply all yamls under jenkins_inside_cluster in namespace
3. port forward master pod using following command - 'kubectl -n jenkins port-forward <pod_name> 8080'
4. install kubernetes plugin
5. fill plugin's configuration (under configure clouds) using GIT's (https://github.com/marcel-dempers/docker-development-youtube-series/tree/master/jenkins) README file
---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------

install microk8s - https://microk8s.io/?_ga=2.109960325.1070382825.1627800502-205005607.1627800502
install docker on ubuntu - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

