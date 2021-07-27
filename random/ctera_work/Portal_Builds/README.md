--------------------------------------
dictionary -->
1. ~ (not sure)
2. 
--------------------------------------

JOB FLOW -->

1. "PortalSCMPoll" (http://jenkins.ctera.local/job/PortalSCMPoll/) - cron that checks every 22 hours if changes were made to Git (~ http://git.ctera.local/Portal/Backend.git), if changes were made, triggers  "Portal-Build-7.1".

2. "Portal-Build-7.1" (http://jenkins.ctera.local/view/Portal%20Builds/job/Portal-Build-7.1/) - executes "PingBuildMachine" job which pings several VM's, reads JSON from (http://git.ctera.local/PIM/Jenkins), -rt**** example rtDownload, is a jfrog command-

2.1 "PingBuildMachine" (http://jenkins.ctera.local/view/Portal%20Builds/job/PingBuildMachines/) - hard-coded list of IP's, ping all of then and creates a list of machines it could'nt ping.