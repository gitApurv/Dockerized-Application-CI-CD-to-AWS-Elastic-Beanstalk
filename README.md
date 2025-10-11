# 🚀 Dockerized Application CI/CD to AWS Elastic Beanstalk

This repository demonstrates how to **automatically deploy a Node.js application to AWS Elastic Beanstalk** using **GitHub Actions**.

Whenever changes are pushed to the `main` branch (or manually triggered), a GitHub Actions workflow builds a deployment package and deploys it to Elastic Beanstalk.

## ⚙️ Workflow Overview

The workflow is defined in `.github/workflows/deploy-aws.yml`.

```sh
    name: Deploy to AWS Elastic BeanStalk
    on:
      push:
        branches:
          - main
      workflow_dispatch:
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout source code
            uses: actions/checkout@v5

          - name: Generate deployment package
            run: zip -r deploy.zip . -x '*.git*' '*node_modules*' '*.env*'

          - name: Deploy to EB
            uses: einaregilsson/beanstalk-deploy@v22
            with:
              aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
              aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
              application_name: ${{ secrets.AWS_APPLICATION_NAME }}
              environment_name: ${{ secrets.AWS_ENVIRONMENT_NAME }}
              version_label: ${{ github.sha }}-${{ github.run_number }}
              existing_bucket_name: ${{ secrets.AWS_BUCKET_NAME }}
              region: ap-south-1
              deployment_package: deploy.zip
```

## 🔑 Prerequisites

Before running this pipeline, ensure you have:

1.  **Elastic Beanstalk Application & Environment**

2.  **S3 Bucket for Deployment Packages**

    - This is automatically created when you set up Elastic Beanstalk.

3.  **GitHub Secrets**

    - Go to your repository → **Settings → Secrets and variables → Actions → New repository secret**

    - Add the following:

      - `AWS_ACCESS_KEY_ID`

      - `AWS_SECRET_ACCESS_KEY`

      - `AWS_APPLICATION_NAME`

      - `AWS_ENVIRONMENT_NAME`

      - `AWS_BUCKET_NAME`

## 🚀 Deployment Process

1.  Push your code to the `main` branch:

```sh
    git add .
    git commit -m "Deploy new version"
    git push origin main
```

2.  Or trigger the workflow manually from the **Actions** tab in GitHub.

3.  The workflow will:

    - Checkout your code

    - Create a `.zip` deployment package (ignoring `.git`, `node_modules`, `.env`)

    - Upload the package to the specified S3 bucket

    - Deploy it to Elastic Beanstalk

## 📂 Project Structure

```sh
    ├── .github/
    │   └── workflows/
    │       └── deploy-aws.yml          # GitHub Actions Pipeline
    ├── src/                            # Application source code
    ├── .dockerignore                   # Files/directories to ignore in Docker
    ├── .gitignore                      # Files/directories to ignore in Git
    ├── Dockerfile                      # Docker Configuration
    ├── package.json                    # Application dependencies and scripts
    ├── README.md                       # Project documentation
    └── ...                             # Other application-specific files
```

## ✅ Notes

- Update `region` in the workflow according to your AWS setup.

- Ensure your AWS IAM user has `ElasticBeanstalkFullAccess` and `S3FullAccess` permissions.
