
1. Unter **Services** den Dienst **RDS** auswählen.
2. Links im Menü auf **Databases** klicken.
3. Klick auf **Create database**.
4. Unter **Choose a database creation method** die Option auf **Standard create** belassen.
5. Unter **Engine options** als Engine type **MySQL** auswählen.
6. Bei **Version** die Engine **MySQL 8.0.35** auswählen.
7. In der Sektion **Templates** die Option **Dev/Test** auswählen.
8. Unter **Availability and durability** die Option ``Multi-AZ DB instance`` auswählen.
8. Im Bereich Settings unter **DB instance identifier** den Namen ``workshop-db`` eingeben.
9. Als **Master username** wird ``clusteradmin`` verwendet.
10. Unter **Credential management** ``self managed``auswählen.
10. Das **Master password** ist ``todopassword``. Das Password nochmals unter **Confirm password** wiederholen.
11. Unter **DB instance class** auf **Burstable classes (includes t classes)** wechseln und dort den Typ **db.t3.micro** auswählen.
12. Unter **Storage** den **Storage type** **General Purpose SSD (gp2)** und **allocated storage** ``100GiB``auswählen.
12. Im Abschnitt **Storage** unter **Storage autoscaling** das Häkchen **Enable storage autoscaling** deaktivieren.
14. Im Abschnitt **Connectivity** unter **Virtual private cloud (VPC)** muss nun das ``Workshop-VPC`` ausgewählt werden.
15. Unter **Subnet group** die zuvor erstellte Subnetzgruppe ``workshop-db-subnet-group`` auswählen.
16. Die Option **Public access** muss auf **No** gestellt sein.
17. Unter **VPC security group** auf **Choose existing** und dort die im Abschnitt Netzwerk bereits erstellte Security Group ``Workshop-RDS-SG`` auswählen.
18. Die ``default`` Security Group entfernen.
19. **Availability Zone** kann auf **No preference** stehen bleiben.
20. Die **Database authentication** sollte auf **Password authentication** stehen.
23. Unter **Monitoring**, die option **Enable Enhanced monitoring** deaktivieren.
21. Im Abschnitt **Additional configuration** unter **Initial database name** muss ``todo`` eingegeben werden.
24. Unter **Backup** die Option **Enable automatic backups** deaktivieren.
25. Alle weiteren Optionen bleiben unverändert.
26. Deine Eingabemaske sollte anschliessend wie diese Screenshots aussehen: **[screenshot 1](/images/db_creation_1.png)**, **[screenshot 2](/images/db_creation_3.png)**, und **[screenshot 3](/images/db_creation_3.png)**
27. Klick auf **Create database** am Ende der Seite startet das Setup der neuen Datenbank Instanz.