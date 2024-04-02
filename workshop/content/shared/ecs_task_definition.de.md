1. Im Bereich Amazon ECS auf **Task Definitions** klicken.
2. Klick auf **Create new Task Definition**.
3. Als Task Definition Name ``workshop-servicename`` eingeben.
1. Als Launch Type **AWS Fargate** auswählen und als Operating system **Linux/X86_64**.
11. Für Task CPU (vCPU) **0.25vCPU** auswählen.
10. Bei Task memory (GB) **0.5GB** auswählen.
12. Als Task Role **None** auswählen.
13. Bei Task Execution Role **LabRole** eingeben.
4. Als **Container Name** ``container-servicename`` eingeben.
5. Als Image Referenz die URI den Pfad von Amazon ECR eingeben (sollte wie folgt aussehen):