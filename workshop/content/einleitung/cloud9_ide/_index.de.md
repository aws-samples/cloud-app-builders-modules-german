+++
title = "AWS Cloud9 IDE"
chapter = false
weight = 60
pre = "<b>6. </b>"
+++

### Einführung in AWS Cloud9

AWS Cloud9 ist eine Cloud-basierte integrierte Entwicklungsumgebung (Integrated Development Environment, IDE).
Sie ermöglicht das Programmieren (Code-Editor), die Ausführung (Terminal) und das Debugging (Debugger) in 
einer Web-basierte Umgebung direkt im Browser. Die wichtigsten Tools (z.B. AWS CLI, Docker, AWS SDK) für die 
gängigsten Programmiersprachen wie JavaScript, Python oder PHP sind bereits installiert. Das ermöglicht einen 
schnellen Einstieg und Start in neue Entwicklungsprojekte.

Im Rahmen der beiden ÜK Module wird AWS Cloud9 dazu verwendet, um die Arbeit für die Übungen zu erleichtern, 
da alle benötigten Tools bereits vorhanden sind und nicht individuell auf den eigenen Geräten aufgesetzt werden müssen.

### Erstellen einer AWS Cloud9 Umgebung
Das Erstellen einer AWS Cloud9 Instanz ist sehr einfach. Voraussetzung ist der Zugriff auf die AWS Console.

1. Anmeldung in der AWS Console.
2. Unter **Services** den Dienst **Cloud9** auswählen.
3. Klick auf **Create environment** startet die Erstellung einer neuen Umgebung.
4. Als Name für die Umgebung `ÜK Umgebung` eingeben.
5. Die vorgegebenen Werte beibehalten und unter Connection **Secure Shell (SSH)** auswählen.
6. Klick auf **Create**, um die Erstellung zu starten.

{{% notice note %}}
In der Standardeinstellung wird die AWS Cloud9 Instanz automatisch nach 30 Minuten gestoppt, um Kosten zu sparen. 
Bei einem Login nach dieser Zeit kann der automatische Start eine kurze Zeit dauern.
{{% /notice%}}
### Navigation in AWS Cloud9

Die Oberfläche der AWS Cloud9 IDE ist in mehrere Bereiche aufgeteilt.

![Cloud9 Hauptansicht](/images/cloud9_main_window.png)

1. Navigationsleiste - Hierüber können unterschiedliche Funktionen und Konfigurationen erreicht werden.
2. Dateibrowser - Verwaltung von Dateien und Ordner. Auch ein Up- und Download von Dateien ist möglich.
3. Editor - Bearbeitung von Dateien, die z.B. über den Dateibrowser geöffnet wurden.
4. Terminal - Eine Bash Shell, um CLI Befehle auszuführen.

Zurück auf die AWS Console gelangt man über die Navigationsleiste **AWS Cloud9** und **Go To Your Dashboard**.

 ![Cloud9 Hauptansicht](/images/cloud9_back_to_console.png)

### Weiterführende Informationen / Dokumentation
* [Was ist AWS Cloud9?](https://docs.aws.amazon.com/de_de/cloud9/latest/user-guide/welcome.html)
* [AWS Cloud9 Funktionen](https://aws.amazon.com/de/cloud9/details/)
* [AWS Cloud9 FAQ](https://aws.amazon.com/de/cloud9/faqs/)