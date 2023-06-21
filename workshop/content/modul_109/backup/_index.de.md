+++
title = "Backup & Recovery"
chapter = false
weight = 28
pre = "<b>8. </b>"
+++

### Themen
- [Einleitung und technische Konzepte](#einleitung-und-technische-konzepte)
- [Datensicherung bei AWS](#datensicherung-bei-aws)
- [Anwendung](#anwendung)
  - [Datenbank Backup einrichten](#datenbank-backup-einrichten)
  - [Point in time Backup erstellen](#point-in-time-backup-erstellen)
  - [Restore](#restore)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

### Einleitung und technische Konzepte
Ein wichtiges Thema insbesondere, wenn man mit Daten arbeitet, sind **Backups**. Es ist sinnvoll mindestens eine Sicherheitskopie von den Daten zu haben, die wichtig sind, da Systeme nicht 100% verlässlich sind. Beispielsweise, wenn das eigene Handy kaputt geht und du nicht mehr darauf zugreifen kannst, sind alle deine Bilder und Chats weg. Durch ein Backup ist es möglich die Daten wiederherzustellen (**Restore**). Dabei wird der Stand im Backup wieder zur Verfügung gestellt. Natürlich kann es sein, dass dazwischen schon einige Tage oder Wochen vergangen sind, aber zumindest ist noch ein Teil der Daten erhalten. Dieser Zeitraum zwischen zwei Backups nennt sich auch **[Recovery Point Objective](https://de.wikipedia.org/wiki/Disaster_Recovery#Recovery_Point_Objective)** (RPO). Zusätzlich gibt es auch noch die **Recovery Time Objective** (RTO), die beschreibt wie lange ein System ausfallen darf. Zum Beispiel wie lange kommst du ohne dein Handy zu Recht, wenn es kaputt ist? 

### Datensicherung bei AWS
AWS bietet je nach eingesetztem Dienst unterschiedliche Möglichkeiten zur Datensicherung. Bei Amazon RDS können zum 
Beispiel **[Snapshots der Datenbank](https://aws.amazon.com/rds/features/backup/)** erstellt werden. Die Amazon RDS Snapshots sind **[inkrementell](https://docs.aws.amazon.com/de_de/AWSEC2/latest/UserGuide/EBSSnapshots.html)**. Dadurch werden nur die Daten des Volumens gespeichert, die sich seit dem letzten Snapshot geändert haben, wie es auch in der Abbildung zu sehen ist. Die gleichbleibenden Daten werden referenziert und müssen somit nicht doppelt gespeichert werden, wodurch die Speicherkosten reduziert werden. 
Direkt im Amazon RDS Service lässt sich die Datensicherung automatisiert konfigurieren und verwalten. Dies erleichtert Anwendern die 
Sicherung und Wiederherstellung direkt aus der Amazon RDS Service Konsole. Andere Services wie z.B. Amazon EC2 
(virtuelle Maschinen), Amazon Windows FSx for Windows File Server (SMB Shares), Amazon EFS (NFS Shares) bieten ebenfalls die 
Funktion für Backup & Recovery. Um die Verwaltung über mehrere Services hinweg zu vereinfach und zu 
zentralisieren kann **[AWS Backup](https://aws.amazon.com/backup/)** genutzt werden. Dies ermöglicht auf in grossen und 
komplexen Umgebungen eine zentrales, konsistentes Management aller Backups.


![EBS incremental snapshot](/images/ebs_snapshot.png)

___
### Anwendung
In diesem Abschnitt wird am Beispiel von Amazon RDS die Funktionsweise von AWS Backup vorgestellt.

#### Datenbank Backup einrichten

1. Unter **Services** den Dienst **RDS** auswählen.
2. Links im Menü auf **Databases** klicken.
3. Die Datenbank ``workshop-db`` auswählen und auf **Modify** klicken.
4. Im Abschnitt **Additional configuration** die **Backup retention period** auf **1 Day** ändern und unter **Backup window** ein Zeitfenster definieren.
5. Klick auf **Continue** um die Konfiguration zu speichern.
6. In der Übersicht **Apply immediately** auswählen und mit Klick auf **Modify DB Instance** bestätigen.

{{% notice note %}}
Mit diesem Schritt wird nun täglich zur definierten Uhrzeit eine Datensicherung der Datenbank durchgeführt und jeweils 
für 1 Tag aufbewahrt. Da es je nach Zeitfenster etwas dauern kann, bevor das nächste automatische Backup erstellt wird, 
wird im nächsten Schritt ein manuelles Backup erstellt, welches dann für die Wiederherstellung verwendet wird.
{{% /notice%}}

#### Point in time Backup erstellen

1. Zunächst einmal musst du in deiner Todo-Liste ein paar Einträge erstellen. Erinnerst du dich noch wie du deine Todo-Applikation öffnen kannst? Im Abschnitt [Test der Beispielanwendung]({{< ref "/modul_109/todo_app_implementation#test-der-todo-liste" >}} "Test der Beispielanwendung") wurde beschrieben wie du die URL für deine Applikation findest. Schreibe zum Beispiel **5 ToDos** in deine Liste.
2. Danach unter **Services** den Dienst **RDS** auswählen.
3. Links im Menü auf **Databases** klicken.
4. Die Datenbank ``workshop-db`` auswählen und über **Actions** auf **Take snapshot** klicken.
5. Unter **Snapshot name** den Wert ``ondemandbackup`` eingeben.
6. Warte bis der manuelle Snapshot erstellt wurde (die Erstellung des Snapshots kann im Feld **Status** überwacht werden) 
7. **Lösche alle ToDos** aus deiner Liste.

#### Restore
1. Unter **Services** den Dienst **RDS** auswählen.
2. Links im Menü auf **Databases** klicken und danach auf die Datenbank ``workshop-db`` klicken.
3. Im Abschnitt **Maintenance & backup** unter **Snapshots** den ``ondemandbackup`` auswählen und auf **Restore** klicken.
4. Unter **Availability and durability** die Option ``Multi-AZ DB instance`` auswählen.
5. Im Abschnitt **Settings** bei **DB Instance Identifier** den Wert ``workshop-db-restore`` eingeben.
6. Wähle als **VPC security group** ``Workshop-RDS-SG``. Wähle die ``default`` Security group ab.
7. Unter **DB instance class** auf **Burstable classes (includes t classes)** wechseln und dort den Typ ``db.t3.micro`` auswählen.
8. Die restlichen Einstellungen bleiben gleich.
9. Klick auf **Restore DB Instance**. Nun wird eine neue DB Instanz erstellt basierend auf dem Snapshot. Das kann einige Zeit in Anspruch nehmen. 

{{% notice note %}}
Die Wiederherstellung der Datenbank von einem Snapshot hat immer zu Folge, dass eine neue DB Instanz erstellt wird. 
Aus Sicherheitsgründen ist es nicht möglich, [eine bestehende Instanz zu überschreiben](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html). 
Nach dem Restore gibt es verschiedene Möglichkeiten: Entweder wird die wiederhergestellte Datenbank als produktive 
Instanz weiter verwendet und die Umgebungsvariablen in der Task Definition der Backend Container werden angepasst. 
Oder die Daten werden über die DB Engine extrahiert und auf die originale Instanz kopiert (DB Dump & Restore).
{{% /notice%}}

Um zu testen, ob das Wiederherstellen geklappt hat durch den Snapshot, muss nun die neue Datenbank **ondemandbackup** genutzt werden.

1. Kopiere von deiner neuen Datenbank den Endpoint (Endpunkt). Diesen findest du unter **Connectivity & security** in deiner Datenbank.
1. Unter **Services** den Dienst **ECS** auswählen.
1. Wähle bei **Task definitions** ``workshop-backend`` aus.
1. Klicke auf **Create new revision**.
1. Ändere unter **Environmental variables** den Wert für **DB_HOST** zu dem Endpunkt, den du gerade kopiert hast.
1. Klick auf **Create**. Nun ist in der Task Definition festgelegt, dass Amazon ECS den Endpunkt der neuen Datenbank nutzen soll.
1. Wähle bei **Clusters** das ``workshop-cluster`` aus.
1. Unten bei Services wähle **backend-service** aus.
1. Klicke auf **Update**.
1. Unter **Revision** kannst du die aktuellste Version deiner Task Definition auswählen.
1. Alle anderen Einstellungen bleiben gleich und du kannst auf **Update** klicken. Nun sorgt Amazon ECS dafür, dass neue Tasks ausgeführt werden. Zwischenzeitlich kann es davon vier Stück geben: zwei mit der alten Version und zwei mit der neuen.
1. Sobald die neue Datenbank bereit ist und auch die neuen Tasks laufen, kannst du deine ToDo-Applikation aufrufen. Nun sollten deine alten fünf ToDos wieder da sein.


### Zusammenfassung und nächste Schritte
In diesem Kapitel wurde AWS Backup eingeführt, um die Handhabung und das Erstellen von Backups für Datenbanken wie Amazon RDS zu vereinfachen. Danach wurde das Erstellen von einem Snapshot und die Wiederherstellung der Datenbank an einem Praxisbeispiel durchgeführt. Backups helfen die Anwendungen in der Cloud zuverlässiger zu machen und alte Zwischenstände bei Bedarf wieder herzustellen. 


Herzlichen Glückwunsch! Du hast erfolgreich die Todo-App implementiert und deine erste Backup-Strategie angewendet. Im nächsten Kapitel folgt noch die Zusammenfassung des ganzen Moduls.