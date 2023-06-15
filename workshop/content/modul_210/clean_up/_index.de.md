+++
title = "Clean up"
chapter = false
weight = 110
pre = "<b>11. </b>"
+++

Da bei der Nutzung der Cloud auch Kosten anfallen können, ist es sinnvoll Services, die man nicht mehr braucht wieder zu löschen. Besonders bei der Nutzung des AWS Academy Accounts ist das Budget begrenzt, sodass dieser Schritt sehr empfohlen wird.
So kannst du die Anwendung wieder löschen:

#### CloudFormation

#### Verbliebene CloudFormation Ressourcen

#### CodePipeline (optional)

#### CodeBuild (optional)

#### CodeCommit (Optional)

#### CloudFront
1. Gehe im Service **CloudFront** zu **Distributions**.
2. Wähle deine **Distribution** aus und klicke auf **Disabled**.
3. Sobald sie disabled ist, kannst du auf **Delete** klicken.
4. Bestätige, dass du die Distribution löschen willst.

#### API Gateway
1. Gehe im Service **API Gateway** zu **APIs**.
2. Wähle das **API Gateway** ``TodoServerlessApi``.
3. Klicke auf **Actions** und dann auf **Delete**.
4. Bestätige, dass du das API Gateway löschen willst.

#### DynamoDB
1. Gehe im Service **DynamoDB** zu **Tables**.
2. Wähle die **Tabelle** ``ServerlessTodoTable`` und klicke auf **Delete**.
3. Bestätige, dass du die Tabelle löschen willst.

#### Lambda
1. Gehe im Service **Lambda** zu **Functions**.
2. Wähle die **Function** ``TodoServerlessFunction``.
3. Klicke auf **Actions** und dann auf **Delete**.
4. Bestätige, dass du die Funktion löschen willst.

#### S3 Bucket

#### Container Cluster
1.	Gehe im Service **Elastic Container Service** zu **Clusters**.
2.	Klicke auf dein **Cluster** ``workshop-cluster``.
3.	Wähle unten bei **Service** ``backend-service`` aus. Klicke auf **Update**.
4.	Nun setze die Anzahl der **desired tasks auf 0**. Damit werden die aktuellen Tasks beendet und auch keine mehr erstellt.
5.	Klicke unten auf **Update**, um die Änderung zu bestätigen.
6.	Wähle unter **Service** ``backend-service`` aus und klicke auf **Delete**.
7.	Bestätige, dass du den Service löschen willst.
8.	Nun kannst du das **Cluster** löschen, indem du oben auf **Delete** klickst und wieder bestätigst.

#### Container Repository
1.	Gehe zum Service **Elastic Container Registry**.
2.	Wähle das **Repository** ``workshop-backend`` aus und klicke auf **Delete**.
3.	Bestätige, dass du das Repository löschen willst.

#### Load Balancer
1.	Gehe im Service **EC2** zu **Load Balancers**.
2.	Wähle nun den **Load Balancer** ``todoApp``, klicke auf **Actions** und wähle **Delete load balancer**.
3.	Bestätige, dass du den Load Balancer löschen willst.

#### Target Group
1.	Gehe im Service **EC2** zu **Target Group**.
2.	Wähle nun die **Target group** ``workshop-backend``, klicke auf **Actions** und wähle **Delete**.
3.	Bestätige, dass du die Target Group löschen willst.

#### RDS Subnetzgruppe
1.	Gehe im Service **RDS** zu **Subnet groups**.
2.	Wähle die **Subnetzgruppe** ``workshop-db-subnet-group`` und klicke auf **Delete**.
3.	Bestätige, dass du die Subnetzgruppe löschen willst.

#### RDS Datenbank
1.	Gehe im Service **RDS** zu **Databases**.
2.	Wähle die **Datenbank** ``workshop-db`` aus und unter **Actions** wähle **Delete**.
3.	**Entferne den Hacken** für create final snapshot.
4.	Bestätige, dass du die Datenbank löschen willst.

#### VPC
1.	Gehe im Service **EC2** zu **Your VPCs**.
2.	Wähle die **VPC** ``Workshop-VPC`` aus.
3.	Klicke auf **Actions** und dann auf **Delete VPC**. Die verknüpften Security Gruppen, das Internet Gateway, die Subnetze und die Route Tabelle werden gleich mitgelöscht.

#### AWS Cloud9
1. Gehe im Service **Cloud9** zu **Environments**.
2. Wähle die **Umgebung** ``ÜK Umgebung`` aus und klicke auf **Delete**.
3.	Bestätige, dass du die Umgebung löschen willst.

Herzlichem Glückwunsch! Nun hast du die Anwendung erfolgreich gelöscht.