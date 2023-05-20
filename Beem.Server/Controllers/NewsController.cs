using Beem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

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
        public IActionResult Get() {
            return Ok(this.dbContext.News.OrderByDescending(x => x.Id));
        }

        
        [HttpGet("GetActive")]
        public IActionResult GetActive() {
            return Ok(this.dbContext.News.Where(x => x.PublicationDateTime <= DateTime.UtcNow).OrderByDescending(x => x.PublicationDateTime));
        }
        
        [HttpGet("GetLatest")]
        public IActionResult GetLatest() {
            return Ok(this.dbContext.News.Where(x => x.PublicationDateTime <= DateTime.UtcNow).OrderBy(x => x.PublicationDateTime).Take(4));
        }

        [HttpGet("GetSingle({id})")]
        public IActionResult GetSingle([FromRoute]int id) {
            var filteredNews = this.dbContext.News.FirstOrDefault(x => x.Id == id);
            if(filteredNews == null){
                return BadRequest("News konnte nicht gefunden werden");
            }
            return Ok(filteredNews);
        }


        [Authorize]   
        [HttpPost]
        public IActionResult Post([FromBody]News news)
        {
            if(news != null){
                this.dbContext.News.Add(news);
                this.dbContext.SaveChanges();
                return Ok(this.dbContext.News.First(x => x.Title == news.Title));
            }
            return BadRequest("News darf nicht NULL sein");
        }

        [Authorize]
        [HttpPut("Update({id})")]
        public IActionResult Put([FromRoute]int id, [FromBody]News news)
        {
            var newsToUpdate = this.dbContext.News.FirstOrDefault(x => x.Id == id);
            if(newsToUpdate != null && news != null)
            {
                newsToUpdate.Title = news.Title;
                newsToUpdate.Img = news.Img;
                newsToUpdate.ImgHeader = news.ImgHeader;
                newsToUpdate.NewsText = news.NewsText;
                newsToUpdate.PublicationDateTime = news.PublicationDateTime;
                this.dbContext.SaveChanges();
                return Ok(newsToUpdate);
            }
            return BadRequest("News konnte nicht Gefunden werden");
        }

        [Authorize]
        [HttpDelete("Delete({id})")]
        public IActionResult Delete([FromRoute]int id)
        {
            var newsToDelete = this.dbContext.News.FirstOrDefault(x => x.Id == id);
            if(newsToDelete == null){
                return BadRequest("News existiert nicht");
            }
            this.dbContext.News.Remove(newsToDelete);
            this.dbContext.SaveChanges();
            return Ok();
        }
    }
}