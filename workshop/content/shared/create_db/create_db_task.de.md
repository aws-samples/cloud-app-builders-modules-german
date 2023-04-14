#### Erstellen einer neuen relationalen Datenbank
**Aufgabe:**
Erstelle eine eigene Amazon RDS Datenbank mit dem Namen ``workshop-db``. Die Datenbank soll als Datenbankengine ``MySQL 8.0.28`` benutzen. 

Da diese Applikation nicht produktionsfähig sein muss kannst du Kosten sparen indem du die Datenbank als Dev/Test Datenbank erstellst. Damit wir später ein Failover testen können, nutze die ``Multi-AZ DB instance``. Wähle den burstable Typ ``db.t3.micro`` aus und deaktiviere storage autoscaling.

Die Datenbank soll in der zuvor erstellten Subnetzgruppe mit dem Namen ``workshop-db-subnet-group`` platziert werden. Für die Security Gruppe soll ``Workshop-RDS-SG`` ausgewählt werden. Diese Security Gruppe erlaubt nur Netzwerkverbindungen von den Servern die die Applikation ausführen.
Außer­dem musst du sicherstellen, dass sich die Applikation mit dem Master username``clusteradmin`` und dem Master password ``todopassword`` bei der Datenbank authentifizieren/anmelden kann.

{{% notice note %}}
Aus Sicherheitsgründen sollten Passwörter selbstverständlich niemals in einer solchen Form dokumentiert werden! Obwohl die Zugangsdaten hier im Klartext dokumentiert sind, wird später der Zugriff auf die Datenbank nur von den Container Instanzen her möglich sein. Zudem wird die Datenbank NICHT über das Internet erreichbar sein. Anstatt nun den Benutzernamen sowie das Passwort zu notieren könnte diese z.B. in [AWS Secrets Manager](https://aws.amazon.com/de/secrets-manager/) abgelegt werden.
{{% /notice%}}

Finde die zwei letzten Einstellungen, definiere den initialen Datenbanknamen als ``todo`` und schalte automatische Backups aus.

{{% notice note %}}
Kannst du die Einstellung für Verschlüsselung finden?
Wie du siehst, ist Verschlüsselung automatisch für Amazon RDS angeschaltet. Amazon RDS benutzt die im Kapitel zur [Verschlüsselung]({{< ref "/Einleitung/verschluesslung" >}} "Verschlüsselung") server-side encryption Methode zur Verschlüsselung der Daten in Rest. Sollte ein Angreifer die Datenbank hacken, kann dieser nicht die Daten ohne den Schlüssel lesen. Somit hilft die Amazon RDS Voreinstellung das Best Practice Verschlüsselung zu nutzen. Diese Einstellung sollte also unbedingt angeschaltet bleiben.
{{% /notice%}}

Bevor du auf **Create database** klickst solltest du deine Konfiguration mit den folgenden Screenshots vergleichen: **[screenshot 1](/images/db_creation_1.png)**, **[screenshot 2](/images/db_creation_2.png)**, und **[screenshot 3](/images/db_creation_3.png)**. Die Datenbank hat viele Einstellungen und manche Einstellungen sind nach der Provisierung fest, sodass diese korrekt sein sollten, damit die ToDo-App später funktioniert.