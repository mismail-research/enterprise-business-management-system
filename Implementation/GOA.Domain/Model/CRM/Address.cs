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
    public class Address
    {
        #region Attribues
        int id;
        int contactId;
        string addressLines;
        string townLocality;
        string region;
        string zipCode;
        string country;

        #endregion

        #region Properties
        
        [DataMember]
        public int ContactId
        {
            get { return contactId; }
            set { contactId = value; }
        }
        [ForeignKey("ContactId")]
        [DataMember]
        public Contact Contact { get; set; }

        [Key]
        [DataMember]
        public int Id
        {
            get { return id; }
            set { id = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string AddressLines
        {
            get { return addressLines; }
            set { addressLines = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string TownLocality
        {
            get { return townLocality; }
            set { townLocality = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string Region
        {
            get { return region; }
            set { region = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string ZipCode
        {
            get { return zipCode; }
            set { zipCode = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string Country
        {
            get { return country; }
            set { country = value; }
        }
        #endregion

        #region Methods

        public Address()
        {

        }

        public int SaveChanges(List<Address> lstAddress, int contactId)
        {
            return 0;
        }
        public List<Address> GetByContactId(int contactId)
        {
            List<Address> lstAddress = new List<Address>();
            return lstAddress;
        }




        #endregion
    }
}
