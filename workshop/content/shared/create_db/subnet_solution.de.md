1. Unter **Services** den Dienst **RDS** auswählen.
2. Links im Menü auf **Subnet groups** klicken.
3. Klick auf **Create DB subnet group**.
4. Gebe ``workshop-db-subnet-group`` als **Name** ein.
5. Unter **Description** ``Subnetzgruppe mit privaten Subnetzen für ToDo Datenbank`` eingeben.
6. Unter **VPC** deine ``Workshop-VPC`` auswählen.
7. Bei **Availability Zone** ``us-east-1a`` und ``us-east-1b`` auswählen.
8. Unter **Subnets** die privaten Subnetze mit IP Ranges ``172.100.3.0/24`` und ``172.100.4.0/24`` auswählen.
9. Deine Eingabemaske sollte anschliessend **[wie folgt](/images/db_subnet_group_creation.png)** aussehen.
10. Erstelle die Subnetzgruppe mit klick auf **Create**.