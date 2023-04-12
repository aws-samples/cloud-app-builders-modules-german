#### Informationen zur Datenbank Instanz

1. Unter **Services** den Dienst **RDS** auswählen.
2. Links im Menü auf **Databases** klicken.
3. Unter **Databases** auf den Datenbank identifier **workshop-db** klicken.
4. Nach erfolgreicher Bereitstellung wird im Tab **Connectivity & security** im Abschnitt **Endpoint & port** der DNS Endpunkt der Datenbank angezeigt. 


{{% notice tip %}}
Der DNS Name wird später für die Verbindung der Backend Container Instanzen benötigt. Daher am besten gleich über die Zwischenablage in ein Textfile kopieren und dort zusätzlich den Datenbank Benutzernamen sowie das Passwort (siehe oben) notieren.
{{% /notice%}}


5. In den Tabs **Monitoring**, **Logs & events**, **Configuration** sowie **Maintenance & backups** können weitere Informationen und Einstellungen eingesehen werden.
6. Erstelle ein neues Tag mit key `Name` und value `todoapp` in dem **Tags** Tab.