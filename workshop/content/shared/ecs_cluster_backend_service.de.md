1. Unter Services den Dienst **Elastic Container Service** auswählen.
2. In der Übersicht klick auf ``workshop-cluster``.
3. Im Tab **Services** auf **Create** klicken.
4. Als **Launch type** muss **Fargate** ausgewählt werden.
5. Bei **Task Definition** muss ``workshop-backend`` ausgewählt werden.
6. Als **Service name** ``backend-service`` eingeben.
7. Unter **Number of tasks** ``2`` eingeben.
8. Klick auf **Next step**.
9. Als **Cluster VPC** wird das ``Workshop-VPC`` ausgewählt.
10. Unter **Subnets** nacheinander Subnet ``Workshop-PublicA`` und ``Workshop-PublicB`` auswählen.
11. Bei **Security groups** auf **Edit** klicken.
12. Die bestehende Security Group ``Workshop-ECS-Backend-SG`` auswählen und auf **Save** klicken.
13. Die Option **Auto-assign public IP** auf **ENABLED** stehen lassen.
14. Im Abschnitt **Load balancing** die Option **Application Load Balancer** auswhählen.
15. Unter **Container to load balance** auf **Add to load balancer** klicken.
16. Unter **Production listener port** im Dropdown ``80:HTTP`` auswhälen.
17. Bei **Target group name** im Dropdown ``workshop-backend``auswhählen und auf **Next step** klicken.
18. Im Schritt 3 **Set Auto Scaling (optional)** auf **Next step** klicken.
19. In der Übersicht klick auf **Create Service** und im darauffolgenden Statusfenster auf **View Service**.