+++
title = "Modul 210 - Cloud für Anwendungen nutzen"
chapter = false
weight = 3
+++

Das Ziel dieses Moduls ist es, das Deployment einer Beispielanwendung in der Cloud zu vermitteln. Das Modul hat den Schwerpunkt
auf der Entwicklung der verschiedenen Komponenten sowie der CI/CD Pipeline. Die Beispielanwendung wird dabei zur Verfügung 
gestellt um folgende Zielarchitektur zu implementieren. 

![High Level Architektur Ük 210](/images/modul210.png)

Lass uns zusammen Schritt für Schritt die einzelnen Komponenten im Diagramm anschauen. Wir sehen, dass die Nutzer über das Internet auf die ToDo-Applikation zugreifen können. Wenn ein Nutzer die URL für die ToDo-App im Browser aufruft, dann wird eine Anfrage an den Application Load Balancer gesendet. Der Application Load Balancer sendet die Anfrage dann an einen der Back-End-Docker Container weiter. Der Grund, warum mehrere gleiche Back-End-Docker Container in dem Diagramm sind, wird später erklärt. Der Back-End-Docker Container sendet die ToDos zurück zum Browser, sodass der Nutzer damit interagieren kann. Die Webseite wird gehostet und zeigt die Inhalte der ToDos an.

Jetzt fügt der Nutzer ein neues ToDo zu seiner Liste hinzu. Dieses muss gespeichert werden, damit beim nächsten Aufruf der ToDo-Applikation die Liste korrekt ist. Dafür sendet der Browser eine neue Anfrage über das Internet. Die Anfrage beinhaltet die Information, dass eine neues ToDo zu der Liste hinzugefügt werden soll. Der Application Load Balancer sendet die Anfrage an einen der Back-End-Docker Container. Er führt die Logik unserer ToDo-Applikation aus. In diesem Fall sendet er eine SQL Anfrage and die Amazon RDS Datenbank, um das neue ToDo zu speichern.

In der zweiten Architektur ist ein alternativer Aufbau der Applikation dargestellt. Diese Architektur nutzt sogenannte serverlose (serverless) Services. Der serverlose Service AWS Lambda führt den Code der Applikation automatisch aus. Somit müssen wir uns nicht mehr um die Container als Ausführungsumgebung kümmern.
![High Level Architektur Ük 210 serverless](/images/modul210_serverless.png)

Um Änderungen in unserer Anwendung leichter zu veröffentlichen, werden wir eine CI/CD-Pipeline aufbauen, die aus drei Schritten bestehen wird. Diese ist in der dritten Architektur zu sehen.
![High Level Architektur Ük 210 CICD](/images/modul210_cicd.png)

Um Anwendungen wiederverwendbar und leichter provisionierbar zu machen, arbeiten wir später auch mit Infrastructure-as-Code. Dafür nutzen wir eine Vorlage, mit der unsere gesamte Anwendung in der Cloud implementiert werden kann.

Folgende Themen werden während der Implementation behandelt:

* [1. Anforderungen](modul_210/uebersicht.html) - Übersicht und Anforderungen
* [2. Netzwerk](modul_210/netzwerk.html) - Komponenten und Funktion eines virtuellen Netzwerks
* [3. Datenbank](modul_210/datenbank.html) -  Erstellung einer relationalen Datenbank
* [4. Load Balancer](modul_210/loadbalancer.html) - Erstellen eines Load Balancers
* [5. Container Image](modul_210/container.html) - Container Grundprinzipien und Publikation der Container Images
* [6. Container Plattform](modul_210/containercluster.html) - Container Cluster und Task Definition
* [7. Frontend](modul_210/frontend.html) - Erstellen einer statischen Website
* [8. Serverless](modul_210/serverless.html) - Erweiterung der Beispielapplikation um ein Serverless Backend
* [9. CI/CD](modul_210/cicd.html) - Erstellen einer CI/CD-Pipeline
* [10. Infrastruktur als Code](modul_210/automatisierung.html) - Nutzung von Infrastructure-as-Code für die Anwendung
* [11. Zusammenfassung](modul_210/zusammenfassung.html) - Zusammenfassung

