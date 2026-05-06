import { Link } from "react-router-dom";
import type { AnimalPost } from "../types/post";

type Props = {
  post: AnimalPost;
};

export function PostCard({ post }: Props) {
  return (
    <article className="post-card">
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="post-card__image" />
      )}

      <div className="post-card__content">
        <span className="post-card__category">
          {post.category || "Без категории"}
        </span>

        <h2>{post.title}</h2>
        <p>{post.shortDescription}</p>

        <Link to={`/posts/${post.id}`} className="post-card__link">
          Читать подробнее
        </Link>
      </div>
    </article>
  );
}