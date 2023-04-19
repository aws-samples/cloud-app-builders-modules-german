1. Unter Services den Dienst **Elastic Container Service** auswählen.
2. In der Übersicht klick auf ``workshop-cluster``.
3. Im Tab **Services** auf **Create** klicken.
4. Als **Launch type** muss **Fargate** ausgewählt werden.
5. Bei **Family** muss ``workshop-backend`` ausgewählt werden.
6. Als **Service name** ``backend-service`` eingeben.
7. Unter **Desired tasks** ``2`` eingeben.
9. Bei **Networking** wird das ``Workshop-VPC`` ausgewählt.
10. Unter **Subnets** nacheinander Subnet ``Workshop-PublicA`` und ``Workshop-PublicB`` auswählen.
11. Bei **Security groups** ``Workshop-ECS-Backend-SG`` auswählen.
13. Die Option **Auto-assign public IP** auf **ENABLED** stehen lassen.
14. Im Abschnitt **Load balancing** die Option **Application Load Balancer** auswählen und den bereits erstellten ALB ``todoApp``.
16. Unter **Production listener port** im Dropdown ``80:HTTP`` auswählen.
17. Bei **Target group name** im Dropdown ``workshop-backend``auswählen und auf **Next step** klicken.
18. Klick auf **Create**.