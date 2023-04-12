+++
title = "Load Balancer"
chapter = false
weight = 40
pre = "<b>4. </b>"
+++

### Themen:
- [Einleitung](#einleitung)
- [Technische Konzepte](#technische-konzepte)
- [Relevante AWS Services](#relevante-aws-services)
- [Anwendung](#anwendung)
    - [Erstellung und Konfiguration eines ALBs](#erstellung-und-konfiguration-eines-albs)
    - [Fertigstellen des Load Balancers](#fertigstellen-des-load-balancers)
- [Zusammenfassung und nächste Schritte](#zusammenfassung-und-nächste-schritte)

{{% include "alb/alb_intro.de.md" %}}
___

{{% include "alb/create_alb_task.de.md" %}}
{{%expand "Hinweis" %}}
{{% include "alb/create_alb_hint.de.md" %}}
{{% /expand %}}

{{%expand "Lösung" %}}
{{% include "alb/create_alb_solution.de.md" %}}
{{% /expand %}}
{{% include "alb/create_alb_nextsteps.de.md" %}}

### Zusammenfassung und nächste Schritte 
Herzlichen Glückwunsch! Du hast erfolgreich einen Load Balancer mit einem öffentlichen Endpoint erstellt. Nun können wir diesen erreichen, aber bisher werden die Anfragen nicht weitergeleitet. Im nächsten Kapitel erstellen wir die Container die im Hintergrund (Backend) laufen werden, um unsere Anfragen zu bearbeiten.

