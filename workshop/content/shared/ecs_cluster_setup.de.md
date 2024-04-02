1. Unter Services den Dienst **Elastic Container Service** auswählen.
2. Im Bereich Amazon ECS -  auf **Clusters** danach auf **Create Cluster** klicken.
4. Als **Cluster name** ``workshop-cluster`` eingeben.
1. Unter Infrastructure **AWS Fartgate (serverless)** auswählen.
1. Unter Monitoring **Use Container Insights** aktivieren.
6. Klick auf **Create**.

<!-- Fix this with shortcodes -->
<div class="notices note">

Beim ersten Versuch den ECS Cluster zu erstellen kann es ggf. zu einer Fehlermeldung kommen mit dem Vermerk, dass eine Service Rolle noch nicht existiert. Sollte das der Fall sein, den Vorgang mit **Cancel** abbrechen und die oben genannten Schritte 1 - 6 nochmals ausführen. Im Hintergrund wurde die Rolle dann automatisch angelegt.

</div>

7. Klick auf **View Cluster**.
