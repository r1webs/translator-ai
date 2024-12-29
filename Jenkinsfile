pipeline {
    agent any
    tools {
        nodejs 'recent node'
    }
    stages {
        stage('build') {
            steps {
                sh 'npm version'
                dir('translator-web-app') {
                    sh 'yarn'
                    sh 'yarn lint && yarn prettier-check && yarn build'
                }
            }
        }
    }
    post {
        failure {
            emailext body: "Build failed. Check the Jenkins job for details.", subject: "Build Failed", to: "test@mail.com"
        }
    }
}