using Beem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Beem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistsController : ControllerBase
    {
        public readonly BeemDbContext dbContext;
        public ArtistsController(BeemDbContext dbContext){
            this.dbContext = dbContext;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get() {
            return Ok(this.dbContext.Artists.OrderBy(x => x.Id));
        }

        
        [HttpGet("GetActive")]
        public IActionResult GetActive() {
            return Ok(this.dbContext.Artists.Where(x => x.IsActivated == true).OrderBy(x => x.Name));
        }
        
        [Authorize]
        [HttpGet("GetSingle({id})")]
        public IActionResult GetSingle([FromRoute]int id) {
            var filteredArtist = this.dbContext.Artists.FirstOrDefault(x => x.Id == id);
            if(filteredArtist == null){
                return BadRequest("Artist konnte nicht gefunden werden");
            }
            return Ok(filteredArtist);
        }

        [Authorize]   
        [HttpPost]
        public IActionResult Post([FromBody]Artist artist)
        {
            Console.WriteLine(artist);
            if(artist != null){
                this.dbContext.Artists.Add(artist);
                this.dbContext.SaveChanges();
                return Ok(this.dbContext.Artists.First(x => x.Name == artist.Name));
            }
            return BadRequest("Artist darf nicht NULL sein");
        }

        [Authorize]
        [HttpPut("Update({id})")]
        public IActionResult Put([FromRoute]int id, [FromBody]Artist artist)
        {
            var artistToUpdate = this.dbContext.Artists.FirstOrDefault(x => x.Id == id);
            if(artistToUpdate != null && artist != null)
            {
                artistToUpdate.Name = artist.Name;
                artistToUpdate.Genre = artist.Genre;
                artistToUpdate.Img = artist.Img;
                artistToUpdate.ImgHeader = artist.ImgHeader;
                artistToUpdate.Description = artist.Description;
                artistToUpdate.IsActivated = artist.IsActivated;
                artistToUpdate.IsBooked = artist.IsBooked;
                artistToUpdate.DayStartTime = artist.DayStartTime != null ? artist.DayStartTime : null;
                artistToUpdate.Spotify = artist.Spotify != null ? artist.Spotify : null;
                artistToUpdate.Stage = artist.Stage != null ? artist.Stage : null;
                artistToUpdate.Website = artist.Website != null ? artist.Website : null;
                artistToUpdate.Instagramm = artist.Instagramm != null ? artist.Instagramm : null;
                artist.IsLineUpPlaned = artist.IsLineUpPlaned;
                this.dbContext.SaveChanges();
                return Ok(artistToUpdate);
            }
            return BadRequest("Artist konnte nicht Gefunden werden");
        }

        [Authorize]
        [HttpDelete("Delete({id})")]
        public IActionResult Delete([FromRoute]int id)
        {
            var artistToDelete = this.dbContext.Artists.FirstOrDefault(x => x.Id == id);
            if(artistToDelete == null){
                return BadRequest("Artist existiert nicht");
            }
            this.dbContext.Artists.Remove(artistToDelete);
            this.dbContext.SaveChanges();
            return Ok();
        }
    }
}