--------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------
BUILD JOB FLOW -->

1. "PortalSCMPoll" (http://jenkins.ctera.local/job/PortalSCMPoll/) - cron that checks every 22 hours if changes were made to Git (TODO - not sure - http://git.ctera.local/Portal/Backend.git), if changes were made, triggers  "Portal-Build-7.1".

2. "Portal-Build-7.1" (http://jenkins.ctera.local/view/Portal%20Builds/job/Portal-Build-7.1/) - executes "PingBuildMachine" job which pings several VM's, reads JSON from (http://git.ctera.local/PIM/Jenkins), -'rt****' for example 'rtDownload', is a jfrog command-, executes job "Portal-Pack-7.1" which does rpmbuild and archives artifacts - then portal_build takes those artifacts, runs an ansible playbook scripts/automation-lab.yml (http://jenkins.ctera.local/view/Portal%20Builds/job/Portal-Build-7.1/431/execution/node/3/ws/scripts/) dont know exactly what its doing !!!TODO!!!, then runs in pallarel following jobs (Run_Automation_Scenarios_pipeline, Portal_Sonar_Scan (only if RUN_SONAR var is TRUE, which by defualt it is not, and seems like they dont ever mark it as TRUE, so Portal_Sonar_Scan doesnt run) - 3 times each, with different vars), then executes jobs in following order (Portal-Pack-7.1, Deploy Portal, Release Portal Version, PortalAuto_Tag)

    2.1 "PingBuildMachine" (http://jenkins.ctera.local/view/Portal%20Builds/job/PingBuildMachines/) - hard-coded list of IP's, ping all of then and creates a list of machines it could'nt ping.

    2.2 "Portal-Pack-7.1" (http://jenkins.ctera.local/view/Portal%20Builds/job/Portal-Pack-7.1/) - runs rpm_make.sh (http://git.ctera.local/Portal/Backend/blob/MainOpenJDK/Backend/kit/linux/rpm_make.sh), then archives artifacts

    2.3 "Run_Automation_Scenarios_pipeline" X3, with different vars (http://jenkins.ctera.local/view/Automation/job/Run_Automation_Scenarios_pipeline/) - runs some mavens and seds and executes Jenkins/PortalDumpCopier.py (http://git.ctera.local/PIM/Jenkins/blob/dev/PortalDumpCopier.py), which connects to machine and 'rm, cp, mv' some files on it.

    2.3 "Portal_Sonar_Scan" X3, with different vars (http://jenkins.ctera.local/job/Portal_Sonar_Scan/) - job is currently disabled

    2.4 "Portal-Pack-7.1" - same as before

    2.5 "Deploy Portal" (http://jenkins.ctera.local/view/Portal%20Builds/job/Deploy%20Portal/) - runs PortalUpgrade.py (http://git.ctera.local/PIM/Jenkins/blob/dev/PortalUpgrader.py), which basically upgrades the Portal - but need to understand it better.

    2.6 "Release Portal Version" (http://jenkins.ctera.local/view/Portal%20Builds/job/Release%20Portal%20Version/) - addes release notes to Jira and basically informs Jira of what's going on.

    2.7 "PortalAuto_Tag" (http://jenkins.ctera.local/view/Portal%20Builds/job/PortalAuto_Tag/) - addes a tag to automation (http://git.ctera.local/Automation/Automation.git) git.

    2.8 if 'RunPostBuildAutomation' param is checked - "CloudSyncPortalFlow" (http://jenkins.ctera.local/job/CloudSyncPortalFlow/) - executes "CloudSyncPortalUpgrade", then executes "CloudSyncRegressionJob" with first test suite, then executes same job in parallel with different test suites, then executes "CloudSyncRunFSCK", then executes "CloudSyncVerifyParentGuid"

        2.8.1 "CloudSyncPortalUpgrade" (http://jenkins.ctera.local/job/CloudSyncPortalUpgrade/) - runs some mavens
        
        2.8.2 "CloudSyncRegressionJob" (http://jenkins.ctera.local/job/CloudSyncRegressionJob/) - runs some mavens, then executes get_support_report.sh -from agent(?)-

        2.8.3 "CloudSyncRunFSCK" (http://jenkins.ctera.local/job/CloudSyncRunFSCK/) -  runs some mavens

        2.8.4 "CloudSyncVerifyParentGuid" (http://jenkins.ctera.local/job/CloudSyncVerifyParentGuid/) - runs some mavens
--------------------------------------------------------------------------------------------------------------------------------
PATCH FLOW -->

1. "portal_7.0_pathc" (http://jenkins.ctera.local/view/Portal%20Builds/job/Portal_Patch/job/Portal_7.0_Patch/) - similar to "Portal-Build-7.1", executes manually, reads JSON like "Portal-Build-7.1", runs some gardels, seds, and npms, loads artifacts and stuff to Jfrog, then ansible just like "Portal-Build-7.1", then executes "Run_Automation_Scenarios_pipeline" in parallel with different params, then "Release Portal Version", "Portal-Pack-7.0", and "CloudSyncPortalFlow".

1.2 "Run_Automation_Scenarios_pipeline" (http://jenkins.ctera.local/view/Automation/job/Run_Automation_Scenarios_pipeline/) X3 with different params - same as in BUILD FLOW

1.3 "Release Portal Version" (http://jenkins.ctera.local/view/Portal%20Builds/job/Release%20Portal%20Version/) - same as in BUILD FLOW

1.4 "Portal-Pack-7.0" - same as in BUILD FLOW, but with different ver num

1.5 "CloudSyncPortalFlow" - same as in BUILD FLOW

--------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------