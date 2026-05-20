# 🎨 Rangras Kala Studio — Full-Stack Website Development Prompt

---

## 🌟 Project Overview

Build a full-stack e-commerce website for **Rangras Kala Studio** — a handmade art brand specializing in:
- **Resin Art**
- **Warli Painting**
- **Handmade Crafts**
- **Custom Name Plates**
- **Coasters & Home Decor**

Tagline: *"Made with Rang-Ras-Kala"*

**Tech Stack:**
- Frontend: React.js (Vite) + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB (Mongoose)
- Auth: JWT + bcrypt
- Image Upload: Cloudinary or Multer (local)
- Payment: Razorpay (India-friendly) or Stripe

---

## 📁 Project Structure

```
rangras-kala-studio/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── ManageProducts.jsx
│   │   │       ├── AddProduct.jsx
│   │   │       ├── ManageOrders.jsx
│   │   │       └── ManageMessages.jsx
│   │   ├── context/
│   │   │   ├── CartContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   └── utils/
├── server/                  # Node.js Backend
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── authRoutes.js
│   │   └── messageRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── controllers/
│   └── server.js
```

---

## 🖥️ FRONTEND — React.js

### 🎨 Design Theme & Aesthetics

```
Design Vision: "Earthy Artisan Luxury"
- Color Palette:
    Primary:    #2C1810 (deep clay brown)
    Secondary:  #D4A853 (warm gold)
    Accent:     #E8C99A (sand beige)
    Background: #FDF6EC (warm cream)
    Text:       #1A1209 (almost black)
- Fonts:
    Display:  'Playfair Display' or 'Cormorant Garamond' (for headings)
    Body:     'DM Sans' or 'Nunito' (for readable text)
    Accent:   'Dancing Script' (for taglines/handwritten feel)
- Mood: Handcrafted, warm, artistic, traditional-meets-modern
```

### 📄 Pages to Build

#### 1. `Home.jsx` — Landing Page
- **Hero Section:** Full-screen with art background image/video, animated tagline *"Made with Rang-Ras-Kala"*, CTA button → Shop Now
- **About Snippet:** 2-line brand story with "Know More" link
- **Featured Products:** Grid of 4–6 top products (fetched from API)
- **Categories Section:** Cards for Resin Art | Warli Painting | Name Plates | Coasters | Home Decor
- **How It Works:** 3-step custom order flow (Choose → Customize → Delivered)
- **Testimonials Carousel:** Customer reviews
- **Instagram Feed Section:** Static showcase or embedded grid
- **Footer:** Logo, links, social media icons, WhatsApp button

#### 2. `Shop.jsx` — All Products
- **Filter Sidebar:**
  - Category (Resin Art, Warli, Name Plates, Coasters, Decor)
  - Price Range (slider)
  - Sort by: Newest | Price Low-High | Price High-Low | Popular
- **Product Grid:** Responsive 3-column → 2-column → 1-column
- **Search Bar** with live filtering
- **Pagination** or infinite scroll

#### 3. `ProductDetail.jsx` — Single Product Page
- Large image gallery (multiple images with zoom)
- Product name, price, description
- Category badge
- Custom Order Note field (for name plates: "Enter your name")
- Quantity selector
- "Add to Cart" + "Buy Now" buttons
- Related Products section
- WhatsApp Order button (pre-filled message)

#### 4. `Cart.jsx`
- Product list with image, name, price, qty controls
- Remove item option
- Custom note display (if any)
- Order Summary: Subtotal, Shipping, Total
- Checkout button

#### 5. `Checkout.jsx`
- Shipping Address form
- Payment Method: Razorpay / COD
- Order Review
- Place Order button

#### 6. `About.jsx`
- Brand story
- Artist/creator profile photo + bio
- "Why Handmade?" section with values
- Process photos (making of products)

#### 7. `Contact.jsx`
- Contact form (Name, Email, Message) → stored in DB
- WhatsApp direct link button
- Instagram link
- Studio address (optional)

---

## 🔒 ADMIN PANEL — `/admin`

> Protected routes — only accessible after admin login (JWT auth)

### Admin Pages:

#### `AdminLogin.jsx`
- Simple login form (Email + Password)
- JWT stored in localStorage
- Redirect to Dashboard on success

#### `Dashboard.jsx`
- Stats Cards:
  - Total Products
  - Total Orders
  - Pending Orders
  - Total Revenue
  - New Messages (unread)
- Recent Orders Table (last 5)
- Quick Action Buttons: Add Product | View Orders

#### `ManageProducts.jsx`
- Table of all products: Image | Name | Category | Price | Stock | Actions
- Actions: Edit | Delete | Toggle Active/Inactive
- Search & Filter by category
- "Add New Product" button → navigates to AddProduct

#### `AddProduct.jsx` / `EditProduct.jsx`
- Form Fields:
  - Product Name*
  - Category* (dropdown: Resin Art | Warli Painting | Name Plates | Coasters | Home Decor | Other)
  - Description* (rich text or textarea)
  - Price* (number)
  - Discounted Price (optional)
  - Stock Quantity*
  - Images* (multi-image upload, max 5)
  - Is Custom Order? (toggle — shows custom note field in product page)
  - Is Featured? (shows on homepage)
  - Is Active? (show/hide from shop)
  - Tags (comma separated)
- Submit → POST /api/products (with image upload to Cloudinary)

#### `ManageOrders.jsx`
- Table: Order ID | Customer | Products | Total | Status | Date
- Order Status dropdown: Pending → Confirmed → Shipped → Delivered → Cancelled
- View Order Details (modal)
- Export orders as CSV (bonus)

