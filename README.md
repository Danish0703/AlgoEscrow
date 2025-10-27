# AlgoEscrow Pro: A Decentralized Escrow Toolkit

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Built for AlgoBharat](httpshttps://img.shields.io/badge/AlgoBharat-Road_to_Impact_2025-blue.svg)
![Tech: Algorand](https://img.shields.io/badge/Tech-Algorand-black.svg)

**AlgoEscrow Pro** is a production-ready, open-source toolkit for integrating secure, milestone-based payments into any Algorand dApp. It provides a robust, smart-contract-based system for trustless transactions, complete with real-time tracking and a built-in dispute resolution mechanism.

This project was built for the **AlgoBharat Road to Impact 2025** hackathon.

---

## Table of Contents

* [1. The Problem: The Trust Gap in Digital Transactions](#1-the-problem-the-trust-gap-in-digital-transactions)
* [2. The Solution: A Trustless, On-Chain Toolkit](#2-the-solution-a-trustless-on-chain-toolkit)
* [3. Core Concepts: A Detailed Explanation](#3-core-concepts-a-detailed-explanation)
    * [The Three Key Roles](#the-three-key-roles)
    * [The "Happy Path" Workflow](#the-happy-path-workflow)
    * [The "Unhappy Path": Dispute Resolution](#the-unhappy-path-dispute-resolution)
* [4. Key Features](#4-key-features)
* [5. Technical Architecture (Tech Stack)](#5-technical-architecture-tech-stack)
* [6. Quick Start Guide](#6-quick-start-guide)
    * [Installation](#installation)
    * [Example: Creating and Managing an Escrow](#example-creating-and-managing-an-escrow)
* [7. Project Goals & Vision](#7-project-goals--vision)
* [8. License](#8-license)

---

## 1. The Problem: The Trust Gap in Digital Transactions

When two parties transact online—especially for high-value services or goods—a fundamental trust problem exists:

* The **Client** (buyer) asks: "If I pay first, how do I know I'll get the work?"
* The **Provider** (seller) asks: "If I do the work first, how do I know I'll get paid?"

Traditional escrow services solve this by acting as a "trusted" central middleman. However, this model is slow (days for settlement), expensive (high fees), and centralized (subject to censorship, single points of failure, and human error).

## 2. The Solution: A Trustless, On-Chain Toolkit

**AlgoEscrow Pro** replaces the central middleman with an autonomous, on-chain smart contract on the Algorand blockchain.

By leveraging Algorand, we can create an escrow system that is:
* **Fast:** Settlements complete in ~4 seconds.
* **Cheap:** Transaction fees are fractions of a cent (~0.002Ⱥ).
* **Secure:** Funds are locked by immutable PyTeal code, not a fallible company.
* **Transparent:** All parties can track the status of the funds and milestones in real-time on the blockchain.

This is not a standalone application, but a **reusable toolkit (SDK)** that any developer can import to add secure escrow functionality to their freelance platform, P2P marketplace, or service app in minutes.

## 3. Core Concepts: A Detailed Explanation

To provide a robust solution, the system is designed around three key roles and two primary workflows (the "happy path" and the "unhappy path").

### The Three Key Roles

1.  **The Client:** The party paying for a service or good. They fund the escrow contract.
2.  **The Provider:** The party delivering the service or good. They receive funds as milestones are approved.
3.  **The Arbiter:** A mutually-agreed-upon third party who acts as a tie-breaker. The Arbiter **has no power or role** in the normal workflow and only gains the ability to intervene if a dispute is formally raised.

### The "Happy Path" Workflow (Standard Operation)

This is the most common use case, where the transaction proceeds without any issues.

1.  **Step 1: Creation & Funding**
    * The **Client** and **Provider** agree on the terms: a set of milestones, a payment for each, and a trusted **Arbiter**.
    * The **Client** calls the `create_escrow` function, deploying a unique smart contract instance that stores these terms.
    * The **Client** then funds the contract with the *total* amount for all milestones. The funds are now locked and verifiably held by the code.

2.  **Step 2: Work & Submission**
    * The **Provider** completes the work for the first milestone.
    * They submit their work (e.g., a link to a design, or a hash of a deliverable) by calling the `submit_milestone` function. The contract's state is updated to "Pending Approval."

3.  **Step 3: Approval & Release**
    * The **Client** reviews the submitted work.
    * If satisfied, the **Client** calls the `approve_milestone` function.
    * The smart contract *immediately and automatically* triggers an atomic transaction, releasing the funds for that specific milestone to the **Provider's** wallet.

4.  **Step 4: Repeat & Complete**
    * Steps 2 and 3 are repeated for all remaining milestones.
    * Once the final milestone is approved, the contract's balance is zero, and the engagement is complete.

### The "Unhappy Path": Dispute Resolution

This workflow activates if there is a disagreement.

1.  **Step 1: Raise Dispute**
    * A **Provider** submits work, but the **Client** is unsatisfied and refuses to approve it.
    * Either party can call the `raise_dispute` function.
    * The contract's state is immediately frozen, preventing any further fund releases or withdrawals.

2.  **Step 2: Arbiter Review**
    * The **Arbiter** is now notified (via an off-chain mechanism, like an email or in-app message).
    * The **Arbiter** reviews the evidence from both parties (e.g., chat logs, deliverable hashes, project requirements).

3.  **Step 3: Resolution**
    * After making a decision, the **Arbiter** calls the `resolve_dispute` function.
    * The Arbiter has the sole power to decide the fate of the *remaining* locked funds. They can choose to:
        * **Release to Provider:** Award the funds for the disputed milestone (and any remaining) to the Provider.
        * **Refund to Client:** Return all remaining locked funds to the Client.
        * **Split Funds:** (If supported by contract logic) Split the funds based on a partial completion percentage.
    * The contract executes the Arbiter's decision, and the engagement is terminated.

## 4. Key Features

* **Milestone Management:** Break large projects into multiple, verifiable payment tranches.
* **Real-time Status Tracking:** A live, reactive SDK gives both parties instant updates on escrow state (e.g., `Pending Deposit`, `Work Submitted`, `Dispute Raised`).
* **On-Chain Dispute Resolution:** A robust arbitration system that gives a trusted third party power *only* when a dispute is active.
* **Secure Smart Contracts:** Battle-tested PyTeal contracts featuring role-based access control, time-locked releases, and atomic transactions.
* **Developer-First SDK:** A clean TypeScript SDK that abstracts away the complexity of application calls and state management.

## 5. Technical Architecture (Tech Stack)

* **Blockchain:** **Algorand** (Layer 1)
    * *Why?* For its ~4-second finality, micro-cent fees, and atomic transaction capabilities, which are essential for complex workflows.
* **Smart Contracts:** **PyTeal**
    * *Why?* A powerful Python-based language for writing secure and stateful Algorand smart contracts.
* **Development Tools:** **AlgoKit**
    * *Why?* For a streamlined development, testing, and deployment pipeline.
* **SDK:** **TypeScript**
    * *Why?* To provide a type-safe, easy-to-use library for front-end and back-end developers to integrate the protocol.



## 6\. Project Goals & Vision

This project was built for the AlgoBharat Hackathon to demonstrate a real-world, production-ready, and reusable toolkit. The goal is to lower the barrier for developers to build safer, more trustworthy applications on Algorand.

This code is fully open-source, and we encourage community contributions to add features like:

  * Batch milestone approvals.
  * Integration with on-chain identity systems.
  * Advanced arbiter-splitting logic.

## 7\. License

This project is released under the **MIT License**.

