+++
title = "Datensicherheit: Verschlüsselung"
chapter = false
weight = 40
pre = "<b>4. </b>"
+++

### Einführung in Verschlüsselung
**[Verschlüsselung](https://de.wikipedia.org/wiki/Verschl%C3%BCsselung)** oder Chiffrierung genannt wandelt normalen Text oder Daten (Klartext) unter Nutzung eines Schlüssels in einen Geheimtext um. Dieser Geheimtext kann dann durch den passenden Schlüssel wieder entschlüsselt werden. Durch die Verschlüsselung können Daten geheim gehalten werden. Beispielsweise ist es wichtig heutzutage, dass Messanger verschlüsselt sind, da sonst alle Nachrichten zwischen dir und deinen Freunden einfach mitgelesen werden können, was man eigentlich eher vermeiden möchte. Je nach dem was für ein Schlüssel gewählt wird, können die Daten besser geschützt werden.

#### Verschlüsselungsarten

Es gibt zwei grundlegende Verschlüsselungsarten:
-	**Symmetrische Verschlüsselung**: Für die Verschlüsselung und die Entschlüsselung wird der gleiche Schlüssel genutzt. Bei modernen Verfahren werden oft Blockverschlüsselungen genutzt, die den Text erst in verschiedene und gleich grosse Blöcke aufteilen und dann erst verschlüsseln.
-	**Asymmetrische Verschlüsselung**: Bei dieser Verschlüsselung gibt es den öffentlichen Schlüssel um den Text zu verschlüsseln und den privaten um wieder zu entschlüsseln. Der öffentliche Schlüssel ist dafür da, dass er von jedem genutzt werden kann, aber sobald die Nachricht verschlüsselt ist, kann der Absender selbst nicht mal mehr den Text entschlüsseln. Diese Art von Verschlüsselung wird beispielsweise bei [Emails](https://www.tecchannel.de/a/die-mechanismen-hinter-verschluesselung-und-sicherer-e-mail-kommunikation,2055943) verwendet.

#### Verantwortliche für die Datenverschlüsselung

Wenn Daten in der Cloud gespeichert werden, kann als zusätzliche und ergänzende Sicherheitsmassnahme Verschlüsselung angewendet werden. Dabei gibt es zwei Szenarien: in transit und in rest. Das bedeutet, dass die Daten noch bewegt werden und noch nicht im Speicher oder der Datenbank angekommen sind und in Rest bedeutet, dass sie dort nun liegen. 

**In Transit**

Wenn Daten in Bewegung sind, ist es wichtig diese auch zu schützen. Ein Beispiel ist der Applikationsschicht des OSI-Modells. Für diese können Nutzer der Cloud selbst entscheiden, ob sie ein Verschlüsselungsprotokoll wie **[TLS](https://de.wikipedia.org/wiki/Transport_Layer_Security)** (Transport Layer Security) oder SSL

**[TLS](https://www.f5.com/services/resources/glossary/ssl-tls-encryption )** (Secure Socket Layer) nutzen wollen, wodurch eine verschlüsselte Verbindung zwischen Server und Client hergestellt werden kann. Beide Protokolle nutzen symmetrische und asymmetrische Verschlüsselungen **[symmetrische und asymmetrische Verschlüsselungen](https://www.websecurity.digicert.com/security-topics/what-is-ssl-tls-https)**. Asymmetrische Verschlüsselung wird genutzt, um eine Verbindung zwischen Server und Client herzustellen und die symmetrische Verschlüsselung codiert die Daten, die verschickt werden. 

**In Rest**

Wenn die Daten bereits gespeichert sind, dann können diese ebenfalls verschlüsselt werden, um die Sicherheit zu erhöhen. Für diesen Fall kommt es darauf an, wie der Anwender seine Daten verschlüsseln, da dadurch der eigene Aufwand variiert.

- **[Client-side encryption](https://docs.aws.amazon.com/de_de/AmazonS3/latest/userguide/UsingClientSideEncryption.html)** (CSE): Der Anwender verschlüsselt selbst seine Daten lokal bevor er sie beispielsweise in die Cloud hochlädt. Dadurch hat der Anwender volle Kontrolle und Verantwortung für die Verschlüsselung als Vorgang und die Schlüssel.
- **[Server-side encryption Client](https://docs.aws.amazon.com/de_de/AmazonS3/latest/userguide/serv-side-encryption.html)** (SSE-C): Der Nutzer stellt einen Schlüssel bereit in der Cloud und verwaltet diesen. Jedoch muss der Nutzer die Verschlüsselung nicht selbst durchführen, sondern der Server erledigt das. 
- **[Server-side encryption von AWS](https://docs.aws.amazon.com/de_de/AmazonS3/latest/userguide/serv-side-encryption.html)**: Um den Verwaltungsaufwand für Nutzer zu reduzieren, kann **[AWS Key Management Service (AWS KMS)](https://docs.aws.amazon.com/de_de/AmazonS3/latest/userguide/UsingKMSEncryption.html)** genutzt werden. Schlüssel können dort generiert, gespeichert, rotiert (ein neuer Schlüssel wird generiert, um einen alten zu ersetzen) und der Server übernimmt die Ver- und Entschlüsselung. Falls die Blockverschlüsselung 256-bit Advanced Encryption Standard (AES-256), was ein bestimmter Standard für Verschlüsselung ist, benötigt wird, so kann auch SSE-S3 benutzt werden.

Je nach Aufwand zur Verwaltung der Schlüssel und der notwendigen Verschlüsselungstechnik kann der Nutzer selbst auswählen, welche Art der Verschlüsselung am besten geeignet ist.



