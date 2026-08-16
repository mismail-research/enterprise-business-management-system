using Microsoft.AspNet.Identity;

using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Newtonsoft.Json.Linq;

using GOA.Data.Repositories;
using GOA.Domain.Repositories;
using GOA.Domain.Model;
using GOA.Domain.Model.CRM;
using GOA.Domain.UnitOfWork;
using GOA.Domain.Validators;

namespace GOA.Data.UnitOfWork
{
    /// <summary>
    /// Implementation for the UnitOfWork in the current app
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EFContextProvider<GOADbContext> contextProvider;
        /// <summary>
        /// ctor
        /// </summary>
        public UnitOfWork(IBreezeValidator breezevalidator)
        {
            contextProvider = new EFContextProvider<GOADbContext>();
            contextProvider.BeforeSaveEntitiesDelegate = breezevalidator.BeforeSaveEntities;
            contextProvider.BeforeSaveEntityDelegate = breezevalidator.BeforeSaveEntity;
            
            ArticleRepository = new ArticleRepository(contextProvider.Context);
            CategoryRepository = new Repository<Category>(contextProvider.Context);
            TagRepository = new Repository<Tag>(contextProvider.Context);
            UserProfileRepository = new Repository<UserProfile>(contextProvider.Context);
            ProfileRepository = new Repository<Profile>(contextProvider.Context);
            ProductsRepository = new Repository<Products>(contextProvider.Context);
            BuyersRepository = new Repository<Buyers>(contextProvider.Context);
            AddressesRepository = new Repository<Addresses>(contextProvider.Context);
        }

        /// <summary>
        /// Reporitories
        /// </summary>
        public IRepository<Article> ArticleRepository {get; private set;}        
        public IRepository<Category> CategoryRepository { get; private set; }
        public IRepository<Tag> TagRepository { get; private set; }
        public IRepository<UserProfile> UserProfileRepository { get; private set; }
        public IRepository<Contact> ContactRepository { get; private set; }
        public IRepository<Profile> ProfileRepository { get;set; }
        public IRepository<Products> ProductsRepository { get; private set; }
        public IRepository<Buyers> BuyersRepository { get; private set; }
        public IRepository<Addresses> AddressesRepository { get; private set; }
        
        /// <summary>
        /// Get breeze Metadata
        /// </summary>
        /// <returns>String containing Breeze metadata</returns>
        public string Metadata()
        {
            return contextProvider.Metadata();
        }

        /// <summary>
        /// Save a changeset using Breeze
        /// </summary>
        /// <param name="changeSet"></param>
        /// <returns></returns>
        public SaveResult Commit(JObject changeSet)
        {
            return contextProvider.SaveChanges(changeSet);
        }

        /// <summary>
        /// Save Context using traditional Entity Framework operation
        /// </summary>
        public void Commit()
        {
            contextProvider.Context.SaveChanges();
        }
    }
}
