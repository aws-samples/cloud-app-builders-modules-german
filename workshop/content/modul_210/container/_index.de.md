+++
title = "Container Image"
chapter = false
weight = 50
pre = "<b>5. </b>"
+++

### Themen:
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
    - [Erstellen des Container Repositories](#erstellen-des-container-repositories)
    - [Klonen des Source Code Repositories](#klonen-des-source-code-repositories)
    - [Erstellung und Veröffentlichung der Container Images](#erstellung-und-veröffentlichung-der-container-images)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

{{% include "container/container_intro.de.md" %}}
___

### Anwendung
Bis jetzt wurde die relevante Infrastruktur erstellt (VPC, Load Balancer, Datenbank), um die Beispielanwendung bereit 
zu stellen. Nun können die Container Images erstellt werden, damit der API Back-End Service implementiert werden kann. 
Dieser Dienst wird hinter dem Load Balancer auf Anfragen reagieren und diese an die Datenbank weiterleiten. 
Die dafür notwendigen Verbindungsdetails müssen beim Erstellen des Containers als Umgebungsvariablen angegeben werden.

#### Erstellen des Container Repositories

Für die Durchführung dieses Moduls wird ein Container Repository benötigt.

{{% include "container/container_task.de.md" %}}
{{%expand "Hinweis" %}}
{{% include "container/container_hint.de.md" %}}
{{% /expand %}}
{{%expand "Lösung" %}}
{{% include "container/container_solution.de.md" %}}
{{% /expand %}}

#### Klonen des Source Code Repositories 
1. Unter Services den Dienst **Cloud9** auswählen.
2. Klicke auf **Create environment**.
3. Nutze als Name ``Uek Umgebung``. Lass alle Einstellungen gleich und wähle bei Network settings **Secure Shell (SSH)** aus.
4. Die Erstellung der Umgebung kann einen kurzen Moment dauern. Klicke dann auf **Open**. Nun solltest du ein Terminal sehen können, wie in der Einleitung bereits beschrieben.
5. Kopiere nun in dein Terminal folgenden Befehl. Dadurch wird das Repository nun geklont, was einen Moment dauern kann.
```bash
git clone https://github.com/aws-samples/cloud-app-builders-modules-german.git
```
6. Nun ist auf der linken Seite in Cloud9 der Ordner ``cloud-app-builders-modules-german`` sichtbar und hat die gleiche Struktur und Inhalt wie das Github Repository.


#### Erstellung und Veröffentlichung der Container Images

##### Erstellung des Backend Container Images:
1. Im Terminal in **Cloud9** in das Verzeichnis **container-api** wechseln mit ``cd ./cloud-app-builders-modules-german/src/container-api``. Falls du dir mit dem Befehl unsicher bist, kannst du [hier](https://phlow.de/magazin/terminal/datei-ordner-befehle/) nochmal nachschauen.
2. Zum **Amazon ECR** Browser Tab wechseln und dort auf das ``workshop-backend`` Repository klicken.
3. Ein Klick auf **[View push commands](/images/ecr_push.png)** zeigt die notwendigen Schritte als Kommandos für die Erstellung und die Publikation des Container Images. Da Cloud9 eine Linux EC2-Instanz nutzt, brauchst du die macOS/Linux-Befehle.
4. Die Kommandos nacheinander kopieren und in dem Terminal Fenster in der AWS Cloud9 Instanz einfügen und ausführen.
5. Im Tab mit Amazon ECR das Fenster mit den push commands schliessen.


### Zusammenfassung und nächste Schritte 
Herzlichen Glückwunsch! Du hast ein Container Repository in Amazon ECR für die Speicherung des Container Images erstellt. In der Cloud9 IDE hast du zudem das Container Image erstellt und über die Push Kommandos in das Amazon ECR Repository kopiert. Im nächsten Schritt wird das Container Cluster aufgesetzt.