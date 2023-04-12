+++
title = "Zugriff auf AWS Services"
chapter = false
weight = 50
pre = "<b>5. </b>"
+++

Es gibt unterschiedliche Möglichkeiten, auf die AWS Plattform und auf die AWS Services zuzugreifen. 
Nachfolgend werden die wichtigsten Methoden genannt. 

{{% notice info%}}
Für die Durchführung der Übungen ist der Zugang zur AWS Plattform über einen regulären AWS Account oder über AWS Academy zwingend notwendig.
{{% /notice%}}

### AWS Management Console
Die AWS Management Console ist die grafische Benutzeroberfläche für AWS, die in einem Browser ausgerufen wird. 
Sie bietet Zugriff auf alle AWS Services in den AWS Regionen und erlaubt deren Konfiguration und Überwachung. 
Alle Interaktionen über die AWS Management Console interagieren direkt mit den Service API's. 
Mit regulären AWS Accounts ist die AWS Management Console über den Link 
[https://console.aws.amazon.com/console/home](https://console.aws.amazon.com/console/home) erreichbar. 

{{% notice note %}}
Wenn die AWS Management Console über einen AWS Academy Account geöffnet werden soll, muss dies über die AWS Academy 
Plattform erfolgen. Es ist wichtig zu beachten, dass im Rahmen von AWS Academy nur die AWS Regionen "us-east-1" und 
"us-east-2" für Übungen verwendet werden können.
{{% /notice%}}

### AWS CLI
Das AWS Command Line Interface **[AWS CLI](https://aws.amazon.com/de/cli/)** ist ein Open-Source-Tool und erlaubt es per Shell
direkt auf die AWS APIs zuzugreifen. Mit nur minimalem Konfigurationsaufwand ermöglicht das AWS CLI die Ausführung von 
Befehlen. Dabei werden die gleichen AWS Service APIs angesprochen, wie bei der AWS Management Console. Das AWS CLI ist 
für folgende Betriebssysteme verfügbar: 
* Linux
* Windows
* macOS
* Docker

Die entsprechenden [Installationsanleitungen](https://docs.aws.amazon.com/de_de/cli/latest/userguide/install-cliv2.html) sind
in der AWS Dokumentation hinterlegt.

{{% notice note %}}
Das AWS CLI muss für die Durchführung der ÜK Module NICHT zwingend installiert werden! Für die Module wird eine 
Amazon Cloud9 Web IDE genutzt, in der das AWS CLI bereits installiert ist.
{{% /notice%}}

### AWS SDK

Das [AWS SDK (Software Development Kit)](https://aws.amazon.com/de/tools/) dient Entwicklern dazu, 
AWS Services in ihre Programme zu integrieren. Es steht für viele moderne Programmiersprachen wie C++, Go, Java, 
JavaScript, .Net, Node.js, PHP, Python oder Ruby zur Verfügung. Für jede dieser Programmiersprachen gibt es eine eigene Dokumentation für die Installation sowie für die Verwendung. Anbei einige Beispiele:

* Python
  * [AWS SDK für Python Installation](https://aws.amazon.com/de/sdk-for-python/)
  * [AWS SDK für Python API Referenz](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
* JavaScript
  * [AWS SDK für JavaScript Installation](https://aws.amazon.com/de/sdk-for-javascript/)
  * [AWS SDK für JavaScript API Referenz](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html)

{{% notice note %}}
Ein AWS SDK muss für die Durchführung der ÜK Module NICHT installiert werden!
{{% /notice%}}


### Weiterführende Informationen / Dokumentation
* [AWS Management Console FAQ](https://aws.amazon.com/de/console/faq-console/)
* [AWS CLI Command Referenz](https://docs.aws.amazon.com/cli/latest/reference/)
* [AWS CLI Dokumentation](https://docs.aws.amazon.com/de_de/cli/latest/userguide/cli-chap-welcome.html)
* [AWS SDK für Python Code Beispiele](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/examples.html)
* [AWS SDK für JavaScript Code Beispiele](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/examples.html)
* [Erste Schritte zur Programmierung mit AWS](https://aws.amazon.com/de/developer/)
* [AWS Samples Github Repository](https://github.com/aws-samples)