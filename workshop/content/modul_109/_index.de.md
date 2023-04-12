+++
title = "Modul 109 - Dienste in der Public Cloud betreiben und überwachen"
chapter = false
weight = 1
+++

Das Ziel dieses Moduls ist das Deployment sowie alle operativen Aspekte für den Betrieb einer Beispielanwendung in der Cloud zu vermitteln. Die Beispielanwendung wird dabei zur Verfügung gestellt um folgende die Zielarchitektur zu implementieren.

![Zielarchitektur Ük 109](/images/modul_109_zielarchitektur.svg)
Lass uns zusammen Schritt für Schritt die einzelnen Komponenten in dem Diagramm anschauen. Wir sehen, dass die Nutzer über das Internet auf die ToDo-Applikation zugreifen können. Wenn ein Nutzer die URL für die ToDo-App im Browser aufruft, dann wird eine Anfrage an den Application Load Balancer gesendet. Der Application Load Balancer sendet die Anfrage dann an einen der Front-End-Docker Container weiter. Der Grund, warum mehrere gleiche Front-End-Docker Container in dem Diagramm sind, wird später erklärt. Der Front-End-Docker Container sendet die ToDo-Webseite zurück zum Browser, sodass der Nutzer damit interagieren kann.

Jetzt fügt der Nutzer ein neues ToDo zu seiner Liste hinzu. Dieses muss gespeichert werden, damit beim nächsten Aufruf der ToDo-Applikation die Liste korrekt ist. Dafür sendet der Browser eine neue Anfrage über das Internet. Die Anfrage beinhaltet die Information, dass eine neues ToDo zu der Liste hinzugefügt werden soll. Dieses Mal sendet der Application Load Balancer die Anfrage an einen der API-Docker Container. Der API-Docker Container wird auch als Backend bezeichnet. Er führt die Logik unsere ToDo-Applikation aus. In diesem Fall sendet es eine SQL Anfrage and die Amazon RDS Datenbank, um das neue ToDo zu speichern.

Auf der rechten Seite im Diagramm ist der Prozess zum Entwickeln & Deployment der Applikation dargestellt. AWS Cloud9 wird benutzt, um die Applikation zu entwickeln und die ausführbare Applikation wird dann als Docker Image in der Amazon Elastic Container Registry gespeichert. Aber mehr dazu später.

Die Backup&Recovery und Monitoring&Logging unten im Diagramm tragen nicht zur Funktionalität der Applikation zu, sind jedoch hilfreich, um wichtige nicht-funktionale Anforderungen an die Applikation zu erfüllen. Einige dieser Anforderungen werden im nächsten Kapitel erklärt.

Folgende Themen werden in diesem Modul anhand der ToDo-Applikation behandelt:

* [1. Anforderungen](modul_109/anforderungen.html) - Übersicht und Anforderungen
* [2. Netzwerk](modul_109/netzwerk.html) - Erstellen und konfigurieren eines neuen virtuellen Netzwerks
* [3. Datenbank](modul_109/datenbank.html) - Erstellung einer relationalen Datenbank
* [4. Container Image](modul_109/container.html) - Vorbereitung und Publikation der Container Images
* [5. Container Plattform](modul_109/ecs_cluster.html) - Vorbereitung der Container Plattform und Deployment der Beispielanwendung
* [6. ToDo-App Implementierung](modul_109/ha_skalierbarkeit.html) - Multi-AZ Deployment und Skalierung der Beispielanwendung
* [7. Monitoring, Logging & Alarme](modul_109/monitoring_logging.html) - Überwachung der Beispielanwendung und Datenbank
* [8. Backup & Recovery](modul_109/backup.html) - Implementation von Backup & Recovery für die Datenbank
* [9. Zusammenfassung](modul_109/zusammenfassung.html) - Zusammenfassung