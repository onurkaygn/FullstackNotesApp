using Microsoft.EntityFrameworkCore;
using FullstackNotesApp.Models.Entities;

namespace FullstackNotesApp.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions options) : base(options)
        {
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=(LocalDb)\\;Database_NotesDb;Trusted_Conntection=true");
        //}

        public DbSet<Note> Notes { get; set; }
    }
}
