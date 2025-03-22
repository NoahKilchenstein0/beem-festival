using Beem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using System.Net.Http.Headers;

namespace Beem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController: ControllerBase {
        
        [HttpPost, DisableRequestSizeLimit]
        [Authorize]
        public IActionResult Upload() {
            try 
            {
                var file = Request.Form.Files[0];
                string folderName = Path.Combine("Resources", "Images");
                string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if(file.Length > 0)
                {
                    var contentDisposition = file.ContentDisposition;
                    if (contentDisposition == null)
                    {
                        return BadRequest("ContentDisposition fehlt in der Datei");
                    }
                    
                    var fileName = ContentDispositionHeaderValue.Parse(contentDisposition).FileName?.Trim('"') 
                        ?? Path.GetRandomFileName(); // Fallback zu zufälligem Dateinamen, falls keiner vorhanden ist
                    
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using(var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }                   
                    return Ok(new {dbPath});
                }
                else 
                {
                    return BadRequest();
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }

}