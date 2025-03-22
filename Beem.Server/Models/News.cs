using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Beem.Server.Models
{
    [Index(nameof(PublicationDateTime))]
    public class News
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string NewsText { get; set; } = string.Empty;
        public string? Img { get; set; }
        public string? ImgHeader { get; set; }
        
        public DateTime PublicationDateTime { get; set; }
        public bool IsActive { get; set; }
    }
}