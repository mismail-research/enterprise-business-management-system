using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model.CRM
{
    public class Company : Contact
    {
        #region Fields
        private BusinessDetails businessDetails = new BusinessDetails();


        #endregion

        #region Properties

        public BusinessDetails BusinessDetails
        {
            get { return businessDetails; }
            set { businessDetails = value; }
        }

        #endregion

        #region Constructors

        public Company()
            : base(GOA.Domain.Model.GoaEnum.ContactType.Company)
        {

        }

        #endregion

        #region Methods
        public Company GetCompanyById(int contactId)
        {
            Company company = new Company();
            return company;
        }

        #endregion
    }
}
