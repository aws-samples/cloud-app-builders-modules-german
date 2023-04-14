+++
title = "Infrastruktur als Code"
chapter = false
weight = 100
pre = "<b>10. </b>"
+++

### Themen
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Einführung in AWS CloudFormation](#einführung-in-aws-cloudformation)
- [Anwendung](#anwendung)
  - [Bereitstellung der Vorlage](#bereitstellung-der-vorlage)
  - [Ausführung der Vorlage](#ausführung-der-vorlage)
  - [Test der ToDo-Liste](#test-der-todo-liste)
  - [Clean up](#clean-up)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

### Einleitung
In den letzten Kapiteln hast du kennengelernt wie man auf zwei unterschiedliche Arten die ToDo-Anwendung umsetzen kann. Durch CI/CD-Pipeline wurden einige Schritte bereits automatisiert, sodass nun Änderungen im Code einfacher vorgenommen werden können. Jedoch umfasst diese Lösung nur Teile der Ressourcen, die wir für die Anwendung genutzt haben. Manche davon haben wir noch manuell erstellt wie die Datenbank oder die VPC. Um das zu umgehen und nicht jedes Mal von neuem manuell erstellen zu müssen, kannst du eine Vorlage nutzen, die die Ressourcen in der Cloud für dich erstellt – der sogenannte Infrastructure-as-Code.

### Technische Konzepte
**[Infrastructure as Code](https://containersonaws.com/introduction/infrastructure-as-code/)** ist ein Prozess, um Cloud Ressourcen zu provisionieren und zu managen. Dafür wird ein Template genutzt, welches einerseits lesbar für Menschen ist und andererseits von der Cloud genutzt werden kann, um die Ressourcen bereit zu stellen. Durch das Nutzen von Infrastructure as Code ist es übersichtlich was wie in der Cloud genutzt wird. Zusätzlich ist Vorlage wiederverwendbar und kann auch leicht mit anderen Nutzern geteilt werden. Dadurch ist die genutzte Infrastruktur leichter skalierbar, da bei Bedarf noch mehr Ressourcen durch die Vorlage provisioniert werden können. Falls die Provisionierung scheitert, gibt es einen Rollback, der dafür sorgt, dass die alte Version der Infrastruktur wieder da ist. 

### Relevante AWS Services
Für AWS Cloud Entwicklung gibt es einen bereits eingebauten Service für Infrastructure as Code **[AWS CloudFormation](https://aws.amazon.com/cloudformation/faqs/)**. Es nimmt die Vorlage den sogenannten Stack und provisioniert, updatet oder löscht Ressourcen, je nach dem was in der Vorlage definiert ist. Wenn eine Ressource geupdatet wird, dann wird CloudFormation diese entweder aktualisieren oder ersetzen. 

Um Infrastructure as Code in der AWS Cloud auch in anderen Programmiersprachen wie beispielsweise JavaScript, TypeScript, Python, Java, C#, and Go nutzen zu können, gibt es das **[AWS Cloud Development Kit](https://aws.amazon.com/cdk/faqs/)** (AWS CDK). CDK ist ein Open-Source-Framework für die Softwareentwicklung. Durch CDK kann die Infrastruktur definiert werden, sie wird dann synthetisiert in eine CloudFormation Vorlage und dann ausgeführt. Das CDK lässt sich einfach durch die Befehlszeile ausführen oder kann in einem Continuous-Delivery-System ausgeführt werden. 

### Einführung in AWS CloudFormation
Da Infrastructure-as-Code als Thema sehr umfangreich ist, beschäftigen wir uns mit einer kleinen Einführung in AWS CloudFormation, um die grundlegenden Methoden zu verstehen.
#### Struktur der Vorlage
Eine CloudFormation Vorlage (template) beschreibt AWS Ressourcen in einem Stack. Ein Stack enthält alle erstellten Ressourcen durch die Vorlage. Die Vorlage selbst kann entweder als Textdatei im JSON oder YAML Format gespeichert werden. Weil die Vorlage nur eine Textdatei ist, kann sie einfach in jedem beliebigen Texteditor verändert werden. 
Die Struktur dieser Textdatei enthält Abschnitte, die verpflichtend sind und welche die optional sind. 

- AWSTemplateFormatVersion (optional): Version der Vorlage
- Description (optional): Beschreibung der Vorlage
- Metadata (optional): Weitere Informationen über die Vorlage
- Parameters (optional): Input, um die Vorlage zu personalisieren
- Rules (optional): Regeln, um die Parameter zu validieren
- Mappings (optional): Assoziierung von Schlüsseln und Werten
- Conditions (optional): Bedingungen, wann Ressourcen erstellt werden sollen
- Transform (optional): Für serverlose Anwendungen
- `Resources (verpflichtend): Komponenten der Infrastruktur`
- Hooks (optional): Nutzung für ECS Blue/Green Deployment
- Outputs (optional): Werte, die in den Eigenschaften des Stacks angezeigt werden

#### Erstellung der Netzwerkressourcen
Die Ressourcen sind ein verpflichtender Teil der CloudFormation Vorlage und bestehen mindestens aus zwei Teilen: Type und Properties. Der Typ (Type) gibt an, welcher Art von Ressource erstellt werden soll und die Eigenschaften (Properties) spezifizieren die Ressource näher. 

Im Kapitel Netzwerk hast du eine VPC und verschiedene Subnetze erstellt. Diese werden nun durch die Vorlage **network_public_subnets_only.yaml**, welche im Ordner **src/cloudformation** zu finden ist, definiert. 

**Aufgabe:**
Gehe die Vorlage durch und prüfe, ob du Stück für Stück nachvollziehen kannst, wie `SubnetPublicA`, `SubnetPublicB` und das Internet-Gateway definiert sind.

1. Welche CIDR nutzen beide? Wie ist diese definiert?
2. Wird das Internet-Gateway in der Vorlage mit der VPC verbunden?
3. Welche Route wird für das Internet-Gateway angelegt?

{{%expand "Hinweise" %}}
1. Halte Ausschau nach `subpublicAcidr` und `subpublicBcidr`.
2. Das Internet Gateway heisst `IGW`.
3. Schau dir `PublicDefaultRoute` näher an.
{{% /expand%}}

{{%expand "Lösung" %}}
1. Subnetz `SubnetPublicA` erhält ihre CIDR-Range durch den Parameter `subpublicAcidr`. Das gleiche gilt für `SubnetPublicB` mit dem Parameter `subpublicBcidr`.
2. Unter `GatewayAttach` wird das Internet Gateway mit der VPC verbunden.
3. Das Internet Gateway halt als Ziel (Destination) `0.0.0.0/0`, was unter `PublicDefaultRoute` definiert.
{{% /expand%}}

#### Referenzieren der Eigenschaften
Die Funktion **[`Ref`](https://docs.aws.amazon.com/de_de/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html)** gibt den Wert eines Parameters oder einer Ressource zurück. Wenn du einen Parameter referenzierst, dann erhältst du als Rückgabe den Wert des Parameters. Bei einer Ressource wird ebenfalls ein Wert zurückgegeben, der oft ein Verweis auf die Ressource ist z.B. eine ID. Bei der Nutzung einer YAML Vorlage, wird `!Ref Parameter` genutzt.

**Aufgabe:**
Bearbeite die Datei **training_rds.yaml**, welche im Ordner **cloudformation** zu finden ist.
Referenziere in der Definition für die **Datenbank** `RDSMySQL` die Eigenschaft `AllocatedStorage`  und bestimme mit Hilfe eines Parameters wie viel Kapazität der Datenbank zur Verfügung stehen soll.

{{%expand "Hinweis" %}}
Schaue bei den `ParameterGroups`in der Vorlage nach, ob du einen passenden Parameter findest.
{{% /expand%}}

{{%expand "Lösung" %}}
So sollte deine Referenzierung aussehen: 
`AllocatedStorage: !Ref dbcapacity`
{{% /expand%}}

#### Aufbau der Ressourcen und Erstellung
**Aufgabe:**
Bearbeite in der Datei **training_rds.yaml**, welche im Ordner **cloudformation** zu finden ist, eine Security Group, wie du sie schon im Kapitel Netzwerke kennengelernt hast. Sie heisst **RDSMySQLDBSecurityGroup** und deine Aufgabe ist es die passenden Eigenschaften auszufüllen. Erstelle einen Eintrag für den Verkehr bzw. Anfragen, die zu der Instanz dürfen (Tipp: Ingress). **CIDR-Range** ist `172.100.0.0/16`, das Protokoll ist `tcp`und der Port ist `3306`, um auf die Amazon RDS Datenbank zuzugreifen.

{{%expand "Hinweis" %}}
In der **[Dokumentation](https://docs.aws.amazon.com/de_de/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group-ingress.html)** ist der Aufbau einer Security Group beschrieben und welche Eigenschaften benötigt werden, um diese zu definieren.
{{% /expand%}}


{{%expand "Lösung" %}}
So sollte deine Security Group aussehen: 

<div class="highlight">
    <pre>
        <code>
        RDSMySQLDBSecurityGroup:
          Type: AWS::EC2::SecurityGroup
          Properties:
            GroupDescription: Access to DB connection
            `SecurityGroupIngress:`
              `- CidrIp: 172.100.0.0/16`
                Description: Allow cdDB Access from Container Instances
                `IpProtocol: tcp`
                `FromPort: 3306`
                `ToPort: 3306`
            Tags:
              - Key: Name
                Value: Workshop-RDS-SG
            VpcId: !ImportValue VPC
        </code>
    </pre>
</div>
{{% /expand%}}

___

### Anwendung
Im Folgenden wirst du eine CloudFormation Vorlage ausführen. Da manche Teile der Infrastruktur noch zum Beispiel Code benötigen wie die Lambda-Funktion oder das Frontend, werden wir diese separat anlegen. Um das noch mehr zu automatisieren, kannst du mit einer CDK arbeiten, was aber auf dieser Plattform limitiert ist.

1. Unter Services den Dienst **S3** auswählen.
1. Klicke auf **Create bucket**, um einen neuen Bucket zu erstellen.
1. Gebe deinem Bucket einen weltweit einzigartigen Namen, der mit ``cloudformation`` beginnen soll.
1. Klicke auf **Create bucket**.
1. Kopiere den Namen des Buckets. Diesen wirst du im nächsten Schritt benötigen.
1. Öffne deinen Bucket und erstelle einen Ordner mit dem Namen ``Vorlage``.
1. Öffne in einem neuen Tab den Dienst **Cloud9** und öffne dort wieder deine Umgebung **Uek Umgebung**.
1. Gehe in den Ordner **cloudformation/assets** durch ``cd cloud-app-builders-modules-german/src/cloudformation/assets``.
1. Kopiere nun alle Dateien aus diesem Ordner in deinen Bucket. Ersetze DEIN_BUCKET durch den Namen deines erstellten Buckets. Sync wird genutzt, damit alle Dateien auf diesem Ordner kopiert werden.

```
aws s3 sync . s3://DEIN_BUCKET
```

#### Bereitstellung der Vorlage
1. Bleibe in **Cloud9** und gehe in den Ordner **src/cloudformation**.
2. Kopiere nun **cloudFormationToDo.yml** in deinen Bucket, der mit ``cloudformation`` beginnt, in den Ordner **Vorlage**. Ersetze wieder DEIN_BUCKET durch den Namen deines erstellten Buckets.
```
aws s3 cp cloudFormationToDo.yml s3://DEIN_BUCKET/Vorlage/
```
3. Öffne in einem neuen Tab deinen S3 Bucket und prüfe, ob im Ordner Vorlage die yml-Datei kopiert wurde.

#### Ausführung der Vorlage
1. Wähle unter Services den Dienst **S3** und gehe zu deinem Bucket in den Ordner **Vorlage**.
1. Dort sollte nun die kopierte Vorlage sein. Wähle diese aus und klick auf **Copy URL**.
1. Unter Services den Dienst **CloudFormation** auswählen.
1. Klicke auf **Create stack** und wähle **with new resources (standard)** aus.
1. Lege deine Vorlage fest, indem du **Amazon S3 URL** auswählst. Gib nun die kopiere URL ein und klicke auf **Next**.
1. Benenne den Stack `ToDoStack`.
1. Fülle die Parameter wie folgt aus (siehe das nächste Bild):
    1. Für **URIbackend** füge die URI von deinem Container Image in Amazon ECR aus dem **[Amazon ECS](https://docs.aws.amazon.com/de_de/AmazonECS/latest/developerguide/Welcome.html)** integriert werden, der bisher [Container Image Kapitel]({{< ref "/modul_210/container" >}} "Container Image Kapitel") ein. Unter Services den Dienst **Elastic Container Registry** in einem neuen Browser Fenster öffnen. In der Liste der Private Repositories auf das repository mit dem Namen workshop-backend klicken. In der Liste der Images auf **Copy URI** klicken, um die URI vom backend container image zu kopieren und dann in dem anderen Browser Fenster mit den CloudFormation Parametern einfügen.
    2. Tippe in das Textfeld vom Parameter **pwDatabase** ein Passwort für die Datenbank, zum Beispiel ``todopassword``.
    3. Füge den Namen des Amazon S3-Buckets ein, den du zuvor erstellt hast, um die benötigten Dateien für CloudFormation bereitzustellen für **s3AssetBucketName**.
    4. In **userDatabase** gebe ``clusteradmin`` ein. Klicke auf **Next**.
1. Wähle unter **Permissions** die **LabRole** als Rolle aus und klicke **Next**.
1. Danach klicke auf **Submit**, um deinen Stack auszuführen und deine Architektur automatisch erstellen zu lassen.
1. Klicke auf das Tab **Resources**, um zu sehen, welche Ressourcen für die Anwendung erstellt werden. Schaue dir die einzelnen Komponenten an und überlege, ob du diese bereits aus vorherigen Kapiteln kennst. 

![Parameter für CloudFormation](/images/parameter_cloudformation.png)

{{% notice note %}}
Es kann bis zu 30 Minuten dauern, bis die **CloudFormation Vorlage** ausgeführt ist. Währenddessen werden immer Services verfügbar sein, die bereits erstellt wurden, sodass du dir diese unter **Resources** in deinem Stack anschauen kannst.
{{% /notice %}}

#### Finale Schritte
Es fehlt noch das Frontend:
1. Die Vorlage hat einen neuen Bucket erstellt. Du kannst den Bucket in **S3** finden und sein Name beginnt mit `todostack`.
1. Öffne in einem neuen Tab den Dienst **Cloud9** und öffne dort wieder deine Umgebung **Uek Umgebung**.
1. Gehe in den Ordner **todo-frontend** durch ``cd cloud-app-builders-modules-german/src/todo-frontend/build``.
1. Kopiere nun alle Dateien aus diesem Ordner in deinen Bucket. Ersetze DEIN_BUCKET durch den Namen des erstellten Buckets beginnend mit `todostack`. Sync wird genutzt, damit alle Dateien auf diesem Ordner kopiert werden. 

```
aws s3 sync . s3://DEIN_BUCKET
```


#### Test der ToDo-Liste
Die Vorlage hat die gleiche ToDo-App auf Containern nochmal nachgebaut, sodass du diese auch nochmal testen kannst.
1. Unter Services den Dienst **CloudFront** auswählen.
2. Der **Stack** hat auch einen Zugriff auf die ContainerAPIs von Front- und Backend aus den ersten Kapiteln erstellt. Klicke auf die neue CloudFront distribution. Kopiere den Domain Namen, der ca. so aussehen sollte: `d1xz0u2lqfxspu.cloudfront.net`.
3. Öffne den Link in einem neuen Browsertab und nun siehst du wieder deine ToDo-Liste als Anwendung. Sie ist noch leer, da die Infrastruktur gerade erst erstellt wurde.
4. Teste die Funktionalitäten der Anwendung, wie es bereits aus vorherigen Kapiteln kennst.

Wenn du die serverlose Infrastruktur auch nutzen willst, kannst du diese wieder umstellen:
1. Rufe deine ToDo-Webseite auf.
1. Nutze den Rechtsklick, um die Webseite zu **[inspizieren](https://digitalfahrschule.de/element-untersuchen-im-chrome/)**.
1. Klicke auf die **Console** und führe dort ``sessionStorage.setItem("apiBase", "/api/v2/")``. Dadurch wird nun die serverlosen Services genutzt.
1. Um wieder die Container zu nutzen, führe ``sessionStorage.setItem("apiBase", "/api/v1/")`` in der Console aus. Nun sind deine Aufgaben wieder zusehen. 

#### Clean up
Nun hast du die Vorlage der Infrastruktur für deine ToDo-App erfolgreich ausgeführt. Da nicht alle Ressourcen und Anwendungen in der Cloud dauerhaft gebraucht werden, lässt sich auch diese Infrastruktur leicht deprovisionieren.
1. Unter Services den Dienst **CloudFormation** auswählen.
2. Wähle deinen ToDo-App Stack aus. 
3. Klicke oben rechts auf **Delete**. 
4. Bestätige, dass du den Stack löschen möchtest.

Nun wird deine ToDo-App wieder gelöscht. 

### Zusammenfassung und nächste Schritte
Herzlichen Glückwunsch! Du hast erfolgreich deine ToDo-App als Infrastuktur-as-Code aufgesetzt und ausgeführt. Durch diese Art ganze Anwendungen auszuführen, kannst du sie leicht verändern, mit anderen teilen und mehrfach ausführen. 
Du hast insgesamt mehrere Möglichkeiten gesehen, wie du deine Anwendung in der Cloud umsetzen kannst. Im Folgenden werden diese nochmal zusammengefasst.