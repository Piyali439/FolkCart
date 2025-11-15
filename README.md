**FolkCart: Handmade with Heritage**
FolkCart is a full-stack e-commerce solution developed to connect local artisans from the Jhargram region of West Bengal with a global market. Built on the MERN (MongoDB, Express, React, Node.js) stack, the platform offers a robust, modern shopping experience and a secure system for managing products and sales data.

✨ **Features**

**Customer Experience (Frontend)**
Responsive Design: Fully adaptive UI built with React and Tailwind CSS for mobile-first shopping.
Database-Driven Cart: Utilizes React Context combined with MongoDB persistence (/cart/save) to ensure shopping cart data is saved instantly, even for unauthenticated users (via unique sessionId).
Product Catalog: Dynamic product fetching from the backend, featuring filtering and detailed product views.
Optimized Media: Product images are loaded directly from a CDN (Cloudinary) for fast performance.

**Technical Architecture (Backend)**
MERN Stack: Utilizes MongoDB for flexible data storage, Express/Node.js for a performant API layer.
Secure Endpoints: All data manipulation routes (CRUD functions for inventory) are secured using JWT (JSON Web Token) authentication via custom middleware.
Cloud Integration: Seamless integration with Cloudinary for scalable, secure storage and delivery of product images.
Data Consistency: Implemented automatic database seeding to ensure the platform is instantly functional upon deployment.


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

