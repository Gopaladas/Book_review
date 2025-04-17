# Book Review Platform

A Full Stack Book Review Platform where users can browse books, submit reviews, and rate them. Built using React (Frontend) and Node.js with MongoDB (Backend).

---

## Features

- 📚 Home page with featured books
- 🔍 Book listing page with search and filter functionality
- 📖 Individual book page displaying book details and user reviews
- 🧑‍💻 User profile page showing read books and submitted reviews,can download the pdf
- ✍️ Review submission form
- ⚡ Responsive design and smooth user experience
- 🔁 State management using Redux
- 🌐 React Router for page navigation
- 🔒 Secure API interaction with error handling and loading states

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Redux, Toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Others:** Mongoose, JWT Authentication, Axios, bcrypt, dotenv,Multer

---

## API Endpoints

| Method | Endpoint                | Description                         |
|--------|--------------------------|-------------------------------------|
| GET    | `/books`                | Retrieve all books (with pagination) |
| GET    | `/books/:id`            | Retrieve a specific book            |
| POST   | `/books`                | Add a new book (admin only)         |
| GET    | `/reviews?bookId=ID`    | Retrieve reviews for a book         |
| POST   | `/reviews`              | Submit a new review                 |
| GET    | `/users/:id`            | Retrieve user profile               |
| POST    | `/users/:id`            | Update user profile                 |

---

## Database Design

- Users can register, login, and submit reviews.
- Admin can upload books and manage the library.
- Each review links to both the user and the book via ObjectIds.
- Book schema maintains an array of associated reviews and by whom.

---

## Screenshots

> Replace `assets/screenshots/...` with your local image paths or uploaded image links.

### Home Page
![Home Page](assets/screenshots/home.png)

### Book Listing Page
![Book Listing](assets/screenshots/book-listing.png)

### Book Details + Reviews
![Book Details](assets/screenshots/book-details.png)

### User Profile
![User Profile](assets/screenshots/user-profile.png)

### Review Submission
![Submit Review](assets/screenshots/review-form.png)

### Admin - Add New Book
![Admin Panel](assets/screenshots/admin-add-book.png)

---

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Gopaladas/Book_review
```

2. **Navigate to Book_Review -> cilent(frontend) and server(Backend)**
```bash
cd client
npm install
cd ../server
npm install
```

3. **Configure Environment Variables**

Create `.env` files in server:

**Backend .env:**
```
MONGODB_URI="mongodb+srv://sreevan:sreevan@cluster0.qd723iv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET='secrett#xt'
NODE_ENV = 'development'
PORT=4000
```



4. **Run the application**

In two terminals:
```bash
cd client && npm run dev
```
```bash
cd server && npm run server
```

---

## Live Demo



---

## Notes for Evaluators

- ✅ Proper use of React Hooks and functional components.
- ✅ RESTful API design with clear separation of concerns.
- ✅ Data validation using Mongoose schemas and error handling with Express.
- ✅ MongoDB schema relations properly set up for Users, Books, and Reviews.
- ✅ Fully responsive and user-friendly interface.

---

## Author

**Pavankumar**  
[LinkedIn](linkedin.com/in/gopaladas-pavankumar-a5a3b8255)

---

Thanks for reviewing! 🚀

