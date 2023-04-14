```bash
<yourAWSAccountID>.dkr.ecr.us-east-1.amazonaws.com/workshop-frontend:latest
```

6. Unter Port mappings den Port **8080** angeben.
7. Auf **Next** klicken.
8. Bei Environment **AWS Fargate** wählen und als Operating system **Linux/X86_64**.
9. Bei Task memory (GB) **0.5GB** auswählen.
10. Für Task CPU (vCPU) **0.25vCPU** auswählen.
11. Als Task Role **None** auswählen.
12. Bei Task Execution Role **LabRole** eingeben.
13. Die restlichen Optionen bleiben unverändert. Am Ende der Seite auf **Create** und danach **View task definition** klicken.