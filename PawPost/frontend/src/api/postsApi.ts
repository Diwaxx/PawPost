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