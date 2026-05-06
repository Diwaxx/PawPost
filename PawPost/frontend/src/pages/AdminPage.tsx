import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getPosts } from "../api/postsApi";
import type { AnimalPost } from "../types/post";

export function AdminPage() {
  const [posts, setPosts] = useState<AnimalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  async function loadPosts() {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      setError("Не удалось загрузить посты");
    }
  }

  async function handleDelete(id: number) {
    const confirmed = confirm("Удалить этот пост?");

    if (!confirmed) return;

    await deletePost(id);
    await loadPosts();
  }

  useEffect(() => {
    loadPosts().finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <main className="page">
      <div className="admin-header">
        <div>
          <h1>Админка PawPost</h1>
          <p>Управление постами про животных</p>
        </div>

        <Link to="/admin/create" className="admin-create-link">
          + Добавить пост
        </Link>
      </div>

      <div className="admin-list">
        {posts.length === 0 && (
          <div className="empty-state">Постов пока нет</div>
        )}
        {posts.map((post) => (
          <div className="admin-item" key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.shortDescription}</p>
            </div>

            <div className="admin-actions">
              <Link to={`/admin/edit/${post.id}`}>Редактировать</Link>

              <button onClick={() => handleDelete(post.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
