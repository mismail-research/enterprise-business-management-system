using System.Linq;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Breeze.WebApi2;
using Breeze.ContextProvider;
using Newtonsoft.Json.Linq;
using GOA.Domain.UnitOfWork;
using GOA.Domain.Model;
using GOA.Web.Helpers;

namespace GOA.Web.Controllers
{
    /// <summary>
    /// Main controller retrieving information from the data store
    /// </summary>
    [BreezeController]
    public class GOAController : ApiController
    {
        IUnitOfWork UnitOfWork;

        public GOAController(IUnitOfWork uow)
        {
            UnitOfWork = uow;
        }

        /// <summary>
        /// Get private articles
        /// </summary>
        /// <returns>IQueryable articles</returns>		
        [HttpGet]
        [Authorize(Roles="User")]
        public IQueryable<Article> PrivateArticles()
        {
            if (User.IsInRole("User")) {
                return UnitOfWork.ArticleRepository.Find(a => a.CreatedBy == User.Identity.Name);
            }
            throw new HttpResponseException(System.Net.HttpStatusCode.Unauthorized);            
        }

        [HttpGet]
        [AllowAnonymous]
        public IQueryable<Profile> Profiles()
        {
            return UnitOfWork.ProfileRepository.All();
        }
        [AllowAnonymous]
        [HttpGet]
        public IQueryable<Profile> Getprofile()
        {
            var userId = User.Identity.GetUserId();
            return UnitOfWork.ProfileRepository.Find(a => a.UserId == userId);

        }

        /// <summary>
        /// Get public articles
        /// </summary>
        /// <returns>IQueryable articles</returns>
        [HttpGet]
        [AllowAnonymous]
        public IQueryable<Article> PublicArticles()
        {
            return UnitOfWork.ArticleRepository.Find(a => a.IsPublished == true);
        }

        /// <summary>
        /// Save changes to data store
        /// </summary>
        /// <param name="saveBundle">The changes</param>
        /// <returns>Save result</returns>
        [HttpPost]
        [AllowAnonymous]
        public SaveResult SaveChanges(JObject saveBundle)
        {             
            return UnitOfWork.Commit(saveBundle);
        }

        /// <summary>
        /// Get the lookups on client first app load
        /// </summary>
        /// <returns>The bundles</returns>
        [HttpGet]
        [AllowAnonymous]
        public LookupBundle Lookups()
        {
            return new LookupBundle
            {
                Categories = UnitOfWork.CategoryRepository.All().ToList()
            };
        }
    }
}
