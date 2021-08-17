---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------
src - https://www.youtube.com/watch?v=eRWIJGF3Y2g&t=82s , https://github.com/marcel-dempers/docker-development-youtube-series/tree/master/jenkins


STEPS - 
1. create namespace called 'jenkins'
2. apply all yamls under jenkins_inside_cluster in namespace
3. port forward master pod using following command - 'kubectl -n jenkins port-forward <pod_name> 8080' OR when servies is from type NodePort, run 'kubectl -n jenkins get services' and check port, then access Jenkins using VM's ip and NodePort's port.
4. install kubernetes plugin
5. fill plugin's configuration (under configure clouds) using GIT's (https://github.com/marcel-dempers/docker-development-youtube-series/tree/master/jenkins) README file
---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------

install microk8s - https://microk8s.io/?_ga=2.109960325.1070382825.1627800502-205005607.1627800502
install docker on ubuntu - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

---------------------------
enable pod egress - 'microk8s enable dns' - https://stackoverflow.com/questions/68648746/kubernetes-pods-cant-access-the-internet-while-host-can?noredirect=1#comment121329342_68648746, https://github.com/ubuntu/microk8s/issues/1484

fix Got permission denied while trying to connect to the Docker daemon socket problem - https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue 'sudo chmod 666 /var/run/docker.sock' - has implications, read in stackoverflow

