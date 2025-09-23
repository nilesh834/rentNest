🏡 RentNest

Feel at Home, Wherever You Are
A full-stack rental marketplace platform where users can list, discover, and book properties — similar to Airbnb, built with MERN stack + Cloudinary.

🚀 Tech Stack
Frontend: React.js, Redux Toolkit, Redux Persist, React Router DOM, Tailwind CSS, React Hot Toast
Backend: Node.js, Express.js, JWT Authentication, Multer + Cloudinary (image uploads), Helmet, CORS
Database & Services: MongoDB Atlas, Cloudinary (media hosting & optimization)

📦 Features
🔐 Authentication
User registration with profile picture upload (Cloudinary)
Secure login with JWT
Token expiry & auto-logout

🏡 Listings
Create, edit, and delete property listings
Upload multiple images with drag-and-drop reordering
Category & type classification
Location details (street, city, state, country)
Amenities selection

📅 Bookings
Interactive calendar with date selection
Auto price calculation (per night × days)
Secure booking with JWT

❤️ Wishlist
Toggle wishlist items
Prevent self-listing wishlists

👤 User Dashboard
Trips: Bookings made by the user
Reservations: Bookings received as host
Properties: Listings created by the user
Wishlist: Saved favorite listings
Delete account (with confirmation)


⚙️ Installation
1️⃣ Clone the repo
git clone https://github.com/your-username/rentnest.git
cd rentnest

2️⃣ Backend setup
cd backend
npm install


Create a .env file in /backend with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Run backend server:
npm start

3️⃣ Frontend setup
cd frontend
npm install


Create a .env file in /frontend with:

VITE_API_URL=http://localhost:5000

Run frontend dev server:
npm run dev



🔑 API Endpoints
Auth
POST /api/auth/register – Register user
POST /api/auth/login – Login user

Listings
POST /api/listing/create – Create listing (protected)
GET /api/listing – Get all listings
GET /api/listing/search/:search – Search listings
GET /api/listing/:listingId – Get details

Booking
POST /api/booking/create – Create booking (protected)

User
GET /api/user/:userId/trips – Get trips
GET /api/user/:userId/properties – Get property list
GET /api/user/:userId/reservations – Get reservations
PATCH /api/user/:userId/:listingId – Toggle wishlist
DELETE /api/user/:userId – Delete account
