pipeline {
    
    agent  { label 'CloudFS_Logger' }
    //agent  { label 'CloudFS_Minion' }
    
    options {
        // keep only last 5 builds
        buildDiscarder(logRotator(numToKeepStr: '5'))
        
        // timeout job after 60 minutes
        timeout(time: 60,
                unit: 'MINUTES')
                
        //disable run of same job twice         
        //disableConcurrentBuilds()
        
        // Add timestamps to the Console Output 
        timestamps ()
    }

    parameters {
        gitParameter name: 'GitBranch', 
            type: 'PT_BRANCH_TAG',
            branchFilter: 'origin/(.*)',
            defaultValue: 'origin/dev',
            selectedValue: 'DEFAULT',
            sortMode: 'DESCENDING_SMART',
			description: 'Select your branch or tag.'
		string(
            defaultValue: '', 
            name: 'GENESIS_VERSION', 
            trim: false
        )				 
    }

    stages {
        stage ('Initialize') {
            steps {
                script {
                    def scmVars = checkout([  
                        $class: 'GitSCM', 
                        branches: [[name: "${params.GitBranch}"]],  
                        doGenerateSubmoduleConfigurations: false, 
                        extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: '']], 
                        submoduleCfg: [], 
                        userRemoteConfigs: [[credentialsId: '0367fbd2-e744-4d9d-8bba-e5bf20bc115b', url: 'http://git.ctera.local/Automation/Automation.git']]
                    ])
                }   
            }
        }
        stage('Vsphere VM activation '){
            parallel{
                stage("Prepare CloudFS - verifySync auto - Portal"){
                    steps{
                        script{
                            vSphere buildStep: [$class: 'RevertToSnapshot', snapshotName: 'verifySync 7.0.186.1 - ready' , vm: 'CloudFS - verifySync auto - Portal'], serverName: 'vSphere1'
                            vSphere buildStep: [$class: 'PowerOn', timeoutInSeconds: 300, vm: 'CloudFS - verifySync auto - Portal'], serverName: 'vSphere1'
                        }
                    }
                }
                stage("Prepare CloudFS - verifySync auto - Genesis"){
                    steps{
                        script{
                            vSphere buildStep: [$class: 'RevertToSnapshot', snapshotName: 'verifySync 7.0.1645 - ready' , vm: 'CloudFS - verifySync auto - Genesis'], serverName: 'vSphere1'
                            vSphere buildStep: [$class: 'PowerOn', timeoutInSeconds: 300, vm: 'CloudFS - verifySync auto - Genesis'], serverName: 'vSphere1'
                        }
                    }
                }
            }
        }
        stage ('Run CloudSyncStandAloneScenarios job') {
            steps {
                build job: 'CloudSyncStandAloneScenarios', parameters: [
                    string  (name: 'TestType'         , value: "VerifySyncTests"),
                    string  (name: 'GENESIS_VERSION'  , value: "${params.GENESIS_VERSION}"),
                    string  (name: 'GitBranch'        , value: "${params.GitBranch}")
                ]
            }
        }
    }

    post {
        always {
            echo 'Post build action : Sending email'           
            emailext ( 
                replyTo: 'jenkins@ctera.com',
                to: 'galb@ctera.com',
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                subject: "Job ${env.JOB_NAME} ended with status ${currentBuild.currentResult}"
            )  
        }
    }
}