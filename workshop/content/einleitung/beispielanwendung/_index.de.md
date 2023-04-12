+++
title = "Beispielanwendung"
chapter = false
weight = 70
pre = "<b>7. </b>"
+++

### Beispielanwendung für die ÜK Module
Für die Durchführung der ÜK Module wird eine einfache Beispielanwendung eingesetzt. Hierbei handelt es sich um eine webbasierte ToDo-Liste. Sie basiert auf [ToDoMVC](https://todomvc.com/), welches Entwicklern den Vergleich und die Evaluation unterschiedlicher Frontend Frameworks ermöglicht. 

<video width=100% controls autoplay loop>
    <source src="/images/ToDoApp.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

Die Anwendung wurde für den Einsatz und das Deployment bei AWS angepasst. Beide ÜK Module nutzen diese Anwendung für die Durchführung der praktischen Übungen. Dabei unterscheiden sich die Architekturen je nach ÜK leicht.

{{% notice note %}}
Die Art der unterschiedlichen Bereitstellung ermöglicht die Behandlung der Handlungsnotwendigen Kenntnisse, die in den ÜKs vermittelt werden sollen.
{{% /notice%}}
### High Level Architektur
#### ÜK 109
In diesem Modul wird die Beispielanwendung als Container auf Basis von [Amazon Elastic Container Service (Amazon ECS)](https://aws.amazon.com/ecs/) und die relationale Datenbank mit dem [Amazon Relational Database Service (Amazon RDS)](https://aws.amazon.com/de/rds/) bereitgestellt. Der Zugriff auf die hoch verfügbare Beispielanwendung wird über einen [Elastic Load Balancer](https://aws.amazon.com/elasticloadbalancing/) realisiert.

![Zielarchitektur Ük 109](/images/modul_109_zielarchitektur.svg)

#### ÜK 210
Für dieses Modul wird die Beispielanwendung über eine alternative Architektur bereitgestellt. Die Anwendung selbst liegt in einem [Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/s3/) Bucket und wird über das Content Delivery Netzwerk (CDN) [Amazon CloudFront](https://aws.amazon.com/cloudfront/) veröffentlicht. Ein Teil der Anwendung wird wie im ÜK Modul 109 als Container auf Basis von [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) und die relationale Datenbank durch [Amazon Relational Database Service (Amazon RDS)](https://aws.amazon.com/de/rds/) implementiert. Diese erste Variante der Implementierung ist in der Abbildung dargestellt.

Alternativ zu dieser Methode kann die gleiche Funktionalität auch über serverlose Dienste wie [Amazon Lambda](https://aws.amazon.com/lambda/) und die NoSQL Datenbank [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) realisiert werden. Zudem wird beispielhaft die Nutzung von Continuous Integration und Continuous Deployment (CI/CD) Diensten wie [AWS CodePipeline](https://aws.amazon.com/codepipeline/) demonstriert.

![High Level Architektur Ük 210](/images/modul210.png)