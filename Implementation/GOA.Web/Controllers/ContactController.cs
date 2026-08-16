using Breeze.ContextProvider;
using GOA.Domain.Model.CRM;
using GOA.Domain.UnitOfWork;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GOA.Web.Controllers
{
    public class ContactController : ApiController
    {
        IUnitOfWork UnitOfWork;

        public ContactController(IUnitOfWork uow)
        {
            UnitOfWork = uow;
        }

        /// <summary>
        /// Get Contacts All
        /// </summary>
        /// <returns>IQueryable Contacts</returns>		
        [HttpGet]
        [Authorize(Roles = "User")]
        public IQueryable<Contact> GetAllContact()
        {
            if (User.IsInRole("User"))
            {
                return UnitOfWork.ContactRepository.Find(a => a.CreatedBy == User.Identity.Name);
            }
            throw new HttpResponseException(System.Net.HttpStatusCode.Unauthorized);
        }

        /// <summary>
        /// Get Contacts All
        /// </summary>
        /// <returns>IQueryable Contacts</returns>		
        [HttpGet]
        [Authorize(Roles = "User")]
        public Person GetContact()
        {
            Person person = new Person();
            return person;
            //if (User.IsInRole("User"))
            //{
            //    return UnitOfWork.ContactRepository.Find(a => a.CreatedBy == User.Identity.Name);
            //}
            //throw new HttpResponseException(System.Net.HttpStatusCode.Unauthorized);
        }

        /// <summary>
        /// Save changes to data store
        /// </summary>
        /// <param name="saveBundle">The changes</param>
        /// <returns>Save result</returns>
        [HttpPost]
        [Authorize(Roles = "User")]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return UnitOfWork.Commit(saveBundle);
        }


    }
}
