## ICT ÜK Cloud-Module 109 und 210 - Deutsch

Dieses Repo enthält den Inhalt und die notwendigen Ressourcen für die schweizer [ICT](https://www.ict-berufsbildung.ch/) ÜK (Überbetriebliche Kurse) Module 109 und 210.
Die Vorrausetzungen der Module wurden in Zusammenarbeit mit ICT festgelegt und von AWS (Amazon Web Services) Switzerland erstellt. Sie beinhalten theoretisches Grundwissen, vertiefteres Cloudwissen bezüglich der AWS Cloud und Schritt für Schritt-Anleitungen zur Erstellung der ToDo-Applikation, die als praktisches Beispiel für beide dient.

Der Inhalt ist wie folgt aufgebaut und kann durch diesen [Link](https://aws-samples.github.io/cloud-app-builders-modules-german/) aufgerufen werden:
1. Einleitung
2. Modul 109
3. Modul 210

### Modul 109 - Dienste in der Public Cloud betreiben und überwachen
Für beide Module ist es empfehlenswert die Anleitung zu lesen, um das notwendige Vorwissen zur AWS Cloud zu bekommen.
Modul 109 behandelt die Implementierung einer ToDo-Applikation mit Hilfe von Containern in der AWS Cloud. Zusätzlich werden in diesem Modul Monitoring und Backup Kenntnisse vermittelt.
Modul 109 basiert auf dieser [Modulbeschreibung](https://www.modulbaukasten.ch/module/109/1/de-DE?title=Dienste-in-der-Public-Cloud-betreiben-und-%C3%BCberwachen).

### Modul 210 - Cloud für Anwendungen benutzen
Modul 210 behandelt verschiedene Implementierungsmöglichkeiten einer ToDo-Applikation wie Container, Serverless, CI/CD und Infrastructure-as-Code.
Das Modul basiert auf dieser [Modulbeschreibung](https://www.modulbaukasten.ch/module/210/1/de-DE?title=Public-Cloud-f%C3%BCr-Anwendungen-nutzen).

### Ziel der Module
Am Ende Module wird eine funktionsfähige ToDo-Applikation erstellt, die so aussehen kann:=

https://user-images.githubusercontent.com/108731267/233037964-e3647106-238b-4a4a-94a9-fbe7599e80d7.mp4




### Voraussetzungen für die Kurse
Die Module sollen auf AWS Academy durchgeführt werden. Es ist möglich diese auch in einem eignen Cloud-Account der AWS Cloud durchzuführen, aber es führt zu leichten Abweichungen in der Anleitung z.B. Nutzung von anderen Rollen.


## Aufbau des Repositories
```bash
.
├── README.md                   <-- Instruktionen
├── src                         <-- Ressourcen für die Module
│   ├── cloudformation          <-- Cloudformation-Vorlagen
│   ├── container-api           <-- Backend-Container
│   ├── severless-api           <-- Serverlose Umsetzung der ToDo-Applikation
│   ├── todo-frontend           <-- Frontend
├── workshop
│   ├── config.toml             <-- Hugo Konfiguration für die Workshop Webseite
│   ├── content                 <-- Markdown Dateien für die Workshopseiten
│   ├── layouts                
│   ├── public                  <-- HTML output basierend auf den Hugo-Dateien
│   ├── requirements.txt        
│   ├── static                  <-- Alle statischen Assets für den Workshop (z.B. Bilder, Dokumente, etc)
│   └── themes                  <-- Theme für die Webseite
```

## Anmerkungen
Das Repository kann von Lehrern geforked werden, um den Inhalt der Module als Basis zu nutzen und diese für weitere eigene ÜKs des ICT anzupassen.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License
Dieses Repository ist lizensiert unter der MIT-0 Linzenz. Siehe LICENSE file.
This library is licensed under the MIT-0 License. See the LICENSE file.

