11. Unter Port mappings den Port **5000** angeben.
12. Im Abschnitt Environment Variables die folgenden Umgebungsvariablen (case sensitive) eingeben:
    - Key: **DB_USER** | Value: **clusteradmin**
    - Key: **DB_PASSWORD** | Value: **todopassword**
    - Key: **DB_HOST** | Value: **DNS Endpunkt der DB Instanz**

{{% notice note %}}
Die [Umgebungsvariablen](https://de.wikipedia.org/wiki/Umgebungsvariable) werden im Source Code der Backend Applikation gelesen. Du setzt hier Werte für die drei Umgebungsvariablen **DB_USER**, **DB_PASSWORD**, und **DB_HOST**. Diese Informationen nutzt der Source Code der Backend Applikation um sich mit der Datenbank zu verbinden. Mit dem DNS Endpunkt (**DB_HOST**) kann die Backend Applikation die Datenbank im Internet finden. Dann kann sich die Applikation mit dem **DB_USER** und **DB_PASSWORD** bei der Datenbank anmelden. Die angemeldete Backend Applikation kann jetzt Daten aus der Datenbank lesen oder neue Daten in der Datenbank speichern.
{{% /notice%}}

13.  Bei Log configuration die Option **Auto-configure CloudWatch Logs** aktivieren.
14.  Die restlichen Optionen bleiben unverändert. Klick auf **Add**.
15.  Am Ende der Seite auf **Create** und danach **View task definition** klicken.