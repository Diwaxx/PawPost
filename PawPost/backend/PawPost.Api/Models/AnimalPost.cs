namespace PawPost.Api.Models;

public class AnimalPost
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string ShortDescription { get; set; } = string.Empty;

    public string FullDescription { get; set; } = string.Empty;

    public string? ImageUrl { get; set; }

    public string? Category { get; set; }

    public DateTime CreatedAt { get; set; }
}