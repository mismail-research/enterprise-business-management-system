namespace GOA.Data.Migrations
{
    using GOA.Domain.Model;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<GOA.Data.GOADbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(GOA.Data.GOADbContext context)
        {
            UserManager<UserProfile> UserManager = new UserManager<UserProfile>(new UserStore<UserProfile>(context));
            RoleManager<IdentityRole> RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            if (!RoleManager.RoleExists("Administrator"))
            {
                RoleManager.Create(new IdentityRole("Administrator"));

            }

            if (!RoleManager.RoleExists("User"))
            {
                RoleManager.Create(new IdentityRole("User"));

            }

            if (UserManager.FindByName("admin") == null)
            {
                var user = new UserProfile() { UserName = "admin", Email = "admin@mydomain.com", EmailConfirmed = true };
                var result = UserManager.Create(user, "admin1234");
                if (result.Succeeded)
                {
                    UserManager.AddToRole(user.Id, "Administrator");
                }
            }

            if (UserManager.FindByName("iqbal123") == null)
            {
                var user = new UserProfile() { UserName = "iqbal123", Email = "iqbal369@yahoo.com", EmailConfirmed = true };
                var result = UserManager.Create(user, "iqbal123");
                if (result.Succeeded)
                {
                    UserManager.AddToRole(user.Id, "User");
                }
            }


            GOADbContext uow = new GOADbContext();

            if (!uow.Categories.Any())
            {

                Category category1 = new Category()
                {
                    CategoryId = Guid.NewGuid(),
                    Name = "About GOA",
                };
                category1.SetUrlReference();
                uow.Categories.AddOrUpdate(category1);

                Category category2 = new Category()
                {
                    CategoryId = Guid.NewGuid(),
                    Name = "EdgeDocs",
                };
                category2.SetUrlReference();
                uow.Categories.AddOrUpdate(category2);

                Category category3 = new Category()
                {
                    CategoryId = Guid.NewGuid(),
                    Name = "EdgeMonitor",
                };
                category3.SetUrlReference();
                uow.Categories.AddOrUpdate(category3);

                Category category4 = new Category()
                {
                    CategoryId = Guid.NewGuid(),
                    Name = "EdgeChamber",
                };
                category4.SetUrlReference();
                uow.Categories.AddOrUpdate(category4);

                Category category5 = new Category()
                {
                    CategoryId = Guid.NewGuid(),
                    Name = "EdgeMove",
                };
                category5.SetUrlReference();
                uow.Categories.AddOrUpdate(category5);

                uow.SaveChanges();

            }
        }
    }
}