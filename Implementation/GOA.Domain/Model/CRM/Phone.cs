using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model.CRM
{
    public class Phone : ContactDetails
    {

        #region Methods


        public Phone()
            : base(GOA.Domain.Model.GoaEnum.ContactDetailsType.Phone)
        {

        }
        public int SaveChanges(List<Phone> cdetail, int contactId)
        {
            int id = 0;
            return id;
        }


        public List<Phone> GetByContactId(int contactId)
        {
            List<Phone> lstPhone = new List<Phone>();
            return lstPhone;
        }


        #endregion
    }
}
