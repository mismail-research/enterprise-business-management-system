using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model
{
    [DataContract(IsReference = true)]
    public class Addresses
    {
        #region Attribues
        Guid id;
        Guid buyerId;
        string addressLines;
        string townLocality;
        string city;
        string zipCode;
        string country;

        #endregion

        #region Properties
        [Key]
        [DataMember]
        public Guid Id
        {
            get { return id; }
            set { id = value; }
        }

        [DataMember]
        public Guid BuyerId
        {
            get { return buyerId; }
            set { buyerId = value; }
        }
        [ForeignKey("BuyerId")]
        [DataMember]
        public virtual Buyers Buyers { get; set; }


        [StringLength(250)]
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
        public string City
        {
            get { return city; }
            set { city = value; }
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

        public Addresses()
        {

        }

        #endregion
    }
}
