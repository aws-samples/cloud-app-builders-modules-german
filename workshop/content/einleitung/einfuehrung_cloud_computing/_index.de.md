+++
title = "Einführung Cloud Computing"
chapter = false
weight = 10
pre = "<b>1. </b>"
+++

Diese Seite beinhaltet Informationen, die in beiden ÜK Modulen relevant sind und einen Einstieg in das Thema "Cloud Computing" ermöglichen sollen.

### Was ist "Cloud Computing?"
Es gibt unterschiedliche Definitionen des Begriffs "Cloud Computing". Das National Institure of Standards and Technnology (NIST) hat 
im September 2011 folgende **[Definition](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf)** 
für Cloud Computing veröffentlicht:

>Cloud computing is a model for enabling ubiquitous, convenient, **on-demand** network access to a **shared**
pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that
can be **rapidly provisioned and released** with **minimal management effort** or service provider interaction.
This cloud model is composed of five essential characteristics, three service models, and four deployment
models.


Amazon Web Services (AWS) **[definiert](https://aws.amazon.com/de/what-is-cloud-computing/)** "Cloud Computing" wie folgt:

>"Cloud Computing" ist die ***bedarfsabhängige Bereitstellung von IT-Ressourcen über das Internet zu nutzungsabhängigen Preisen***. 
Statt physische Rechenzentren und Server zu erwerben, zu besitzen und zu unterhalten, können Sie über einen Cloud-Anbieter 
wie Amazon Web Services (AWS) nach Bedarf auf Technologieservices wie beispielsweise Rechenleistung, Speicher und Datenbanken zugreifen.

"Cloud Computing" bietet im Vergleich zu klassischen Rechenzentren diverse Vorteile:
* **Agilität**: Der Kauf und die Inbetriebnahme von IT-Infrastruktur wie Servern kann ein langwieriger Prozess sein 
der schnell mehrere Wochen oder Monate dauern kann. Gleichzeitig ist es schwierig im Vorfeld zu bestimmen wie viel Hardware
benötigt wird, da häufig unklar ist wie viele Endbenutzer nachher die Applikation auch verwenden werden. Für Kunden von Cloud-Anbietern
wie AWS wird dieser zeitintensive Prozess stark vereinfacht. Server können innerhalb von Minuten genutzt werden und ebenfalls
wieder freigegeben werden, falls dies nicht mehr benötigt werden. Ein Ausprobieren von neuen Geschäftsideen
lässt sich über eine Cloud-basierte Infrastruktur ebenfalls deutlich besser realisieren, da vorab keine grössere Investitionen
in Infrastruktur notwendig sind.

* **Elastizität**: Die Auslastung von Anwendungen ist häufig sehr unterschiedlich und kann sich im Verlauf eines Tages oder
ganzen Jahres stark unterscheiden. Ein sehr bekanntes Beispiel hierfür sind Black Friday Verkaufstage, bei denen an bestimmten
Tagen im Jahr deutlich mehr Anfragen von der IT-Infrastruktur bewältigt werden müssen. In klassischen Rechenzentren sind 
Anwendungen in der Regel für eine gewisse Last ausgelegt, was dazuführen kann, dass diese entweder einen Grossteil im
Jahr ungenutzt sind oder aber für Lastspitzen wie an einem Black Friday nicht über ausreichend zugewiesen Hardware
verfügen und somit nicht mehr korrekt funktionieren. Cloud-Anbieter wie AWS verfügen über einen sehr grossen Pool an
IT-Kapazität und erlauben es über entsprechende Mechanismen IT-Kapazität dynamisch, aufgrund der effektiven
Last, hoch- oder runterzufahren. Hierdurch wird nicht nur sichergestellt, dass die Anwendungen ausreichend provisioniert sind,
sondern es wird ebenfalls vermieden, dass die Anwendungen zu viele genutzte Resourcen haben.

* **Kosteneinsparungen**: Die beiden gerade erklärten Vorteile Agilität & Elastizität wirken sich auch 
auf die Kosten der IT-Lösungen aus, da z.B. weniger Hardware benötigt wird als bei einer konstanten Überprovisionierung. 
Daneben verbessert sich jedoch auch das unternehmerische Risiko bei der Nutzung von Cloud-Diensten. Grosse Investitionen
müssen nicht mehr zu Beginn eines Vorhabens getätigt werden um z.B. neue Server zu kaufen. Nutzen Unternehmen Cloud-Services
so bezahlen sie nur für die genutzten Cloud-Services. Werden Anwendungen nur eingeschränkt genutzt, so sind entsprechend 
auch die Kosten geringer. Mit einer stärkeren Nutzung steigen zwar die Kosten für die Cloud-Services, aber gleichzeitig 
kann über die verstärkte Nutzung der Anwendungen auch ein höherer Geschäftsnutzen realisiert werden.

* **Sicherheit**: Die Anzahl von Cyber-Angriffen hat in der Vergangenheit stetig zugenommen und der Schutz von 
IT-Anwendungen erfordert eine kontinuierliche Investition in unterschiedliche Schutzmechanismen. Eine weit verbreitete
Attacke ist hierbei ein Distributed Denial-of-Service (**[DDoS](https://de.wikipedia.org/wiki/Denial_of_Service)**) Angriff, 
bei welchem versucht wird Webseiten durch eine Flut an Web-Requests zu überlasten. Klassische Rechenzentren benötigten
entweder eine einmalige und wiederkehrende signifikante Investition in entsprechende Schutzmechanismen oder sind andernfalls
nicht in der Lage entsprechende Cyber-Attacken abzuwehren. Für AWS ist Sicherheit die oberste Priorität und deswegen gibt
es eine grosse Palette an unterschiedlichen Security-Services, welche entweder bereits automatisch aktiv sind oder innerhalb
weniger Minuten aktiviert werden können. Der Vorteil für Kunden von Cloud-Services wie AWS ist, dass diese ohne weitere
Vorab-Investitionen von den gleichen IT-Security-Services profitieren können wie dies z.B. auch eine CIA oder grosse
Finanz-Institute machen.

* **Weltweite Bereitstellung in wenigen Minuten**: Traditionell befinden sich Rechenzentren eines Unternehmens im Land,
in welchem das Unternehmen tätig ist. Möchte ein Unternehmen später auch in andere Länder expandieren, so kann es je 
nach Branche und Land vorkommen, dass ebenfalls mindestens eins oder mehrere Rechenzentren in dem neuen Land eröffnet werden
müssen. Gründe hierfür können sowohl technische Aspekte sein, wie ein zu hohe 
**[Netzwerk-Latenz](https://de.wikipedia.org/wiki/Verz%C3%B6gerung_(Telekommunikation))**, oder auch regulatorische Aspekte,
wie dass die Daten in dem Land bleiben müssen, in welchem sie erstellt worden sind. Bei Cloud-Anbietern wie AWS ist jede
Region (siehe **[AWS Global Infrastructure](#aws-global-infrastructure)**) gleich aufgebaut und hierdurch lassen sich deutlich einfacher IT-Anwendungen auch
in andere Länder oder geografische Regionen betreiben.

{{% notice info %}}
Einige der oben erwähnten Vorteile ergeben sich nicht automatisch, nur da ein Kunde beginnt Cloud-Services zu nutzen.
Viel mehr ist es so, dass die Art und Weise wie Kunden Cloud-Services nutzen einen grossen Einfluss auf die potenziellen 
Vorteile haben. Beispielsweise schaltet man zu Hause oder im Büro das Licht aus, um Energie und Kosten zu sparen. 
Dies lässt sich auch auf viele Cloud-Services anwenden, die manuell oder automatisch ein und ausgeschaltet werden können, 
um die Services nur dann zu nutzen, wenn man sie auch wirklich braucht.
{{% /notice%}}

### Wer ist Amazon Web Services (AWS)?
[Amazon Web Services (AWS)](https://aws.amazon.com/de/what-is-aws/?nc1=f_cc) ist ein führender Anbieter bei Cloud Computing. 
Mit mehr als 200 Services, die umfangreiche Funktionen bieten und in global verteilten Rechenzentren bereitgestellt werden, 
ist AWS die weltweit umfassendste und am häufigsten genutzte Cloud-Plattform. Millionen von Kunden – darunter einige der am 
schnellsten wachsenden Start-up-Unternehmen und der größten Konzerne sowie wichtige Behörden – vertrauen auf AWS, 
wenn es darum geht, agiler zu werden, Kosten zu senken und Innovationen schneller zu realisieren.

Um einen schnellen Einstieg in das Thema "Cloud Computing" mit AWS zu finden, gibt es bereits viele 
[Tutorials und Schritt-für-Schritt Erklärungen](https://aws.amazon.com/de/getting-started/).

### AWS Global Infrastructure
Eine Frage, die sich bei Cloud Computing schnell stellt, ist wo die Cloud sich eigentlich befindet. Teilweise werden hier
von den Cloud-Anbietern die gleichen Namen verwendet, aber es verbergen sich häufig unterschiedliche Interpretationen dort
hinter und somit lohnt es sich sehr genau hinzuschauen was die jeweiligen Cloud-Anbieter hinter den Begriffen verstehen.
AWS hat 2006 als erster grosser Anbieter mit Cloud Computing begonnen und kennt folgende Konzepte:

- **Regionen (Regions)**: AWS verfügte im September 2022 über 27 geografische Regionen. Die Anzahl wächst kontinuierlich 
mit der Inbetriebnahme weiterer [AWS Regionen](https://aws.amazon.com/de/about-aws/global-infrastructure/). Eine Region befindet sich in einem Land und besteht mindestens aus drei Verfügbarkeitszonen. 

- **Verfügbarkeitszonen (Availability Zones)**: Eine Availability Zone (AZ) ist ein oder mehrere diskrete Rechenzentren 
mit redundanter Stromversorgung, Vernetzung und Konnektivität in einer AWS Region. Mithilfe dieser Availability Zones (AZs) 
können Kunden Produktionsanwendungen und Datenbanken betreiben, die verfügbarer, fehlertoleranter und skalierbarer sind,
als dies von einem einzigen Rechenzentrum aus möglich wäre. Alle AZs in einer AWS-Region sind mit einem Netzwerk mit 
hoher Bandbreite und niedriger Latenz über eine vollständig redundante, dedizierte Metro-Glasfaser-Leitung miteinander 
verbunden, die einen hohen Durchsatz und eine niedrige Latenz zwischen den AZ ermöglicht. Der gesamte Datenverkehr 
zwischen AZs wird verschlüsselt. Die Netzwerkleistung ist ausreichend, um eine synchrone Replikation zwischen AZs zu erreichen.
Die AZs einer Region sind physisch durch eine Entfernung von maximal 100 km voneinander getrennt.

Anbei noch weiterführende Links zu dem Thema:
* [AWS Global Infrastructure](https://aws.amazon.com/de/about-aws/global-infrastructure/)
* [Regionen und Availability Zones](https://aws.amazon.com/de/about-aws/global-infrastructure/regions_az/)
