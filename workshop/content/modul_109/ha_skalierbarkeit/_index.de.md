+++
title = "ToDo-App Implementierung"
chapter = false
weight = 26
pre = "<b>6. </b>"
+++

### Themen
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
    - [Erstellung und Konfiguration eines ALBs](#erstellung-und-konfiguration-eines-albs)
    - [Load Balancer Konfiguration für den Frontend Container](#load-balancer-konfiguration-für-den-frontend-container)
    - [Service Konfiguration der Backend Container](#service-konfiguration-der-backend-container) 
    - [Service Konfiguration der Frontend Container](#service-konfiguration-der-frontend-container)
    - [Test der ToDo-Liste](#test-der-todo-liste)
    - [Failover der Datenbank testen](#failover-der-datenbank-testen)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

{{% include "alb/alb_intro.de.md" %}}
___
{{% include "alb/create_alb_task.de.md" %}}
{{%expand "Hinweis" %}}
{{% include "alb/create_alb_hint.de.md" %}}
{{% /expand %}}

{{%expand "Lösung" %}}
{{% include "alb/create_alb_solution.de.md" %}}
{{% /expand %}}
{{% include "alb/create_alb_nextsteps.de.md" %}}

#### Load Balancer Konfiguration für den Frontend Container

1. Unter **Services** den Dienst **EC2** auswählen.
2. Links unter **Load Balancing** auf **Target Groups** klicken.
3. Klick auf **Create target group**.
4. Als Target Group Typ **IP addresses** auswählen.
5. Unter **Target group name** ``workshop-frontend`` eingeben.
6. Unter **VPC** das ``Workshop-VPC`` auswählen.
7. Klick auf **Next** und danach auf **Create target group**.

#### Anpassen der Routing Konfiguration des Load Balancers

1. Unter **Services** den Dienst **EC2** auswählen.
2. Links unter **Load Balancing** auf **Load Balancers** klicken und den ``todoApp`` Load Balancer anklicken.
3. In dem **Listeners** tab die Box für die bestehende Listener Regel in der List auswählen.
4. Über das **Actions** Menü **Manage rules** auswählen.
5. Mit einem Klick auf das Stift-Symbol oben in den Editiermodus wechseln.
6. Weiterer Klick auf das Stift-Symbol bei der Regel links neben **last** klicken.
7. Klick auf das Stift-Symbol im Abschnitt **Forward to** unter **THEN**.
8. Als **Target group** nun das ``workshop-frontend`` auswählen und die Änderung mit Klick auf den Hacken bestätigen.
9. Klick auf **Update** um die bestehende Regel zu aktualisieren.
10. Nun eine weitere Regel über das **+** Symbol und danach auf **+ Insert Rule** hinzufügen.
11. Unter **IF** auf **+Add condition** klicken und dort als Option **Path** auswählen und als Wert ``/api/*`` eingeben
12. Rechts im Abschnitt **THEN** auf **+ Add action** klicken **Forward to...** auswählen und als **Target Group** ``workshop-backend`` auswählen.
13. Die Änderungen über einen Klick auf **Save** bestätigen.
14. Über einen Klick auf **<** Zurück in die Übersicht des Load Balancers wechseln.

Das Routing sollte nun wie folgt aussehen:
![Loadbalancer Routing](/images/lb_routing.png)

{{% notice note %}}
Mit dieser Konfiguration leitet der Load Balancer nun alle Anfragen an die Target Group ``workshop-frontend`` weiter. Hier läuft später der Frontend Container Service. Beim Einfügen, ändern oder Löschen von Einträgen in der Beispielanwendung werden die Anfragen über den Pfad ``/api/`` an den Backend Container weitergeleitet. Dieser wiederum leitet die Daten an die Amazon RDS Datenbank weiter.
{{% /notice%}}

#### Service Konfiguration der Backend Container
{{% include "ecs_cluster_backend_service.de.md" %}}

#### Service Konfiguration der Frontend Container
1. Unter Services den Dienst **Elastic Container Service** auswählen.
1. In der Übersicht klick auf ``workshop-cluster``.
1. Im Tab **Services** auf **Create** klicken.
1. Als **Launch type** muss **Fargate** ausgewählt werden.
1. Bei **Family** muss ``workshop-frontend`` ausgewählt werden.
1. Als **Service name** ``frontend-service`` eingeben.
1. Unter **Number of tasks** ``2`` eingeben.
1. Klick auf **Next step**.
1. Als **Cluster VPC** wird das ``Workshop-VPC`` ausgewählt.
1. Unter **Subnets** nacheinander die Subnets ``Workshop-PublicA`` und ``Workshop-PublicB`` auswählen.
1. Bei **Security groups** auf **Edit** klicken.
1. Die bestehende Security Group ``Workshop-ECS-Frontend-SG`` auswählen und auf **Save** klicken.
1. Die Option **Auto-assign public IP** auf **ENABLED** stehen lassen.
14. Im Abschnitt **Load balancing** die Option **Application Load Balancer** auswählen und den bereits erstellten ALB ``todoApp``.
1. Unter **Production listener port** im Dropdown ``80:HTTP`` auswählen.
1. Bei **Target group name** im Dropdown ``workshop-frontend``auswählen und auf **Next step** klicken.
1. **Create** klicken.

#### Test der ToDo-Liste

**Aufgabe:**
Teste den Load Balancer und deine Webseite, indem du den DNS Namen des ALBs ``todoApp`` kopierst und in einem neuen Browser Tab öffnest.
{{%expand "Lösung" %}}
1. Unter **Services** den Dienst **EC2** auswählen.
2. Links unter **Load Balancing** auf **Load Balancers** klicken und den ``TodoApp`` Load Balancer markieren.
3. Im Tab **Description** den **DNS name** kopieren und in einem neuen Browser Tab einfügen.
{{% /expand%}}

Teste nun die Funktionalitäten deiner ToDo-Anwendung:
- **Überprüfe deine leere ToDo-Liste**: Füge deinem Domain Namen `/api/v1/todos` hinzu. Wenn du diesen öffnest, sollte die Liste leer sein.
```
[]
```
- **Hinzufügen von ToDos**: Schreibe einige ToDos in deine Liste auf der Webseite.
- **Aufrufen der Daten in der Datenbank**: Füge deinem Domain Namen noch `/api/v1/todos` hinzu. Rufe nun den neuen Link in einem Tab auf. Nun solltest du eine Übersicht ähnlich wie im Bild sehen. 
- **Aufgaben erledigt**: Hacke ein paar deiner Aufgaben in der Liste ab.
- **Prüfen der Änderung in den Daten**: Rufe wieder den erweiterten Link auf und prüfe, ob sich `completed` als Eigenschaft bei deinen erledigten Aufgaben von false auf `true` geändert hat.
- **Streiche deine erledigten Aufgaben**: Klicke auf **Clear completed**, um deine erledigten Aufgaben zu löschen.
- **Prüfen der gelöschten Aufgaben**: Rufe wieder den erweiterten Link auf und prüfe, ob nun die Liste an Aufgaben kürzer geworden ist.

![Todos Daten](/images/todos_daten.png)

<video width=100% controls autoplay loop>
    <source src="/images/ToDoApp.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>


{{% notice note %}}
Die Amazon RDS Instanz hat bereits im Hintergrund eine passive, weitere Instanz, auf die Daten automatisch repliziert werden. Mit dem [Multi-AZ Deployment](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html) läuft die Datenbank nach einem kurzen Unterbruch in einer anderen Availability Zone weiter, wenn es ein Failover gibt. Der Datenbank Endpunkt für die Applikation (Amazon RDS Endpoint) bleibt dabei identisch. Somit muss die Anwendung nicht umkonfiguriert werden.
{{% /notice%}}

#### Failover der Datenbank testen

1. Unter **Services** den Dienst **RDS** auswählen.
2. Die Details der Datenbank Instanz mit klick auf ``workshop-db`` öffnen.
3. Unter **Actions** auf **Reboot** klicken.
4. Die Option **Reboot With Failover** auswählen und mit **Confirm** bestätigen.
5. Auf der Übersicht in der Spalte **Region & AZ** die aktuelle AZ notieren.
6. Nachdem die Datenbank wieder im Status **Available** ist, hat sich die AZ geändert und der Failover hat funktioniert.


### Zusammenfassung und nächste Schritte
Herzlichen Glückwunsch! Deine ToDo-App funktioniert nun und du hast ihre Funktionen getestet. Sie ist hochverfügbar und die Front- und Backend Container sind redundant über zwei Availability Zones (AZs) verteilt. Zusätzlich ist die Datenbank ebenfalls redundant konfiguriert (Multi-AZ). Damit wir einen Überblick bekommen, was in unserer Anwendung vor sich geht und wie wir sie sicherer machen können, werden die Themen Monitoring und Backup in den letzten beiden Kapiteln behandelt. 
