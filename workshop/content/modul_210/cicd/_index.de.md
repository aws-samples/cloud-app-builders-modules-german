+++
title = "CI/CD"
chapter = false
weight = 90
hidden = false
pre = "<b>9. </b>"
+++

### Themen:
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
   - [Bereitstellung des Repositorys](#bereitstellung-des-repositorys)
   - [Bereitstellung der Build Pipelines](#bereitstellung-des-build-pipelines)
   - [Veröffentlichung einer Änderung](#veröffentlichung-einer-änderung)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

### Einleitung
Wenn in einem Team an einer neuen Anwendung gearbeitet wird, teilt man gerne Aufgaben untereinander auf. Wenn jeder aber separat arbeitet und seine Aufgabe zuerst ganz erfüllt ohne zu wissen, was und wie die anderen ihre Aufgaben füllen, wird es sehr schwierig alle Teile der Anwendung zusammenzubringen. Das führt schnell zu Fehlern und braucht viel Zeit, bis alles gemeinsam integriert worden ist. Wahrscheinlich hast du die Erfahrung auch schon gemacht, dass man eine Sache ändert, weil es an der Stelle Sinn macht und plötzlich entstehen dadurch fünf neue Fehler an ganz anderen Stellen, da der Code nicht mehr zusammen passt beispielsweise.

### Technische Konzepte
Im Bereich des Softwareengineering, ist eine Kombination aus Continuous Integration (CI), Continuous Delivery und Continuous Deployment (CD) oft bekannt als **[CI/CD](https://en.wikipedia.org/wiki/CI/CD)**. CI/CD ist eine Methode, die die Integration von einem Code erleichtert. Dadurch kann der gesamte Zyklus von Entwicklung bis Nutzung in der Produktion automatisiert und überwacht werden und wird daher oft CI/CD-Pipeline genannt. Diese Pipeline besteht aus folgenden Schritten:

-	Für eine **[Continuous integration](https://www.plusserver.com/blog/was-bedeutet-ci-cd-in-der-entwicklung)** (CI) werden alle Codeänderungen im Main Branch eines Code Repositories gespeichert. Diese Änderungen sollen früh und häufig durchgeführt werden und automatisch jede Änderung testen. Dadurch sollen Fehler und Security Probleme früh identifiziert und behoben werden als sonst in einem normalen Softwareentwicklungszyklus. Durch häufiges pushen der eigenen Codeänderungen wird auch die Wahrscheinlichkeit reduziert, dass verschiedene Entwickler an der gleichen Stelle arbeiten. Da der Code in einem Repository gespeichert wird, wird damit jede Änderung durch die Versionsverwaltung nachverfolgt. 

-	Im nächsten Schritt der **[Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery)** wird der gesamte Code (Build) automatisch in beispielsweise einer Testumgebung getestet. 

-	Im letzten Schritt der CI/CD Pipeline kann Continuous Deployment (CD) die erstellten Builds automatisiert an die Produktion freigeben und dadurch ausrollen. 


### Relevante AWS Services
**[AWS CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html)** ist ein Versionsverwaltungsservice, um Dokumente, Source Code, Binary Files in der Cloud zu speichern. CodeCommit hostet private Git Repositories. Es unterstützt die Standardfunktionalitäten von Git. Ein Vorteil von CodeCommit ist, dass alle Repositories grundsätzlich verschlüsselt sind. Wenn eine CI/CD Pipeline in der AWS Cloud aufgebaut wird und somit auch andere AWS Services genutzt werden, kann CodeCommit dadurch leicht integriert werden.

**[AWS CodeBuild](https://aws.amazon.com/de/codebuild/faqs/?nc=sn&loc=5)** ermöglicht die kontinuierliche Integration in der Cloud. Er kann Quellcode kompilieren, Tests ausführen und Softwarepakete generieren. Der Nutzer muss dabei keine Entwicklungsserver verwalten, da der Service an sich vollständig verwaltet ist. Es können mehrere sogenannte Builds gleichzeitig ausgeführt werden und CodeBuild passt sich dementsprechend an. Um den Build durchzuführen, erstellt CodeBuild eigene Rechencontainer, der vorher definiert wird, welches Betriebssystem, wie lang die Laufzeit der Programmiersprache sein soll und welche Tools verwendet werden sollen. 

Nachdem der Code getestet wurde, kann dieser bereitgestellt und ausgeführt werden. **[AWS CodeDeploy](/https://aws.amazon.com/de/codedeploy/faqs/?nc=sn&loc=6)** automatisiert diesen Prozess, wodurch Code einfach für eine oder tausende Instanzen bereitgestellt werden kann. Beispielsweise kann CodeDeploy mit **[Amazon Elastic Container Service](https://docs.aws.amazon.com/de_de/AmazonECS/latest/developerguide/Welcome.html)** (Amazon ECS) integriert werden, der bisher [Container Image Kapitel]({{< ref "/modul_210/container" >}} "Container Image Kapitel") genutzt wurde.

Nun haben wir drei wichtige Schritte der CI/CD separat besprochen. Damit CodeCommit, CodeBuild und CodeDeploy nicht manuell bedient werden müssen, können diese Anwendungen in **[AWS CodePipeline](https://aws.amazon.com/de/codepipeline/faqs/?nc=sn&loc=5)** automatisiert werden. Dadurch lässt sich ein vollständiger Release-Prozess für die Entwicklung deines Codes modellieren, testen und für die Produktion freigeben. In jeder Phase von CodePipeline kann man eigene Tools integrieren oder manuelle Bestätigungen durch den Nutzer hinzufügen. Durch CodePipeline lassen sich Änderungen im Code leichter und standardisiert überprüfen, sodass Software-Updates schneller veröffentlicht werden können.
___

### Anwendung
In den nächsten Schritten wirst du Stück für Stück deine CI/CD-Pipeline erstellen. Sie besteht wie bereits besprochen aus CodeCommit, CodeBuild und CodeDeploy.

{{% notice info %}}
Bei AWS Academy stehen nicht alle Dienste und Funktionen in vollem Umfang zur Verfügung. In AWS Academy kannst du nicht AWS CodePipeline und AWS CodeBuild nutzen. Deshalb haben wir Videos, die zeigen wie CI/CD in AWS konfiguriert und ausgeführt wird, aufgezeichnet. Wenn du diesen Workshop in einem AWS Account, der nicht durch AWS Academy bereitgestellt wird folgst, dann kannst du der Anleitung folgen.
{{% /notice%}}

<video width=100% controls autoplay loop>
    <source src="/images/AWS CodePipeline Creation.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

#### Bereitstellung des Repositorys
1. Unter **Services**, den Dienst **CodeCommit** auswählen.
1. Auf **Create repository** klicken.
1. Bei **Repository-Name** ``todos_app`` eingeben.
1. Auf **Create** klicken.

#### Einrichtung des CodeCommit Repositories 
1. Unter **Services**, den Dienst **Cloud9** auswählen. Dort exisiert bereits das geklonte Repository, mit dem du bisher gearbeitet hast.
1. Führe ``cd ./cloud-app-builders-modules-german`` aus, um in diesen Ordner zu wechseln. Dahinter steht **(main)**, was der Branch ist des Repositories ist, in dem du dich gerade befindest.
1. Um das CodeCommit Repository hinzuzufügen, führe ``git remote add cc codecommit::us-east-1://todos_app`` aus. Das Remote wird hier cc benannt, was für CodeCommit stehen soll.
1. Um Ressourcen zu CodeCommit zu übertragen, nutze den Befehl ``git push cc main``. 
1. Wechsele nun zurück zu **CodeCommit**. Wenn du dort auf dein **todos_app**-Repository klickst, siehst du die kopierten Inhalte.

#### Bereitstellung des Build Pipelines

Im nächsten Schritt kann die Pipeline erstellt werden, die den Source Code verarbeitet (Build Phase) und danach die Container Images in der Container Registry (ECR) publiziert.

**Pipeline settings**
1. Unter **Services**, den Dienst **CodePipeline** auswählen.
2. Auf **Pipeline** klicken, danach auf **Pipelines** klicken.
3. Auf **Create Pipeline** klicken.
4. Bei **Pipeline Name**, `TodoAppBackendService` eingeben.
5. Die Option **New service role** auswählen. Auf **Next** klicken.

**Source stage**
1. Bei **Source Provider** **AWS CodeCommit** auswählen.
1. Bei **Repository Name** das vorher erstelle CodeCommit Repository **todos_app** auswählen.
1. Bei **Branch Name** `main` auswählen.
1. Auf **Next** klicken.

**Build stage**
1. Bei **Build Provider** **AWS CodeBuild** auswählen.
1. Klick auf **Create project**, um ein CodeBuild Project zu erstellen.
   1. Bei **Project name**, ``TodosAppBackendService`` eingeben.
   2. Im Abschnitt **Environment**, bei **Operating system**,  ``Ubuntu`` auswählen.
   3. Bei **Runtime** ``Standard`` auswählen.
   4. Bei **Image** ``aws/codebuild/standard:5.0`` auswählen.
   5. Stelle sicher, dass  ``Enable this flag if you want to build Docker images or want your builds to get elevated privileges`` ausgewählt ist. Ein Docker Image wird dadurch gebaut.
   6. Die Option **New service role** auswählen.
   7. Im Abschnitt **Buildspec** bei **Buildspec name** `src/container-api/buildspec.yml` eingeben.
   8. Im Abschnitt **Logs**, bei **Group name** ``TodosApp`` eingeben, und bei **Stream name** ``BackendBuild`` eingeben.
   9. Auf **Continue to CodePipeline** klicken.
1. Stelle sicher, dass das vorher erstellte Build Project ausgewählt ist, und dannach auf **Next** klicken.
1. Im Abschnitt **Environment variables**, die Folgende Variables hinzufügen:
   1. **AWS_ACCOUNT_ID** - das ID des AWS-Accounts (im AWS Console **User-Menu** sichtbar) - z.b. `112233445566`
   1. **IMAGE_REPO_NAME** - **workshop-backend**

**Deploy stage**
1. Bei **Deploy provider** **Amazon ECS** auswählen.
1. Bei **Cluster name** das vorher gestellte Amazon ECS Cluster `workshop-cluster` auswählen.
1. Bei **Service name** den Backend Service `backend-service` auswählen.
1. Auf **Next** klicken.
1. Klick **Create pipeline**. Der Build Prozess startet automatisch das erste Mal.

#### Veröffentlichung einer Änderung 
In diesem Schritt wird eine Änderung im CodeCommit Repository vorgenommen. Dieser wird danach automatisch über die CI/CD Pipeline veröffentlicht.

<video width=100% controls autoplay loop>
    <source src="/images/AWS CodePipeline Demo.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

1. `def index():` finden. Diese Methode stellt die Antwort auf die Integritätsprüfung vor. 
1. Den String anpassen, sodass ein anderer Text zurückgegeben wird.

Jetzt kann die Änderungen im CodeCommit Repository veröffentlicht werden:

```bash
git add src
git commit -m "Modify / response body"
git push cc main
```

In der AWS Console in den Details der **CodePipeline** kann der Fortschritt der Änderung überwacht werden. Nach Abschluss der Veröffentlichung wird die neue Antwort unter `/todos/v1/` sichtbar werden.

### Zusammenfassung und nächste Schritte
Herzlichen Glückwunsch! Du hast erfolgreich eine CI/CD-Pipeline für deine ToDo-Anwendung implementiert. Durch dieses Setup ist es nun einfacher Änderungen in deinem Code schneller durchzuführen, zu testen und zu veröffentlichen. Im nächsten Kapitel geht es darum, die Infrastruktur, die du bereits für deine ToDo-App kennst, als Infrastructure-as-Code umzusetzen. Dadurch lässt sich die Anwendung leichter replizieren und verändern.