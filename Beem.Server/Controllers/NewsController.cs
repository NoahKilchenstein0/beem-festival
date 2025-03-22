using Beem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Beem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        public readonly BeemDbContext dbContext;
        public NewsController(BeemDbContext dbContext){
            this.dbContext = dbContext;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get() {
            return Ok(await dbContext.News.OrderByDescending(x => x.Id).ToListAsync());
        }

        [HttpGet("GetActive")]
        public async Task<IActionResult> GetActive() {
            var now = DateTime.UtcNow;
            return Ok(await dbContext.News
                .Where(x => x.PublicationDateTime <= now)
                .OrderByDescending(x => x.PublicationDateTime)
                .ToListAsync());
        }
        
        [HttpGet("GetLatest")]
        public async Task<IActionResult> GetLatest() {
            var now = DateTime.UtcNow;
            return Ok(await dbContext.News
                .Where(x => x.PublicationDateTime <= now)
                .OrderByDescending(x => x.PublicationDateTime)
                .Take(4)
                .ToListAsync());
        }

        [HttpGet("GetSingle({id})")]
        public async Task<IActionResult> GetSingle([FromRoute]int id) {
            var filteredNews = await dbContext.News.FirstOrDefaultAsync(x => x.Id == id);
            if(filteredNews == null){
                return BadRequest("News konnte nicht gefunden werden");
            }
            return Ok(filteredNews);
        }

        [Authorize]   
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]News news)
        {
            if(news != null){
                dbContext.News.Add(news);
                await dbContext.SaveChangesAsync();
                return Ok(await dbContext.News.FirstAsync(x => x.Title == news.Title));
            }
            return BadRequest("News darf nicht NULL sein");
        }

        [Authorize]
        [HttpPut("Update({id})")]
        public async Task<IActionResult> Put([FromRoute]int id, [FromBody]News news)
        {
            var newsToUpdate = await dbContext.News.FirstOrDefaultAsync(x => x.Id == id);
            if(newsToUpdate != null && news != null)
            {
                newsToUpdate.Title = news.Title;
                newsToUpdate.Img = news.Img;
                newsToUpdate.ImgHeader = news.ImgHeader;
                newsToUpdate.NewsText = news.NewsText;
                newsToUpdate.PublicationDateTime = news.PublicationDateTime;
                await dbContext.SaveChangesAsync();
                return Ok(newsToUpdate);
            }
            return BadRequest("News konnte nicht Gefunden werden");
        }

        [Authorize]
        [HttpDelete("Delete({id})")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            var newsToDelete = await dbContext.News.FirstOrDefaultAsync(x => x.Id == id);
            if(newsToDelete == null){
                return BadRequest("News existiert nicht");
            }
            dbContext.News.Remove(newsToDelete);
            await dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}