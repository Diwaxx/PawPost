using Microsoft.AspNetCore.Mvc;
using PawPost.Api.Models;
using PawPost.Api.Repositories;

namespace PawPost.Api.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly PostsRepository _postsRepository;

    public PostsController(PostsRepository postsRepository)
    {
        _postsRepository = postsRepository;
    }

    [HttpGet]
    public async Task<ActionResult<List<AnimalPost>>> GetAll()
    {
        var posts = await _postsRepository.GetAllAsync();
        return Ok(posts);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AnimalPost>> GetById(int id)
    {
        var post = await _postsRepository.GetByIdAsync(id);

        if (post is null)
            return NotFound();

        return Ok(post);
    }

    [HttpPost]
    public async Task<ActionResult<AnimalPost>> Create(AnimalPost post)
    {
        var createdPost = await _postsRepository.CreateAsync(post);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdPost.Id },
            createdPost
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, AnimalPost post)
    {
        var updated = await _postsRepository.UpdateAsync(id, post);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _postsRepository.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}