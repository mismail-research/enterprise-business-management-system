using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using GOA.Data;
using GOA.Domain.Model;
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
    [BreezeController]
    [Authorize]
    public class ProductsController : ApiController
    {
        private readonly IUnitOfWork UnitOfWork;
        public ProductsController(IUnitOfWork uow)
        {
            UnitOfWork = uow;
        }
        [HttpGet]
        [Authorize(Roles = "User")]
        public IQueryable<Products> GetAllProducts()
        {
            if (User.IsInRole("User"))
            {
                var result = UnitOfWork.ProductsRepository.All();
                return result;
            }
            throw new HttpResponseException(System.Net.HttpStatusCode.Unauthorized);
        }
        /// <summary>
        /// Get Products All
        /// </summary>
        /// <returns>IQueryable Contacts</returns>		
        [HttpGet]
        [Authorize(Roles = "User")]
        public IQueryable<Products> GetProductsModel()
        {

            if (User.IsInRole("User"))
            {
                var result = UnitOfWork.ProductsRepository.All();
                return result;
            }
            throw new HttpResponseException(System.Net.HttpStatusCode.Unauthorized);
        }
    }
}