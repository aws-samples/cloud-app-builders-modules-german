+++
title = "Netzwerk"
chapter = false
weight = 20
pre = "<b>2. </b>"
+++

### Themen

- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
  - [Erstellen einer neuen VPC](#erstellen-einer-neuen-vpc)
  - [Subnetze definieren](#subnetze-definieren)
  - [Internet Gateway erstellen](#internet-gateway-erstellen)
  - [Routing-Tabelle konfigurieren](#routing-tabelle-konfigurieren)
  - [Security Groups einrichten](#security-groups-einrichten)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

{{% include "network_introduction.de.md" %}}
### Anwendung
Der gesamte praktische Teil dieses Moduls wird in der Region ``us-east-1`` durchgeführt und sollte auch nicht während der Durchführung geändert werden.

#### Erstellen einer neuen VPC
**Aufgabe:**
Erstelle eine eigene VPC ohne Subnetze mit dem Adressbereich ``172.100.0.0/16`` und nutze als Tag ``Name:Workshop-VPC``. Eine VPC ist immer an eine AWS Region gebunden.

{{%expand "Hinweis" %}}
In der **[Dokumentation](https://docs.aws.amazon.com/de_de/vpc/latest/userguide/working-with-vpcs.html#Create-VPC)** sind einzelne Schritte beschrieben wie man eine VPC erstellt.
{{% /expand%}}

{{%expand "Lösung" %}}
1. Unter **Services** den Dienst **VPC** auswählen.
2. Links unter **Virtual private cloud** auf **Your VPCs** klicken.
3. In der Übersicht auf **Create VPC** klicken.
4. Im Abschnitt **VPC Settings** die Auswahl für **Resources to create** auf **VPC only** belassen.
5. Anschliessend unter **Name tag - optional** `Workshop-VPC` eingeben.
6. Als **IPv4 CIDR block** den Addressbereich `172.100.0.0/16` verwenden. Eure Eingabemaske sollte anschliessend **[wie folgt](/images/vpc_creation.PNG)** aussehen.
7. Mit einem Klick auf **Create VPC** die Erstellung abschliessen.
8. In der Übersicht können alle Details des VPC eingesehen werden.
{{% /expand%}}

{{% notice info %}}
Die CIDR Range eines VPCs kann nachträglich **NICHT** geändert werden. Jedoch können zusätzliche CIDR Ranges zu einem 
bestehenden VPC hinzugefügt werden. Wichtig ist auch, dass sich CIDR Ranges nicht überlappen. Denn oftmals müssen Daten 
zwischen VPCs oder mit einem On-Premise Datacenter ausgetauscht werden.
{{% /notice%}}
   
#### Subnetze definieren

Nach dem VPC selbst können individuelle Subnetze angelegt werden. 

**Aufgabe:**
Lege ein neues Subnetz ``Workshop-PublicA`` in deiner gerade erstellten VPC in der Availability Zone ``US East (N. Virginia / us-east-1a)`` an. Das Subnetz sollte den CIDR-Block ``172.100.1.0/24`` nutzen.

**Aufgabe:**
Lege ein weiteres Subnetz ``Workshop-PublicB`` in deiner gerade erstellten VPC in der Availability Zone ``US East (N. Virginia / us-east-1b)`` an. Das Subnetz sollte den CIDR-Block ``172.100.2.0/24`` nutzen.

{{%expand "Hinweis" %}}
In der **[Dokumentation](https://docs.aws.amazon.com/de_de/vpc/latest/userguide/working-with-subnets.html)** sind einzelne Schritte beschrieben wie man ein Subnetz erstellt.
{{% /expand%}}

{{%expand "Lösung" %}}
1. Unter **Services** den Dienst **VPC** auswählen.
2. Links unter **Virtual private cloud** auf **Subnets** klicken. In der Übersicht sind alle bestehenden Subnetze mit ihren 
Details aufgelistet (z.B. zugehöriges VPC, CIDR Range, freie IP Adressen etc.). Als Nächstes müssen im neu erstellen VPC Subnetze angelegt werden.
3. In der Übersicht oben rechts auf **Create Subnet** klicken.
4. Im Dropdown unter **VPC ID** das `Workshop-VPC` auswählen.
5. Unter **Subnet settings** folgende Informationen eingeben:
   1. Subnet name: `Workshop-PublicA`
   2. Availability Zone: `US East (N. Virginia / us-east-1a)`
   3. IPv4 CIDR block: `172.100.1.0/24`
6. Darunter auf **Add new subnet** klicken, um ein weiteres Subnetz hinzuzufügen und folgende Daten eingeben:
   1. Subnet name: `Workshop-PublicB`
   2. Availability Zone: `US East (N. Virginia / us-east-1b)`
   3. IPv4 CIDR block: `172.100.2.0/24`. Eure Eingabemaske sollte anschliessend **[wie folgt](/images/subnet_creation.png)** aussehen.
7. Mit einem Klick auf **Create subnet** die Erstellung abschliessen.
{{% /expand%}}


Wenn in der Übersicht unter Subnets ein gerade erstelltes Subnetz per Checkbox ausgewählt wird können die Details angezeigt werden 
(z.B. Subnetz ID, VPC, AZ, Route tables etc.)
{{% notice info %}}
Die IP Adressen eines Subnetzes müssen aus dem zuvor definierten VPC CIDR Range stammen. Ein Subnetz ist immer einer einzigen 
Availability Zone (AZ) zugeordnet. Um **hochverfügbare Architekturen** zu realisieren werden also mehrere Subnets in unterschiedlichen AZ's benötigt. Falls in einer AZ ein Problem auftritt und die Container in dieser nicht genutzt werden können, so ist die andere AZ für die Anwendung immer noch verfügbar.
{{% /notice%}}

#### Internet Gateway erstellen
Um eine Kommunikation zum Internet zu ermöglichen und um Ressourcen aus dem Internet zugänglich zu machen, muss ein Internet Gateway (IGW) erstellt werden:

**Aufgabe:**
Erstelle nun ein Internet Gateway mit dem Namen ``Workshop-IGW``. Das neue Internet Gateway ist im Zustand *detached*. Um das zu ändern, musst du es mit deiner VPC *Workshop-VPC* verbinden.

{{%expand "Hinweis" %}}
In der **[Dokumentation](https://docs.aws.amazon.com/de_de/vpc/latest/userguide/VPC_Internet_Gateway.html)** sind einzelne Schritte beschrieben wie man ein Internet Gateway erstellt und mit seiner VPC verbindet.
{{% /expand%}}

{{%expand "Lösung" %}}
1. Unter **Services** den Dienst **VPC** auswählen.
2. Links unter **Virtual private cloud** auf **Internet gateways** klicken. Bereits bestehende Internet Gateways werden in der Übersicht angezeigt.
3. Klick auf **Create internet gateway** um ein neues IGW zu erstellen.
4. Unter **Name tag** `Workshop-IGW` eingeben.
5. Klick auf **Create internet gateway**.
6. Auf der nächsten Maske muss nun durch einen Klick auf **Actions** und **Attach to VPC**  das IGW nun dem VPC zugewiesen werden.
7. Unter **Available VPCs** das `Workshop-VPC` auswählen.
8. Mit einem Klick auf **Attach internet gateway** den Vorgang abschliessen.
{{% /expand%}}

#### Routing-Tabelle konfigurieren
Eine Routing-Tabelle enthält eine Reihe von Regeln (Routes) die festlegen, wohin der Netzwerkverkehr aus einem VPC weitergeleitet wird. 
Pro Route wird der Ziel-IP Adressbereich sowie das Gateway oder die Netzwerkschnittstelle angegeben, an die der Netzwerkverkehr geschickt wird. 
Dabei kann eine Routing-Tabelle einem Subnetz explizit zugeordnet werden. Andernfalls wird das Subnetz implizit der Default Routing-Tabelle des 
VPCs zugeordnet, die bei der Erstellung des VPCs automatisch erzeugt wird.

Es ist eine Good Practice, eine neue Routing-Tabelle mit den entsprechenden Regeln zu erstellen.

1. Unter **Services** den Dienst **VPC** auswählen.
2. Links unter **Virtual private cloud** auf **Route tables** klicken. Bereits bestehende Routing-Tabellen werden in der Übersicht angezeigt.
3. Klick auf **Create route table** um eine neue Routing-Tabelle zu erstellen.
4. Unter **Name - optional** `Workshop-Public` eingeben.
5. Unter **VPC** im Dropdown das `Workshop-VPC` auswählen.
6. Klick auf **Create route table**.

##### Zuweisung der Subnetze
**Aufgabe:**
Weise nun die beiden Subnetze ``Workshop-PublicA`` und ``Workshop-PublicB`` der gerade erstellten Routing-Tabelle zu.

{{%expand "Hinweis" %}}
In der **[Dokumentation](https://docs.aws.amazon.com/de_de/vpc/latest/userguide/WorkWithRouteTables.html#SubnetRouteTables)** sind einzelne Schritte beschrieben wie man seine Subnetze mit der Routing-Tabelle verbindet.
{{% /expand%}}

{{%expand "Lösung" %}}
1. Klick auf den Tab **Subnet associations**.
2. Im Abschnitt **Explicit subnet associations** auf **[Edit subnet associations klicken](/images/routetable_subnet_association.PNG)**.
3. Beide verfügbaren Subnetze `Workshop-PublicA` und `Workshop-PublicB` auswählen.
4. Klick auf **Save associations**.
5. Nochmals auf **Subnet associations** klicken und kontrollieren, ob die beiden Subnetze nun im Abschnitt **Explicit subnet associations** angezeigt werden.
{{% /expand%}}


##### Definition der Route Einträge
Nun muss die Regel (Route) angelegt werden, damit der ein- und ausgehende Netzwerkverkehr über das Internet Gateway geschickt wird.

**Aufgabe:**
Lege nun eine Regel (Route) an mit der Destination ``0.0.0.0/0`` (das Internet) und mit dem Ziel (target) Internet Gateway ``Workshop-IGW``. 

{{%expand "Lösung" %}}
1. Klick auf den Abschnitt **Routes**.
2. Die bestehende Route mit Destination `172.100.0.0/16` und dem Ziel `local` ermöglicht bereits die Kommunikation innerhalb des VPCs (über alle Subnetze hinweg).
3. Klick auf **Edit routes**.
4. Klick auf **Add route**.
5. Unter **Destination** nun `0.0.0.0/0` angeben.
6. Als **Target** wird das Internet Gateway ausgewählt.
7. Konfiguration mit **Save changes** speichern.
{{% /expand%}}

Die Routing-Tabelle enthält nun zwei Regeln. Damit ist die Konfiguration des Routings abgeschlossen.

#### Security Groups einrichten
Eine Sicherheitsgruppe dient als virtuelle Firewall für Ressourcen und somit der Steuerung von ein- und ausgehendem Datenverkehr. 
Sicherheitsgruppen wirken auf der Instanz-Ebene und nicht auf der Subnetzebene. Daher kann jede Instanz in einem Subnetz eines VPCs einer anderen Reihe von Sicherheitsgruppen zugeordnet werden. Im letzten Schritt müssen also die Firewall Regeln (Security Groups) konfiguriert werden, damit Ressourcen später auch tatsächlich erreicht werden können. Für die Beispielanwendung werden drei Security Groups benötigt. Eine Security Group regelt den Zugriff aus dem Internet auf den Load Balancer. Die zweite Security Group regelt den Zugriff vom Load Balancer auf die Container Instanzen und die Dritte den Zugriff von Container Instanzen auf die Datenbank.

##### Zugriff aus dem Internet
Anbei die Konfiguration für die erste Security Group für den Zugriff aus dem Internet:
1. Unter **Services** den Dienst **VPC** auswählen.
2. Links unter **Security** auf **Security groups** klicken. Bereits bestehende Security Groups werden in der Übersicht angezeigt.
3. Auf den Button **Create security group** klicken.
4. Unter **Security group name** und **Description** `Workshop-ALB-SG` eingeben. ALB steht hier für 
**[Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)**.
5. Im Dropdown unter **VPC** das `Workshop-VPC` auswählen.
6. Im Abschnitt **Inbound rules** auf **Add rule** klicken.
7. Als **Type** das Protokoll **HTTP** auswählen.
8. Unter **Source** den Eintrag **Anywhere-IPv4** auswählen.
9. Im Feld **Description** `Allow HTTP from anywhere` eintragen. Eure Eingabemaske sollte anschliessend **[wie folgt](/images/sg_alb_creation.PNG)** aussehen.
10. Mit dem Klick auf **Create security group** die Erstellung abschliessen.
11. In der Übersicht können die Einstellungen nochmals überprüft werden.

##### Zugriff auf den Backend Container
Der Zugriff auf den Backend Container vom Load Balancer kann durch eine zweite Security Group erteilt werden.

**Aufgabe:**
Erstelle eine neue Security Group ``Workshop-ECS-Backend-SG`` für deine VPC Workshop-VPC. Füge eine Inboud rule hinzu, die Zugriff durch das Protokoll ``Custom TCP`` auf den ``Port 5000`` erlaubt. Als Quelle soll die Security Group des Load Balancers ``Workshop-ALB-SG`` genutzt werden.

{{%expand "Lösung" %}}
1. Links unter **SECURITY** auf **Security groups** klicken. Bereits bestehende Security Groups werden in der Übersicht angezeigt.
2. Auf den Button **Create security group** klicken.
3. Unter **Security group name** und **Description** `Workshop-ECS-Backend-SG` eingeben. ECS steht hier für 
**[Elastic Container Service](https://aws.amazon.com/de/ecs/)**.
4. Im Dropdown unter **VPC** das `Workshop-VPC` auswählen.
5. Im Abschnitt **Inbound rules** auf **Add rule** klicken.
6. Bei **Type** das Protokoll auf **Custom TCP** belassen.
7. Als **Port range** den Port `5000` angeben.
8. Unter **Source** im Suchfenster nun die Load Balancer Security Group `Workshop-ALB-SG` auswählen.
9. Im Feld **Description** `Allow access from ALB` eintragen.
10. Mit dem Klick auf **Create security group** die Erstellung abschliessen.
11. In der Übersicht können die Einstellungen nochmals überprüft werden.
{{% /expand%}}

##### Zugriff auf die Datenbank
Der Zugriff der Backend Container Instanzen auf die Datenbank kann durch eine dritte Security Group erteilt werden.

**Aufgabe:**
Erstelle eine neue Security Group ``Workshop-RDS-SG`` für deine VPC Workshop-VPC. Füge eine ``Inboud rule`` hinzu, die Zugriff durch das Protokoll ``MYSQL/Aurora`` erlaubt. Als Quelle soll die Security Group des Backend Containers ``Workshop-ECS-Backend-SG`` genutzt werden.

{{%expand "Lösung" %}}
1. Links unter **SECURITY** auf **Security groups** klicken. Bereits bestehende Security Groups werden in der Übersicht angezeigt.
2. Auf den Button **Create security group** klicken.
3. Unter **Security group name** und **Description** `Workshop-RDS-SG` eingeben. RDS steht hier für 
**[Relational Database Service](https://aws.amazon.com/de/rds/)**.
4. Im Dropdown unter **VPC** das `Workshop-VPC` auswählen.
5. Im Abschnitt **Inbound rules** auf **Add rule** klicken.
6. Als **Type** das Protokoll **MYSQL/Aurora** auswählen.
7. Unter **Source** im Suchfenster nun die Backend Container Security Group `Workshop-ECS-Backend-SG` auswählen.
8. Im Feld **Description** `Allow DB Access from Container Instances` eintragen.
9. Mit dem Klick auf **Create security group** die Erstellung abschliessen.
10. In der Übersicht können die Einstellungen nochmals überprüft werden.
{{% /expand%}}


{{% notice info %}}
Durch das Referenzieren der Security Groups untereinander wird einerseits sichergestellt, dass **nur** die Ressourcen, denen die entsprechenden Source Security Group zugewiesen ist auf eine weitere Ressource zugreifen kann. 
Anderseits ist somit aber auch die **Flexibilität** gewährleistet, dass z.B. bei der Skalierung der Container Instanzen 
(bedeutet mehrere IP's im VPC) auch alle diese Instanzen über die Security Group Zuordnung vom Load Balancer erreicht 
oder auf die Datenbank zugreifen können. Man nennt das Referenzieren von Security Groups auch **Security Group Chaining**.
{{% /notice%}}


### Zusammenfassung und nächste Schritte 

Mit dem Abschluss dieses Kapitels sind nun im Bereich Netzwerk und Firewall alle Voraussetzungen erfüllt, dass die 
Ressourcen der Beispielanwendung sicher miteinander kommunizieren können. Im nächsten Schritt geht es um die 
Bereitstellung der Datenbank, um die ToDos der Beispielanwendungen zentral speichern zu können.