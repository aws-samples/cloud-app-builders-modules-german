Es gibt nicht eine korrekte Liste an Anforderungen. Anforderungen sind diskutierbar und können sich über die Zeit verändern. Außerdem kann ich ein anderes Verständnis von einer ToDo Anwendung haben und somit zu anderen Anforderungen kommen.

Hier sind einige große Themen, die wir mit dem Betrieb der ToDo-Anwendung in der Cloud erfüllen wollen. Kannst du einiger deiner Anforderungen in den Themen wiederfinden?

### Themen
- Funktionale Anforderungen
  - Webseite bereitstellen
  - Anfragen der Webseite behandeln
  - Daten Persistenz
- Nichtfunktionale Anforderungen
  - Hochverfügbarkeit
  - Beständigkeit
  - Skalierbarkeit
  - Sicherheit

### Funktionale Anforderungen
#### Webseite bereitstellen
Wir haben uns entschieden, die ToDo-Anwendung als Webapplikation zu betreiben. Also muss die Cloudumgebung eine öffentliche, statische Webseite hosten.

#### Anfragen der Webseite behandeln
Du hast in der Einleitung bereits gesehen, dass die Webapplikation Interaktionen vom Nutzer (z.b. Hinzufügen von einem neuen ToDo) an eine Backend-Applikation sendet. Wir benötigen also Server in der Cloud zum Ausführen der Backendlogik, die Anfragen von der Webapplikation verarbeitet.

#### Daten Persistenz
Die Liste mit den ToDo-Elementen soll gespeichert werden und veränderbar sein. Dafür wollen wir eine Datenbank benutzen.

