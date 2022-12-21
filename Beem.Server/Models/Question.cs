namespace Beem.Server.Models
{
    public class Question{

        public Question(){
            this.Id = 0;
            this.Title = "";
            this.Answer = "";
        }

        public int Id {get; set;}
        public string Title {get; set;}
        public string Answer {get; set;}
    }
}