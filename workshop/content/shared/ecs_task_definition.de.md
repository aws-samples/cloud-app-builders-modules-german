1. Im Bereich Amazon ECS auf **Task Definitions** klicken.
1. Klick auf **Create new Task Definition**.
1. Im ersten Schritt beim Launch Type **Fargate** auswählen und auf **Next step** klicken.
1. Als Task Definition Name ``workshop-servicename`` eingeben.
1. Als Task Role **None** auswählen.
1. Bei Operating System Family  **Linux** auswählen.
1. Bei Task Execution Role **LabRole** eingeben.
1. Bei Task memory (GB) **0.5GB** auswählen.
1. Für Task CPU (vCPU) **0.25vCPU** auswählen.
1. Klick auf **Add container**.
1. Als Container Name ``container-servicename`` eingeben.
1. Als Image Referenz die URI den Pfad von ECR eingeben (sollte wie folgt aussehen):
```bash
<yourAWSAccountID>.dkr.ecr.us-east-1.amazonaws.com/workshop-backend:latest
```
