using Npgsql;
using PawPost.Api.Database;
using PawPost.Api.Models;

namespace PawPost.Api.Repositories;

public class PostsRepository
{
    private readonly DbConnectionFactory _connectionFactory;

    public PostsRepository(DbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<AnimalPost>> GetAllAsync()
    {
        var posts = new List<AnimalPost>();

        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        const string sql = """
            SELECT id, title, short_description, full_description, image_url, category, created_at
            FROM animal_posts
            ORDER BY id DESC;
        """;

        await using var command = new NpgsqlCommand(sql, connection);
        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            posts.Add(MapPost(reader));
        }

        return posts;
    }

    public async Task<AnimalPost?> GetByIdAsync(int id)
    {
        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        const string sql = """
            SELECT id, title, short_description, full_description, image_url, category, created_at
            FROM animal_posts
            WHERE id = @id;
        """;

        await using var command = new NpgsqlCommand(sql, connection);
        command.Parameters.AddWithValue("@id", id);

        await using var reader = await command.ExecuteReaderAsync();

        if (await reader.ReadAsync())
            return MapPost(reader);

        return null;
    }

    public async Task<AnimalPost> CreateAsync(AnimalPost post)
    {
        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        const string sql = """
            INSERT INTO animal_posts 
            (title, short_description, full_description, image_url, category)
            VALUES 
            (@title, @shortDescription, @fullDescription, @imageUrl, @category)
            RETURNING id, title, short_description, full_description, image_url, category, created_at;
        """;

        await using var command = new NpgsqlCommand(sql, connection);

        command.Parameters.AddWithValue("@title", post.Title);
        command.Parameters.AddWithValue("@shortDescription", post.ShortDescription);
        command.Parameters.AddWithValue("@fullDescription", post.FullDescription);
        command.Parameters.AddWithValue("@imageUrl", (object?)post.ImageUrl ?? DBNull.Value);
        command.Parameters.AddWithValue("@category", (object?)post.Category ?? DBNull.Value);

        await using var reader = await command.ExecuteReaderAsync();

        await reader.ReadAsync();
        return MapPost(reader);
    }

    public async Task<bool> UpdateAsync(int id, AnimalPost post)
    {
        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        const string sql = """
            UPDATE animal_posts
            SET 
                title = @title,
                short_description = @shortDescription,
                full_description = @fullDescription,
                image_url = @imageUrl,
                category = @category
            WHERE id = @id;
        """;

        await using var command = new NpgsqlCommand(sql, connection);

        command.Parameters.AddWithValue("@id", id);
        command.Parameters.AddWithValue("@title", post.Title);
        command.Parameters.AddWithValue("@shortDescription", post.ShortDescription);
        command.Parameters.AddWithValue("@fullDescription", post.FullDescription);
        command.Parameters.AddWithValue("@imageUrl", (object?)post.ImageUrl ?? DBNull.Value);
        command.Parameters.AddWithValue("@category", (object?)post.Category ?? DBNull.Value);

        var affectedRows = await command.ExecuteNonQueryAsync();

        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        const string sql = """
            DELETE FROM animal_posts
            WHERE id = @id;
        """;

        await using var command = new NpgsqlCommand(sql, connection);
        command.Parameters.AddWithValue("@id", id);

        var affectedRows = await command.ExecuteNonQueryAsync();

        return affectedRows > 0;
    }

    private static AnimalPost MapPost(NpgsqlDataReader reader)
    {
        return new AnimalPost
        {
            Id = reader.GetInt32(reader.GetOrdinal("id")),
            Title = reader.GetString(reader.GetOrdinal("title")),
            ShortDescription = reader.GetString(reader.GetOrdinal("short_description")),
            FullDescription = reader.GetString(reader.GetOrdinal("full_description")),
            ImageUrl = reader.IsDBNull(reader.GetOrdinal("image_url"))
                ? null
                : reader.GetString(reader.GetOrdinal("image_url")),
            Category = reader.IsDBNull(reader.GetOrdinal("category"))
                ? null
                : reader.GetString(reader.GetOrdinal("category")),
            CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at"))
        };
    }
}