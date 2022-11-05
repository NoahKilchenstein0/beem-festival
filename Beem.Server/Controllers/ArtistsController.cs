using Beem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Beem.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistsController : ControllerBase
    {
        public readonly BeemDbContext dbContext;
        public ArtistsController(BeemDbContext dbContext){
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get() {
            return Ok(this.dbContext.Artists);
        }
    }
}