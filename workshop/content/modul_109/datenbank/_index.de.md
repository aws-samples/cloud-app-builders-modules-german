+++
title = "Datenbank"
chapter = false
weight = 23
pre = "<b>3. </b>"
+++

### Navigation
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
    - [Erstellen einer Amazon RDS Subnetzgruppe](#erstellen-einer-amazon-rds-subnetzgruppe)
    - [Erstellen einer neuen relationalen Datenbank](#erstellen-einer-neuen-relationalen-datenbank)
    - [Informationen zur Datenbank Instanz](#informationen-zur-datenbank-instanz)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)


{{% include "create_db/db_intro.de.md" %}}

{{% include "create_db/subnet_task.de.md" %}}
{{%expand "Hinweis" %}}
{{% include "create_db/subnet_hint.de.md" %}}
{{% /expand %}}
{{%expand "Lösung" %}}
{{% include "create_db/subnet_solution.de.md" %}}
{{% /expand %}}


{{% include "create_db/create_db_task.de.md" %}}
{{%expand "Hinweis" %}}
{{% include "create_db/create_db_hint.de.md" %}}
{{% /expand %}}

{{%expand "Lösung" %}}
{{% include "create_db/create_db_solution.de.md" %}}
{{% /expand %}}

{{% notice note %}}
Das Setup kann einige Minuten in Anspruch nehmen. Der Status kann in der AWS Console verfolgt werden. Für die Beispielanwendung ist die ausgewählte Datenbank-Instanz vollkommen ausreichend. Wenn sich die Anforderungen an die zur Verfügung stehenden Ressourcen ändern, kann die Instanzgrösse später im Betrieb während eines Maintenance Windows jederzeit geändert werden.
{{% /notice%}}

{{% include "create_db/create_db_information.de.md" %}}

### Zusammenfassung und nächste Schritte
In diesem Kapitel haben wir gesehen, dass es analog zu unterschiedlichen Fahrzeugkategorien (Kombi, Kleinwagen, Cabrio, ...)
unterschiedliche zweckgebundene Datenbanken gibt, die es erlauben für den jeweiligen Anwendungsfall die am besten 
geeignete Datenbank auszuwählen. Der Verwaltungsaufwand für die Nutzer von Cloud-Services unterscheidet sich wesentlich
bei Datenbanken welche serverbasiert oder serverlos angeboten werden.

{{% include "create_db/db_schluss.de.md" %}}
Im nächsten Schritt werden die Container Images für Front- und Backend vorbereitet und in einer Container Registry publiziert.