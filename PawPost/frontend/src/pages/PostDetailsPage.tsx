import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../api/postsApi";
import type { AnimalPost } from "../types/post";

export function PostDetailsPage() {
  const { id } = useParams();

  const [post, setPost] = useState<AnimalPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    getPostById(id)
      .then(setPost)
      .catch(() => setError("Пост не найден"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <main className="page">
      <Link to="/" className="back-link">
        ← Назад
      </Link>

      <article className="details">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="details__image"
          />
        )}

        <span className="details__category">
          {post.category || "Без категории"}
        </span>

        <h1>{post.title}</h1>
        <p className="details__short">{post.shortDescription}</p>
        <p className="details__full">{post.fullDescription}</p>
        <p>
          {" "}
          Дата публикации:{" "}
          {new Date(post.createdAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </article>
    </main>
  );
}
