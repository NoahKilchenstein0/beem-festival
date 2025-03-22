using Microsoft.AspNetCore.Identity;

namespace Beem.Server.Models
{
    public class User
    {
        public required string UserName { get; set; }
        public required string JwtToken { get; set; }
        public DateTime Expiration { get; set; } = DateTime.UtcNow;
        public required string Role { get; set; }
    }
}