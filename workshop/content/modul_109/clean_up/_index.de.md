+++
title = "Clean up"
chapter = false
weight = 30
pre = "<b>9. </b>"
+++

Da bei der Nutzung der Cloud auch Kosten anfallen können, ist es sinnvoll Services, die man nicht mehr braucht wieder zu löschen. Besonders bei der Nutzung des AWS Academy Accounts ist das Budget begrenzt, sodass dieser Schritt sehr empfohlen wird.

Beim Löschen solltest du rückwärts vorgehen und zuerst die Resource löschen die du zuletzt erstellt hast. Dadurch vermeidest du den Fall, dass eine Resource nicht gelöscht werden kann, da eine Resource die du danach erstellt hast noch von der Resource die du löschen willst abhängt.

Die Anweisungen sind nach Kapitel gruppiert. Wenn du ein Kapitel nicht durchgeführt hast, dann brauchst du auch keine Resourcen für dieses Kapitel löschen und kannst die Anweisungen überspringen.

So kannst du die Anwendung wieder löschen:

### [Backup & Recovery Kapitel]({{< ref "/modul_109/backup" >}} "Backup & Recovery Kapitel")

#### RDS Snapshot
1.	Gehe im Service **RDS** zu **Snapshots**.
2.	Wähle den **Snapshot** ``ondemandbackup`` aus und klicke auf **Actions**. Nun klicke auf **Delete snapshot**.
3.	Bestätige, dass du den Snapshot löschen willst.

### [Monitoring, Logging & Alarme Kapitel]({{< ref "/modul_109/monitoring_logging" >}} "Monitoring, Logging & Alarme Kapitel")

#### CloudWatch Dashboard 
1.	Gehe im Service **CloudWatch** zu **Dashboards**.
2.	Wähle dein **Dashboard** ``ToDo-App-Dashboard`` und klicke auf **Delete**.
3.	Bestätige, dass du das Dashboard löschen willst.

#### CloudWatch Alarm
1.	Gehe im Service **CloudWatch** zu **All Alarms**.
2.	Wähle **Alarm** ``404-Error`` und in **Actions** kannst du **Delete** auswählen.
3.	Bestätige, dass du den Alarm löschen willst.

#### CloudWatch Log groups
1.	Gehe im Service **CloudWatch** zu **Log groups**.
2.	Wähle die **Log groups** ``/ecs/workshop-frontend``, ``/ecs/workshop-backend``, ``/rds/instance/workshop-db``.
3.	Klicke auf **Actions** und klicke auf **Delete log group(s)**.
4.	Bestätige, dass du die Log groups löschen willst.

### [ToDo-App Implementierung Kapitel]({{< ref "/modul_109/todo_app_implementation" >}} "ToDo-App Implementierung Kapitel")

#### Load Balancer
1.	Gehe im Service **EC2** zu **Load Balancers**.
2.	Wähle nun den **Load Balancer** ``todoApp``, klicke auf **Actions** und wähle **Delete load balancer**.
3.	Bestätige, dass du den Load Balancer löschen willst.

#### Target Group
1.	Gehe im Service **EC2** zu **Target Group**.
2.	Wähle nun die **Target group** ``workshop-frontend``, klicke auf **Actions** und wähle **Delete**.
3.	Bestätige, dass du die Target Group löschen willst.
4.	Wähle nun die **Target group** ``workshop-backend``, klicke auf **Actions** und wähle **Delete**.
5.	Bestätige, dass du die Target Group löschen willst.

### [Container Plattform Kapitel]({{< ref "/modul_109/ecs_cluster" >}} "Container Plattform Kapitel")

