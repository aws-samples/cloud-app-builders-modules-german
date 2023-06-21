1. Unter Services den Dienst **Elastic Container Service** auswählen.
1. In der Übersicht klick auf ``workshop-cluster``.
1. Im Tab **Services** auf **Create** klicken.
1. Als **Launch type** muss **Fargate** ausgewählt werden.
1. Bei **Family** muss ``workshop-servicename`` ausgewählt werden.
1. Als **Service name** ``servicename-service`` eingeben.
1. Unter **Desired tasks** ``2`` eingeben.
1. Bei **Networking** wird das ``Workshop-VPC`` ausgewählt.
1. Unter **Subnets** nacheinander Subnet ``Workshop-PublicA`` und ``Workshop-PublicB`` auswählen.
1. Bei **Security groups** ``security-group-name`` auswählen.
1. Die Option **Auto-assign public IP** auf **ENABLED** stehen lassen.
1. Im Abschnitt **Load balancing** die Option **Application Load Balancer** auswählen und den bereits erstellten ALB ``todoApp``.
1. Unter **Production listener port** im Dropdown den bereits existierenden ``80:HTTP`` Listener auswählen.
1. Bei **Target group name** die existierende ``workshop-servicename`` target group im Dropdown auswählen.
1. Klick auf **Create**.
