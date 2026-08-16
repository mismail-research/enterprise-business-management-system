using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model.CRM
{
    public class Person : Contact
    {
        #region Attribue

        
        private PersonalDetails personalDetails = new PersonalDetails();

        #endregion

        #region Properties

        [DataMember]
        public PersonalDetails PersonalDetails
        {
            get { return personalDetails; }
            set { personalDetails = value; }
        }

        #endregion

        #region Constructors

        public Person()
            : base(GOA.Domain.Model.GoaEnum.ContactType.Person)
        {

        }

        #endregion

        #region Methods



      


        #endregion
    }
}
