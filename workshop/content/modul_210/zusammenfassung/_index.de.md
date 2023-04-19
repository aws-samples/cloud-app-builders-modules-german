+++
title = "Zusammenfassung"
chapter = false
weight = 110
pre = "<b>11. </b>"
+++
In diesem Modul wurden zwei grosse Themengebiete behandelt:

#### Grundlagen der Cloud

In der Cloud werden viele Konzepte aus der IT genutzt, aber auch noch neue Konzepte wie das Shared Responsibility Modell oder das AWS Identity and Access Management (IAM), die die Interaktion in und mit der Cloud definieren. Es wurde gezeigt, wie man eine Anwendung in der Cloud implementiert und welche Vorteile sich daraus ergeben wie beispielsweise hohe Verfügbarkeit oder Skalierbarkeit.

#### Implementierung einer ToDo-App

In diesem Modul hast du vier verschiedene Arten kennengelernt, wie du eine Anwendung in der Cloud implementieren kannst.
1. **Container**: Für das Backend, wo die Aufgaben verarbeitet werden, um dann in der Datenbank (Amazon RDS) gespeichert zu werden, wurde Amazon ECS genutzt. Damit die Anfragen gleichmässig verteilt werden, wurde ein Application Load Balancer(ALB) genutzt. Das Frontend wurde durch einen Amazon S3 Bucket öffentlich gemacht. Damit du am Zugang zu deiner Anwendung hast, wurde das Backend und Frontend durch CloudFront publik gemacht. 

2. **Serverless**: Damit der Verwaltungsaufwand für die Anwendung geringer wird, hast du serverlose Services genutzt, die je nach Auslastung sich selbst anpassen, sodass du dir keine Sorgen um die Skalierung machen musst. Durch ein API Gateway werden die Anfragen an eine Lambda Funktion weitergeleitet, die dann entweder die Aufgabe speichert, aktualisiert, löscht oder eine Übersicht über alle Aufgaben zurückgibt. Das Frontend wurde hier ebenfalls auf Amazon S3 gehostet und der Zugang wurde durch CloudFront ermöglicht.

3. **CI/CD**: In diesem Modul hast du gelernt, wie Änderungen im Code beispielsweise für das Frontend einfach und automatisiert veröffentlicht werden können. Dieses Modul hat weiterhin Container für die Umsetzung genutzt. Zuerst wurde eine Änderung des Codes commited. Es wurde automatisch ein neues Docker-Images gebaut und veröffentlicht, welches dann von den Containern genutzt wurde. 

4. **Infrastruktur als Code**: Um die Wiederverwendbarkeit von Infrastrukturen zu erhöhen eignet sich Infrastruktur als Code. Dafür hast du kennengelernt wie CloudFormation funktioniert und hast auch die passende Vorlage ausgeführt. Dadurch wurde deine ToDo-App basierend auf Containern und serverlos selbstständig ausgeführt, sodass du sie danach gleich nutzen und testen konntest.


Die unterschiedlichen Arten der Implementierungen zeigen, dass je nach dem wie weit ein Produkt ist oder wie automatisiert Infrastruktur aufgebaut werden soll, es dafür verschiedenste Ansätze gibt. 


#### Hast du noch Lust noch mehr in der AWS Cloud auszuprobieren?
**AWS Free Tier**

Für 12 Monate kannst du über 100 Services in einem bestimmten Umfang kostenlos nutzen und damit eigene Architekturen ausprobieren. Viele der Services, die du in diesem Modul genutzt hast, sind Teil dieses Angebots.

Weitere Informationen findest du unter diesem Link:
**[https://aws.amazon.com/free/](https://aws.amazon.com/free/)**

**Weitere Inspirationen**

In unserem **[AWS Blog](https://aws.amazon.com/blogs/aws/)** findest du Neuigkeiten zu unseren Services, Beispielanwendungen und Architekturen. Dadurch kannst du schnell neue Inspirationen für deine eigenen Projekte bekommen oder passende Anleitungen finden.

**Viel Spaß bei deinen eigenen Projekten in der Cloud!**


#### Feedback zu Modul 210
Da wir versuchen unsere Inhalte stetig zu verbessern, würden wir dich bitten uns **[Feedback](https://pulse.buildon.aws/survey/ITI0DNFA)** zu geben. Wir freuen uns sehr über dein Feedback! Du kannst entweder den hinterlegten Link nutzen oder den QR-Code scannen. Wir freuen uns sehr über dein Feedback!

![Survey Modul 210](/images/feedback_m210.png)