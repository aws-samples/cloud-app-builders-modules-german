+++
title = "Container Image"
chapter = false
weight = 24
pre = "<b>4. </b>"
+++

### Themen
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
    - [Erstellen der Container Repositories](#erstellen-der-container-repositories)
    - [Klonen des Source Code Repositories](#klonen-des-source-code-repositories)
    - [Erstellung und Veröffentlichung der Container Images](#erstellung-und-veröffentlichung-der-container-images)
    - [Verifikation des Container Images](#verifikation-des-container-images)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

{{% include "container/container_intro.de.md" %}}
___

### Anwendung
#### Erstellen der Container Repositories

Für die Durchführung dieses Moduls werden zwei Container Repositories benötigt. Je ein Repository für den Front- und Backend Container.

##### Repository für Backend Container:
{{% include "container/container_task.de.md" %}}
{{%expand "Hinweis" %}}
{{% include "container/container_hint.de.md" %}}
{{% /expand %}}
{{%expand "Lösung" %}}
{{% include "container/container_solution.de.md" %}}
{{% /expand %}}


##### Repository für Frontend Container:
**Aufgabe:**
Erstelle ein Repository für den Frontend Container mit Hilfe von Amazon Elastic Container Registry und benenne es ``workshop-frontend``.

{{%expand "Lösung" %}}
1. Unter Services den Dienst **Elastic Container Registry** auswählen.
2. Im Tab **Private** auf **Create reposity** klicken.
3. Unter **Repository name** ``workshop-frontend`` eingeben.
4. Die restlichen Einstellungen bleiben unverändert.
5. Die Erstellung mit **Create repository** abschliessen.
{{% /expand%}}

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
3. Ein Klick auf **[View push commands](/images/ecr_push.png)** zeigt die notwendigen Schritte als Kommandos für die Erstellung und die Publikation des Container Images. Da AWS Cloud9 eine Linux EC2-Instanz nutzt, brauchst du die macOS/Linux-Befehle.
4. Die Kommandos nacheinander kopieren und in dem Terminal Fenster in der **AWS Cloud9** Instanz einfügen und ausführen.
5. Im Tab mit **Amazon ECR** das Fenster mit den push commands schliessen.

##### Erstellung des Frontend Container Images:
1. Im Terminal in **Cloud9** in das Verzeichnis **todo-frontend** wechseln mit ``cd ../todo-frontend``. Da du schon im Directory cloud-app-builders-modules-german/src/ bist, wechseln wir vom Ordner container-api zu todo-frontend.
2. Zum **Amazon ECR** Browser Tab wechseln und dort auf das ``workshop-frontend`` Repository klicken.
3. Ein Klick auf **View push commands** zeigt die notwendigen Schritte als Kommandos für die Erstellung und die Publikation des Container Images. Da Cloud9 eine Linux EC2-Instanz nutzt, brauchst du die macOS/Linux-Befehle.
4. Die Kommandos nacheinander kopieren und in dem Terminal Fenster in der **AWS Cloud9** Instanz einfügen und ausführen.
5. Im Tab mit **Amazon ECR** das Fenster mit den push commands schliessen.

#### Verifikation des Container Images

1. Zurück zum Tab mit **Amazon ECR** wechseln.
2. In der Repositroy Übersicht z.B. auf den Namen ``workshop-backend`` klicken.
3. Hier wird nun das eben erstellte und veröffentlichte Container Image angezeigt.
4. Im Punkt **Image URI** ist der Pfad zum Image abrufbar. Ein Klick auf **Copy URI** kopiert diesen in die Zwischenablage.
5. Den Pfad auch wieder zwischenspeichern (am besten in einem Textfile). Der Pfad wird zum Referenzieren des Container Images im nächsten Schritt benötigt.
6. Schritte 2-5 für das ``workshop-frontend`` Repository wiederholen.

### Zusammenfassung und nächste Schritte
Herzlichen Glückwunsch! Du hast zwei Container Repositories in Amazon ECR für die Speicherung der Container Images erstellt. In der Cloud9 IDE hast du zudem die beiden Container Images erstellt und über die Push Kommandos der Repositories in Amazon ECR direkt dorthin kopiert. Im nächsten Schritt wird ein Container Cluster aufgesetzt und manuell Container des Frontend-Images als Test gestartet.
