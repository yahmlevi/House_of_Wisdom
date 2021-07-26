pipeline {
    
    agent  { label 'maven-java8-slave' }
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
            useRepository: 'http://192.168.82.12/Automation/Automation.git',
			description: 'Select your branch or tag.'

		string(
            defaultValue: '', 
            name: 'GENESIS_VERSION', 
            trim: false
        )	

        string(
            defaultValue: '6.0.771.19', 
            name: 'VG_VERSION', 
            trim: false
        )

        string(
            defaultValue: '', 
            name: 'NUM_PIN', 
            description: 'Should be less than 13,197',
            trim: false
        )

        string(
            defaultValue: '', 
            name: 'NUM_SUB_PIN', 
            description: 'Should be less than 13,596',
            trim: false
        )

        choice(
            name: 'TestType',
            choices: ['PinnedCloudFolders', 'PinnedSubFolders', 'FsOperationTest' ,'VerifySyncTests'],
            description: 'TestType parameters'
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
                        extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: ''], [$class: 'CloneOption', timeout: 120]], 
                        submoduleCfg: [], 
                        userRemoteConfigs: [[credentialsId: 'GitLab', url: 'http://192.168.82.12/Automation/Automation.git']]
                    ])
                }   
            }
        }
        stage('Build preparation') {
            steps {
                sh """
                    echo 'test is: ${params.TestType}'
                    pwd
                    cp /media/newdrive/SyncGatewayParams/StandAlone/standAloneParams.ini ./automation-tests/standAloneParams.ini
                    if [ "${params.VG_VERSION}" != "" ]; then sed -i s/"VG_VERSION.*"/"VG_VERSION = ${params.VG_VERSION}"/g ./automation-tests/standAloneParams.ini; fi
                    sed -i s/"^GENESIS_VERSION.*"/"GENESIS_VERSION = ${params.GENESIS_VERSION}"/g ./automation-tests/standAloneParams.ini
                    sed -i s/"^NUM_PIN.*"/"NUM_PIN = ${params.NUM_PIN}"/g ./automation-tests/standAloneParams.ini
                    sed -i s/"NUM_SUB_PIN.*"/"NUM_SUB_PIN = ${params.NUM_SUB_PIN}"/g ./automation-tests/standAloneParams.ini
                    cat ./automation-tests/standAloneParams.ini
                """
            }
        }
        stage('Maven build') {
            steps {
                sh "mvn -f ${WORKSPACE}/automation-core/pom.xml -DskipTests=true clean install "
                sh "mvn -f ${WORKSPACE}/vi-management/pom.xml -DskipTests=true clean install "
                sh "mvn -f ${WORKSPACE}/automation-api/pom.xml -DskipTests=true clean install "
                sh "cp /media/newdrive/SyncGatewayParams/sqljdbc4.jar . "
                sh "mvn install:install-file -Dfile=sqljdbc4.jar -DgroupId=com.microsoft.sqlserver -DartifactId=sqljdbc4 -Dversion=4.0 -Dpackaging=jar"
                sh "mvn -f ${WORKSPACE}/automation-tests/pom.xml -Dtest=$TestType -Dmaven.test.failure.ignore=true clean test "
            }
            post {
                success {
                    // JUnit Results
	            	junit '${WORKSPACE}/automation-tests/target/surefire-reports/*.xml' 
                }
            }
        }
    }
    post {
        always {
            echo 'Post build action : Sending email'           
            emailext ( 
                replyTo: 'jenkins@ctera.com',
                to: 'vadimg@ctera.com',
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                subject: "${params.TestType} tests - Genesis ${params.GENESIS_VERSION} VG ${params.VG_VERSION}"
            )  
        }
    }
}
