```bash
<yourAWSAccountID>.dkr.ecr.us-east-1.amazonaws.com/workshop-backend:latest
```

6. Unter Port mappings den Port **5000** angeben.
7. Im Abschnitt Environment Variables die folgenden Umgebungsvariablen (case sensitive) eingeben:
    - Key: **DB_USER** | Value: **clusteradmin**
    - Key: **DB_PASSWORD** | Value: **todopassword**
    - Key: **DB_HOST** | Value: **DNS Endpunkt der DB Instanz**
8. Auf **Next** klicken.
9. Bei Environment **AWS Fargate** wählen und als Operating system **Linux/X86_64**.
10. Bei Task memory (GB) **0.5GB** auswählen.
11. Für Task CPU (vCPU) **0.25vCPU** auswählen.
12. Als Task Role **None** auswählen.
13. Bei Task Execution Role **LabRole** eingeben.
14.  Die restlichen Optionen bleiben unverändert. Am Ende der Seite auf **Create** und danach **View task definition** klicken.

{{% notice note %}}
Die [Umgebungsvariablen](https://de.wikipedia.org/wiki/Umgebungsvariable) werden im Source Code der Backend Applikation gelesen. Du setzt hier Werte für die drei Umgebungsvariablen **DB_USER**, **DB_PASSWORD**, und **DB_HOST**. Diese Informationen nutzt der Source Code der Backend Applikation um sich mit der Datenbank zu verbinden. Mit dem DNS Endpunkt (**DB_HOST**) kann die Backend Applikation die Datenbank im Internet finden. Dann kann sich die Applikation mit dem **DB_USER** und **DB_PASSWORD** bei der Datenbank anmelden. Die angemeldete Backend Applikation kann jetzt Daten aus der Datenbank lesen oder neue Daten in der Datenbank speichern.
{{% /notice%}}