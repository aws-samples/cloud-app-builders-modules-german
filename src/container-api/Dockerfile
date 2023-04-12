FROM --platform=linux/amd64 public.ecr.aws/bitnami/python:3.9

# Install mysql client requirements
RUN apt-get update \ 
   && apt-get install python3-dev default-libmysqlclient-dev gcc  -y \
   && apt-get clean

# Install application requirements
COPY requirements.txt .
RUN pip install -r requirements.txt

# Add the application 
COPY . .

# Setup the container to run
CMD ["python", "api.py"]
EXPOSE 5000