Im Abschnitt **Listeners and routing**
1. auf **Create target group** klicken.
1. In dem neuen Fenster die Option **Choose a target type** auf **IP addresses** setzen.
1. Als Target Group Name ``workshop-backend`` eingeben. Diese Target Group wird den eingehenden Datenverkehr an das ToDo-API backend weiterleiten.
1. Unter **Port** als Zielport ``5000`` eingeben um den Ziel Port des Backend Containers zu erreichen.
1. Die restlichen Einstellungen bleiben unverändert. Klick auf **Next**.
1. Da es noch keine Container gibt, Klick auf **Create target group**.

#### Fertigstellen des Load Balancers

Im Dialogfenster der Load Balancer Konfiguration:

1. Im Abschnitt **Listeners and routing**, bei **Default action** die ``workshop-backend`` target group auswählen. Eventuell musst du zuerst die Liste der Target Groups mit dem Kreispfeil, rechts neben der Liste, aktualisieren.
1. Auf **Create load balancer** klicken.



<!-- Fix this with shortcodes -->

<div class="notices note">

Da aktuell noch keine Container Instanzen existieren, wird der Load Balancer noch nicht funktionieren. Die Registrierung sowie die De-Registrierung von Container Instanzen wird später der Container Service Amazon ECS automatisch vornehmen.

</div>