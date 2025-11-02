

## 🌾 KrishiBridge — Smart Agro Marketplace

### *Empowering Local Farmers with AI-driven Fair Trade, Freshness, and Trust*

---

### 🌍 Overview

**KrishiBridge** is a web platform that connects **farmers, buyers, and delivery partners** through **data-driven insights and local commerce**.

Built with **React + Firebase**, it offers farmers an easy way to sell produce, buyers a transparent marketplace, and the community a sustainable ecosystem.

---

### ✨ Key Features

#### 💚 Smart & Data-Driven

* 🤖 **AI Price Recommender:** Suggests fair prices based on recent market trends.
* 🥦 **Freshness Score:** Real-time freshness indicator based on harvest time.
* 🔍 **Smart Matchmaking:** Auto-suggests nearby buyers for each farmer’s produce.

#### 🚚 Logistics & Delivery

* 🚛 **Delivery Partner Role:** Local drivers can view and claim deliveries.
* 📦 **Live Delivery Tracking:** Buyers see real-time order progress.
* 🌍 **Eco-Delivery Optimization:** Combines nearby deliveries to reduce fuel use.

#### 🏅 Farmer Empowerment

* 🏆 **Farmer Badges:** Rewards for punctuality, freshness, and consistency.
* 📚 **Learning Hub:** Daily micro-tips on sustainable farming practices.
* 💬 **Community Feed:** Farmers can share updates and connect locally.

#### 🔒 Trust & Transparency

* ✅ **Verified Fresh Badge:** Applies automatically for uploads within 24 hours.
* 🧾 **Traceability QR Code:** Buyers scan to view farm info & harvest date.
* 🪪 **Farmer Verification:** Manual ID validation handled by admin.

#### 📊 Impact & Analytics

* 📈 **Analytics Dashboard:** Tracks popular crops, order trends, and user activity.
* 🗺️ **Geo Heat Map:** Displays active farming and buying zones.
* 🌱 **Carbon Savings Tracker:** Estimates CO₂ saved by local deliveries.

---

### 🧱 Tech Stack

| Layer                | Technology                          |
| -------------------- | ----------------------------------- |
| **Frontend**         | React (JavaScript)                  |
| **Styling**          | Tailwind CSS                        |
| **State Management** | React Context / Redux Toolkit       |
| **Backend**          | Firebase (Firestore, Auth, Storage) |
| **Hosting**          | Firebase Hosting / Vercel           |
| **Payments (Mock)**  | Simulated bKash/Nagad flow          |
| **Charts & Maps**    | Recharts + Google Maps API          |
| **QR Generator**     | `react-qr-code`                     |

---

### 📂 Folder Structure

```
krishibridge/
src/
├── assets/              # Images & static assets
│   ├── fresh-produce.jpg
│   └── hero-farm.jpg
├── components/
│   └── ui/              # Reusable UI components
│       ├── BadgeDisplay.jsx
│       ├── FreshnessScore.jsx
│       └── QRTraceability.jsx
├── hooks/               # Custom React hooks
│   ├── useMobile.js
│   └── useToast.js
├── lib/                 # Utility libraries
│   └── freshness.js
├── utils.js             # Helper functions
├── pages/               # Route pages
│   ├── AdminDashboard.jsx
│   ├── Auth.jsx
│   ├── BuyerDashboard.jsx
│   ├── FarmerDashboard.jsx
│   ├── Landing.jsx
│   └── NotFound.jsx
├── App.css              # Global CSS
├── App.jsx              # Root React component
├── index.css
├── main.jsx             # ReactDOM render
└── vite-env.d.ts
```

---

### ⚙️ Setup Guide

#### 🧩 Prerequisites

* Node.js ≥ 18
* Firebase account (Firestore + Auth + Storage)
* Google Maps API key (optional for geo features)

#### 🚀 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/krishibridge.git
cd krishibridge

# Install dependencies
npm install

# Run locally
npm run dev
```

#### 🔐 Firebase Setup

1. Create a new Firebase project.

2. Enable the following:

   * Authentication → Email/Password
   * Firestore Database
   * Storage

3. Add your Firebase config in `src/services/firebase.js`:

```js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export const app = initializeApp(firebaseConfig);
```

4. Add your environment variable to `.env`:

```
VITE_FIREBASE_API_KEY=your_api_key
```

---

### 🧠 Demo Scenarios (Hackathon Tips)

| Scenario                   | What to Show                                        |
| -------------------------- | --------------------------------------------------- |
| 👨‍🌾 Farmer adds crop     | Show image upload + freshness % auto update         |
| 👩‍💼 Buyer orders produce | Display live order tracking                         |
| 🚚 Delivery partner claim  | Show “Order claimed” → status updates in buyer view |
| 🏆 Badges                  | Show “Top Farmer of the Week”                       |
| 📊 Dashboard               | Display mock analytics chart                        |

---

### 💡 Bonus Pitch Line

> “KrishiBridge uses **AI-powered insights and community-driven trust** to connect local farmers and buyers — ensuring fair prices, fresher food, and greener deliveries.”

---

### 🌟 Suggested Demo Flow

1. 🧑‍🌾 Login as Farmer → Add crop
2. 🛒 Login as Buyer → Order item
3. 🚚 Login as Delivery Partner → Claim delivery
4. 📈 Show analytics dashboard
5. 💬 End with community feed

---

### 🧑‍💻 Team KrishiBridge

| Role                 | Name | Responsibility             |
| -------------------- | ---- | -------------------------- |
| 💡 Ideation & Design | You  | UI/UX, layout, mockups     |
| 💻 Frontend Dev      | —    | React + Firebase setup     |
| 🔥 Backend           | —    | Firebase & API Integration |
| 🎤 Presenter         | —    | Hackathon Pitch            |

---

### 🏁 License

MIT License © 2025 KrishiBridge Team


