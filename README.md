# demoapp

- Running app can be found at http://34.210.31.150
- To get a list of all inserted entities use /list REST get command (http://34.210.31.150/list)

## Design
Spring Boot / Postgres (as JSONB store) REST microservice + some Web UI  

## HTTPS
To do HTTPS properly I would get a greenbar certificate for the owner's domain first

## Scalability
You can scale stateless HTTP part to any size (with load balancer in front). 
Postgres + Read replica on large instances will handle most needs. If production to be deployed in AWS I would consider DynamoDB. Also AWS in cases like this recommends S3 for static files, API Gateway/Lambda/DynamoDB for the REST - auto scaling, unlimited in theory.

## Ansible
I don't have much experience with Ansible. I've used generic ec2_launch.yaml playbook with proper AMI Ubuntu image and proper user_data script (cloud-init) which installs and configures Java, Postgres and Maven. Launches app. Script tested and works. Ansible playbook not tested.


