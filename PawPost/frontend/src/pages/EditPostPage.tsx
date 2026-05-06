import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../api/postsApi";
import { PostForm } from "../components/PostForm";
import type { AnimalPost } from "../types/post";

type FormData = Omit<AnimalPost, "id" | "createdAt">;

export function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<AnimalPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getPostById(id)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate(data: FormData) {
    if (!id) return;

    await updatePost(Number(id), data);
    navigate("/admin");
  }

  if (loading) return <p>Загрузка...</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <main className="page">
      <h1>Редактировать пост</h1>

      <PostForm
        submitText="Сохранить изменения"
        initialData={{
          title: post.title,
          shortDescription: post.shortDescription,
          fullDescription: post.fullDescription,
          imageUrl: post.imageUrl,
          category: post.category,
        }}
        onSubmit={handleUpdate}
      />
    </main>
  );
}