using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Beem.Server.Models
{
    public class BeemDbContext : IdentityDbContext<IdentityUser>
    {
        
        public virtual DbSet<Artist> Artists { get; set; }

        public BeemDbContext(DbContextOptions<BeemDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            var artists = builder.Entity<Artist>();
            artists.HasKey(a => a.Id);
            base.OnModelCreating(builder);
        }
    }
}