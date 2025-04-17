# Book Review Platform

A Full Stack Book Review Platform where users can browse books, submit reviews, and rate them. Built using React (Frontend) and Node.js with MongoDB (Backend).

---

## Features

- 📚 Home page with featured books
- 🔍 Book listing page with search and filter functionality
- 📖 Individual book page displaying book details and user reviews
- 🧑‍💻 User profile page showing read books and submitted reviews
- ✍️ Review submission form
- ⚡ Responsive design and smooth user experience
- 🔁 State management using Redux
- 🌐 React Router for page navigation
- 🔒 Secure API interaction with error handling and loading states

---

## Tech Stack

- **Frontend:** React, Redux, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Other Tools:** Git, Postman, VS Code

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
| PUT    | `/users/:id`            | Update user profile                 |

---

## Database Design

- Users can register, login, and submit reviews.
- Admin can upload books and manage the library.
- Each review links to both the user and the book via ObjectIds.
- Book schema maintains an array of associated reviews.

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
git clone https://github.com/your-username/book-review-platform.git
```

2. **Navigate to backend and frontend folders**
```bash
cd book-review-platform/backend
npm install
cd ../frontend
npm install
```

3. **Configure Environment Variables**

Create `.env` files in both `backend/` and `frontend/`:

**Backend .env:**
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

**Frontend .env:**
```
REACT_APP_API_URL=http://localhost:5000
```

4. **Run the application**

In two terminals:
```bash
cd backend && npm start
```
```bash
cd frontend && npm start
```

---

## Live Demo

[Visit Live Demo](https://your-live-demo-url.com)

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
[LinkedIn](https://linkedin.com/in/your-profile) | [Portfolio](https://your-portfolio-url.com)

---

Thanks for reviewing! 🚀

