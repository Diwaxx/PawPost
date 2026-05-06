import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { Link, Route, Routes } from "react-router-dom";
import { PostDetailsPage } from "./pages/PostDetailsPage";
import { AdminPage } from "./pages/AdminPage";
import { CreatePostPage } from "./pages/CreatePostPage";
import { EditPostPage } from "./pages/EditPostPage";

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
        <Route path="/admin" element={<AdminPage/>}></Route>
        <Route path="/admin/create" element={<CreatePostPage/>}></Route>
        <Route path="/admin/edit/:id"element={<EditPostPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
