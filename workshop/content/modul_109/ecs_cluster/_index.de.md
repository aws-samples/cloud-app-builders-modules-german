+++
title = "Container Plattform"
chapter = false
weight = 25
pre = "<b>5. </b>"

[[resources]]
name = 'image_comp_slider'
src = './image_comp_slider.css'

+++

### Themen
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
    - [Erstellen des Container Clusters](#erstellen-des-container-clusters)
    - [Erstellen der Task Definition](#erstellen-der-task-definition)
    - [Launch der Beispielapplikation](#launch-der-beispielapplikation) 
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

### Einleitung
Im vorherigen Kapitel hast du zwei Container Images für die Frontend Applikation und die Backend Applikation erstellt. Wie besprochen beinhaltet das Container Image die Applikation, es beinhaltet die Abhängigkeiten die die Applikation benötigt, und das Container Image beschreibt wie die Applikation ausgeführt werden kann. Eine Abhängigkeit vom Frontend ist zum Beispiel die **[HTTP Webserver-Software Nginx](https://de.wikipedia.org/wiki/Nginx)** und das Backend Container Image beinhaltet eine **[Python](https://de.wikipedia.org/wiki/Python_(Programmiersprache))** Laufzeitumgebung, da das Backend in Python implementiert ist und Python zum ausführen braucht. 

Du hast die Container Images in Amazon ECR Container Repositories hochgeladen. Die Container Repositories speichern die Container Images. Also fragst du dich vielleicht wie die Container ausgeführt werden, damit deine Frontend und Backend Applikationen nutzbar sind? Damit wirst du dich in diesem Kapitel beschäftigen.

{{% include "container/container_ecs_intro.de.md" %}}


<style>

.img-comp-container {
  position: relative;
  height: 500px; /*should be the same height as the images*/
  box-sizing: border-box;
}

.img-comp-img {
  position: absolute;
  width: auto;
  height: auto;
  overflow: hidden;
  box-sizing: border-box;
}

.img-comp-img img {
  display: block;
  vertical-align: middle;
  box-sizing: border-box;
}

.img-comp-slider {
  position: absolute;
  z-index: 9;
  cursor: ew-resize;
  /*set the appearance of the slider:*/
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0px 2px 6px hsla(210, 50%, 10%, 0.15);
}

.img-comp-overlay{
    box-sizing: border-box;
}
</style>

<div class="img-comp-container">
  <div  class="img-comp-img">
    <img style="max-width:830px;" src="/images/container_orchester_l.svg" width="830" height="500">
  </div>
  <div id="slider-handle" class="img-comp-slider">
  <img style="margin:0;padding-top:6px;padding-bottom:6px; padding-left:3.5px;padding-right:3.5px;cursor: ew-resize;" src="/images/comparison_icon.svg">
  </div>
  <div class="img-comp-img img-comp-overlay">
    <img style="max-width:830px;" src="/images/orchester.svg" width="830" height="500">
  </div>
</div>



<script type="text/javascript">
function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /* Get the width and height of the img element */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* Set the width of the img element to 50%: */
    img.style.width = (w / 2) + "px";
    /* Create slider: */
    console.dir(document == null);
   // slider = document.createElement("DIV");
    slider = document.getElementById("slider-handle");
   // slider.setAttribute("class", "img-comp-slider");
    /* Insert slider */
    //img.parentElement.insertBefore(slider, img);
    /* Position the slider in the middle: */
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /* Execute a function when the mouse button is pressed: */
    slider.addEventListener("mousedown", slideReady);
    /* And another function when the mouse button is released: */
    window.addEventListener("mouseup", slideFinish);
    /* Or touched (for touch screens: */
    slider.addEventListener("touchstart", slideReady);
    /* And released (for touch screens: */
    window.addEventListener("touchend", slideFinish);
    function slideReady(e) {
        /* Prevent any other actions that may occur when moving over the image: */
        e.preventDefault();
        /* The slider is now clicked and ready to move: */
        clicked = 1;
        /* Execute a function when the slider is moved: */
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
        /* The slider is no longer clicked: */
        clicked = 0;
    }
    function slideMove(e) {
        var pos;
        /* If the slider is no longer clicked, exit this function: */
        if (clicked == 0) return false;
        /* Get the cursor's x position: */
        pos = getCursorPos(e)
        /* Prevent the slider from being positioned outside the image: */
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /* Execute a function that will resize the overlay image according to the cursor: */
        slide(pos);
    }
    function getCursorPos(e) {
        var a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        /* Get the x positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x coordinate, relative to the image: */
        x = e.pageX - a.left;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        return x;
    }
    function slide(x) {
        /* Resize the image: */
        img.style.width = x + "px";
        /* Position the slider: */
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
}

var x, i;
/* Find all elements with an "overlay" class: */
x = document.getElementsByClassName("img-comp-overlay");
for (i = 0; i < x.length; i++) {
    /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i]);

}
</script>

<br>
<br>


{{% include "container/container_ecs_aws.de.md" %}}

### Anwendung
In den folgenden Schritten wirst du einen Container Cluster erstellen. Das Cluster wird im nächsten Kapitel genutzt, um Frontend- und Backend-Container auszuführen. Die Task Definitionen, die du in diesem Kapitel erstellst, beschreiben, wie ein Cluster einen Frontend-, bzw. Backend-Container starten soll.

Als letzter Schritt in diesem Kapitel wirst du als Test einen einzelnen Frontend-Container manuell starten. 
Im nächsten Kapitel werden dann Container, beschrieben durch die Task Definitionen, automatisch gestartet. 


#### Erstellen des Container Clusters

**Aufgabe:**
Erstelle ein Container Cluster in Amazon Elastic Container Service (Amazon ECS) und benenne es ``workshop-cluster``. Nutze als Template Networking only und wähle Enable Container Insights aus, um mehr Einblicke später in das Cluster zu bekommen.

{{%expand "Hinweis" %}}
In der **[Dokumentation](https://docs.aws.amazon.com/de_de/AmazonECS/latest/developerguide/create_cluster.html  )** sind die einzelnen Schritte zur Erstellung eines Cluster beschrieben.
{{% /expand%}}

{{%expand "Lösung" %}}
1. Unter Services den Dienst **Elastic Container Service** auswählen.
1. Im Bereich Amazon ECS -  auf **Clusters** danach auf **Create Cluster** klicken.
1. Als **Cluster name** ``workshop-cluster`` eingeben.
1. Unter Networking **workshop-VPC** auswählen und die Subnetze **Workshop-PublicA** und **Workshop-PublicB**.
1. Bei CloudWatch Container Insights die Option **Enable Container Insights** auswählen.
1. Klick auf **Create**.
1. Klick auf **View Cluster**.
{{% /expand%}}
<!-- Fix this with shortcodes -->
<div class="notices note">

Beim ersten Versuch den Amazon ECS Cluster zu erstellen kann es ggf. zu einer Fehlermeldung kommen mit dem Vermerk, dass eine Service Rolle noch nicht existiert. Sollte das der Fall sein, den Vorgang mit **Cancel** abbrechen und die oben genannten Schritte 1 - 6 nochmals ausführen. Im Hintergrund wurde die Rolle dann automatisch angelegt.

</div>

#### Erstellen der Task Definition 

##### Vorgehen für Backend Container:

{{% includereplace "ecs_task_definition.de.md" "servicename" "backend" %}}

{{% include "ecs_backend_env_setup.de.md" %}}

##### Vorgehen für Frontend Container:

{{% includereplace "ecs_task_definition.de.md" "servicename" "frontend" %}}

{{% include "ecs_frontend_env_setup.de.md" %}}

#### Launch der Beispielapplikation

##### Start eines einzelnen Frontend Containers:

1. Klick auf **Task Definition**.
2. In der Übersicht die ``workshop-frontend`` Task Definition auswählen.
3. Unter **Deploy** auf **Run Task** klicken.
4. Als Cluster **workshop-cluster** auswählen.
5. Unter Networking das **Workshop-VPC** auswählen.
6. Als Subnet das **Workshop-PublicA** auswählen.
7. Bei Security groups **Workshop-ECS-Task-SG** auswählen.
8. Stelle sicher, dass bei Auto-assign public IP auf **Enabled** ausgewählt ist.
9. Klick auf **Run Task**.

{{% notice note %}}
In der Übersicht wird auch der Status des Containers angezeigt. Die Spalten **Last status** und **Desired status** geben den aktuellen sowie den Ziel-Status an. Während des Starts des Containers werden die Phasen **Pending** und **Provisioning** durchlaufen. Der Container muss zuerst von aus dem Container Repository heruntergeladen werden. Dieser Prozess kann eine kurze Zeit dauern.
{{% /notice%}}

**Aufgabe:**
Greife auf das Frontend durch die **Public IP** unter dem **Port 8080** des Containers zu, indem du die IP in einem neuen Tab öffnest und den Port hinzufügst. Jetzt ist das Frontend der ToDo-App zusehen.
```bash
http://<yourContainerIP>:8080
```
{{%expand "Lösung" %}}
1.  Klicke auf den Link unter **Task**, um die Details des Containers aufzurufen.
1.  In der Übersicht unter **Details** wird im Abschnitt **Network** die **Public IP** angezeigt.
1.  Durch das Kopieren in ein neues Browser Tab und Aufruf der folgenden URL kann auf das Frontend zugegriffen werden.
1. Im Tab **Logs** sind die Logs des einzelnen Containers ersichtlich. Das ermöglicht bereits ein einfaches Troubleshooting.
1. Mit einem Klick auf **Stop** wird der Container Task wieder beendet.
{{% /expand%}}



{{% notice note %}}
Das Starten des Frontend Containers soll lediglich veranschaulichen, wie einfach ein einzelner Container gestartet werden kann. Die hierfür verwendete Security Group `Workshop-ECS-Task-SG` wird hier ebenfalls nur für Testzwecks verwendet. Beiträge in der ToDo-Anwendung werden noch nicht über das Backend in der Datenbank gespeichert. Im nächsten Kapitel wird die Beispielanwendung hochverfügbar hinter einem Load Balancer gestartet.
{{% /notice%}}

### Zusammenfassung und nächste Schritte
Herzlichen Glückwunsch! Du hast erfolgreich ein neues Container Cluster erstellt. Durch den Launch Mode **Fargate** sind keine darunterliegende Hosts notwendig. Diese Betriebsart ist sehr effektiv, da keinerlei Infrastruktur (Hosts) bereitgestellt, verwaltet, skaliert und überwacht werden muss. Mit den beiden Task Definitions wurden die Vorlagen für die spätere Ausführung der beiden Container (Frontend und Backend) erstellt. Du hast den Frontend Container kurz gestartet, um zu testen, dass er funktioniert und wie einfach ein Container bereitgestellt werden kann. Im nächsten Kapitel geht es darum, einen Load Balancer zu konfigurieren und die beiden Task Definitionen als Container Service zu starten.