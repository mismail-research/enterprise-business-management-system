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
    public class BusinessDetails
    {
        #region Fields

        private int id = 0;
        private int contactId = 0;
        private string type = string.Empty;
        private string description = string.Empty;
        private DateTime startDate = new DateTime(1753, 10, 10);
        private string size = string.Empty;
        private string sector = string.Empty;
        private string status = string.Empty;
        private string reach = string.Empty;
        private string objectives = string.Empty;
        private Address address = new Address();

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
        [StringLength(20)]
        [DataMember]
        public string Type
        {
            get { return type; }
            set { type = value; }
        }
        [StringLength(100)]
        [DataMember]
        public string Description
        {
            get { return description; }
            set { description = value; }
        }
        [DataMember]
        public DateTime StartDate
        {
            get { return startDate; }
            set { startDate = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string Size
        {
            get { return size; }
            set { size = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string Sector
        {
            get { return sector; }
            set { sector = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string Status
        {
            get { return status; }
            set { status = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string Reach
        {
            get { return reach; }
            set { reach = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string Objectives
        {
            get { return objectives; }
            set { objectives = value; }
        }

        #endregion

        #region Methods

        public int SaveChanges(BusinessDetails detail, int contactId)
        {
            int id = 0;
            return id;
        }


        public BusinessDetails GetByContactId(int contactId)
        {
            BusinessDetails businessDetails = new BusinessDetails();
            return businessDetails;
        }

        #endregion
    }

}
