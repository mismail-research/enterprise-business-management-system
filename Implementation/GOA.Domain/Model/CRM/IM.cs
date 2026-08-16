using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model.CRM
{
    public class IM : ContactDetails
    {
        public IM()
            : base(GOA.Domain.Model.GoaEnum.ContactDetailsType.IM)
        {

        }
        public int SaveChanges(List<IM> cdetail, int contactId)
        {
            int id = 0;
            return id;
        }


        public List<IM> GetByContactId(int contactId)
        {
            List<IM> lstIM = new List<IM>();
            return lstIM;
        }

    }

}