#### Container Cluster
1.	Gehe im Service **Elastic Container Service** zu **Clusters**.
2.	Klicke auf dein **Cluster** ``workshop-cluster``.
3.	Wähle unten bei **Service** ``backend-service`` aus. Klicke auf **Update**.
4.	Nun setze die Anzahl der **Desired tasks** auf `0`. Damit werden die aktuellen Tasks beendet und auch keine mehr erstellt.
5.	Wähle unten bei **Service** ``frontend-service`` aus. Klicke auf **Update**.
6.	Nun setze die Anzahl der **Desired tasks** auf `0`.
7.	Klicke unten auf **Update**, um die Änderung zu bestätigen.
8.	Wähle unter **Service** ``backend-service`` aus und klicke auf **Delete**.
9.	Bestätige, dass du den Service löschen willst.
10.	Wähle unter **Service** ``frontend-service`` aus und klicke auf **Delete**.
11.	Bestätige, dass du den Service löschen willst.
12. Wähle unter **Tasks** den Task mit Task definition `workshop-frontend` aus und klicke auf **Stop** und dann **Stop selected**.
13.	Bestätige, dass du den Task stoppen willst.
14.	Nun kannst du das **Cluster** löschen, indem du oben auf **Delete** klickst und wieder bestätigst.

#### Backend Task Definitions
1. Gehe im Service **Elastic Container Service** zu **Task definitions**.
1. Klicke auf die **Task Definition** ``workshop-backend``.
1. In der Liste mit den **Revision** alle auswählen.
1. Klicke auf **Actions** und dann auf **Deregister**.
1. Bestätige, dass du den Resvisionen unregistrieren willst. Dadurch werden die Versionen der ``workshop-backend`` Task Definition gelöscht. Wenn du alle Versionen von einer Task Definition unre­gis­t­rie­rst wir die gesamte Task Definition gelöscht.

#### Frontend Task Definitions
1. Gehe im Service **Elastic Container Service** zu **Task definitions**.
1. Klicke auf die **Task Definition** ``workshop-frontend``.
1. In der Liste mit den **Revision** alle auswählen.
1. Klicke auf **Actions** und dann auf **Deregister**.
1. Bestätige, dass du den Resvisionen unregistrieren willst. Dadurch werden die Versionen der ``workshop-frontend`` Task Definition gelöscht. Wenn du alle Versionen von einer Task Definition unre­gis­t­rie­rst wir die gesamte Task Definition gelöscht.


### [Container Image Kapitel]({{< ref "/modul_109/container" >}} "Container Image Kapitel")

#### Container Repository
1.	Gehe zum Service **Elastic Container Registry**.
2.	Wähle das **Repository** ``workshop-backend`` aus und klicke auf **Delete**.
3.	Bestätige, dass du das Repository löschen willst.
4.	Wähle das **Repository** ``workshop-frontend`` und klicke auf **Delete**.
5.	Bestätige, dass du das Repository löschen willst.

### [Datenbank Kapitel]({{< ref "/modul_109/datenbank" >}} "Datenbank Kapitel")

#### RDS Datenbank
1.	Gehe im Service **RDS** zu **Databases**.
2.	Wähle die **Datenbank** ``workshop-db`` aus und unter **Actions** wähle **Delete**.
3.	Entferne den Hacken für **create final snapshot**.
4.	Bestätige, dass du die Datenbank löschen willst.

#### RDS Subnetzgruppe
1.  Warte bis deine RDS Datenbank gelöscht wurde.
1.	Gehe im Service **RDS** zu **Subnet groups**.
2.	Wähle die **Subnetzgruppe** ``workshop-db-subnet-group`` und klicke auf **Delete**.
3.	Bestätige, dass du die Subnetzgruppe löschen willst.

### [Netzwerk Kapitel]({{< ref "/modul_109/netzwerk" >}} "Netzwerk Kapitel")

#### VPC
1.	Gehe im Service **EC2** zu **Your VPCs**.
2.	Wähle die **VPC** ``Workshop-VPC`` aus.
3.	Klicke auf **Actions** und dann auf **Delete VPC**. Die verknüpften Security Gruppen, das Internet Gateway, die Subnetze und die Route Tabelle werden gleich mitgelöscht.

### [AWS Cloud9 IDE Kapitel]({{< ref "/einleitung/cloud9_ide" >}} "AWS Cloud9 IDE Kapitel")

#### AWS Cloud9
1. Gehe im Service **Cloud9** zu **Environments**.
2. Wähle die **Umgebung** ``ÜK Umgebung`` aus und klicke auf **Delete**.
3.	Bestätige, dass du die Umgebung löschen willst.

Herzlichem Glückwunsch! Nun hast du die Anwendung erfolgreich gelöscht.