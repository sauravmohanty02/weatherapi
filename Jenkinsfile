pipeline {
    agent any

    stages {
        stage('dev') {
            steps {
              echo "hello"
            }
        }
        stage('qa') {
            steps {
              bat '''
           rmdir /S /Q weatherapi
git clone https://github.com/sauravmohanty02/weatherapi.git'''
            }
        }
        stage('uat') {
            steps {
               bat '''type nul > sample.txt
git add .
git commit -m "first commit"
git push'''
            }
        }
    }
}
