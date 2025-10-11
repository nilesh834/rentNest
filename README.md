
# 🏡 RentNest
Feel at Home, Wherever You Are
A full-stack rental marketplace platform where users can list, discover, and book properties — similar to Airbnb, built with MERN stack + Cloudinary.

## 🚀 Tech Stack  

**Frontend**
  - React.js  
  - Redux Toolkit  
  - Redux Persist  
  - React Router DOM  
  - Tailwind CSS  
  - React Hot Toast  

**Backend**
  - Node.js  
  - Express.js  
  - JWT Authentication  
  - Multer + Cloudinary (image uploads)  
  - Helmet  
  - CORS  

**Database & Services**
  - MongoDB Atlas  
  - Cloudinary (media hosting & optimization)

## 📦 Features
### 🔐 Authentication  
- User registration with profile picture upload (Cloudinary)  
- Secure login with JWT  
- Token expiry & auto-logout  

### 🏡 Listings  
- Create, edit, and delete property listings  
- Upload multiple images with drag-and-drop reordering  
- Category & type classification  
- Location details (street, city, state, country)  
- Amenities selection  

### 📅 Bookings  
- Interactive calendar with date selection  
- Auto price calculation (per night × days)  
- Secure booking with JWT  

### ❤️ Wishlist  
- Toggle wishlist items  
- Prevent self-listing wishlists  

### 👤 User Dashboard  
- Trips: Bookings made by user  
- Reservations: Bookings received as host  
- Properties: Listings created by user  
- Wishlist: Saved favorite listings  
- Delete account (with confirmation)  
  
## ⚙️ Installation  

1️⃣ **Clone the repository**  
```bash
  git clone https://github.com/your-username/rentnest.git
  cd rentnest
```
2️⃣ **Backend setup**
```bash
  cd backend
  npm install
```
Create a `.env` file in `/backend` with:
```env
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  PORT=5000
  CLIENT_URL=http://localhost:5173

  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Run backend server:
```bash
  npm run dev
```


3️⃣ **Frontend setup**
```bash
  cd frontend
  npm install
```
Create a `.env` file in `/frontend` with:
```env
  VITE_API_URL=http://localhost:5000
```
Run frontend dev server:
```bash
  npm run dev
```

## 🔑 API Endpoints  

### 🔐 Auth  
- `POST /api/auth/register` – Register user  
- `POST /api/auth/login` – Login user  

### 🏡 Listings  
- `POST /api/listing/create` – Create listing *(protected)*  
- `GET /api/listing` – Get all listings  
- `GET /api/listing/search/:search` – Search listings  
- `GET /api/listing/:listingId` – Get listing details  

### 📅 Booking  
- `POST /api/booking/create` – Create booking *(protected)*  

### 👤 User  
- `GET /api/user/:userId/trips` – Get trips  
- `GET /api/user/:userId/properties` – Get property list  
- `GET /api/user/:userId/reservations` – Get reservations  
- `PATCH /api/user/:userId/:listingId` – Toggle wishlist  
- `DELETE /api/user/:userId` – Delete account  

## 🎨 Screenshots
<p align="center">
<img width="700" height="1150" alt="Image11" src="https://github.com/user-attachments/assets/14be3ce0-8c91-431a-a608-86508f610789" />
<img width="700" height="1150" alt="Image12" src="https://github.com/user-attachments/assets/db710364-48c4-4844-9b4f-cce35ae7595f" />
<img width="700" height="1150" alt="Image13" src="https://github.com/user-attachments/assets/868cb20e-1533-423e-9f89-3f195261566a" />
<img width="700" height="1150" alt="Image14" src="https://github.com/user-attachments/assets/72c9474c-03cd-43bf-90c7-cfb4b1c345f8" />
</p>


## 👨‍💻 Author  

**RentNest** – Built with ❤️ to help people feel at home anywhere.
