# Kraken

###### Project in development

Sample of web architecture with Docker &amp; Kubernetes.

- Spring Boot
- Hibernate + MySQL
- Angular 9
- NGRX
- Docker
- Log4j2
- Kubernetes & Minikube (To be developed in 2021)

## Running the project

#### Prerequisites

- [Git](https://git-scm.com/)
- [Java 8](https://www.java.com/es/download/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/) (Optional)
- [NodeJS](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

#### Installation  
  
1. Clone the project.
1. MySQL - Choose one.
   1. Import sql file from /mysql/sql.
   1. Use dockerfile from /mysql to deploy a container with the kraken database.
1. Auth & API.
   1. Open both Java projects as Maven project with your favorite IDE.
   1. Add your database configuration to src/main/resources/application.properties
      1. A servlet is provided for db testing purposes at /src/main/java/com.mbarcina.testdb.testDbServlet.java
   1. Start both applications at /auth/src/main/java/io/mbarcina/kraken/auth/KrakenAuthApplication.java and /api/src/main/java/io.mbarcina.springmarket.SpringmarketApplication
1. Client.
   1. Open /angular-client from a terminal.
   1. Type "npm i" command to install project dependencies.
   1. Run "npm run start" to deploy client.
   1. Go to http://localhost:4200 to see Kraken in your browser.
   
#### Logs

- Both Auth & API projects use Log4j2 logging utilty.
- Logs are saved at /src/main/resources/logs.
- Log files are saved as 1 file for each day and zipped once the day they are saving has passed.
   

