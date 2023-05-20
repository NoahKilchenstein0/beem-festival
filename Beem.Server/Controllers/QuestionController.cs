using Beem.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Linq;


namespace Beem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class QuestionController : ControllerBase
    {

        public readonly BeemDbContext dbContext;

        public QuestionController(BeemDbContext dbContext){
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get() {
            return Ok(this.dbContext.Questions.ToList().OrderBy(x => x.Id));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody]Question question){
            if(question != null){
                this.dbContext.Questions.Add(question);
                this.dbContext.SaveChanges();
                return Ok(this.dbContext.Questions.First(x => x.Title == question.Title));
            }
            return BadRequest("Question darf nicht NULL sein");
        }

        [Authorize]
        [HttpPut("Update({id})")]
        public IActionResult Put([FromRoute]int id, [FromBody]Question question){
            var questionToUpdate = this.dbContext.Questions.FirstOrDefault(x => x.Id == id);
            if ( questionToUpdate != null && question != null)
            {
                questionToUpdate.Title = question.Title;
                questionToUpdate.Answer = question.Answer;

                this.dbContext.SaveChanges();
                return Ok(questionToUpdate);
            }
            return BadRequest("Question darf nicht NULL sein!");
        }

        [Authorize]
        [HttpDelete("Delete({id})")]
        public IActionResult Delete([FromRoute]int id){
            var questionToDelete = this.dbContext.Questions.FirstOrDefault(x => x.Id == id);
            if(questionToDelete == null){
                return BadRequest("Cannot delete a nonexisten Question!");
            }

            this.dbContext.Questions.Remove(questionToDelete);
            this.dbContext.SaveChanges();
            return Ok("Question succesfully deleted!");

        }

    }
}