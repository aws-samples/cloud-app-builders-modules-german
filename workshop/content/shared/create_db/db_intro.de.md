### Einleitung
Datenbanken sind seit Jahrzehnten zentrale Komponenten von IT-Systemen. Sie erlauben die dauerhafte Speicherung von 
strukturierten und unstrukturierten Informationen. Die Konfiguration und der Betrieb einer Datenbank erfordern häufig
Expertenwissen. Datenbank-Administratoren (DBA) kümmern sich traditionell um diese Themen. 

Zwei grundsätzliche Entwicklungen konnten in den letzten Jahren bei Datenbanken beobachtet werden:
- Grosse, **monolithische Datenbanken** verlieren langsam an Bedeutung und stattdessen kommt es zu Aufteilungen von
  grossen Datenbanken in mehrere kleinere Datenbanken. Diese Entwicklung ist eng verknüpft mit der Modernisierung von Applikationen
  durch **[Microservices](https://de.wikipedia.org/wiki/Microservices)**. Die Aufteilung einer grossen Datenbank in mehrere
  kleinere Datenbanken bringt eine deutlich bessere Isolation der Workloads und es wird hierdurch ebenfalls möglich, dass
  die Datenbanken unabhängig voneinander mit mehr oder weniger IT-Ressourcen ausgestattet werden. Das Thema der Isolation
  ist dahingehend wichtig, da bei einer grossen gemeinsam genutzten Datenbank es sein kann, dass einzelne Datenbank-Operationen
  so viele IT-Ressourcen des Datenbank-Servers beanspruchen können, dass andere Abfragen hierdurch ausgebremst werden.
  Dieses Verhalten möchten Unternehmen in jedem Fall verhindern.
- Die zweite Entwicklung geht weg von einer einzigen bestimmten Datenbank-Technologie innerhalb eines Unternehmens,
  wie relationale Datenbanken, und hin zu **mehreren unterschiedlichen Datenbank-Technologien** welche für das jeweilige
  Einsatzgebiet am besten geeignet sind. Die Vorteile hierbei sind, dass die Workloads bessere Ergebnisse auf diesen
  **zweckgebundenen Datenbanken** erzielen und gleichzeitig meistens auch noch kostengünstiger betrieben werden können, da
  z.B. keine oder nur geringere Lizenzkosten anfallen.

{{% notice info %}}
Wie bei fast allen technologischen Entwicklungen gibt es nicht nur Vorteile, sondern ebenfalls auch Nachteile
und Herausforderungen. Ein zentraler Aspekt für Unternehmen ist sicherlich das erforderliche,
und unterschiedliche Datenbank Know-How aufzubauen und zu bewahren. Mit einer gestiegenen Anzahl unterschiedlich
unterstützter Datenbank-Technologien wächst häufig auch die Anzahl benötigter Mitarbeiter, um diese ordnungsgemäss 
zu konfigurieren und zu betreiben.
{{% /notice%}}

### Technische Konzepte
Datenbanken verfügen über eine Vielzahl an unterschiedlichen technischen Konzepten. Da dieser Kurs kein Datenbank-Kurs ist, 
werden die technischen Konzepte nicht im Detail erklärt. Stattdessen wird dieser Abschnitt die für den Cloud-Kontext relevanten technischen Aspekte erklären. 

Werden Datenbanken in der Cloud verwendet, so gibt es je nach genutzten Service zwei grundsätzliche Modelle. Entweder
basiert der Service auf einem **serverbasierten Ansatz** oder aber auf einem **serverlosen Ansatz**. Eines vorweg, in 
beiden Modellen laufen die Datenbank immer noch auf Servern. Der Unterschied für Cloud-Nutzer ist, dass ihr euch bei einem
serverbasierten Ansatz Gedanken machen müsst über wie viele Ressourcen (CPU, Memory, ...) der Datenbank-Server verfügen
soll und wo (in welcher Availability Zone) sich dieser befinden soll. Bei einem serverlosen Ansatz fällt dieser Aufwand
komplett weg und stattdessen geben User dieser Services eher an wie viele Lese- und Schreiboperation die Datenbank 
unterstützen soll. Daneben sind serverlose Services so konzipiert, dass sie mit der entsprechenden Last skalieren können, 
sprich im Hintergrund können mehr oder weniger Ressourcen automatisch zur Verfügung gestellt werden. Eine Konsequenz 
aus dieser automatischen Skalierung sind die Kosten, welche für den Service anfallen. Gibt es wenig Last, so sind diese 
gering und wird eine hohe Last abgearbeitet so steigen entsprechend die Kosten.  

Die Themen **Skalierbarkeit** und **Verfügbarkeit** müssen bei einem serverbasierten Ansatz stärker betrachtet und ggf.
aktiviert werden. Soll z.B. der Datenbank-Server nicht nur in einer Availability Zone, sondern noch in einer weiteren
Availability Zone laufen, um ein hochverfügbares Setup zu haben, so sind die entsprechenden Optionen für den jeweiligen
Service auszuwählen. Ähnlich sieht es aus, wenn es neben dem einzelnen Datenbank-Server noch weitere Datenbank-Server
geben soll um z.B. eine grosse Menge an lesenden Anfragen zu bewältigen. Dies muss ebenfalls vom Kunden konfiguriert 
werden. 

### Relevante AWS Services
Innerhalb von AWS gibt es unterschiedliche Möglichkeiten Datenbanken zu nutzen. Neben der klassischen Möglichkeit 
Datenbanken selber in AWS zu verwalten, analog zum Muster wie dies Unternehmen in eigenen Rechenzentren machen, 
erlaubt es AWS ebenfalls eine Vielzahl unterschiedlicher Datenbank-Typen als von AWS verwaltete Services 
(Managed Services) zu nutzen. Durch die Nutzung von Managed Services wird der Aufwand für die Nutzung dieser 
Services für Unternehmen deutlich vereinfacht, da typische Administrationsaufgaben von AWS übernommen werden und 
automatisiert sind.

AWS bietet über 10 unterschiedliche Datenbank-Services an und in der Folge sollen nur die wichtigsten Services kurz
beschrieben werden:

- **[Amazon RDS](https://aws.amazon.com/de/rds/)**: RDS steht für Relational Database Service und erlaubt es sowohl
kommerzielle (Oracle, Microsoft) als auch Open-Source basierte Datenbanken (MySQL, PostgreSQL) als Managed Services
von AWS zu beziehen. Es handelt sich bei allen Produkten um relationale Datenbanken, die über einen serverbasierten
Ansatz zur Verfügung gestellt werden.

- **[Amazon DynamoDB](https://aws.amazon.com/de/dynamodb/)**: Hierbei handelt es sich um eine NoSQL-Datenbank bei der
zu einem eindeutigen Schlüssel mehrere Attribute (Spalten) persistiert werden. Typische Anwendungsfälle für DynamoDB
sind hochfrequentierte Webanwendungen oder Spiele, die Antwortzeiten im einstelligen Millisekundenbereich benötigen.
DynamoDB ist eine Implementierung eines serverlosen Datenbank-Service.

- **[Amazon ElastiCache](https://aws.amazon.com/de/elasticache/)**: Die Verwendung von Caches erlaubt es Informationen
direkt aus dem Memory zurückzugeben und nicht diese erst über eine Datenbankabfrage zu erhalten. Über diesen Ansatz
lassen sich Antworten im Mikrosekundenbereich erzielen, und typische Anwendungsfälle sind z.B. das Sitzungs-Management von Online-Shops (Einträge in einem Warenkorb).

- **[Amazon Redshift](https://aws.amazon.com/de/redshift/)**: Eine weitere wichtige Kategorie zum Speichern und Verwalten
von grossen Datenmengen sind **[Data Warehouses (DWH)](https://de.wikipedia.org/wiki/Data_Warehouse)**. Der Fokus dieser
Systeme liegt auf analytische Aspekte und Nutzer von Data Warehouses versuchen neue Erkenntnisse aus einer Vielzahl
von unterschiedlichen Datenquellen zu erhalten. Amazon Redshift ist das schnellste und am häufigsten verwendete Cloud
Data-Warehouse weltweit. 
___
### Anwendung
Der Betrieb unserer Datenbank als Managed Service von AWS macht Sinn, da bereits viele Themen wir z.B. Skalierbarkeit,
Monitoring, Backup & Recovery und Hochverfügbarkeit einfach aktiviert werden können. Benutzer müssen sich nicht wie sonst
um die Installation einer virtuellen Maschine, der Datenbank-Engine oder dem Einspielen von Updates kümmern.

In der Beispielanwendung wird die Ablage der Daten in einer Datenbank vorgenommen. Durch diese Separation
können alle Ebenen der Anwendung (Front- und Backend sowie Datenbank) abhängig von ihrer Auslastung skaliert werden.

#### Erstellen einer Amazon RDS Subnetzgruppe
Eine Subnetzgruppe definiert in welche Subnetzen Amazon RDS eine Datenbank platzieren darf.