# Miola Clothing - E-Commerce Store

A modern, responsive e-commerce platform for Miola Clothing, built with React and Node.js. Browse and shop for women's, men's, and kids' clothing with an intuitive admin panel for product management.

## 🌟 Features

### Customer Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Product Browsing** - Explore Women's, Men's, and Kids' collections with organized categories
- **Product Search** - Search products by name, price, or keywords (miola, main, women, men, kids, about us, faq, admin)
- **Product Details Modal** - View detailed product information with larger images
- **Size Selection** - Choose appropriate sizes:
  - Clothing: XS, S, M, L, XL
  - Bottoms (Jeans/Pants/Shorts): 26, 28, 32, 34, 36
  - Caps: No size needed
- **Shopping Cart** - Add products to cart, view total price, remove items
- **User Authentication** - Auth0 integration for secure login and signup
- **Checkout** - Multi-step checkout with Sri Lanka-only delivery, address fields, and mobile validation
- **Custom Notifications** - Real-time feedback with auto-dismissing notifications (3-second display)
- **Payment Methods** - Multiple card payment options with visual card images

### Admin Features
- **Product Management** - Upload, edit, and delete products
- **Category Management** - Organize products by:
  - Main Page (Featured, Trending, Sale with clothing types)
  - Women's Collection (6 categories)
  - Men's Collection (5 categories)
  - Kids' Collection (6 categories)
- **Image Upload** - Upload product images with name and price
- **Data Persistence** - All data saved to JSON file

### Additional Pages
- **Hero Section** - Eye-catching landing page
- **About Us** - Company information and location
- **FAQ** - Frequently asked questions
- **Footer** - Quick links to WhatsApp and social media

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.0
- React Router 7.9.6
- Auth0 (@auth0/auth0-react 2.11.0)
- Context API (Cart management)
- CSS3 (Responsive design)
- Axios (API calls)

**Backend:**
- Node.js
- Express.js
- File system (Data persistence)
- CORS enabled

**Data Storage:**
- JSON file-based database (data.json)

## 📋 Project Structure

```
miola-clothing/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── AdminPanel.js
│   │   │   ├── ProductModal.js
│   │   │   ├── LoginSignup.js
│   │   │   └── CSS files
│   │   ├── pages/
│   │   │   ├── MainPage.js
│   │   │   ├── WomenPage.js
│   │   │   ├── MenPage.js
│   │   │   ├── KidsPage.js
│   │   │   ├── HeroPage.js
│   │   │   ├── AboutPage.js
│   │   │   ├── FAQPage.js
│   │   │   ├── SearchPage.js
│   │   │   ├── CartPage.js
│   │   │   └── CSS files
│   ├── public/
│   │   ├── index.html
│   │   └── images/
│   └── package.json
├── backend/
│   ├── server.js
│   ├── data.json
│   ├── uploads/
│   └── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run build
npm start
```

Frontend runs on http://localhost:3000

## 📚 API Endpoints

### Product Data
- `GET /api/women-section` - Get women's collection
- `GET /api/men-section` - Get men's collection
- `GET /api/kids-section` - Get kids' collection
- `GET /api/main-section` - Get main page sections

### Product Management
- `POST /api/upload-image` - Upload new product image
- `PUT /api/update-image/:id` - Update product details
- `DELETE /api/delete-image/:id` - Delete product image

## 🎯 How to Use

### As a Customer

1. **Browse Products**
   - Visit http://localhost:3000
   - Click on Women's, Men's, or Kids' to view collections
   - Select a category to see products

2. **View Product Details**
   - Click on any product image
   - Modal opens showing larger image, name, price, and size options
   - Select size and click "Add to Cart"

3. **Shopping Cart**
   - Click cart icon in header to view cart
   - View all items with total price
   - Remove items as needed
   - Click "Buy Now" to complete purchase

4. **Search Products**
   - Use search box in header
   - Search by product name or special keywords
   - Click results to view product details

### As an Admin

1. **Access Admin Panel**
   - Click admin link in footer
   - Navigate to http://localhost:3000/admin
   - Log in using Auth0 authentication

2. **Upload Products**
   - Select section (Main Page, Women's, Men's, Kids')
   - For Main Page: Select collection and clothing type
   - For others: Select category
   - Enter product name and price
   - Upload product image
   - Click "Upload Product"

3. **Manage Products**
   - Switch to "Manage Products" tab in admin panel
   - View all products from all sections in one place
   - Click edit icon to modify product name and price
   - Click delete icon to remove product
   - See product metadata (section, category, clothing type)

4. **Edit/Delete Individual Products**
   - Switch between Main Page, Women's, Men's, or Kids' tabs
   - Edit or delete products directly from each section

## 📱 Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 900px - 1200px
- Mobile: 600px - 900px
- Small Mobile: Below 600px

## 🎨 Color Scheme

- Primary: Black (#000000)
- Secondary: White (#FFFFFF)
- Accent: Gold (#ffd700)
- Text: Black (#000000)

## 📝 Store Information

**Miola Clothing**
- Founded: March 15, 2025
- Location: In front of the Post Office, Medagama, Biblē
- Contact: WhatsApp link in footer

## 🔐 Authentication

Login/Signup modal - Click the user icon in the header to:
- **Login**: Enter email/mobile and password
- **Sign Up**: Create account with username, email, mobile, and password

## 💾 Data Persistence

All product data is saved to `backend/data.json` and persists between server restarts.

## 🐛 Troubleshooting

### Frontend won't load
- Ensure backend is running on port 5000
- Check if port 3001 is available
- Clear browser cache and refresh

### Images not loading
- Verify images are in frontend/public/images/
- Check image filenames match in code
- Ensure backend is serving uploads folder

### Admin uploads not working
- Verify all required fields are filled
- Check backend logs for errors
- Ensure backend/uploads/ directory exists

## 📄 License

This project is proprietary to Miola Clothing.

## 👥 Support

For issues or inquiries, contact via WhatsApp link in the footer.

---

**Last Updated**: January 2026
**Version**: 1.1.0
