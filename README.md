# 🌌 ShopKeeper 3D — Next-Gen Spatial E-Commerce Platform & Website Builder

[![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**ShopKeeper** is an online shopping website maker and spatial e-commerce engine. It allows merchants to create animated, 3D WebGL-enhanced online storefronts with real-time backend data storage, live order feeds, a split-screen visual store builder, and AI product generation.

---

## 🌟 Key Features

### 1. 🌀 3D WebGL Spatial Product Canvas (`React Three Fiber`)
- **Live 3D Hero Scene**: Rotating holographic 3D orb with animated cyber torus rings (`MeshDistortMaterial` & `MeshWobbleMaterial`).
- **Interactive 3D Product Viewer**: Full WebGL 3D model inspector supporting mouse rotation, scroll zoom, and **Real-time Material Swaps** (*Cyber Purple, Electric Cyan, Neon Pink, Obsidian Black*).

### 2. 💎 Cyber-Spatial Neomorphic Glass Design
- Built with **Tailwind CSS v4** and CSS Variables.
- Ultra-modern dark aesthetic (`#030309`) featuring `backdrop-filter: blur(24px)`, neon gradient text (`.gradient-text-cyber`), animated iridescent borders, and ambient mesh lights.

### 3. 🎨 Visual Split-Screen Store Theme Builder (`/dashboard/builder`)
- **Live Split-Screen Workspace**: Edit store names, headlines, primary & secondary accent colors, and backdrop blur strength with a live preview.
- **Viewport Switcher**: Instantly toggle between Desktop and Mobile preview modes (`w-full` vs `w-[385px]`).

### 4. 🤖 AI Product & SEO Auto-Fill Assistant (`/api/ai/generate-product`)
- **✨ AI Auto-Fill**: Click inside the *Add Product Modal* to automatically write 3D spatial product descriptions, calculate suggested pricing, stock levels, and SEO keywords based on a product name.

### 5. 📊 Merchant Admin Control Center (`/dashboard`)
- **Real-Time KPIs**: Total Revenue, Orders Today, Active Customers, and Conversion Rate with trend indicators.
- **Recharts Revenue Chart**: Interactive area chart with gradient fills.
- **Live Order Stream (`/dashboard/orders`)**: Real-time order status monitor with click-to-expand line item details.
- **Product Inventory (`/dashboard/products`)**: Product grid with status badges (*Active, Draft, Out of Stock*) and modal uploads.
- **Customer Directory (`/dashboard/customers`)**: Lifetime spend stats and avatar initial badges.
- **Store Settings (`/dashboard/settings`)**: Tabbed store branding, Stripe payment integration, notifications, and team roles.

### 6. 🛒 Dynamic Generated Storefront (`/store/[slug]`)
- **Store Homepage (`/store/[slug]`)**: Dynamic hero, category grid (*Electronics, Fashion, Home & Living, Accessories*), and product cards with hover lift.
- **Product Detail (`/store/[slug]/product/[id]`)**: Interactive 3D viewer, quantity selector, star ratings, and review breakdowns.
- **Persistent Shopping Cart (`/store/[slug]/cart`)**: Powered by **Zustand** with `localStorage` sync, line-item removal, and tax/shipping calculations.
- **Multi-Step Checkout (`/store/[slug]/checkout`)**: 3-step wizard (*Shipping Address → Payment Method → Order Review & Confirmation*).

---

## 🏗️ Architecture & Tech Stack

```
shopkeeper/
├── app/
│   ├── (auth)/                # Login & Signup pages
│   ├── api/ai/                # AI Product & SEO Generator route
│   ├── dashboard/             # Merchant Admin Dashboard
│   │   ├── builder/           # Visual Split-Screen Store Builder
│   │   ├── customers/         # Customer Relationship Directory
│   │   ├── orders/            # Real-Time Order Stream
│   │   ├── products/          # Product Catalog & AI Modal
│   │   └── settings/          # Store & Payment Settings
│   ├── store/[slug]/          # Dynamic Generated Storefronts
│   │   ├── cart/              # Shopping Cart Page
│   │   ├── checkout/          # 3-Step Checkout Wizard
│   │   └── product/[id]/      # 3D Interactive Product Page
│   ├── globals.css            # Neomorphic Glass & Neon CSS System
│   └── page.tsx               # 3D WebGL Landing Page
├── components/
│   └── three/                 # R3F WebGL Components (HeroScene, ProductViewer)
├── lib/
│   ├── store/cart.ts          # Zustand Cart Store with LocalStorage Persistence
│   └── supabase/              # Supabase SSR Browser/Server Clients & Actions
└── supabase/
    └── schema.sql             # 1-Click PostgreSQL Database Migration & RLS Script
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/FinnSkers/shopkeeper.git
cd shopkeeper
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
STRIPE_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
```

### 3. Run 1-Click Database Migration (Supabase)
Execute `supabase/schema.sql` in your [Supabase SQL Editor](https://supabase.com/dashboard) to create the tables (`stores`, `products`, `orders`, `order_items`), set up Row Level Security (RLS), and populate seed data.

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🧪 Production Verification

To build for production using Turbopack:

```bash
npm run build
```

---

## 📄 License

Distributed under the MIT License.
