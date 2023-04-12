+++
title = "Shared Responsibility Model"
chapter = false
weight = 20
pre = "<b>2. </b>"
+++

### Das Modell der geteilten Verantwortung
Betreiben Unternehmen selber ein oder mehrere Datencenter, so sind sie nach dem Aufbau des Datencenters für alle Aspekte
des Betriebs verantwortlich. Die Bandbreite an Verantwortlichkeiten ist hierbei sehr gross und reicht von Gebäudearbeiten,
über die physische Zugriffskontrolle (Welche Mitarbeiter dürfen in das Datencenter rein?), der Inbetriebnahme neuer Server 
bis hin zum Betrieb von IT-Anwendungen. Unternehmen haben sich in den letzten Jahren die Frage gestellt, inwieweit diese
aufgeführten Tätigkeiten spezifisch für ihre Branche sind und einen Mehrwert liefern, wenn sie durch eigene Mitarbeiter
des Unternehmens ausgeführt werden. In vielen Geschäftsfeldern ist es so, dass sich Unternehmen nicht aufgrund ihrer
Infrastruktur in ihren Rechenzentren unterscheiden, sondern darin wie schnell sie in der Lage sind auf neue Marktgegebenheiten
zu reagieren. Der Begriff der **Agilität** wird hier auch sehr gerne verwendet.

Nutzen Unternehmen Cloud-Dienste so sind diese nicht mehr für alle Aspekte eines Datencenter verantwortlich, da gewisse 
Bereiche vom Cloud-Dienstleister, auch **Cloud Service Provider (CSP)**, abgedeckt werden. Die Trennung dieser 
Verantwortlichkeiten spiegelt sich im Modell der geteilten Verantwortung, oder auch Shared Responsibility Model, wider.
![Shared Responsibility Model](/images/Shared_Responsibility_Model.jpg)
Wie auf der Abbildung zu erkennen ist, ist der CSP hier für den unteren Teil verantwortlich. Dieser Teil beinhaltet Themen wie 
die physische Gebäudesicherheit oder auch alles was mit Hardware zu tun hat. Die Nutzer von Cloud-Services sind dagegen
für den oberen Teil verantwortlich und müssen sich um Themen wie Verschlüsselung von Daten oder die Aufbewahrung von
ihren Endkunden-Daten kümmern.

{{% notice info %}}
Das Shared Responsibility Model ist ein guter Startpunkt um Diskussionen bzgl. Verantwortlichkeiten zu führen. Wichtig zu
verstehen ist hierbei jedoch, dass sich der aktuelle Schnitt der Verantwortlichkeiten je nach gewählten Services deutlich
unterscheiden kann. Ein gutes Beispiel hierfür sind die beiden Services **[Amazon Elastic Compute Cloud (Amazon EC2)](https://aws.amazon.com/de/ec2/)** 
und **[AWS Lambda](https://aws.amazon.com/de/lambda/)**. Beide sind generell sogenannte Compute-Services und erlauben es Informationen
zu verarbeiten. Eine Amazon EC2-Instanz kann mit einer virtuellen Maschine verglichen werden und diese wird von AWS bereitgestellt.
Nutzer des Amazon EC2-Services sind dann in der Verantwortung das Betriebssystem der Amazon EC2-Instanz regelmässigen zu aktualisieren.
Auf der anderen Seite erlaubt Lambda die Ausführung einer bestimmten Funktion und gibt Nutzern des Services gar nicht erst
die Möglichkeit auf Teile des unterliegenden Betriebssystems zuzugreifen, da dieses hier in der Verantwortung von AWS ist. 
Der positive Aspekt für Nutzer von Lambda ist somit, dass sie sich nur auf das Schreiben der entsprechenden Funktion
fokussieren können und keinen weiteren Verwaltungsaufwand haben um z.B. ein Betriebssystem aktuell zu halten.
{{% /notice%}}