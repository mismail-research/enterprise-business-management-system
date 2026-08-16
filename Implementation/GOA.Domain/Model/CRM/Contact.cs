using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model.CRM
{
    [DataContract(IsReference = true)]
    public class Contact
    {
        #region Attribues

        private int contactId = 0;
        private string title = string.Empty;
        private string firstName = string.Empty;
        private string lastName = string.Empty;
        private string companyName = string.Empty;
        private string contactType = string.Empty;
        private string linkedIn = string.Empty;
        private string twitter = string.Empty;
        private string status = string.Empty;
        private string remarks = string.Empty;
        private string facebook = string.Empty;
        private string creditRating = string.Empty;
        private string imageUrl = string.Empty;
        private string organizationType = string.Empty;
        [DataMember]
        public ICollection<Phone> Phone {get;set;}
        [DataMember]
        public ICollection<Email> Email {get;set;}
        [DataMember]
        public ICollection<Website> Website { get; set; }
        [DataMember]
        public ICollection<Address> Address { get; set; }
        [DataMember]
        public ICollection<IM> Im { get; set; }
        private DateTime dtCreated = new DateTime(1753, 10, 10);
        private DateTime dtUpdated = new DateTime(1753, 10, 10);
        string createdBy = string.Empty;
        string updatedBy = string.Empty;

        #endregion

        #region Properties
        [Key]
        [Required]
        [DataMember]
        public int ContactId
        {
            get { return contactId; }
            set { contactId = value; }
        }
        [StringLength(15)]
        [DataMember]
        public string Title
        {
            get { return title; }
            set { title = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string FirstName
        {
            get { return firstName; }
            set { firstName = value; }
        }

        [StringLength(50)]
        [DataMember]
        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }

        [StringLength(50)]
        [DataMember]
        public string CompanyName
        {
            get { return companyName; }
            set { companyName = value; }
        }

        [StringLength(15)]
        [DataMember]
        public string ContactType
        {
            get { return contactType; }
            set { contactType = value; }


        }

        [StringLength(20)]
        [DataMember]
        public string LinkedIn
        {
            get { return linkedIn; }
            set { linkedIn = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string Twitter
        {
            get { return twitter; }
            set { twitter = value; }
        }

        [StringLength(15)]
        [DataMember]
        public string Status
        {
            get { return status; }
            set { status = value; }
        }
        [StringLength(200)]
        [DataMember]
        public string Remarks
        {
            get { return remarks; }
            set { remarks = value; }
        }

        [StringLength(20)]
        [DataMember]
        public string OrganizationType
        {
            get { return organizationType; }
            set { organizationType = value; }
        }

        [StringLength(20)]
        [DataMember]
        public string Facebook
        {
            get { return facebook; }
            set { facebook = value; }
        }

        [StringLength(20)]
        [DataMember]
        public string CreditRating
        {
            get { return creditRating; }
            set { creditRating = value; }
        }

        [StringLength(150)]
        [DataMember]
        public string ImageUrl
        {
            get { return imageUrl; }
            set { imageUrl = value; }
        }
        
        [DataMember]
        public DateTime DtCreated
        {
            get { return dtCreated; }
            set { dtCreated = value; }
        }
        [DataMember]
        public DateTime DtUpdated
        {
            get { return dtUpdated; }
            set { dtUpdated = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string CreatedBy
        {
            get { return createdBy; }
            set { createdBy = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string UpdatedBy
        {
            get { return updatedBy; }
            set { updatedBy = value; }
        }


        #endregion


        #region Constructors

        public Contact()
        {

        }

        public Contact(GOA.Domain.Model.GoaEnum.ContactType type)
        {
            this.contactType = type.ToString();
        }
        #endregion

        #region Methods
        #endregion
    }
}
