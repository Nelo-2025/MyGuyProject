<p align="center">
  <img src="./public/mg-logo.png" alt="MyGuy Logistics" width="260" />
</p>

<h1 align="center">MyGuy Logistics — Admin Dashboard</h1>

<p align="center">
  The operational dashboard for MyGuy, a local quick-commerce platform being developed to connect customers with local stores along the Marian Corridor in Calabar, Nigeria.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061a23" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## Contents

* [About](#about)
* [MyGuy Product Vision](#myguy-product-vision)
* [My Contribution](#my-contribution)
* [Screenshot](#screenshot)
* [Features & Routes](#features--routes)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Current Status](#current-status)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

## About

**MyGuy** is a local quick-commerce platform being developed to connect buyers with local stores along the **Marian Corridor in Calabar, Nigeria**, with a target delivery promise of under 30 minutes.

The platform is designed to create a new digital channel through which participating local stores can reach customers beyond their immediate physical locations.

This repository contains the **MyGuy administrative dashboard** — the operational interface being developed to support the business as it moves toward launch.

The dashboard brings key operational activities into one system, including:

* Vendor management
* Order monitoring
* Rider fleet coordination
* Delivery performance monitoring
* Financial activity and reporting
* Operational performance indicators

The dashboard is designed as the operational backbone through which the MyGuy team can manage the vendor and rider side of the marketplace as the platform develops.

> **Project status:** MyGuy is currently in the **pre-launch stage** and remains in active development. The dashboard is an ongoing part of the product development process and continues to evolve alongside the wider MyGuy platform.

## MyGuy Product Vision

MyGuy is being developed around a simple operational challenge: enabling customers in the Marian Corridor to discover and purchase everyday goods from local stores through a digital marketplace, with delivery coordinated through a local rider network.

The intended model connects:

**Customers → MyGuy platform → Local stores → Delivery riders**

The platform aims to make local stores more digitally accessible while providing an operational system for coordinating orders and deliveries.

The administrative dashboard provides the internal infrastructure required to manage these activities.

## My Contribution

The MyGuy administrative dashboard was developed as a core technical contribution to the MyGuy platform.

The work involved designing and implementing the dashboard architecture and building the major operational interfaces required to support the marketplace.

Key areas developed include:

### Vendor Operations

A central vendor management interface for organising participating stores and monitoring their operational information, including:

* Vendor status
* Vendor tier
* Order activity
* Revenue information
* Ratings
* Account status

### Order Operations

An operational view for monitoring orders and their progress through the delivery process, including:

* Order volume
* Order status
* Delivery performance indicators
* Dispatch acceptance
* Average delivery time
* Operational issue identification

### Rider Operations

A rider fleet interface designed to provide visibility across the delivery network, including:

* Rider status
* Vehicle type
* Trips completed
* Acceptance rate
* Delivery latency
* Online/offline availability

### Financial Operations

A finance interface bringing key financial indicators into the same operational system, including:

* Gross merchandise value
* Platform revenue
* Pending payouts
* Revenue categories
* Transaction activity

The dashboard was developed in an environment where requirements were evolving. The implementation therefore involved translating the operational requirements of the MyGuy business model into a structured digital interface and making implementation decisions as the product continued to develop.

## Screenshot

<p align="center">
  <img src="./ImageDesign/LoginDesign.png" alt="MyGuy Logistics administrative dashboard login" width="480" />
</p>

## Features & Routes

The dashboard uses a shared `AdminShell` layout across authenticated operational pages, providing consistent navigation across desktop and mobile interfaces.

| Page             | Route                                | Purpose                                                                       |
| ---------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| Login            | `/`                                  | Administrative authentication interface                                       |
| Overview         | `/overview`, `/orders`, `/dashboard` | Operational KPIs, order activity, revenue indicators and delivery performance |
| Vendors          | `/vendors`                           | Vendor registry, vendor status, order activity, revenue and ratings           |
| Riders           | `/riders`                            | Rider fleet visibility, delivery performance and availability                 |
| Finance          | `/finance`                           | Revenue, GMV, payouts and transaction information                             |
| Forgot Password  | `/forgot-password`                   | Password recovery interface                                                   |
| Support          | `/support`                           | Operational support centre                                                    |
| Privacy Policy   | `/privacy-policy`                    | Privacy information                                                           |
| Terms of Service | `/terms-of-service`                  | Terms of service                                                              |

## Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| UI         | React 19                      |
| Language   | TypeScript                    |
| Build tool | Vite 8                        |
| Routing    | React Router 7                |
| Charts     | Recharts                      |
| Linting    | ESLint 10 + typescript-eslint |

## Project Structure

```text
src/
├── App.tsx                  # Application route definitions
├── main.tsx                 # Application entry point
├── Pages/
│   ├── Overview.tsx         # Operational overview and order monitoring
│   ├── Vendors.tsx          # Vendor management
│   ├── Riders.tsx           # Rider fleet operations
│   ├── Finance.tsx          # Financial operations and transaction view
│   ├── Login.tsx            # Administrative authentication
│   ├── ForgotPassword.tsx   # Password recovery
│   ├── Support.tsx          # Support centre
│   ├── TermsOfService.tsx   # Terms of service
│   ├── PrivacyPolicy.tsx    # Privacy policy
│   └── Component/
│       ├── AdminShell.tsx   # Shared dashboard layout
│       ├── SystemTopBar.tsx # Dashboard top bar
│       ├── MyButton.tsx     # Reusable button component
│       └── navigation.ts    # Navigation definitions
└── assets/
```

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) 18+ and npm

### Installation

```bash
git clone https://github.com/Nelo-2025/MyGuyProject.git
cd MyGuyProject
npm install
```

### Development

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### Build

```bash
npm run build
```

Compiles the TypeScript application and produces the build output in `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Current Status

MyGuy is currently **pre-launch and in active development**.

The administrative dashboard represents an important part of the product's operational infrastructure and is continuing to evolve alongside the wider MyGuy platform.

The current repository focuses on the dashboard experience and operational workflows. Backend integration and additional production functionality will be introduced as the wider platform progresses toward launch.

## Roadmap

The planned development direction includes:

* [ ] Connect the dashboard to the MyGuy backend/API
* [ ] Integrate live authentication
* [ ] Integrate live order data
* [ ] Integrate vendor data
* [ ] Integrate rider and delivery data
* [ ] Integrate financial data
* [ ] Introduce real-time order updates
* [ ] Implement role-based access control
* [ ] Implement rider assignment and dispatch actions
* [ ] Implement vendor onboarding and approval workflows
* [ ] Continue refining the operational dashboard as MyGuy progresses toward launch

## Contributing

This repository represents an active development project.

For larger changes, please discuss the proposed approach before implementation. Contributions should maintain the existing TypeScript and React architecture and preserve consistency across the operational dashboard.

## License

Licensed under the [MIT License](./LICENSE).
