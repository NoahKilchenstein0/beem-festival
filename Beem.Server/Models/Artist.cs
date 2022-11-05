namespace Beem.Server.Models
{
    public class Artist 
    {
        public int Id { get; set; }
        public string Name{ get; set; }
        public string Genre { get; set; }
        public string Img { get; set; }
        public string Description { get; set; }
        public string? Spotify { get; set; }
        public string? Website { get; set; }
        public string? Instagramm { get; set; }
        public string? Stage { get; set; }
        public DateTime? DayStartTime { get; set; }
        public int? PlayTime { get; set; }
        public bool IsActivated { get; set; }
        public bool IsBooked { get; set; }  
    }
}