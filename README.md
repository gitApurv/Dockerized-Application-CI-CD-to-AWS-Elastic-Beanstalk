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
            application_name: AWS-BeanStalk-Pipeline
            environment_name: AWS-BeanStalk-Pipeline-env
            version_label: ${{ github.sha }}
            existing_bucket_name: elasticbeanstalk-ap-south-1-729468324884
            region: ap-south-1
            deployment_package: deploy.zip
```

## 🔑 Prerequisites

Before running this pipeline, ensure you have:

1.  **Elastic Beanstalk Application & Environment**

    - Example:

      - Application Name: `AWS-BeanStalk-Pipeline`

      - Environment Name: `AWS-BeanStalk-Pipeline-env`

    - Must already exist in AWS.

2.  **S3 Bucket for Deployment Packages**

    - Example: `elasticbeanstalk-ap-south-1-729468324884`

    - This is automatically created when you set up Elastic Beanstalk.

3.  **GitHub Secrets**

    - Go to your repository → **Settings → Secrets and variables → Actions → New repository secret**

    - Add the following:

      - `AWS_ACCESS_KEY_ID`

      - `AWS_SECRET_ACCESS_KEY`

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
    ├── public/                         # Static assets
    ├── src/                            # Application source code
    ├── Dockerfile                      # Docker Configuration
    ├── README.md                       # Project documentation
    ├── package.json                    # Application dependencies and scripts
    ├── .gitignore                      # Files/directories to ignore in Git
    └── ...                             # Other application-specific files
```

## ✅ Notes

- Update `application_name`, `environment_name`, `existing_bucket_name`, and `region` in the workflow according to your AWS setup.

- Ensure your AWS IAM user has `ElasticBeanstalkFullAccess` and `S3FullAccess` permissions.
