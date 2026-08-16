using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using GOA.Domain.Model;

namespace GOA.Domain.Repositories
{
    public interface IArticleRepository : IRepository<Article>
    {
        IQueryable<Article> All();
    }
}
