pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_USERNAME = 'jaikp0'
        KUBE_CONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t ${DOCKERHUB_USERNAME}/uptime-backend:${BUILD_NUMBER} .'
                    sh 'docker tag ${DOCKERHUB_USERNAME}/uptime-backend:${BUILD_NUMBER} ${DOCKERHUB_USERNAME}/uptime-backend:latest'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t ${DOCKERHUB_USERNAME}/uptime-frontend:${BUILD_NUMBER} .'
                    sh 'docker tag ${DOCKERHUB_USERNAME}/uptime-frontend:${BUILD_NUMBER} ${DOCKERHUB_USERNAME}/uptime-frontend:latest'
                }
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                sh 'echo ${DOCKERHUB_CREDENTIALS} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin'
                sh '''
                    docker push ${DOCKERHUB_USERNAME}/uptime-backend:${BUILD_NUMBER}
                    docker push ${DOCKERHUB_USERNAME}/uptime-backend:latest
                    docker push ${DOCKERHUB_USERNAME}/uptime-frontend:${BUILD_NUMBER}
                    docker push ${DOCKERHUB_USERNAME}/uptime-frontend:latest
                '''
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    export KUBECONFIG=${KUBE_CONFIG}
                    envsubst < k8s/backend-deployment.yaml | kubectl apply -f -
                    envsubst < k8s/frontend-deployment.yaml | kubectl apply -f -
                '''
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
            cleanWs()
        }
    }
} 