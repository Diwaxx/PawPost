import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postsApi";
import { PostForm } from "../components/PostForm";
import type { AnimalPost } from "../types/post";

type FormData = Omit<AnimalPost, "id" | "createdAt">;

export function CreatePostPage() {
  const navigate = useNavigate();

  async function handleCreate(data: FormData) {
    await createPost(data);
    navigate("/admin");
  }

  return (
    <main className="page">
      <h1>Добавить пост</h1>

      <PostForm submitText="Создать пост" onSubmit={handleCreate} />
    </main>
  );
}