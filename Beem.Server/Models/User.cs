
using Microsoft.AspNetCore.Identity;

namespace Beem.Server.Models
{
    public class User
    {
        public string UserName { get; set; }
        public string JwtToken { get; set; }
        public DateTime Expiration { get; set; }
        public string Role { get; set; } 
    }
}