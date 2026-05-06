import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { Link, Route, Routes } from "react-router-dom";
import { PostDetailsPage } from "./pages/PostDetailsPage";

function App() {
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          PawPost
        </Link>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/admin">Админка</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