#### `ManageMessages.jsx`
- List of contact form submissions
- Mark as Read / Delete
- Reply via email link (mailto)

---

## ⚙️ BACKEND — Node.js + Express

### MongoDB Models

#### `Product.js`
```js
{
  name: String,
  category: { type: String, enum: ['resin-art','warli','name-plates','coasters','home-decor','other'] },
  description: String,
  price: Number,
  discountedPrice: Number,
  images: [String],         // Cloudinary URLs
  stock: Number,
  isCustomOrder: Boolean,
  isFeatured: Boolean,
  isActive: { type: Boolean, default: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
}
```

#### `Order.js`
```js
{
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  shippingAddress: {
    street: String, city: String, state: String, pincode: String
  },
  items: [{ product: ObjectId, quantity: Number, customNote: String, price: Number }],
  totalAmount: Number,
  paymentMethod: { type: String, enum: ['razorpay','cod'] },
  paymentStatus: { type: String, enum: ['pending','paid'], default: 'pending' },
  orderStatus: { type: String, enum: ['pending','confirmed','shipped','delivered','cancelled'], default: 'pending' },
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now }
}
```

#### `User.js` (Admin only)
```js
{
  email: String,
  password: String,  // bcrypt hashed
  role: { type: String, default: 'admin' }
}
```

#### `Message.js`
```js
{
  name: String,
  email: String,
  message: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
```

### API Routes

#### Products
```
GET    /api/products              → All active products (with filters: category, sort, search)
GET    /api/products/featured     → Featured products for homepage
GET    /api/products/:id          → Single product details
POST   /api/products              → Add product [ADMIN]
PUT    /api/products/:id          → Edit product [ADMIN]
DELETE /api/products/:id          → Delete product [ADMIN]
```

#### Orders
```
POST   /api/orders                → Create new order
GET    /api/orders                → All orders [ADMIN]
GET    /api/orders/:id            → Single order [ADMIN]
PUT    /api/orders/:id/status     → Update order status [ADMIN]
```

#### Auth
```
POST   /api/auth/login            → Admin login → returns JWT
GET    /api/auth/me               → Verify token
```

#### Messages
```
POST   /api/messages              → Submit contact form
GET    /api/messages              → All messages [ADMIN]
PUT    /api/messages/:id/read     → Mark as read [ADMIN]
DELETE /api/messages/:id          → Delete [ADMIN]
```

#### Payment (Razorpay)
```
POST   /api/payment/create-order  → Create Razorpay order
POST   /api/payment/verify        → Verify payment signature
```

---

## 🔐 Authentication Middleware

```js
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports = { protect };
```

---

## 📦 NPM Packages

### Frontend
```bash
npm install axios react-router-dom tailwindcss @headlessui/react
npm install react-hot-toast react-icons framer-motion
npm install @tanstack/react-query  # for data fetching
npm install swiper                 # for carousels
```

### Backend
```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install multer cloudinary multer-storage-cloudinary
npm install razorpay
npm install express-async-handler
```

---

## 🌟 EXTRA FEATURES TO ADD (Bonus Ideas)

| Feature | Description |
|---|---|
| 🔔 WhatsApp Order Button | Floating WhatsApp button on every page, pre-fills product name |
| 📸 Custom Order Request Form | Special form for Warli/Resin custom pieces (name, size, color pref) |
| 🎨 Product Color/Size Variants | Variant selector (e.g., coaster set of 4 or 6) |
| ⭐ Product Reviews | Customers can leave star rating + comment |
| 📧 Email Notifications | Order confirmation email via Nodemailer |
| 🎁 Coupon Codes | Admin creates discount coupons (% or flat) |
| 📱 Instagram Gallery | Auto-pull latest 9 posts via Instagram Basic Display API |
| 🖼️ Lookbook / Gallery Page | Showcase all work in a masonry photo grid |
| 🔍 SEO Meta Tags | Dynamic Open Graph tags per product |
| 📊 Admin Analytics | Revenue chart (weekly/monthly), top products |
| 🌙 Dark Mode Toggle | Warm dark cream theme for night browsing |
| 📦 Order Tracking Page | Customer enters order ID to check status |
| 💬 Live Chat Widget | Tawk.to or Crisp.chat integration (free) |
| 🗺️ Delivery Pincode Checker | User enters pincode to check delivery availability |

---

## 🚀 Deployment Suggestions

| Service | What for |
|---|---|
| **Vercel** | React frontend |
| **Railway / Render** | Node.js backend |
| **MongoDB Atlas** | Free cloud MongoDB |
| **Cloudinary** | Free image storage & CDN |
| **Razorpay** | Indian payment gateway |

---

## 📝 Environment Variables (.env)

```env
# Server
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Razorpay
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your@gmail.com
EMAIL_PASS=app_password
```

---

## ✅ Development Steps (Suggested Order)

1. Setup MongoDB Atlas + connect with Mongoose
2. Build Product model + CRUD API routes
3. Build Auth (admin login + JWT middleware)
4. Setup Cloudinary image upload
5. Build React frontend: Home → Shop → Product Detail
6. Add Cart Context (useState/useReducer)
7. Build Checkout + Razorpay integration
8. Build Admin Panel (Login → Dashboard → Products → Orders)
9. Add Contact form + Messages management
10. Polish UI, animations, mobile responsiveness
11. Deploy (Vercel + Railway + Atlas)

---

*Prompt created for Rangras Kala Studio — "Made with Rang-Ras-Kala" 🎨*