### Nichtfunktionale Anforderungen
#### Hochverfügbarkeit
**[Hochverfügbarkeit](https://de.wikipedia.org/wiki/Hochverf%C3%BCgbarkeit)** (**high availablability**) ist die Fähigkeit eines Systems trotz Ausfall von einzelnen Komponenten immer noch den Betrieb zu gewährleisten. Die wichtigen Funktionen eines Systems dürfen nur in bestimmten Zeiträumen oder nur minimal unterbrochen sein. Um ein System hochverfügbar zu machen, müssen verschiedene Designprinzipien befolgt werden:
-	**[Punkt des Versagens](https://de.wikipedia.org/wiki/Single_Point_of_Failure)**: Der Punkt des Versagens eines Systems (single point of failure) führt dazu, dass das gesamte System nicht mehr funktioniert. Beispielsweise wenn es nur einen Server gibt und dieser nicht mehr funktioniert, so ist die Applikation, die auf diesem läuft auch nicht mehr verfügbar. 
-	**[Redundanz](https://de.wikipedia.org/wiki/Redundanz_(Technik))**: Redundante Komponenten in einem System zu nutzen, hilft mindestens ein Backup zu machen, wenn eine Komponente nicht mehr funktioniert. Am besten wird dafür ein Failover genutzt, um sicherzustellen, dass das System schnell wieder funktioniert und Daten nicht verloren gehen.
-   **Fehlererkennung**: Im Idealfall sind Fehler ersichtlich und Systeme können automatisch auf diese reagieren. Die Überwachung der Systeme ist somit ein wichtiger Bestandteil, um Fehler früh zu erkennen, Reaktionen zu automatisieren und die Systeme im Laufe der Zeit zu verbessern.

#### Beständigkeit
Die **[Beständigkeit](https://www.presidio.com/understanding-scope-durability-of-data-on-aws/)** (**durability**) eines Systems ist die Wahrscheinlichkeit, dass beispielsweise du Daten aus einem Speicherservice abrufen kannst. 99.999999999% (auch bekannt als 11 Neunen) Beständigkeit besagt, dass von 10.000.000 Objekten oder Dateien, die gespeichert werden, ist zu erwarten dass nur eines binnen von 10.000 Jahren wegen Problemen mit dem Speicherservice verloren gehen wird. Somit ist die Wahrscheinlich bei 11 Neuen sehr gering, sodass Services mit einer solchen Beständigkeit verlässlich sind.

#### Skalierbarkeit
**[Skalierbarkeit](https://de.wikipedia.org/wiki/Skalierbarkeit)** (scalability) beschreibt die Fähigkeit eines Systems sich einem höheren Workload anzupassen durch zusätzliche Hardware-Ressourcen. Dadurch ist es möglich sich an stabile Workloads anzupassen. Systeme können horizontal und vertikal skaliert werden. Horizontales skalieren bedeutet, dass extra Ressourcen zum Beispiel Server genutzt werden. Beim vertikalen Skalieren hingegen kommt beispielsweise mehr oder weniger RAM oder CPU Leistung hinzu, wodurch die Kapazität an sich erhöht wird. Insbesondere horizontales Skalieren ist wichtig für hohe Verfügbarkeit, wenn Services nur eine geringe Downtime aufweisen sollen.

Wenn ein System wachsen oder schrumpfen kann je nach Workload, dann wird diese Fähigkeit **[Elastizität](https://www.betriebswirtschaft-lernen.net/erklaerung/cloud-elastizitaet/)** genannt. Beispielsweise können extra Instanzen provisioniert werden in der Cloud, um den erhöhten Kundenverkehr auf einer Webseite verarbeiten zu können. Wenn solche Peak-Events vorbei sind, können die Instanzen wieder deprovisioniert werden, da der Workload nun wieder geringer und normal ist.

#### Sicherheit
Im Kapitel [Shared Responsibility Model]({{< ref "/Einleitung/shared_responsibility" >}} "Shared Responsibility Model") der Einleitung hast du bereits kennengelernt, dass der Cloudanbieter für die Sicherheit der Cloud zuständig ist. Das Shared Responsibility Model sagt zudem, dass du als Betreiber der Anwendung für die Sicherheit der Anwendung in der Cloud zuständig bist. Cloudanbieter stellen Werkzeuge und Funktionen, wie zum Beispiel [Identity and Access Management]({{< ref "/Einleitung/iam" >}} "Identity and Access Management") oder Verschlüsselung, bereit. Diese Werkzeuge helfen dir, die Sicherheit der Anwendung in der Cloud umzusetzen. 
Anforderungen helfen dir herauszufinden, welche der Werkzeuge und Funktionen du für die Sicherheit der Anwendung benötigst. Hier sind einige Fragen, die mit den Anforderungen beantwortet sein sollten:
- **Authentifizierung & Autorisierung**
  - Authentifizieren sich Nutzer mit der Anwendung durch ein Anmeldeverfahren?
  - Gibt es verschiedene Nutzer (Admin, Besucher, ...) mit unterschiedlichen Zugriffsrechten (Autorisierung)?
- **Netzwerksicherheit**
  - Welche Komponenten meiner Applikation müssen vom Internet erreichbar sein (z.B. Frontend Applikation) und welche Komponenten sollten nicht direkt vom Internet erreichbar sein (z.B. Datenbank)?
  - Welche Kontrollen und Blockaden werden zwischen meinem Netzwerk und der Außenwelt benötigt, damit mein Netzwerk sicher ist?
  - Wie wird die Anwendung von bekannten Angriffstaktiken (z.B. [DDoS Angriffen](https://de.wikipedia.org/wiki/Denial_of_Service)) geschützt?
- **Datensicherheit**
  - Welche [Verschlüsselungslösungen]({{< ref "/Einleitung/verschluesslung" >}} "Verschlüsselungslösungen") soll die Anwendung nutzen, damit Daten bei der Übermittlung und beim Speichern nicht lesbar sind oder manipuliert werden können?

- **Operative Sicherheit**
  - Welche Verfahren und Maßnahmen werden eingeleitet, wenn ein Vorfall eingetroffen ist? Wie wird der Vorfall eingedämmt? Wie wird meine Anwendung wiederhergestellt? Wie kann im Nachhinein der Vorfall analysiert werden, damit so etwas nicht erneut eintritt?
  - Welche Mitarbeiter haben Zugriff auf welche Komponenten vom System? Muss ein Frontend Entwickler unbedingt direkt die Datenbank modifizieren können? Nein. Mitarbeiter sollten nur Zugriff auf die Komponenten haben, den sie für ihre Arbeit brauchen und nicht mehr.