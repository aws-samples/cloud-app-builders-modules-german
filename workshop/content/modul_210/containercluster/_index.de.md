+++
title = "Container Plattform"
chapter = false
weight = 60
pre = "<b>6. </b>"
+++

### Themen:
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
  - [Erstellen des Container Clusters](#erstellen-des-container-clusters)
  - [Erstellen der Task Definition](#erstellen-der-task-definition)
  - [Service Konfiguration Backend Container](#service-konfiguration-backend-container)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)


### Einleitung
Im vorherigen Kapitel hast du ein Container Image für die Backend Applikation erstellt. Wie besprochen beinhaltet das Container Image die Applikation, die Abhängigkeiten, die die Applikation benötigt, und das Container Image beschreibt wie die Applikation ausgeführt werden kann. Das Backend Container Image beispielsweise beinhaltet eine **[Python](https://de.wikipedia.org/wiki/Python_(Programmiersprache))** Laufzeitumgebung, da das Backend in Python implementiert ist und Python zum Ausführen braucht. 

Du hast das Container Image in ein Amazon ECR Container Repository hochgeladen. Die Container Repositories speichern die Container Images. Also fragst du dich vielleicht wie die Container ausgeführt werden, damit deine Backend Applikation nutzbar ist? Damit wirst du dich in diesem Kapitel beschäftigen.
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
In den folgenden Schritten wirst du ein Container Cluster erstellen. Das Cluster wird genutzt, um Backend-Container auszuführen. Wie ein Cluster Backend-Container ausführen soll werden mit Task Definitionen beschrieben. In diesem Kapitel wirst du Task Definitionen für die ToDo-Applikation erstellen.

#### Erstellen des Container Clusters

**Aufgabe:**
Erstelle ein Container Cluster in Amazon Elastic Container Service (Amazon ECS) und benenne es ``workshop-cluster``. Nutze als Template Networking only und wähle Use Container Insights aus, um mehr Einblicke später in das Cluster zu bekommen.

{{%expand "Hinweis" %}}
In der **[Dokumentation](https://docs.aws.amazon.com/de_de/AmazonECS/latest/developerguide/create_cluster.html  )** sind die einzelnen Schritte zur Erstellung eines Cluster beschrieben.
{{% /expand%}}

{{%expand "Lösung" %}}
1. Unter Services den Dienst **Elastic Container Service** auswählen.
1. Im Bereich Amazon ECS -  auf **Clusters** danach auf **Create Cluster** klicken.
1. Als **Cluster name** ``workshop-cluster`` eingeben.
1. Unter Networking **workshop-VPC** auswählen und die Subnetze **Workshop-PublicA** und **Workshop-PublicB**.
1. Unter Monitoring **Use Container Insights** aktivieren.
1. Klick auf **Create**.
1. Klick auf **View Cluster**.
{{% /expand%}}
<!-- Fix this with shortcodes -->
<div class="notices note">

Beim ersten Versuch ein Amazon ECS Cluster zu erstellen kann es ggf. zu einer Fehlermeldung kommen mit dem Vermerk, dass eine Service Rolle noch nicht existiert. Sollte das der Fall sein, den Vorgang mit **Cancel** abbrechen und die oben genannten Schritte 1 - 6 nochmals ausführen. Im Hintergrund wurde die Rolle dann automatisch angelegt.

</div>

#### Erstellen der Task Definition 

{{% includereplace "ecs_task_definition.de.md" "servicename" "backend" %}}

{{% include "ecs_backend_env_setup.de.md" %}}

#### Service Konfiguration Backend Container

{{% include "ecs_cluster_backend_service.de.md" %}}

### Zusammenfassung und nächste Schritte 
Herzlichen Glückwunsch! Du hast erfolgreich das Backend für deine Anwendung durch Amazon ECS implementiert und dadurch hochverfügbar gemacht. Nun können zwei Container im Hintergrund laufen, um die Anwendung zu unterstützen. Diese sind durch den Load Balancer auf zwei Availability Zones verteilt. Im nächsten Schritt wird nun das Frontend aufgesetzt. Das Frontend wird dann über den Load Balancer auf das Backend zugreifen und das Backend API auf die ToDos in der Datenbank zugreifen.