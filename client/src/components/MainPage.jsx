import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import BooksList from "../pages/BookList";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      {/* <Header /> */}
      <BooksList/>
    </div>
  );
};

export default MainPage;
