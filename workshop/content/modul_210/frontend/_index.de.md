+++
title = "Frontend"
chapter = false
weight = 70
pre = "<b>7. </b>"
+++

### Themen:
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
  - [Erstellen des Hosting Buckets](#erstellen-des-hosting-buckets)
  - [Bereitstellung der Website](#bereitstellung-der-website)
  - [Bereitstellung der Amazon CloudFront Distribution](#bereitstellung-der-amazon-cloudfront-distribution)
  - [Zugriff auf das Container API](#zugriff-auf-das-container-api)
  - [Test der ToDo-Liste](#test-der-todo-liste)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

### Einleitung
Der Zugang zu einer Anwendung ist im Internet oft durch eine Webseite möglich. Der Nutzer gibt den passenden URL-Link ein und der Browser lädt die Webseite. Mehrere Komponenten tragen zum schnellen und flüssig Anzeigen der richtigen Inhalte auf der Seite bei. Eine moderne Webseite besteht aus Front- und Backend. Das Backend führt die Funktionalität der Applikation im Hintergund aus und liefert das Ergebnis an das Frontend. In diesem Kapitel werden die einzelnen Bestandteile Stück für Stück erklärt mit dem Ziel die ToDo-App Webseite am Ende dieses Kapitels nutzen zu können.

### Technische Konzepte
#### Speicherarten
Wenn Daten gespeichert werden sollen, gibt es verschiedene Arten von Speichern, die je nach Datentypen Vorteile bieten:
-	**[Blockspeicher](https://en.wikipedia.org/wiki/Block-level_storage )** (**block storage**): Ein Blockspeicher dient oftmals als Rohspeicher für Daten. Dabei werden die Daten als Array in separaten Blöcken gespeichert und jeder Block hat die gleiche Grösse. Beispiele für einen Blockspeicher sind Festplatten und Storage Area Network (SAN) Speicherarrays.
-	**[Dateispeicher](https://de.wikipedia.org/wiki/Dateisystem)** (**file storage**): Der Dateispeicher speichert unabhängige Datenblöcke, die von einem Dateisystem verwaltet werden. Oftmals werden die Daten hierarchisch in einer Baumstruktur abgelegt, beispielsweise gibt es einen Hauptordner und in dem sind Unterordner enthalten, die dann die entsprechenden Dateien enthalten. Durch den individuellen Pfad jeder Datei kann jede Datei direkt identifiziert werden. Network Attached Storage (NAS) Appliances und Windows File Servers sind Beispiele für Dateispeicher.
-	**[Objektspeicher](https://towardsdatascience.com/working-with-object-storage-and-jupyter-notebooks-96915cba815a)** (**object storage**): Der Objektspeicher speichert virtuelle Container, sogenannte Objekte, die die Daten, ihre Attribute, Metadaten und Objekt-IDs enthalten. Objektspeicher funktionieren sehr gut für unstrukturierte Daten, welche einmal gespeichert und oft gelesen werden. Datensicherung, Bilderarchive, Videos, Musik und Texte können als Objekte gespeichert werden.

#### Front- und Backend 
Das **[Frontend](https://it-service.network/it-lexikon/frontend)** ist der Teil einer Software-Anwendung oder Applikation zum Beispiel einer Webseite, die für den Nutzer sichtbar ist. Das **[Backend](https://bsh-ag.de/it-wissensdatenbank/backend/)** dahingegen ist näher am System, um die Funktionalitäten der Anwendung bereitzustellen. Durch das Frontend kann man benutzerfreundlich und einfach auf das Backend zugreifen. In der Regel interagiert der Nutzer bzw. Betrachter nicht direkt mit dem Backend, da es keine Benutzeroberfläche für Nutzer besitzt.

Ein Frontend kann eine **[statisch oder dynamisch](https://www.strato.de/blog/statische-und-dynamische-websites-im-vergleich/)** Webseite sein. Bei statischen Webseiten wird der Inhalt direkt auf der Webseite angezeigt und ihre Inhalte verändern sich selten. Dadurch ist die Seite schnell aufrufbar. Für eine statische Webseite wird HTML, CSS und manchmal JavaScript genutzt. Zusätzlich zum statischen HTML und CSS benutzen dynamische Webseiten PHP, JavaScript oder andere Programmiersprachen. Die Programmiersprachen in dynamischen Webseiten laden ihre Inhalte und Daten aus verschiedenen Quellen. Dadurch ist eine dynamische Webseite interaktiv und verändert sich oft. 

Bei der Backendprogrammierung kommt es ebenfalls auf die Eigenschaften an, welche implementiert werden sollen. Bekannte **[Programmiersprachen](https://blog.back4app.com/de/backend-sprachen/#Ein_Wort_zu_Programmiersprachen)** sind dabei JavaScript, Python, Ruby, PHP, Java, C++ und noch einige mehr. 

#### Webhosting
Um auf eine Webseite im Internet zugreifen zu können wird ein Server benötigt. Der Server speichert die Dateien der Webseite und stellt sie dem Internet zur Verfügung. Theoretisch kannst du auch selbst einen Server zu Hause aufstellen und deine Webseite betreiben. Der Aufwand lässt sich jedoch durch Services in der Cloud oder durch andere Webhosting-Provider reduzieren. Optional kann ein Content Delivery Network helfen die Webseite schneller zu laden, damit die Nutzer ein besseres Erlebnis beim Aufruf der Webseite haben.

#### Content Delivery Network
Ein **[Content Delivery Network](https://aws.amazon.com/de/what-is/cdn/)** (CDN) ist ein globales Netzwerk aus miteinander verbundenen Servern, die das Laden einer Webseite beschleunigen. Wenn ein Nutzer eine Webseite aufrufen möchte, dann müssen die notwendigen Daten vom Server zum Nutzer gelangen. Wenn der Nutzer weit weg ist und eine grosse Datei laden will, dann kann es länger dauern. Durch ein CDN wird der Inhalt einer Webseite geografisch näher an den Nutzern gespeichert, sodass die Latenz zwischen Aufruf und Darstellung der Webseite geringer wird und somit schneller lädt. Es verbessert die Effizienz und verbessert gleichzeitig die Kundenerfahrung. Sollten viele Nutzer gleichzeitig die Webseite besuchen wollen, dann kann ein CDN helfen, die Webserver zu entlasten. 


### Relevante AWS Services
Für die Anwendung wirst du **[Amazon Simple Storage Service](https://aws.amazon.com/de/s3/faqs/?nc1=h_ls)** (Amazon S3), einen **Objektspeicher**, nutzen, der unbegrenzt Daten als Objekte speichern kann. Ein Objekt kann bis zu 5TB gross sein und praktisch jedes Format haben. Durch S3 können beliebig grosse Datenmengen aus allen Speicherorten einfach abgerufen werden. Wenn ein neues Objekt in Amazon S3 gespeichert wird, dann wird ein einmaliger Objektschlüssel automatisch erstellt, mit dem später die Datenabfrage erfolgen kann. Amazon S3 bietet eine Beständigkeit von bis zu 11 Neunen und ist praktisch unbegrenzt skalierbar zu sehr geringen Kosten. Amazon S3 kann nicht nur Objekte speichern, sondern kann auch **[statische Website hosten](https://docs.aws.amazon.com/de_de/AmazonS3/latest/userguide/WebsiteHosting.html)**, in dem die HTML-Dateien in Amazon S3 gespeichert und dann aufgerufen wird.

Um eine Website und Inhalte mit geringer Latenz bereitzustellen, kann **[Amazon CloudFront](https://aws.amazon.com/de/cloudfront/faqs/?nc=sn&loc=5&dn=2)** als Content Delivery Network genutzt werden. Durch CloudFront wird ein globales Netzwerk von Edge-Standorten und regionalen Edge-Caches genutzt, sodass der Inhalt schnell für Endnutzer übertragen werden kann. Durch den Cache ist ein erneuter Abruf der Website vom Server nicht notwendig, der Inhalt kann direkt vom Cache geliefert werden. CloudFront ist ein **[globales Netzwerk](https://aws.amazon.com/de/cloudfront/features/?whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc)** mit Edge-Caches an vielen Standorten. Durch die vielen Standorte wird die Distanz der Übertragung für Benutzer in der ganzen Welt minimiert. Beispielsweise kann ein S3 Bucket als Ursprung für statische Inhalte bei CloudFront registriert werden und über eine CloudFront-Domain aufgerufen werden.

Um sicherzustellen, dass die Dateien in Amazon S3 nicht öffentlich zugänglich sind, sondern nur über CloudFront bereitgestellt werden, kann **[Origin Access Control](https://aws.amazon.com/blogs/networking-and-content-delivery/amazon-cloudfront-introduces-origin-access-control-oac/)** (OAC) genutzt werden. OAC unterstützt diverse http Methoden wie GET, PUT, POST, PATCH, DELETE, OPTIONS und HEAD. Der Nutzer führt eine http- oder https-Anfrage an CloudFront durch. Die Edge-Locations von CloudFront prüfen, ob das angefragte Objekt bereits im Cache vorliegt und geben es gegebenenfalls sofort zurück. Falls nicht, nutzt CloudFront OAC, um die Anfrage zu signieren (**[SigV4](https://docs.aws.amazon.com/de_de/general/latest/gr/signature-version-4.html)**). Amazon S3 authentifiziert, autorisiert oder lehnt die Anfrage ab. Nutzer können beispielsweise nicht direkt Amazon S3 Objekte sehen, wenn sie den URL des Objektes nutzen. Aber durch die Nutzung der **[CloudFront URL](https://www.stormit.cloud/blog/cloudfront-origin-access-control/)** sind auch einzelne Objekte zum Beispiel Bilder zugänglich.
___

### Anwendung
In den folgenden Schritten erstellst du einen Amazon S3 Bucket, in dem die Dateien für die ToDo-Webseite zu finden sind. Durch eine Integration mit CloudFront kann dann die Webseite und ihre Inhalte (zum Beispiel die ToDo-Aufgaben) sicher abgerufen werden.
#### Erstellen des Hosting Buckets
Das Hosting der statischen Webseite (Frontend) kann direkt über ein Amazon S3 Bucket konfiguriert werden. Dazu wird ein neuer Amazon S3 Bucket benötigt.

**Aufgabe:**
Erstelle einen Amazon S3 Bucket mit dem Namen ``todofrontend{yourname}``. Der Name muss weltweit eindeutig sein. Der öffentliche Zugang soll geblockt sein.

{{%expand "Lösung" %}}
1. Unter **Services** den Dienst **S3** auswählen.
2. Klick auf **Create bucket**.
   1. Als Namen **todofrontend{yourname}** eingeben. Der Name muss Weltweit eindeutig sein und wird später gebraucht.
   2. Sicherstellen, dass **Block _all_ public access** gewählt ist.
   3. Klick auf **Create bucket**.
{{% /expand%}}

#### Bereitstellung der Website

Als nächstes kann der Inhalt des Frontends in den Bucket kopiert werden.

1. Kopiere den Namen des erstellten Buckets. Diesen wirst du im nächsten Schritt benötigen.
1. Öffne in einem neuen Tab den Dienst **Cloud9** und öffne dort wieder deine Umgebung **Uek Umgebung**.
1. Gehe in den Ordner **src/todo-frontend** durch ``cd src/todo-frontend``.
1. Führe ``npm install`` und danach ``npm run build``. Dadurch wird das Frontend zur Nutzung vorbereitet.
1. Gehe nun in den Ordner **build**: ``cd ./build``.
1. Kopiere nun alle Dateien aus diesem Ordner in deinen Bucket. Ersetze DEIN_BUCKET durch den Namen deines erstellten Buckets. Sync wird genutzt, damit alle Dateien auf diesem Ordner kopiert werden. Du kannst in deinem Bucket sehen wie Stück für Stück die Dateien kopiert werden. Während das Kopieren noch läuft, kannst du mit dem nächsten Schritt weitermachen.

```
aws s3 sync . s3://DEIN_BUCKET
```

#### Bereitstellung der Amazon CloudFront Distribution

Der Zugriff auf das Frontend erfolgt über eine sog. **Cloudfront Distribution**. Amazon Cloudfront ist ein CDN 
(Content Delivery Network) und erleichtert den Zugang zur statischen Webseite und den zwei API-Implementierungen 
(container / serverless). Darüber hinaus können Inhalte gecached werden, was den Zugriff beschleunigt.

1. Unter **Services** den Dienst **Cloudfront** auswählen.
2. Auf **Create a CloudFront distribution** klicken.
3. Falls **Get Started** sichtbar ist, darauf klicken.
4. Bei **Origin Domain Name**, das **S3 Bucket** von vorher auswählen.
5. Bei **Origin Access**, `Origin access control settings` auswählen.
6. Unter **Origin access control** `Create control setting` auswählen.
7. Den Namen gleich lassen und auf **Create** klicken. Sign requests wird verwendet, damit die Anfragen signiert werden und somit der Zugriff auf die Daten im Amazon S3 Bucket geschützt ist.
8. Im Abschnitt **Default cache behavior** bei **Viewer protocol policy**, wähle  **HTTPS only** aus.
9. Unter **Cache key and origin requests** wähle **Cache policy and orgin request policy** aus. Klicke bei **Cache policy** auf `CachingDisabled`. Durch diese Einstellung werden deine Anfragen nicht gecachet, sodass du immer die neueste Version deiner ToDo-Liste bekommst, wenn du die Seite aufrufst.
10. Bei **Web Application Firewall (WAF)** die Option `Do not enable security protections` auswählen.
11. Im Abschnitt **Settings**, bei **Default root object**, `index.html` eingeben.
12. Nach unten scrollen und auf **Create Distribution** klicken.
13. Sobald die CloudFront Distribution erstellt wird, erscheint oben ein blauer Kasten mit dem Titel **S3 bucket policy needs to be updated**. Klicke auf **Copy policy**.
14. Gehe zurück zu deinem erstellten Amazon S3 Bucket und unter dem Reiter Permissions findest du **Bucket policy**.
15. Klicke auf **Edit** und kopiere die Policy hinein. Mit einem Klick auf **Save changes**, kann nun deine CloudFront distribution auf die Inhalte dieses Amazon S3 Buckets zurückgreifen.


{{% notice note %}}
Es kann bis zu 15 Minuten dauern, bis das **Cloudfront Distribution** erreichbar ist. 
{{% /notice %}}

#### Zugriff auf das Container API

Erweiterung der **Cloudfront Distribution**, sodass nicht nur das Frontend erreichbar ist, sondern auch
das Backend (Container API). 

1. Unter **Services** den Dienst **Cloudfront** auswählen.
2. Unter **Distributions**, die Distribution von vorher auswählen.
3. Unter **Origins** tab, klick auf **Create Origin**.
4. Bei **Origin domain**, den **DNS-Name** vom **Load Balancer** verwenden - wie z.B. `todoApp-1234.eu-central-1.elb.amazonaws.com`.
5. Bei **Origin Protocol Policy** `HTTP Only` auswählen.
6. Auf **Create origin** klicken.
7. Unter **Behaviors** auf **Create Behavior** klicken.
8. Bei **Path Pattern**, `/api/v1/*` eingeben.
9. In **Origin and origin groups**, den soeben erstellten Pfad auswählen.
10. Im Abschnitt **Viewer**, unter **Viewer protocol policy**, **HTTPS only** wählen.
11. Bei **Allowed HTTP methods**, klicken auf `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`.
7. Unter **Cache key and origin requests** wähle **Cache policy and orgin request policy** aus. Klicke bei **Cache Policy** auf `CachingDisabled`. Durch diese Einstellung werden deine Anfragen nicht gecached, sodass du immer die neueste Version deiner Todo-Liste bekommst, wenn du die Seite aufrufts.
12. Auf **Create behavior** klicken.

#### Test der ToDo-Liste
Rufe deine ToDo-Webseite auf unter dem Domain name, den du in deiner CloudFront Distribution findest. Die Domain sieht ähnlich zu diesem Link aus [https://zhijklm.cloudfront.net/api/v1/todos](https://zhijklm.cloudfront.net/api/v1/todos). 

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

### Zusammenfassung und nächste Schritte 
Glückwunsch! Deine ToDo-Liste funktioniert nun und du hast sie erfolgreich getestet. 


Als nächstes werden wir noch eine zweite Implementierung des APIs bereitstellen, welche durch serverlose Technologien anstatt Containern aufgebaut wird.


