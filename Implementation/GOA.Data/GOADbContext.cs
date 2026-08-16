using GOA.Domain.Model;
using GOA.Domain.Model.CRM;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace GOA.Data
{
    public class GOADbContext : IdentityDbContext<UserProfile>
    {
        public GOADbContext()
                    : base("GoaConnectionString")
        {            
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<GOADbContext, Migrations.Configuration>());
            
        }

        public DbSet<Article> Articles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<ContactDetails> ContactDetails { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<PersonalDetails> PersonalDetail { get; set; }
        public DbSet<BusinessDetails> BusinessDetail { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Buyers> Buyers { get; set; }
        public DbSet<Addresses> Addresses { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Configuration.LazyLoadingEnabled = false;
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            // Very bad idea not doing this :)
            //http://stackoverflow.com/questions/19474662/map-tables-using-fluent-api-in-asp-net-mvc5-ef6
            base.OnModelCreating(modelBuilder);
        }
    }

}
