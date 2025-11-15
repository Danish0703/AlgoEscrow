# AlgoEscrow Pro: A Decentralized Escrow Toolkit

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Built for AlgoBharat](https://img.shields.io/badge/AlgoBharat-Road_to_Impact_2025-blue.svg)
![Tech: Algorand](https://img.shields.io/badge/Tech-Algorand-black.svg)

---

## 📄 Overview & Purpose

This project, **AlgoEscrow Pro**, is a production-ready, open-source toolkit for integrating secure, milestone-based payments into any Algorand dApp.

### The Problem
When two parties transact online for high-value services or goods, a fundamental trust problem exists:
* The **Client** (buyer) asks: "If I pay first, how do I know I'll get the work?"
* The **Provider** (seller) asks: "If I do the work first, how do I know I'll get paid?"

Traditional escrow services are slow (days for settlement), expensive (high fees), and centralized, creating single points of failure.

### The Solution
AlgoEscrow Pro replaces the central middleman with an autonomous, on-chain smart contract on the Algorand blockchain. By leveraging Algorand, we create an escrow system that is:

* **Fast:** Settlements complete in ~4 seconds.
* **Cheap:** Transaction fees are ~0.002Ⱥ.
* **Secure:** Funds are locked by immutable PyTeal code.
* **Transparent:** All parties can track the status of funds and milestones in real-time.

This is not a standalone application, but a **reusable toolkit (SDK)** that any developer can import to add secure escrow functionality to their platform.


---

## 🔗 Deployed Smart Contract (Testnet)

**Testnet Application ID:** `748858336`

**View on AlgoKit Lora Explorer:** **[https://lora.algokit.io/testnet/application/748858336](https://lora.algokit.io/testnet/application/748858336)**

---

## 🧠 Architecture & Components

The system is built on a robust, three-part architecture: the core smart contract, the development stack, and the conceptual workflow.

### 1. Core Smart Contract (`AlgoEscrowContract.algo.ts`)

The logic is encapsulated in the `AlgoEscrowContract`, which manages the state and flow of funds.

**Global State:**
* `buyer`: The account funding the escrow.
* `seller`: The account receiving payments.
* `arbiter`: A neutral third party to resolve disputes.
* `totalAmount`: The total value locked in the escrow.
* `releasedAmount`: The amount already paid to the seller.
* `totalMilestones`: The total number of payment tranches.
* `completedMilestones`: The number of milestones already approved.
* `status`: The current state of the escrow (e.g., `active`, `disputed`, `completed`).

**Key Functions (Components):**
* `createEscrow(buyer, seller, arbiter, totalMilestones)`: Deployed by the buyer to initialize the contract's state.
* `approveMilestone(milestoneIndex)`: Called by the buyer to approve a milestone. This triggers an automatic payment of `totalAmount / totalMilestones` to the seller.
* `openDispute()`: Called by either the buyer or seller. This freezes the contract and changes the status to `disputed`.
* `resolveDispute(releaseToSeller, refundToBuyer)`: Called *only* by the arbiter. This function distributes the *remaining* funds (`totalAmount - releasedAmount`) based on the arbiter's decision.
* `cancelAndRefund()`: Called by the buyer *only if* no funds have been released (`releasedAmount === 0`), allowing them to cancel and reclaim the total amount.
* `getStatus()`: A read-only view method to get the current state for the frontend.

### 2. Technical Stack

* **Blockchain:** **Algorand** (Layer 1)
* **Smart Contracts:** **PyTeal** / **Algorand TypeScript (puya-ts)**
* **Development Tools:** **AlgoKit**
* **SDK / Client:** **TypeScript**

### 3. Conceptual Workflow (The Three Roles)

The architecture is built around three key roles:

1.  **The Client:** Funds the escrow contract.
2.  **The Provider:** Delivers the service and receives funds as milestones are approved.
3.  **The Arbiter:** A mutually-agreed-upon tie-breaker who has **no power** unless a dispute is formally raised.

This enables two primary workflows:

* **"Happy Path":** The Client funds, the Provider works, the Client calls `approveMilestone`, and the contract automatically pays the Provider. This is repeated for all milestones.
* **"Unhappy Path":** A dispute is raised via `openDispute`. The contract is frozen. The Arbiter reviews the evidence off-chain and calls `resolveDispute` to terminate the contract and distribute the remaining locked funds.

---

## ⚙️ Setup & Installation Instructions

### Pre-requisites

Ensure the following are installed and properly configured:
* [Node.js (v22 or later)](https://nodejs.org/en/download)
* [AlgoKit CLI (v2.5 or later)](https://github.com/algorandfoundation/algokit-cli?tab=readme-ov-file#install)
* [Docker](https://www.docker.com/) (required for LocalNet)
* [Puya Compiler (v4.4.4 or later)](https://pypi.org/project/puyapy/)

### Initial Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/danish0703/algoescrow.git](https://github.com/danish0703/algoescrow.git)
    cd algoescrow
    ```

2.  **Bootstrap Your Local Environment:**
    Run the following command from the root project folder to install all dependencies.
    ```bash
    algokit project bootstrap all
    ```

3.  **Configure Environment:**
    Create a `.env.localnet` file with default configurations.
    ```bash
    algokit generate env-file -a target_network localnet
    ```

4.  **Start LocalNet:**
    Use Docker to initiate a local Algorand network.
    ```bash
    algokit localnet start
    ```

### Development Workflow

1.  **Build Contracts:**
    Compile all smart contracts.
    ```bash
    algokit project run build
    ```

2.  **Deploy to LocalNet:**
    Deploy your compiled contracts to the running local network.
    ```bash
    algokit project deploy localnet
    ```
