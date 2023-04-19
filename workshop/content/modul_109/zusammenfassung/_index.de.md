+++
title = "Zusammenfassung"
chapter = false
weight = 30
pre = "<b>9. </b>"
+++
In diesem Modul wurden zwei grosse Themengebiete behandelt:

#### Grundlagen der Cloud

In der Cloud werden viele Konzepte aus der IT genutzt, aber auch noch neue Konzepte wie das Shared Responsibility Modell oder das AWS Identity and Access Management (IAM), die die Interaktion in und mit der Cloud definieren. Es wurde gezeigt, wie man eine Anwendung in der Cloud implementiert und welche Vorteile sich daraus ergeben wie beispielsweise hohe Verfügbarkeit oder Skalierbarkeit.

#### Implementierung einer ToDo-App

Um die ToDo-App zu implementieren wurde als Fundament Amazon ECS genutzt, um die Container für das Front- und Backend zu verwalten. Wenn die ToDo-App genutzt wird, dann werden die Anfragen von einem Application Load Balancer(ALB) an die Container verteilt. Die neuen Aufgaben werden in der Amazon RDS Datenbank gespeichert, die hochverfügbar ist, da sie ein Backup in einer anderen Availability Zone hat. Damit Fehler schnell erkannt werden können, hast du ein Dashboard mit AWS CloudWatch aufgesetzt und auch einen Alarm konfiguriert. Um eine zusätzliche Sicherheitskopie zu erstellen, wurde ein Snapshot von der Datenbank gemacht, um die Anwendung noch resilienter zu machen. 


#### Hast du noch Lust noch mehr in der AWS Cloud auszuprobieren?
**AWS Free Tier**

Für 12 Monate kannst du über 100 Services in einem bestimmten Umfang kostenlos nutzen und damit eigene Architekturen ausprobieren. Viele der Services, die du in diesem Modul genutzt hast, sind Teil dieses Angebots.

Weitere Informationen findest du unter diesem Link:
**[https://aws.amazon.com/free/](https://aws.amazon.com/free/)**

**Weitere Inspirationen**

In unserem **[AWS Blog](https://aws.amazon.com/blogs/aws/)** findest du Neuigkeiten zu unseren Services, Beispielanwendungen und Architekturen. Dadurch kannst du schnell neue Inspirationen für deine eigenen Projekte bekommen oder passende Anleitungen finden.

**Viel Spaß bei deinen eigenen Implementierungen!**


#### Feedback zu Modul 109
Da wir versuchen unsere Inhalte stetig zu verbessern, würden wir dich bitten uns **[Feedback](https://pulse.buildon.aws/survey/6ZDVYKHY)** zu geben. Du kannst entweder den hinterlegten Link nutzen oder den QR-Code scannen. Wir freuen uns sehr über dein Feedback!

![Survey Modul 109](/images/feedback_m109.png)