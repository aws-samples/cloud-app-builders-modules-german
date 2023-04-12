+++
title = "Identity and Access Management (IAM)"
chapter = false
weight = 30
pre = "<b>3. </b>"
+++

### Was ist Identity and Access Management (IAM)?
Unternehmen verwalten eine Vielzahl an Informationen und hierbei ist es von wesentlicher Bedeutung, dass nur berechtige
Personen Zugang zu sensitiven Informationen haben. IAM ist eine Disziplin, welche auch ausserhalb eines Cloud-Kontext
in Unternehmen kontinuierlich an Bedeutung gewonnen hat. Zentrale Elemente sind hierbei die **Nutzer** oder **Principals**, welche
Informationen konsumieren und auf der anderen Seite **Ressourcen (Informationsquellen)**, die abgesichert werden müssen.
Typische Nutzer können z.B. Mitarbeiter eines Unternehmens sein, wie Personen einer bestimmten Abteilung, oder aber
auch Endkunden, welche Services des Unternehmens konsumieren. Auf der anderen Seite können Ressourcen Anwendungen, Datenbanken
oder auch Netzlaufwerke sein, auf welche Principals entweder zugreifen dürfen oder auch nicht. Die Granularität kann hier 
beliebig tief sein, z.B. dass ein Zugriff auf Tabellen oder Spalten von Datenbanken eingeschränkt wird, falls diese
entsprechend zu schützen sind. Im Kontext von Cloud-Services verfügen die entsprechenden Cloud Service Provider (CSP)
ebenfalls über entsprechende IAM-Services um den Zugriff auf Cloud-Services sehr gezielt zu steuern. Bei AWS heisst
der entsprechende Service **[AWS Identity and Access Management (IAM)](https://aws.amazon.com/de/iam/)**.

{{% notice info %}}
Zwei Begriffe, welche im Kontext von IAM immer wieder auftauchen und teilweise zu Verwechselungen führen, sind die beiden 
Begriffe **Authentifizierung** und **Autorisierung**. Bei der Authentifizierung geht es darum die Identität einer Person 
(oder Anwendung) festzustellen. Ausserhalb des IT-Kontext kommt es auch regelmässig zu Authentifizierungen, z.B. wenn 
ihr bei einem Kundendienst anruft oder ein Dokument auf einer Behörde bestellt. Anhand von bestimmten Informationen wie 
dem Wohnort, der Kundennummer und dem Ausweis stellt die andere Seite fest, dass ihr auch die Person seid, für welche 
ihr euch ausgebt. Im IT-Kontext sind gängigste Mechanismen User-Namen, Passwörter oder auch SMS Codes als zweiten Faktor.
Die Autorisierung ist in den meisten Fällen nach der erfolgreichen Authentifizierung relevant. Die Ausnahme sind hier 
anonyme Zugriffe, die teilweise auch als Guest-Zugriff bekannt sind. Durch die Autorisierung wird festgelegt was ein bestimmter
Nutzer / Principal darf bzw. nicht darf. Ein Beispiel ausserhalb der IT-Welt wäre hier z.B. eine Hotel-Card die nur 
authentifizierte Gäste erhalten und mit denen sie Zugang zu bestimmten Räumlichkeiten wie ihrem Zimmer und dem
Wellness-Bereich erhalten. Das Reinigungspersonal hingegen hat eine Karte mit der alle Räume geöffnet werden können. Während der Arbeitszeit ist das Reinigungspersonal also autorisiert alle Räume zu betreten, um die Arbeit durchzuführen.
{{% /notice%}}

### AWS Identity and Access Management (IAM)
Innerhalb eines AWS Accounts gibt es den Service AWS Identity and Access Management (IAM). Über diesen Service können
User, Gruppen oder auch Rollen angelegt werden, und mittels des AWS IAM Service wird der Zugriff auf AWS-Services 
und -Ressourcen verwaltet. Das Thema Sicherheit ist für AWS von höchster Bedeutung und somit müssen alle Berechtigungen 
explizit durch die Nutzer der AWS Cloud-Dienste erteilt werden und sind standardmässig nicht vorhanden. 

Die folgende Grafik gibt eine grobe Übersicht über den Aufbau und die Bestandteile von AWS IAM. Es werden nur die 
wichtigsten Elemente erwähnt, um einen Einblick zu geben.

![IAM Übersicht](/images/iam_explained.png)

In den späteren Modulen werden diese Elemente und Begriffe wieder vorkommen. Deshalb ist ein grundsätzliches Verständnis hierüber wichtig.:
- **Principal**: Ein Principal ist generell eine _Identität_. Dies kann entweder ein Mensch, typischerweise Mitarbeiter eines 
Unternehmens sein, der sich als **(IAM) User** an den AWS Account anmeldet (authentifiziert) oder auch ein Programm welche Berechtigungen
auf AWS Dienste über eine bestimmte **Rolle** erhält. Zwischen Usern und Rollen gibt es noch zwei grundsätzliche Unterschiede.
User lassen sich in Gruppen organisieren. Es kann z.B. eine Gruppe Datenbank-Administratoren geben und alle Mitglieder dieser
Gruppe erhalten aufgrund ihrer Zugehörigkeit zur Gruppe alle Gruppenberechtigungen. Bei Anwendungen werden generell die 
Berechtigungen nicht direkt der Anwendung zugewiesen, sondern einer AWS Rolle. Die Anwendungen erhält beim Zugriff über
die Berechtigungen der zugewiesenen Rolle einen temporären Zugriff von mehreren Minuten oder Stunden (kann konfiguriert werden)
auf die entsprechenden Ressourcen. 

- **Authentifizierung**: Ein Principal muss sich mit seinen Zugangsdaten authentifizieren bevor eine Anfrage an AWS geschickt werden kann.
Um sich z.B. als AWS Account Hauptbenutzer in der AWS Console anmelden zu können, wird eine E-Mail-Adresse und ein Passwort benötigt.
Als IAM Benutzer wird die AWS Account ID oder dessen Alias mit Benutzername und Passwort benötigt.
Die Anmeldung mittels API oder **[AWS Command Line Interface (CLI)](https://aws.amazon.com/cli/)** benötigt einen sog. "Access Key" und einen "Secret Key".

- **Anfrage (Request)**: Wenn ein Principal versucht über die AWS Console, das AWS API oder das AWS CLI eine Aktion durchzuführen, 
sendet er eine Anfrage an AWS. Diese Anfrage beinhaltet vereinfacht gesagt z.B. die Aktion oder Operation, die durchgeführt werden soll
(z.B. das Starten einer virtuellen Maschine) und für welche Ressourcen die Anfrage vorgesehen ist (z.B. für EC2 Instanz 1). 
Darüber hinaus können je nach Service noch weitere Informationen oder Umgebungsdetails notwendig sein (Kontext). Diese Daten werden 
vom IAM Service verwendet, um die Zugriffsberechtigung zu prüfen (Autorisierung).

- **Autorisierung**: Eine Anfrage muss erfolgreich autorisiert werden, bevor eine Aktion durchgeführt werden kann. 
Für die Evaluation können auch die weiteren Details (Kontext) verwendet werden. Die Autorisierung selbst erfolgt anhand 
von Berechtigungsdokumenten, auch **[Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)** genannt. 
Diese sind in der Regel JSON Dokumente. In einer Policy sind dann die Aktionen und die Ressourcen definiert welche beschreiben, 
ob eine bestimmte Anfrage erlaubt oder verboten ist. Bei einer Anfrage prüft AWS jede infrage kommende Policy. Gibt es 
mehrere in Konflikt stehende Policies, z.B. in einer Policy wird der Zugriff verweigert, so wird die gesamte Anfrage abgelehnt. 
Per Default sind alle Anfragen verboten, solange sie nicht mittels Policies erlaubt werden.

{{% notice info %}}
Ein besonderer AWS User ist der **Root User**. Dieser User hat den AWS Account erstellt und er besitzt  alle Berechtigungen innerhalb
des AWS Accounts. Eine etablierte Vorgehensweise ist, dass dieser Account einerseits sehr gut abgesichert wird, z.B. über einen 
zweiten Faktor bei der Authentifizierung, und für konkrete Arbeiten sollte statt des Root Users eigentlich immer ein IAM User verwendet
werden, welcher nur eine Teilmenge aller Berechtigungen des Root Users besitzt.
{{% /notice%}}

### Weiterführende Informationen
* [Allgemeine Informationen zu IAM](https://aws.amazon.com/de/iam/)
* [Funktionsweise von IAM](https://docs.aws.amazon.com/de_de/IAM/latest/UserGuide/intro-structure.html)
* [IAM FAQ](https://aws.amazon.com/de/iam/faqs)
* [Dokumentation](https://docs.aws.amazon.com/de_de/IAM/latest/UserGuide/introduction.html)
* [Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)