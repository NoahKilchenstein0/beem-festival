
namespace Beem.Server.Models
{
    public class News {
        public int Id { get; set; }
        public string Title { get; set; }
        public string NewsText { get; set; }
        public string Img { get; set; }
        public string ImgHeader { get; set; }
        public DateTime PublicationDateTime { get; set; }
    }
}