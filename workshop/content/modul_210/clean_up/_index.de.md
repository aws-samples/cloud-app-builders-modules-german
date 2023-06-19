+++
title = "Clean up"
chapter = false
weight = 110
pre = "<b>11. </b>"
+++

Da bei der Nutzung der Cloud auch Kosten anfallen können, ist es sinnvoll Services, die man nicht mehr braucht wieder zu löschen. Besonders bei der Nutzung des AWS Academy Accounts ist das Budget begrenzt, sodass dieser Schritt sehr empfohlen wird.

Beim Löschen solltest du rückwärts vorgehen und zuerst die Resource löschen die du zuletzt erstellt hast. Dadurch vermeidest du den Fall, dass eine Resource nicht gelöscht werden kann, da eine Resource die du danach erstellt hast noch von der Resource die du löschen willst abhängt.

Die Anweisungen sind nach Kapitel gruppiert. Wenn du ein Kapitel nicht durchgeführt hast, dann brauchst du auch keine Resourcen für dieses Kapitel löschen und kannst die Anweisungen überspringen.

So kannst du die Anwendung wieder löschen:

### [Infrastruktur als Code Kapitel]({{< ref "/modul_210/automatisierung" >}} "Infrastruktur als Code Kapitel")
Infrastruktur als Code macht es einfach die Resourcen die in einem Template definiert werden mit einem Klick zu löschen. Um diesen Vorteil von Infrastruktur als Code zu zeigen haben wir die Clean up Anweisungen direkt in dem Kapitel zu Infrastruktur als Code Kapitel geschrieben. Folge den Anweisungen in der [Clean up Sektion]({{< ref "/modul_210/automatisierung#clean-up" >}} "Clean up Sektion") im Infrastruktur als Code Kapitel.

### [CI/CD Kapitel]({{< ref "/modul_210/cicd" >}} "CI/CD Kapitel")

{{% notice info %}}
Bei AWS Academy kann AWS CodePipeline und AWS CodeBuild nicht genutzt werden. Wenn du AWS Academy benutzt hast du diese Resourcen wahrscheinlich nicht erstellst und kannst sie deshalb auch nicht löschen. Wenn du nicht AWS Academy benutzt dann befolge die Anweisungen, um die Resourcen zu löschen.
{{% /notice%}}

#### CodePipeline (optional)
1. Unter Services den Dienst **CodePipeline** auswählen.
1. In der **Pipelines** Liste die Pipeline mit dem Namen ``TodoAppBackendService`` auswählen.
1. Klicke auf **Delete pipeline**.
1. Gebe ``delete`` in die Textbox ein.
1. Setze den Hacken für die Box **No resource updates needed for this source action change**.
1. Klicke **Delete**.

#### CodeBuild (optional)
1. Unter Services den Dienst **CodeBuild** auswählen.
1. In der **Build projects** Liste das Projekt mit dem Namen ``TodosAppBackendService`` auswählen.
1. Klicke auf **Delete build project**.
1. Gebe ``delete`` in die Textbox ein.
1. Klicke **Delete**.

#### CodeCommit (Optional)
1. Unter Services den Dienst **CodeCommit** auswählen.
1. In der **Repositories** Liste das Respository mit dem Namen ``todos_app`` auswählen.
1. Klicke auf **Delete repository**.
1. Gebe ``delete`` in die Textbox ein.
1. Klicke **Delete**.

#### CodeBuild Project Permissions (Optional)
1. Unter Services den Dienst **IAM** auswählen.
1. Unter **Access management** zu **Policies** navigieren.
1. In der **Policies** Liste die Policy mit dem Namen ``CodeBuildECRAccess`` auswählen.
1. Klicke auf **Actions** und dann auf **Delete**.
1. Gebe ``CodeBuildECRAccess`` in die Textbox ein.
1. Klicke **Delete**.

### [Serverless Kapitel]({{< ref "/modul_210/serverless" >}} "Serverless Kapitel")

#### API Gateway
1. Gehe im Service **API Gateway** zu **APIs**.
2. Wähle das **API Gateway** ``TodoServerlessApi``.
3. Klicke auf **Actions** und dann auf **Delete**.
4. Bestätige, dass du das API Gateway löschen willst.

#### Lambda
1. Gehe im Service **Lambda** zu **Functions**.
2. Wähle die **Function** ``TodoServerlessFunction``.
3. Klicke auf **Actions** und dann auf **Delete**.
4. Bestätige, dass du die Funktion löschen willst.

#### DynamoDB
1. Gehe im Service **DynamoDB** zu **Tables**.
2. Wähle die **Tabelle** ``ServerlessTodoTable`` und klicke auf **Delete**.
3. Bestätige, dass du die Tabelle löschen willst.

### [Frontend Kapitel]({{< ref "/modul_210/frontend" >}} "Frontend Kapitel")

#### CloudFront
1. Gehe im Service **CloudFront** zu **Distributions**.
2. Wähle deine **Distribution** aus. Deine Distribution sollte `Content delivery network für ToDo-Webseite` als **Description** haben.
3. Klicke auf **Disabled**.
3. Sobald die Distribution disabled ist, kannst du auf **Delete** klicken.
4. Bestätige, dass du die Distribution löschen willst.

