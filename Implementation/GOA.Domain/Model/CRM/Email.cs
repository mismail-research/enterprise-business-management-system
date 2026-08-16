using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model.CRM
{
    public class Email : ContactDetails
    {



        public Email()
            : base(GOA.Domain.Model.GoaEnum.ContactDetailsType.Email)
        {

        }

        public int SaveChanges(List<Email> cdetail, int contactId)
        {
            int id = 0;
            return id;
        }


        public List<Email> GetByContactId(int contactId)
        {
            List<Email> lstEmail = new List<Email>();
            return lstEmail;
        }


    }

}
