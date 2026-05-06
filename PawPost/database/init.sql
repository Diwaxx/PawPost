CREATE TABLE IF NOT EXISTS animal_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    short_description VARCHAR(300) NOT NULL,
    full_description TEXT NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);