import { useEffect, useState } from "react";
import { getPosts } from "../api/postsApi";
import { PostCard } from "../components/PostCard";
import type { AnimalPost } from "../types/post";

export function HomePage() {
  const [posts, setPosts] = useState<AnimalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError("Не удалось загрузить посты"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="page">
      <section className="hero">
        <h1>PawPost</h1>
        <p>Каталог постов про животных</p>
      </section>

      <section className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}