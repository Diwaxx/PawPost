import { useState } from "react";
import type { AnimalPost } from "../types/post";

type FormData = Omit<AnimalPost, "id" | "createdAt">;

type Props = {
  initialData?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  submitText: string;
};

export function PostForm({
  initialData,
  onSubmit,
  submitText,
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || "",
    shortDescription: initialData?.shortDescription || "",
    fullDescription: initialData?.fullDescription || "",
    imageUrl: initialData?.imageUrl || "",
    category: initialData?.category || "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label>
        Название
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Краткое описание
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Полное описание
        <textarea
          name="fullDescription"
          value={formData.fullDescription}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        URL изображения
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Категория
        <input
          type="text"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Сохранение..." : submitText}
      </button>
    </form>
  );
}