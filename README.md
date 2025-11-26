**FolkCart: Handmade with Heritage 🛍️**
FolkCart is a full-stack e-commerce web application built on the MERN stack (MongoDB, Express, React, Node.js), designed to empower artisans — starting with the Jhargram region of West Bengal — by giving them a platform to showcase and sell their handmade products to a wider audience. It provides a modern shopping experience with secure backend services, and aims to bridge the gap between traditional craftsmanship and global demand.  

✨ **Features**

**Customer Experience (Frontend)**
- **Responsive, mobile-first UI** — built with React and Tailwind CSS, ensuring a seamless shopping experience across devices.  
- **Product Catalog & Detailed Views** — dynamic fetching of products from backend, with filtering and detailed product pages.  
- **Persistent Cart System** — shopping cart implemented with React Context + MongoDB persistence; even unauthenticated users get a unique session-based “cart save” so items are not lost.  
- **Optimized Media Delivery** — product images served via CDN (e.g. Cloudinary) for faster load times and better performance.  

**Technical Architecture (Backend)**
- **MERN Stack Core** — MongoDB for flexible data storage, Express/Node.js for the API layer.  
- **Secure, JWT-based Authentication** for all data-modifying routes (product management, orders, etc.), via custom middleware.  
- **Scalable Cloud Integration** — Media uploads/storage handled through cloud services (e.g. Cloudinary), making the app ready for real-world deployment.  
- **Auto Database Seeding** — ensures the project is instantly functional on fresh setup (ideal for demos or deployments).  

**📦 Project Structure**
The repository is structured into two main services:
/folkcart-project/
├── server/               # Backend Service (Node.js/Express)
│   ├── controller/       # Business logic (product_controller.js, admin_controller.js)
│   ├── db/               # Mongoose Schemas (productdb.js, orderdb.js)
│   ├── middleware/       # JWT Auth Middleware (auth.js)
│   ├── routes/           # API Endpoints (product_r.js, adminr.js, cart_r.js)
│   └── index.js          # Server entry point
└── frontend/             # Customer & Admin Frontend (React/TypeScript)
    ├── public/           # Static assets (including logo and vendor files)
    ├── src/              # React application source code
    │   ├── components/
    │   ├── context/      # Global state (CartContext.tsx)
    │   └── pages/        # Route components (Products.tsx, Home.tsx, Login.js)
    └── package.json

## 🎯 Why FolkCart Matters  
- **Empowers traditional artisans** — provides an accessible digital storefront for craftsmen who otherwise lack reach.  
- **Demonstrates full-stack capability** — shows proficiency in frontend (React, UI/UX), backend (Node.js/Express), database (MongoDB), cloud integration, and security.  
- **Production-ready architecture** — with authentication, cloud media handling, and persistence, the project can be deployed with minimal additional work.  
- **Scalable foundation** — The modular structure means you can extend features (e.g. admin dashboards, analytics, vendor onboarding) easily.  

## 🛠️ Tech Stack  
- **Frontend:** React + TypeScript, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Media / Storage:** Cloudinary (or any cloud-based CDN for images)  
- **Version Control:** Git / GitHub 

## 📥 Getting Started (Local Setup)  
1. ```bash  
   git clone https://github.com/Piyali439/FolkCart.git  
   cd FolkCart/server  
   npm install  
   npm start

2. ```bash
   cd ../frontend
   npm install
   npm start  
Visit http://localhost:3000 in your browser and explore the app.

## 🤝 Contributing & Collaboration

Contributions are welcome! Whether it’s improving UI/UX, adding features (like vendor onboarding, order analytics), or fixing bugs — feel free to open issues or pull requests.
If you’d like to contribute:
- **Fork the repo**
- **Create a new branch (git checkout -b feature/your-feature)**
- **Make your changes, commit, push to your branch, and open a PR**
Please ensure adherence to existing coding style, and share a short description of your changes.

## 📧 Contact / Maintainer

Created and maintained by Piyali439 — if you’d like to connect, discuss feature ideas or collaboration, feel free to reach out through GitHub.
   
