namespace Beem.Server.Models
{
    public class Artist 
    {
        public Artist() {
            this.Id = 0;
            this.Name = "";
            this.Genre = "";
            this.Img = "";
            this.ImgHeader = "";
            this.Description = "";
            this.IsActivated = false;
            this.IsBooked = false;
            this.IsLineupPlanned = false;
        }

        public Artist(int Id, string Name, string Genre, string Img, string ImgHeader, string Description, bool IsActivated, bool IsBooked){
            this.Id = Id;
            this.Name = Name;
            this.Genre = Genre;
            this.Img = Img;
            this.ImgHeader = ImgHeader;
            this.Description = Description;
            this.IsActivated = IsActivated;
            this.IsBooked = IsBooked;
            this.IsLineupPlanned = false;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public string Img { get; set; }
        public string ImgHeader { get; set; }
        public string Description { get; set; }
        public string? Spotify { get; set; }
        public string? Website { get; set; }
        public string? Instagram { get; set; }
        public string? Stage { get; set; }
        public DateTime? DayStartTime { get; set; }
        public int? PlayTime { get; set; }
        public bool IsActivated { get; set; }
        public bool IsBooked { get; set; }  
        public bool IsLineupPlanned { get; set; }
    }
}