### Erstellung eines ALBs

1. Unter **Services** den Dienst **EC2** auswählen.
2. Links im Menü auf **Load Balancers** klicken.
3. Klick auf **Create Load Balancer**.

#### Konfiguration des Load Balancers

1. Bei **Application Load Balancer** Klick auf **Create**.
1. Unter **Name** den Wert ``TodoApp`` eingeben.
1. Unter **VPC** das bestehende ``Workshop-VPC`` auswählen.
1. Unter **Availability Zone** jeweils die Subnetze **Public-PublicA** und **Public-PublicB** auswählen.
1. Im Abschnitt **Security groups**, unter **Security groups** die besthende ``Workshop-ALB-SG`` und die ``default`` Security Group abwählen.

#### Target Group Konfiguration für den Backend Container

Im Abschnitt **Listeners and routing**, auf **Create target group** klicken.

1. Die Option **Choose a target type** auf **IP addresses** setzen.
1. Als Target Group Name ``workshop-backend`` eingeben. Diese Target Group wird den eingehenden Datenverkehr an das Todo API backend weiterleiten.
1. Unter **Port** als Zielport ``5000`` eingeben um den Ziel Port des Backend Containers zu erreichen.
1. Die restlichen Einstellungen bleiben unverändert. Klick auf **Next**.
1. Da es noch keine Container gibt, Klick auf **Create target group**.

#### Fertigstellen des Load Balancers

Züruck im Dialogfenster des Load Balancer Konfigurations.

1. Im Abschnitt **Listeners and routing**, bei **default action** die vorher erstellte target group auswählen.
1. Auf **Create load balancer** klicken.



<!-- Fix this with shortcodes -->

<div class="notices note">

Da aktuell noch keine Container Instanzen existieren, wird der Load Balancer noch nicht funktionieren. Die Registrierung sowie die De-Registrierung von Container Instanzen wird später der Container Service Amazon ECS automatisch vornehmen.

</div>
