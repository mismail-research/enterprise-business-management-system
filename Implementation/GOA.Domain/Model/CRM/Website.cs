using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model.CRM
{
    public class Website : ContactDetails
    {


        public Website()
            : base(GOA.Domain.Model.GoaEnum.ContactDetailsType.Website)
        {

        }
        public int SaveChanges(List<Website> cdetail, int contactId)
        {
            int id = 0;
            return id;
        }


        public List<Website> GetByContactId(int contactId)
        {
            List<Website> lstWebSite = new List<Website>();
            return lstWebSite;
        }

    }
}
