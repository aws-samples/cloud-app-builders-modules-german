1. Unter **Services** den Dienst **EC2** auswählen.
2. Links im Menü auf **Load Balancers** klicken.
3. Klick auf **Create Load Balancer**.
4. Bei **Application Load Balancer** Klick auf **Create**.
5. Unter **Name** den Wert ``todoApp`` eingeben.
6. Unter **VPC** das bestehende ``Workshop-VPC`` auswählen.
7. Unter **Availability Zone** jeweils die Subnetze **Public-PublicA** und **Public-PublicB** auswählen.
8. Im Abschnitt **Security groups**, unter **Security groups** die besthende ``Workshop-ALB-SG`` wählen und die ``default`` Security Group abwählen.