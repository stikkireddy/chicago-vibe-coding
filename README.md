# Chicago Vibe Coding Workshop

A comprehensive demonstration of Databricks modern data stack capabilities, showcasing enterprise-grade data platform features through a hands-on coding workshop.

## Product Demo

**Premise**: SaaS IoT analytics platform hosted on Lakehouse Apps (LHA)

**User Flow**:
1. User downloads mobile app
2. App captures device gyroscope data
3. Data streams to Databricks via ZerobusSdk
4. Device registers in Lakebase
5. Real-time visualization via embedded AI/BI Genie dashboards in B2C SaaS

**Tech Stack**: React Native → FastAPI → Zerobus → Databricks UC Managed Table → AI/BI Genie embedded in NextJS based B2B SaaS app in LHA

**Value Demo**: End-to-end lakehouse platform powering real-time IoT SaaS with embedded analytics.

## Project Overview

This project demonstrates key Databricks features and capabilities:

### Databricks Features Covered

- **Zerobus** - Seamless data ingestion without traditional ETL pipelines
- **Lakehouse Platform** - Unified data architecture combining data lakes and warehouses
- **Lakehouse Apps** - Native application development and deployment within Databricks
- **AI/BI Dashboard Embedding** - Interactive dashboards with dynamic filters and embedding capabilities

### Architecture & Resources

- [Architecture Diagram](assets/architecture-diagram.png) - Visual overview of the data platform architecture
- [QR Code for Repository](assets/qr-code-for-repo.jpg) - Quick access to project repository

## Prerequisites

Before getting started, you'll need to install the following tools:

### 1. Homebrew (macOS package manager)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. pyenv (Python version management)
```bash
brew install pyenv
```

### 3. nvm (Node.js version management)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 4. Node.js
```bash
nvm install node
nvm use node
```

### 5. Databricks CLI
```bash
brew install databricks
```

### 6. tmux (Terminal multiplexer)
```bash
brew install tmux
```