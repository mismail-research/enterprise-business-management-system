using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model.CRM
{
    public class PersonalDetails
    {
        #region Fields
        private int id = 0;
        private int contactId = 0;
        private string gender = "Male";
        private DateTime dateOfBirth = new DateTime(1753, 10, 10);
        private string occupation = string.Empty;
        private string maritalStatus = string.Empty;
        private string personalStatus = string.Empty;
        private string position = string.Empty;
        private string interests = string.Empty;
        private List<Address> address = new List<Address>();

        #endregion

        #region Properties


        [Key]
        [DataMember]
        public int Id
        {
            get { return id; }
            set { id = value; }
        }
        [DataMember]
        public int ContactId
        {
            get { return contactId; }
            set { contactId = value; }
        }

        [ForeignKey("ContactId")]
        [DataMember]
        public Contact Contact { get; set; }


        [StringLength(10)]
        [DataMember]
        public string Gender
        {
            get { return gender; }
            set { gender = value; }
        }
        
        [DataMember]
        public DateTime DateOfBirth
        {
            get { return dateOfBirth; }
            set { dateOfBirth = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string Occupation
        {
            get { return occupation; }
            set { occupation = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string MaritalStatus
        {
            get { return maritalStatus; }
            set { maritalStatus = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string PersonalStatus
        {
            get { return personalStatus; }
            set { personalStatus = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string Position
        {
            get { return position; }
            set { position = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string Interests
        {
            get { return interests; }
            set { interests = value; }
        }

        #endregion

        #region Methods
        public int SaveChanges(PersonalDetails detail, int contactId)
        {
            int id = 0;
            return id;
        }
        public PersonalDetails GetByContactId(int contactId)
        {
            PersonalDetails personalDetails = new PersonalDetails();
            return personalDetails;
        }


        #endregion
    }
}
