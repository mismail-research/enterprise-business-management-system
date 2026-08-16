using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Breeze.ContextProvider;
using Newtonsoft.Json.Linq;

using GOA.Domain.Repositories;
using GOA.Domain.Model;
using GOA.Domain.Model.CRM;

namespace GOA.Domain.UnitOfWork
{
    /// <summary>
    /// Contract for the UnitOfWork
    /// </summary>
    public interface IUnitOfWork
    {
        IRepository<Article> ArticleRepository { get; }
        IRepository<Category> CategoryRepository { get; }
        IRepository<Tag> TagRepository { get; }
        IRepository<UserProfile> UserProfileRepository { get; }
        IRepository<Contact> ContactRepository { get; }
        IRepository<Profile> ProfileRepository { get; }
        IRepository<Products> ProductsRepository { get; }
        IRepository<Buyers> BuyersRepository { get; }
        IRepository<Addresses> AddressesRepository { get; }

        void Commit();

        //Breeze specific
        string Metadata();
        SaveResult Commit(JObject changeSet);
    }
}
