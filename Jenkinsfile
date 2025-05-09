pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_USERNAME = 'ayushpanware037'
        KUBE_CONFIG = credentials('kubeconfig')
    }
    
    stages {

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t ${DOCKERHUB_USERNAME}/uptime-frontend:${BUILD_NUMBER} .'
                    sh 'docker tag ${DOCKERHUB_USERNAME}/uptime-frontend:${BUILD_NUMBER} ${DOCKERHUB_USERNAME}/uptime-frontend:latest'
                }
                sh 'cp -r frontend/prisma backend/'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t ${DOCKERHUB_USERNAME}/uptime-backend:${BUILD_NUMBER} .'
                    sh 'docker tag ${DOCKERHUB_USERNAME}/uptime-backend:${BUILD_NUMBER} ${DOCKERHUB_USERNAME}/uptime-backend:latest'
                }
                
            }
        }
        

        
        stage('Push to DockerHub') {
            steps {
                sh 'echo "dckr_pat_3B7Na86iDIGsCnF5nuGE5Rg8NfE" | docker login -u ayushpanwar037 --password-stdin'
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