#### S3 Bucket
1. Gehe im Service **S3** zu **Buckets**.
2. In der Buckets Liste nach dem Namen `todofrontend{yourname}` von deinem S3 Bucket suchen.
3. Wähle deinen S3 Bucket in der Liste aus und klicke auf **Empty**.
4. Bestätige, dass du den S3 Bucket leeren willst. Dadurch werden all Objekte in dem Bucket gelöscht.
5. Wähle deinen S3 Bucket in der Liste erneut aus und klicke auf **Delete**.
4. Bestätige, dass du den S3 Bucket löschen willst. Nun wird der S3 Bucket gelöscht.

### [Container Plattform Kapitel]({{< ref "/modul_210/containercluster" >}} "Container Plattform Kapitel")

#### Container Cluster
1. Gehe im Service **Elastic Container Service** zu **Clusters**.
2. Klicke auf dein **Cluster** ``workshop-cluster``.
3. Wähle unten bei **Service** ``backend-service`` aus. Klicke auf **Update**.
4. Setze die Anzahl der **Desired tasks** auf `0`. Damit werden die aktuellen Tasks beendet und auch keine mehr erstellt.
5. Klicke unten auf **Update**, um die Änderung zu bestätigen.
6. Wähle unter **Service** ``backend-service`` aus und klicke auf **Delete service**.
7. Bestätige, dass du den Service löschen willst.
8. Nun kannst du das **Cluster** löschen, indem du oben auf **Delete cluster** klickst und wieder bestätigst.


#### Task definitions
1. Gehe im Service **Elastic Container Service** zu **Task definitions**.
1. Klicke auf die **Task Definition** ``workshop-backend``.
1. In der Liste mit den **Revision** alle auswählen.
1. Klicke auf **Actions** und dann auf **Deregister**.
1. Bestätige, dass du den Resvisionen unregistrieren willst. Dadurch werden die Versionen der ``workshop-backend`` Task Definition gelöscht. Wenn du alle Versionen von einer Task Definition unre­gis­t­rie­rst wir die gesamte Task Definition gelöscht.


### [Container Image Kapitel]({{< ref "/modul_210/container" >}} "Container Image Kapitel")

#### Container Repository
1.	Gehe zum Service **Elastic Container Registry**.
2.	Wähle das **Repository** ``workshop-backend`` aus und klicke auf **Delete**.
3.	Bestätige, dass du das Repository löschen willst.

### [Load Balancer Kapitel]({{< ref "/modul_210/loadbalancer" >}} "Load Balancer Kapitel")

#### Load Balancer
1.	Gehe im Service **EC2** zu **Load Balancers**.
2.	Wähle nun den **Load Balancer** ``todoApp``, klicke auf **Actions** und wähle **Delete load balancer**.
3.	Bestätige, dass du den Load Balancer löschen willst.

#### Target Group
1.	Gehe im Service **EC2** zu **Target Group**.
2.	Wähle nun die **Target group** ``workshop-backend``, klicke auf **Actions** und wähle **Delete**.
3.	Bestätige, dass du die Target Group löschen willst.

### [Datenbank Kapitel]({{< ref "/modul_210/datenbank" >}} "Datenbank Kapitel")

#### RDS Datenbank
1.	Gehe im Service **RDS** zu **Databases**.
1.	Wähle die **Datenbank** ``workshop-db`` aus und unter **Actions** wähle **Delete**.
1.	Entferne den Hacken für **create final snapshot**.
1.	Bestätige, dass du die Datenbank löschen willst.

#### RDS Subnetzgruppe
1.  Warte bis deine RDS Datenbank gelöscht wurde.
1.	Gehe im Service **RDS** zu **Subnet groups**.
2.	Wähle die **Subnetzgruppe** ``workshop-db-subnet-group`` und klicke auf **Delete**.
3.	Bestätige, dass du die Subnetzgruppe löschen willst.

### [Netzwerk Kapitel]({{< ref "/modul_210/netzwerk" >}} "Netzwerk Kapitel")

#### VPC
1.	Gehe im Service **VPC** zu **Your VPCs**.
2.	Wähle die **VPC** ``Workshop-VPC`` aus.
3.	Klicke auf **Actions** und dann auf **Delete VPC**. Die verknüpften Security Gruppen, das Internet Gateway, die Subnetze und die Route Tabelle werden gleich mitgelöscht.

### [AWS Cloud9 IDE Kapitel]({{< ref "/einleitung/cloud9_ide" >}} "AWS Cloud9 IDE Kapitel")

#### AWS Cloud9
1. Gehe im Service **Cloud9** zu **Environments**.
2. Wähle die **Umgebung** ``ÜK Umgebung`` aus und klicke auf **Delete**.
3.	Bestätige, dass du die Umgebung löschen willst.

Herzlichem Glückwunsch! Nun hast du die Anwendung erfolgreich gelöscht.