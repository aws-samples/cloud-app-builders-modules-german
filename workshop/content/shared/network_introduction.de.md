### Einleitung
Seit Jahrzehnten kommunizieren IT-Systeme durch Netzwerke miteinander. Waren es zu Beginn ausschliesslich physikalische
Geräte wie Switches oder Router, welche über physische Kabel miteinander verbunden wurden, so hat es im letzten Jahrzehnt
einen klaren Trend zu **Software-basierten Netzwerken** gegeben. Heute gelten noch immer viele der damaligen Konzepte und
Ideen, jedoch sind physische Netzwerk-Komponenten virtuellen Software-Lösungen gewichen. Software-basierte Komponenten
lassen sich deutlich kostengünstiger "erzeugen" und betreiben und stellen somit für moderne Cloud-Architekturen 
ein wichtiges Grundelement dar.


### Technische Konzepte
Ein zentraler Einstiegspunkt um IT-Netzwerke zu verstehen ist das **[OSI-Referenzmodell](https://de.wikipedia.org/wiki/OSI-Modell)**. 
Die verschiedenen Ebenen (Layers) des Modells beschreiben Netzwerke von den physischen Verbindungen über das 
**[tcp](https://de.wikipedia.org/wiki/Transmission_Control_Protocol)** Protokoll bis hin zu 
**[https](https://de.wikipedia.org/wiki/Hypertext_Transfer_Protocol_Secure)**. 

Ein bekanntes Verfahren ist es, Netzwerke in unterschiedliche Bereiche (Netzwerke) zu organisieren, um zusammengehörige IT-Komponenten
in gleiche Netzwerke zu platzieren und unterschiedliche IT-Komponenten über verschiedene **Netzwerk-Zonen** voneinander zu trennen.
Unternehmen verwenden diesen Ansatz, um zum Beispiel Proxy-Server oder Loadbalancer von Applikationsservern oder Datenbanken
zu trennen. Jeder dieser Netzwerk-Bereiche verfügt über eine eigene **[Netzmaske](https://de.wikipedia.org/wiki/Netzmaske)** oder 
**[CIDR-Range](https://de.wikipedia.org/wiki/Classless_Inter-Domain_Routing)** welcher definiert, wie viele Netzwerk-Komponenten
innerhalb eines Netzwerk-Bereiches erzeugt werden können und anschliessend eine **[IP-Adresse](https://de.wikipedia.org/wiki/IP-Adresse)** 
erhalten. Zwischen den Netzwerken lässt sich anschliessend mittels **[Router](https://de.wikipedia.org/wiki/Router)** 
definieren, wohin Netzwerk-Pakete zugestellt werden sollen. Möchten Unternehmen zusätzlichen noch den Netzwerkverkehr 
einschränken, so werden hierfür **Netzwerk-Regeln** (oder **[Firewall-Rules](https://de.wikipedia.org/wiki/Firewall)**) definiert.

Ein Netzwerk-Bereich, oder auch **[Subnetz](https://de.wikipedia.org/wiki/Subnetz)** genannt, lässt sich als **öffentliches (public)**
oder **privates (private) Subnetz** erstellen. Der grösste Unterschied zwischen diesen beiden Varianten ist, dass IT-Komponenten innerhalb
eines öffentlichen Subnetzes mit Maschinen ausserhalb dem Unternehmensnetzwerk, also dem Internet kommunizieren können,
wogegen Elemente in einem privaten Subnetz dies generell nicht können. Im oben erwähnten Fall des Load Balancers ist genau
gewollt, dass dieser z.B. Anfragen von beliebigen Clients aus dem Internet entgegennehmen kann, wogegen direkter Zugriff
aus dem Internet auf eine Datenbank mit sensitiven Informationen typischerweise vermieden werden soll. 


### Relevante AWS Services
Innerhalb eines **AWS Accounts** können mehrere **[Amazon Virtual Private Clouds (Amazon VPCs)](https://docs.aws.amazon.com/de_de/vpc/latest/userguide/what-is-amazon-vpc.html)** erstellt werden. Private oder öffentliche Subnetze werden in einem AWS Account immer einem VPC zugeordnet und nutzen Teile der CIDR-Range der VPC, wodurch es möglich ist unterschiedlichste Netzwerk-Architekturen zu realisieren. Während ein AWS Account AWS Services in unterschiedlichen **[AWS Regionen](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/)** nutzen kann, befindet sich eine VPC immer exakt in einer AWS Region. Die folgende Grafik zeigt die wichtigsten Services innerhalb einer VPC: 


![VPC Elemente](/images/Netzwerk_overview.png)
- **Subnetze**: AWS erlaubt die Erstellung von öffentlichen und privaten Subnetzen innerhalb einer VPC. Öffentliche Subnetze können mit dem Internet kommunizieren, da sie eine öffentliche IP oder eine elastische IP haben können. Private Subnetze hingegen können nicht direkt mit dem Internet kommunizieren. Jedoch können die Subnetze untereinander Informationen austauschen, wenn sie in der gleichen VPC sind.
- **Network Access Control List ([NACL](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html))**: 
Hierbei handelt es sich um Regeln, welche den Zugriff auf Subnetze definieren. Eine Regel besteht primär aus einer Quelle, dem genutzten Protokoll und dem Port. Hierdurch wird beschrieben, welcher Netzwerkverkehr akzeptiert und welcher verboten ist. Ein NACL regelt nicht den Netzwerkverkehr innerhalb eines Subnetzes, sondern nur, ob der Netzwerkverkehr in und aus dem Subnetz erlaubt ist. Beide Richtungen, der Netzwerkverkehr zu und von dem Subnetz, müssen jeweils separat beschrieben werden. Standardmässig wird erstmal jeder Netzwerkverkehr erlaubt, der dann mit den Regeln genauer reguliert werden kann.

- **Security Group**: Neben NACLs sind **[Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)** 
eine weitere Möglichkeit, um den Netzwerkverkehr zu steuern. Während NACLS den Zugriff auf Subnetz-Ebene regeln, erlauben Security Groups eine feinere Zugriffskontrolle. Der Zugriff auf einzelne Instanzen oder Gruppen von Instanzen innerhalb eines Subnetzes, 
wie eine EC2-Instanz oder eine RDS-Datenbank, lässt sich mit Security Groups kontrollieren. Neben der Möglichkeit den Zugriff auf bestimmte IP-Ranges inklusive Ports und Protokollen zu limitieren, ist es mit Security Groups ebenfalls möglich als Quelle eine andere
Security Group zu hinterlegen. Dabei kann nur definiert werden, dass Ressourcen erlaubt wird Zugriff zu erhalten. Es können keine Regeln definiert werden, die den Zugriff verbieten. Wenn es keine Regel gibt, um den Zugriff zu gestattet, wird implizit angenommen, dass der Zugriff verboten ist. Über Security Groups kann z.B. festgelegt werden, dass Datenbank-Instanzen nur über interne Webserver aufgerufen werden, wie es in der Grafik oben zu sehen ist. 

- **Internet Gateway**: Die Verbindung zum Internet in einer Amazon VPC kann mithilfe eines 
**[Internet Gateways](https://docs.aws.amazon.com/de_de/vpc/latest/userguide/VPC_Internet_Gateway.html)** realisiert werden. Ein oder mehrere öffentliche Subnetze der VPCs können per Internet Gateway Verbindungen mit dem Internet herstellen.

Damit festgelegt werden kann, welche Pfade Netzwerkpakete nutzen sollen, werden **[Route Tables](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)** definiert. Innerhalb jeder VPC gibt es eine **Default Route Table**, welche immer dann verwendet wird, wenn keine andere Route Table erstellt und dem VPC oder einem der Subnetze zugeordnet wird. Die Einträge in einer Route Table bestehen aus den Spalten Destination und Target. Mittels der Destination wird der gewünschte CIDR-Bereich beschrieben, welcher wiederum zur Target-IP des Netzwerkpakets passen muss. Das Target legt fest, zu welchem Endpunkt / Netzwerk das Paket geroutet werden soll. Typische Werte können hier local oder die ID des Internet Gateways sein, falls das Netzwerkpaket ins Internet geroutet werden soll.

Um Instanzen in einem privaten Subnetz die Kommunikation zum Internet zu ermöglichen, kann man ein **[NAT Gateway](https://docs.aws.amazon.com/de_de/vpc/latest/userguide/vpc-nat-gateway.html)** dafür nutzen.
Ein NAT-Gateway ist ein **Network Address Translation** Service. Der Vorteil dabei ist, dass externe Services jedoch keine Verbindung mit den Instanzen im privaten Subnetz herstellen können. Das NAT-Gateway wird im öffentlichen Subnetz erstellt. Wenn es genutzt wird, dann ersetzt es die Quellen-IP der Instanzen im privaten Subnetz durch seine eigene IP-Adresse, sodass die Quellen-IP der Instanzen privat bleibt. Damit vom privaten Netz zum NAT-Gateway geroutet werden kann, braucht es eine entsprechende Route in der Route Table.

___