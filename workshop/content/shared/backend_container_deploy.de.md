#### Pushing the container to AWS
To push the container to AWS, we simply tell docker that a tag in the new repository is the same as the  `containerapi` image we created before. Here you will need to use the `repositoryUri` value from the previous step, container with a version tag:

```bash
# Tag the container
docker tag containerapi {repositoryUri}:v1

# Login our local Docker to ECR
aws ecr get-login-password \
| docker login \
    --username AWS \
    --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.eu-central-1.amazonaws.com

# Push our image
docker push {repositoryUri}:v1
``
