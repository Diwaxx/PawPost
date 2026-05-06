import type { AnimalPost } from "../types/post";

const API_URL = "http://localhost:5203/api/posts";

export async function getPosts(): Promise<AnimalPost[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getPostById(id: string): Promise<AnimalPost> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
}

export async function createPost(
  post: Omit<AnimalPost, "id" | "createdAt">
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}

export async function updatePost(
  id: number,
  post: Omit<AnimalPost, "id" | "createdAt">
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }
}

export async function deletePost(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
}