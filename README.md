# 🛒 Zidio - Starry Heroes eCommerce Website

Zidio is a modern eCommerce web application dedicated to selling superhero-themed T-shirts. Built with **React.js** and **Tailwind CSS** for a sleek and responsive UI, and backed by **MongoDB** for robust data management.

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose)
- **Package Manager**: npm

---

## 📸 Features

- 👕 Browse a wide selection of superhero T-shirts
- 🔍 Search and filter products
- 🛒 Add to cart and checkout system
- 🧾 Order summary
- 🔐 User authentication (optional if implemented)
- 🎨 Fully responsive and mobile-friendly UI

---

## 🛠️ Installation & Running the App

Make sure you have **Node.js** and **MongoDB** installed and running.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/zidio-ecommerce.git
cd zidio-ecommerce
v
install the node module packages
2. Install dependencies
**npm install**

3. Run the development server
**npm run dev**

This will start the development server. Visit http://localhost:5173 (or as specified) in your browser.

Note: If using Vite for React development, ensure vite is configured properly in package.json.

⚙️ MongoDB Setup
If you're using a cloud-based MongoDB (MongoDB Atlas):

Create a cluster at https://www.mongodb.com/cloud/atlas

Add your connection string to a .env file as follows:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/zidio?retryWrites=true&w=majority
Ensure your backend connects to MongoDB using mongoose.connect(process.env.MONGO_URI).

