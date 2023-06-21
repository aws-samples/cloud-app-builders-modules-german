+++
title = "Serverless"
chapter = false
weight = 80
pre = "<b>8. </b>"
+++

### Themen:
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
   - [Bereitstellung der Datenbank](#bereitstellung-der-datenbank)
   - [Bereitstellung der Backend Logik](#bereitstellung-der-backend-logik)
   - [Bereitstellung des API Gateways](#bereitstellung-des-api-gateways)
   - [Testen der API durch das API Gateway](#testen-der-api-durch-das-api-gateway)
   - [Serverless-API mit der Cloudfront Distribution verbinden](#serverless-api-mit-der-cloudfront-distribution-verbinden)
   - [Test der ToDo-Liste](#test-der-todo-liste)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

### Einleitung
Wenn du dir heute Abend eine Pizza machen willst, stellst du die Temperatur in deinem Backofen einfach auf 250 Grad, platzierst die Tiefkühlpizza auf einem Backblech und du der Ofen über das backen. Ein holzbefeuerter Steinofen hingegen bedeutet mehr Arbeit für dich, weil du dich um das Feuer kümmern musst. In einem Pizzarestaurant nutzt man einen Steinofen, der den ganzen Tag brennt. Für dich zuhause macht der Backofen mehr Sinn, da er einfacher zu bedienen ist und du ihn nicht den ganzen Tag brauchst. 

Auf die Cloud bezogen ist eine virtuelle Maschine wie ein holzbefeuerter Steinofen und serverlose (serverless) Technologie wie der Backofen. In einigen Fällen ist ein holzbefeuerter Steinofen, bzw. eine virtuelle Maschinen angebracht. In vielen Fällen ist der Backofen, bzw. serverlose Technologie angenehmer zu benutzen. Mit serverloser Technologie übernehmen Cloud Anbieter undifferenzierte und schwere Aufgaben. Dadurch können sich Kunden auf Alleinstellungsmerkmale fokussieren. Diese Flexibilität ermöglicht, dass neue Ideen und Anwendungen schneller getestet werden können und somit auch leichter dem Endkunden zur Verfügung gestellt werden können.

### Technische Konzepte
#### Serverless
Es gibt Cloud Services, zum Beispiel Amazon EC2, bei denen der Nutzer Serverkonfigurationen (CPU, Arbeitsspeicher, Speicher) nach Bedarf richtig auswählen muss. Bei **serverlosen** Services werden diese Entscheidungen nicht mehr benötigt. Serverlose Services benutzen trotzdem Server, diese sind jedoch vom Nutzer abstrahiert. Der serverlose Service entscheidet und skaliert automatisch die Ressourcen die bei der Ausführung benötigt werden. Somit kann sich der Nutzer auf den Code und die Funktionalität der Anwendung konzentrieren.

#### Vor- und Nachteile von Serverless
Die Nutzung von serverlosen Services in der Cloud bringt Vor- und Nachteile. Einerseits müssen die Nutzer keine Server managen, sodass sie sich auf andere Aufgaben konzentrieren können und leichter sowie schneller Produkt an den Markt bringen können. Zusätzlich skalieren die Services wie bereits erwähnt von selbst und sind damit hochverfügbar. Bei serverlosen Services bezahlt man nur für die Ausführungszeit. Wenn die Applikation nicht benutzt wird sind die Rechenkosten null, wodurch Kosten stark reduziert werden können. Zudem aktualisiert die Cloud Plattform automatisch die Serverhardware und Software. Der Cloud Anbieter übernimmt die Sicherheit vom Betriebssystem und allem darunter. Die Kunden sind also nur noch für die Sicherheit auf der Anwendungsebene verantwortlich.

Manche Branchen, zum Beispiel Banken, haben bestimmte Auflagen. In diesen Fällen werden die Konfigurationsmöglichkeiten von Servern benötigt, um bestimmte Auflagen, wie zum Beispiel bestimmte Sicherheitsstandards, zu erfüllen. Dafür sind serverlose Services nicht die passende Lösung. Wenn ein serverloser Service eine Zeit lang nicht genutzt wurde und dann aufgerufen wird, entsteht ein Cold Start. Das heisst, dass die Platform im Hintergrund etwas länger braucht, um zu starten und die Funktion auszuführen. Danach funktioniert der Service wie gewohnt. Diese Cold Starts können je nach Service auch reduziert oder vermieden werden. Falls Probleme oder Fehler auftreten, kann es komplex sein herauszufinden, woran es liegt, da man den Service nicht selbst verwaltet.

Im Vergleichen zwischen Vor- und Nachteilen von serverlosen Services, ist ersichtlich, dass es stark davon abhängt, welche Anforderungen der Nutzer hat (zum Beispiel spezifische Security Standards), wie viel Verwaltung man selbst übernehmen möchte und ob die Applikation 24/7 aktiv ausgeführt wird oder nicht. 

#### Serverless: Anwendungsfälle
Durch serverlose Services lassen sich **[serverlose Anwendungen](https://www.contino.io/insights/aws-lambda-use-cases)** erstellen, die vielfältige Aufgaben übernehmen können:
-	Webseiten: Serverlose Services können die Applikationslogik im Hintergrund übernehmen und Daten zum Beispiel in eine Datenbank übertragen. 
-	Dokumentkonvertierung: Nutzer können ganz einfach Dateien in andere Formate konvertieren und dann das richtige Format downloaden. Anstatt Kopien in allen möglichen Formaten zu speichern, wird ein Dokument einfach konvertiert und in der Cloud zahlst du nur für die Zeit, die die Funktion benötigt, um die Konvertierung durchzuführen.
-	Automatisierte Backups: Es ist möglich auch Zeitpunkte festzulegen, an dem beispielsweise eine Funktion einen neuen Backup erstellt, diesen ausführt und dann wieder beendet wird. 

Durch die Anwendungen wird klar, dass sich serverlose Services gut für kürzere, einmalige oder wiederkehrende Aufgaben eignet.

#### Weitere technische Konzepte

In diesem Kapitel werden wir eine serverlose Datenbank nutzen, die Schlüssel-Werte-basiert ist, um eine Alternative zu unserer vorherigen Datenbank aufzuzeigen.
Eine **[Schlüssel-Werte-Datenbank](https://de.wikipedia.org/wiki/Schl%C3%BCssel-Werte-Datenbank)** (Key Value Database / Store) ist eine Art von Datenbank, bei der die Daten mit einem eindeutigen Schlüssel gespeichert werden. Somit sind sie ähnlich zu einem Wörterbuch, einem Array oder einer Map. Die Daten selbst werden als JSON Objekte gespeichert, wie in dem Beispiel mit dem Key GamerTag zu sehen ist. Diese Art von Datenbank ist eine **[NoSQL-Datenbank](https://de.wikipedia.org/wiki/NoSQL)**.
Das bedeutet, dass durch den Schüssel-Abfragen und Befehle anders genutzt werden müssen als bei SQL-Befehlen in einer relationalen Datenbank. Es ist möglich, mehrere Schlüssel beim Speichern zu nutzen, um flexibler bei den Befehlen zu sein. Zusätzlich ist sind Key Value Databases optimiert zum Schreiben und Lesen von Daten, da die Daten einfach durch den Schlüssel direkt aufgerufen werden.

![Key Value Data Example](/images/keyvalue.png)



### Relevante AWS Services
**[Amazon DynamoDB](https://aws.amazon.com/de/dynamodb/faqs/?nc1=h_ls)** ist eine Key Value Database. Sie ist serverlos, sodass der Nutzer sich weder über die Hardware Bereitstellung, das Setup und die Konfiguration der Datenbank wie Planung wie viel Kapazität benötigt wird, Replikation und Software Patching kümmern muss. DynamoDB repliziert die Daten in drei Datenzentren in einer Region, wodurch die Datenbank hochverfügbar ist. Beispiele für Anwendungen dieser Datenbank wurden im 3. Kapitel Datenbank vorgestellt.

Bei der Implementierung von Anwendungen werden manchmal kleine Funktionen (Code) gebraucht, um beispielsweise Informationen abzufragen oder zu überprüfen. Mit **[AWS Lambda](https://aws.amazon.com/de/lambda/faqs/)** kannst du einfach deinen Code ausführen ohne im Hintergrund einen Server bereitstellen zu müssen, da Lambda serverless ist. Mit Lambda kann Code für fast jede Anwendungsart oder Backend-Service ausgeführt werden solange die benötige Zeit bei unter 15 Minuten liegt. Dadurch ist Lambda für kurze Workloads geeignet. Lambda kann beispielsweise Daten von DynamoDB abrufen und transformieren oder API-Aufrufe in der AWS Cloud überprüfen. Lambda unterstützt Code in Java, Go, PowerShell, Node.js, Python, C#, und Ruby-Code. Wenn eine Lambda Funktion aufgerufen wird, dann erstellt Lambda ihren eigenen Container, um den Code der Funktion auszuführen.

Um APIs in der Cloud zu veröffentlichen, zu warten, zu überwachen und zu sichern, kann das **[Amazon API Gateway](https://aws.amazon.com/de/api-gateway/faqs/)** genutzt werden. Es dient als eine Art Haupteingang für Anwendungen. Dabei können viele API-Aufrufe gleichzeitig bearbeitet werden, der Datenverkehr verwaltet und autorisiert werden. HTTP APIs, REST APIs und WebSocketAPIs werden unterstützt. In der folgenden Anwendung wird ein **[HTTP API](https://docs.aws.amazon.com/de_de/apigateway/latest/developerguide/http-api.html)** verwendet, um Anfragen beispielsweise an eine Lambda-Funktion zu schicken, die dann mit dem Backend verbunden ist. Die Antwort wird dann an den Client zurückgegeben. Es können auch bestimmte Routen angelegt werden, die dann je nach Aufruf andere Informationen zurückgeben.

___

### Anwendung
Für die Speicherung der ToDos wird eine Datenbank benötigt. Für die Beispielanwendung wird die No-SQL Datenbank Amazon 
DynamoDB verwendet. Diese wird in den folgenden Schritten konfiguriert und bereitgestellt.

#### Bereitstellung der Datenbank

1. Unter **Services** den Dienst **DynamoDB** auswählen.
1. Unter **Dashboard**, auf **Create table** klicken.
1. Bei **Table name** `ServerlessTodoTable` eingeben.
1. Bei **Partition key** `user_id` eingeben und als Typ `String` nutzen. 
1. Bei **Sort key - optional** `id` eingeben und als Typ `String` nutzen.
1. Unter **Table settings** wähle **Customize settings**.
1. Bei **Capacity mode** `On-demand` auswählen.
1. Die restlichen Einstellungen bleiben unverändert. Zum Abschluss auf **Create table** klicken.


#### Bereitstellung der Backend Logik
Die AWS Lambda Funktion wird später alle Anfragen verarbeiten und stellt zugleich die Backend Logik dar. Um diese 
einzurichten sind die folgenden Schritte notwendig.

1. Unter **Services** den Dienst **Lambda** auswählen.
1. Auf **Create function** klicken.
1. Sicherstellen, dass **Author from scratch** ausgewählt ist. 
1. Bei **Function name** `TodoServerlessApi` eingeben.
1. Bei **Runtime** `Node.js 18.x` auswählen. Das ist die Javascript Laufzeitumgebung für das API. 
1. Im Abschnitt **Change default execution role** `Use an existing role` auswählen.
1. Bei **Role name** `LabRole` auswählen.
1. Auf **Create function** klicken.

Als nächstes kann der Sourcecode der Funktion hochgeladen werden.

1. Im GitHub Repository die Javascript Datei [src/serverless-api/index.js](https://github.com/aws-samples/cloud-app-builders-modules-german/blob/592bc3b50463f8de6c00d9effa9cc40e4c6833b6/src/serverless-api/index.js) öffnen.
1. Den Inhalt der Datei `index.js` in die Zwischenablage kopieren und damit den **gesamten** Code der Lambda Funktion im Browser ersetzen.
1. Zum Abschluss auf **Deploy** klicken.

Die Lambda Funktion nutzt Umgebungsvariablen, über die die Verbindungsparameter zur DynamoDB Datenbank ausgelesen werden. 
Diese Umgebungsvariablen werden als nächstes konfiguriert.

1. Auf **Configuration** klicken.
1. **Environment variables** auswählen.
1. Auf **Edit** klicken.
1. Auf **Add environment variable** klicken.
1. Bei **Key** `TABLE` eingeben und bei **Value**, `ServerlessTodoTable` (Name der vorher erstellten DynamoDB Tabelle).
1. Auf **Save** klicken.

#### Bereitstellung des API Gateways

In den vorherigen Schritten wurde die Backend Logik (Lambda Funktion) sowie die Datenbank (DynamoDB Tabelle) 
implementiert und es wurde sichergestellt, dass die Lambda Funktion die richtigen IAM Berechtigungen für den Zugriff 
besitzt. In diesem Schritt wird ein API Gateway aufgesetzt und konfiguriert, damit das Backend in die Beispielanwendung implementiert werden kann.

1. Unter **Services** den Dienst **API Gateway** auswählen.
1. Im Abschnitt **HTTP API** auf **Build** klicken.
1. Im Abschnitt **Integrations**, auf **Add integration** klicken.
1. In der Liste **Lambda** auswählen.
1. Bei **Lambda function**, die vorher erstellte Funktion `TodoServerlessFunction` auswählen. 
1. Rechts davon die `Version 1.0` auswählen.
1. Bei **API name** `TodoServerlessApi` eingeben.
1. Auf **Next** klicken.
1. Die Default Route muss entfernt werden. Klicke hierzu auf **Remove**.
1. Die folgenden neuen Route anlegen, und für jede `TodoServerlessAPI` als Integration Target auswählen:
   1. **GET** `/api/v2/todos` - Zugriff auf alle ToDos
   1. **POST**, `/api/v2/todos` - Ein neues ToDo erstellen
   1. **PUT**, `/api/v2/todos/{todo+}` - Update eines ToDo über die ToDo-ID
   1. **DELETE**, `/api/v2/todos/{todo+}` - Löschen eines ToDo über die ToDo-ID
1. Zwei Mal auf **Next** klicken.
1. Auf **Create** klicken.


Nach der Bereitstellung ist das API Gateway über eine **Invoke URL** erreichbar. Schreib dir diese am besten auf. Sie sieht 
ähnlich aus wie `https://abcdef.execute-api.eu-central-1.amazonaws.com`.

#### Testen der API durch das API Gateway

Mit der aufgeschriebenen **Invoke URL** kann das API getestet werden. Da die DynamoDB Tabelle neu erstellt wurde und 
noch keine ToDo's gespeichert sind, sollte es eine leere Liste von ToDos zurückgeben. 
Dazu die **Invoke URL** nehmen und mit `/api/v2/todos` erweitern wie zum Beispiel:

[https://abcdef.execute-api.eu-central-1.amazonaws.com/api/v2/todos](https://abcdef.execute-api.eu-central-1.amazonaws.com/api/v2/todos)

Wenn diese URL in den Browser eingegeben wird, wird eine leere JSON-Liste zurückgeben:

```
[]
```

Diese Resultate zeigt, dass die Serverless Backend Implementation über API Gateway, die Lambda-Funktion und DynamoDB erfolgreich ist.

#### Serverless-API mit der Cloudfront Distribution verbinden

Im nächsten Schritt wird zusätzlich zum Container basierten API das Serverless-API in der Cloudfront Distribution integriert.

1. Unter **Services** den Dienst **Cloudfront** auswählen.
1. Bei **Distributions**, die vorher erstellte Distribution auswählen.
1. Im Abschnitt **Origins**, auf **Create Origin** klicken.
1. Bei **Origin domain**, die vorher aufgeschreibene **Invoke URL** eingeben, OHNE das Präfix `https://`  - z.B einfach `abcdef.execute-api.eu-central-1.amazonaws.com`.
1. Im Abschnitt **Additional settings**, bei **Protocol** `HTTPS Only` auswählen.
1. Bei **Minimum Origin SSL Protocol** `TLSv1.2` auswählen.
1. Auf **Create** klicken.

Nun kannst du definieren wie mit Serverless-API interagiert werden soll.
1. Im Abschnitt **Behaviors**, auf **Create Behavior** klicken.
1. Bei **Path Pattern**, `/api/v2/*` eingeben.
1. Bei **Origin and origin groups**, das Origin von gerade auswählen.
1. Im Abschnitt **Viewer**, bei **Viewer protocol policy** `HTTPS only` auswählen.
1. Bei **Allowed HTTP Methods** `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE` auswählen.
7. Unter **Cache key and origin requests** wähle **Cache policy and orgin request policy** aus. Klicke bei **Cache Policy** auf `CachingDisabled`. Durch diese Einstellung werden deine Anfragen nicht gecached, sodass du immer die neueste Version deiner Todo-Liste bekommst, wenn du die Seite aufrufts.
1. Auf **Create behavior** klicken.

{{% notice note %}}
Es kann bis zu 15 Minuten dauern, bis die **Cloudfront Distribution** aktualisiert wurde. 
Sobald es wieder auf im Status **Deployed** ist, können die nächsten Schritte vorgenommen werden.
{{% /notice%}}

#### Test der ToDo-Liste
Rufe deine ToDo-Webseite auf unter dem Domain name, den du in deiner neuen CloudFront Distribution findest. Die Domain sieht ähnlich zu diesem Link aus [https://zhijklm.cloudfront.net/api/v2/todos](https://zhijklm.cloudfront.net/api/v2/todos).

Um das Serverless-API zu nutzen, muss der Pfad, der in Behaviors in CloudFront definiert ist, aufgerufen werden. Dafür sind folgende Schritte nötig:
1. Rufe deine ToDo-Webseite auf.
1. Nutze den Rechtsklick, um die Webseite zu **[inspizieren](https://digitalfahrschule.de/element-untersuchen-im-chrome/)**.
1. Klicke auf die **Console** und führe dort ``sessionStorage.setItem("apiBase", "/api/v2/")``. Dadurch wird nun die serverlose API genutzt.
1. Um wieder die Container zu nutzen, führe ``sessionStorage.setItem("apiBase", "/api/v1/")`` in der Console aus. Nun sind deine Aufgaben wieder zusehen. 

<video width=100% controls autoplay loop>
    <source src="/images/ServerlessApp.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

Teste nun die Funktionalitäten deiner ToDo-Anwendung:
- **Überprüfe deine leere ToDo-Liste**: Füge deinem Domain Namen `/api/v2/todos` hinzu. Wenn du diesen öffnest, sollte die Liste leer sein.
```
[]
```
- **Hinzufügen von ToDos**: Schreibe einige ToDos in deine Liste auf der Webseite.
- **Aufrufen der Daten in der Datenbank**: Unter **Services** den Dienst **DynamoDB** auswählen. Klicke auf **Tables** und klicke auf deine Tabelle `ServerlessTodoTable`. Mit einem Klick auf **Explore table items**, kannst du anschauen welche Items (ToDos) in deiner Datenbank hinterlegt sind.
- **Aufgaben erledigt**: Hacke ein paar deiner Aufgaben in der Liste ab.
- **Prüfen der Änderung in den Daten**: Führe in deiner Tabelle `ServerlessTodoTable` einen Scan aus. Dieser zeigt, dann die Änderungen deiner Items.
- **Streiche deine erledigten Aufgaben**: Klicke auf **Clear completed**, um deine erledigten Aufgaben zu löschen.
- **Prüfen der gelöschten Aufgaben**: Führe in deiner Tabelle `ServerlessTodoTable` wieder einen Scan aus, um zu sehen, dass die Aufgaben erfolgreich gelöscht wurden.

### Zusammenfassung und nächste Schritte 
Herzlichen Glückwunsch! Deine ToDo-App benutzt nun serverlose Services wie der Datenbank DynamoDB, Lambda und das API Gateway. Nun hast du auch ihre Funktionen erfolgreich getestet. Da die Services serverlos sind, musst du dir keine Gedanken über die Server im Hintergrund machen, da die Applikation selbstständig skalieren kann. Damit unsere Implementierung automatisierter und einfacher zu aktualisieren ist, schauen wir uns im nächsten Kapitel an, wie man das als CI/CD-Pipeline umsetzen kann.
