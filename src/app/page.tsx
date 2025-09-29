import {
  Rocket,
  Settings,
  Key,
  Zap,
  FileCode,
  CheckCircle,
  Github,
  Cloud,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl shadow-lg shadow-purple-500/50">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Dockerized Application CI/CD
            </h1>
          </div>
          <p className="text-xl text-purple-200/80 ml-16">
            Deploy to AWS Elastic Beanstalk with GitHub Actions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-12 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            This repository demonstrates how to{" "}
            <span className="text-purple-400 font-semibold">
              automatically deploy a Node.js application to AWS Elastic
              Beanstalk
            </span>{" "}
            using{" "}
            <span className="text-blue-400 font-semibold">GitHub Actions</span>.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Whenever changes are pushed to the{" "}
            <code className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
              main
            </code>{" "}
            branch (or manually triggered), a GitHub Actions workflow builds a
            deployment package and deploys it to Elastic Beanstalk.
          </p>
        </section>

        {/* Workflow Overview */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-7 h-7 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Workflow Overview</h2>
          </div>

          <div className="bg-slate-950/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 overflow-hidden">
            <p className="text-gray-300 mb-4">
              The workflow is defined in{" "}
              <code className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                .github/workflows/deploy-aws.yml
              </code>
            </p>
            <div className="bg-slate-900/80 rounded-xl p-6 overflow-x-auto border border-purple-500/20">
              <pre className="text-sm text-gray-300 font-mono">
                {`name: Deploy to AWS Elastic BeanStalk
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
          aws_access_key: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: AWS-BeanStalk-Pipeline
          environment_name: AWS-BeanStalk-Pipeline-env
          version_label: \${{ github.sha }}
          existing_bucket_name: elasticbeanstalk-ap-south-1-729468324884
          region: ap-south-1
          deployment_package: deploy.zip`}
              </pre>
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-7 h-7 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Prerequisites</h2>
          </div>

          <div className="grid gap-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-start gap-3 mb-3">
                <Cloud className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Elastic Beanstalk Application & Environment
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      Application Name:{" "}
                      <code className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                        AWS-BeanStalk-Pipeline
                      </code>
                    </li>
                    <li>
                      Environment Name:{" "}
                      <code className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                        AWS-BeanStalk-Pipeline-env
                      </code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-start gap-3 mb-3">
                <FileCode className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    S3 Bucket for Deployment Packages
                  </h3>
                  <p className="text-gray-300">
                    Example:{" "}
                    <code className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                      elasticbeanstalk-ap-south-1-729468324884
                    </code>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300">
              <div className="flex items-start gap-3 mb-3">
                <Github className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    GitHub Secrets
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <code className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-sm">
                        AWS_ACCESS_KEY_ID
                      </code>
                    </li>
                    <li>
                      <code className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-sm">
                        AWS_SECRET_ACCESS_KEY
                      </code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment Process */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-7 h-7 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">
              Deployment Process
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-gray-200 mb-3">
                    Push your code to the{" "}
                    <code className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                      main
                    </code>{" "}
                    branch:
                  </p>
                  <div className="bg-slate-900/80 rounded-xl p-4 border border-purple-500/20">
                    <pre className="text-sm text-gray-300 font-mono">
                      {`git add .
git commit -m "Deploy new version"
git push origin main`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <p className="text-gray-200">
                  Or trigger the workflow manually from the{" "}
                  <span className="font-semibold text-purple-400">Actions</span>{" "}
                  tab in GitHub.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-gray-200 mb-3">The workflow will:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Checkout your code
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Create a{" "}
                      <code className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                        .zip
                      </code>{" "}
                      deployment package
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Upload it to the specified S3 bucket
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Deploy it to Elastic Beanstalk
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileCode className="w-7 h-7 text-green-400" />
            <h2 className="text-3xl font-bold text-white">Project Structure</h2>
          </div>

          <div className="bg-slate-950/50 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="bg-slate-900/80 rounded-xl p-6 overflow-x-auto border border-green-500/20">
              <pre className="text-sm text-gray-300 font-mono">
                {`├── .github/
│   └── workflows/
│       └── deploy-aws.yml          # GitHub Actions Pipeline
├── src/                            # Application source code
├── Dockerfile                      # Docker Configuration
├── README.md                       # Project documentation
├── package.json                    # Application dependencies and scripts
├── .dockerignore                   # Files/directories to ignore in Docker
├── .gitignore                      # Files/directories to ignore in Git
└── ...                             # Other application-specific files`}
              </pre>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-7 h-7 text-green-400" />
            <h2 className="text-3xl font-bold text-white">Notes</h2>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md rounded-2xl p-6 border border-green-500/20">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-200">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Update{" "}
                  <code className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
                    application_name
                  </code>
                  ,{" "}
                  <code className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
                    environment_name
                  </code>
                  ,{" "}
                  <code className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
                    existing_bucket_name
                  </code>
                  , and{" "}
                  <code className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
                    region
                  </code>{" "}
                  in the workflow according to your AWS setup.
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Ensure your AWS IAM user has{" "}
                  <code className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
                    ElasticBeanstalkFullAccess
                  </code>{" "}
                  and{" "}
                  <code className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
                    S3FullAccess
                  </code>{" "}
                  permissions.
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 backdrop-blur-sm mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-gray-400">
          <p>Built with ❤️ for seamless CI/CD deployments</p>
        </div>
      </footer>
    </div>
  );
}
