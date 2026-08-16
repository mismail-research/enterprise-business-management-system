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
    public class Buyers
    {

        #region Attribues

        Guid buyerId;
        Guid productId;
        private string buyerName = string.Empty;
        private string buyerPhoneNumber = string.Empty;
        private string buyerEmail = string.Empty;




        #endregion

        #region Properties
        [Key]
        [Required]
        [DataMember]
        public Guid BuyerId
        {
            get { return buyerId; }
            set { buyerId = value; }
        }

        [DataMember]
        public Guid ProductId
        {
            get { return productId; }
            set { productId = value; }
        }
        [ForeignKey("ProductId")]
        [DataMember]
        public Products Products { get; set; }


        [StringLength(50)]
        [DataMember]
        public string BuyerName
        {
            get { return buyerName; }
            set { buyerName = value; }
        }

        [StringLength(50)]
        [DataMember]
        public string BuyerPhoneNumber
        {
            get { return buyerPhoneNumber; }
            set { buyerPhoneNumber = value; }
        }

        [StringLength(60)]
        [DataMember]
        public string BuyerEmail
        {
            get { return buyerEmail; }
            set { buyerEmail = value; }
        }

        [DataMember]
        public virtual ICollection<Addresses> Address { get; set; }
        #endregion


        #region Constructors

        public Buyers()
        {

        }


        #endregion

        #region Methods
        #endregion



    }
}
