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
    [DataContract(IsReference = true)]
    public class ContactDetails
    {
        #region attributre

        private int id = 0;
        private int contactId = 0;
        private readonly string contactDetailsType;
        private string fieldValue = string.Empty;
        private string fieldType = string.Empty;



        #endregion

        #region properties
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

        [StringLength(20)]
        [DataMember]
        public string ContactDetailsType
        {
            get { return contactDetailsType; }
        }
        [StringLength(20)]
        [DataMember]
        public string FieldValue
        {
            get { return fieldValue; }
            set { fieldValue = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string FieldType
        {
            get { return fieldType; }
            set { fieldType = value; }
        }


        #endregion

        #region Methods

        public ContactDetails(GOA.Domain.Model.GoaEnum.ContactDetailsType type)
        {
            this.contactDetailsType = type.ToString();
        }


        #endregion
    }
}
