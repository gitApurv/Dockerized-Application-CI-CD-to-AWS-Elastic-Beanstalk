import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dockerized Application CI/CD to AWS Elastic Beanstalk",
  description:
    "This project demonstrates how to automatically deploy a Node.js application to AWS Elastic Beanstalk using GitHub Actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
