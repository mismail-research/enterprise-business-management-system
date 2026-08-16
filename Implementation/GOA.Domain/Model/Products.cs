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
    public class Products
    {
        #region Attribues

        Guid productId;
        private string productName = string.Empty;
        private string productQuantity = string.Empty;
        private string productDescription = string.Empty;
        private string productNo = string.Empty;
        private string arrivalDate = string.Empty;
        private string productUnit = string.Empty;
        private string exporterName = string.Empty;
        private string commodityCode = string.Empty;
        string createdBy = string.Empty;
        string updatedBy = string.Empty;
        private string createdDate = string.Empty;
        private string updatedDate = string.Empty;
        private string status = string.Empty;
        private string topMarket = string.Empty;
        private string latestMarket = string.Empty;
        #endregion

        #region Properties

        [Key]
        [Required]
        [DataMember]
        public Guid ProductId
        {
            get { return productId; }
            set { productId = value; }
        }

        [StringLength(50)]
        [DataMember]
        public string ProductName
        {
            get { return productName; }
            set { productName = value; }
        }
        [StringLength(15)]
        [DataMember]
        public string ProductNo
        {
            get { return this.productNo; }
            set { this.productNo = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string CreatedDate
        {
            get { return createdDate; }
            set { createdDate = value; }
        }
        [StringLength(50)]
        [DataMember]
        public string UpdatedDate
        {
            get { return updatedDate; }
            set { updatedDate = value; }
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
        [StringLength(50)]
        [DataMember]
        public string ArrivalDate
        {
            get { return arrivalDate; }
            set { arrivalDate = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string TopMarket
        {
            get { return topMarket; }
            set { topMarket = value; }
        }
        [StringLength(20)]
        [DataMember]
        public string LatestMarket
        {
            get { return latestMarket; }
            set { latestMarket = value; }
        }
        [StringLength(100)]
        [DataMember]
        public string CommodityCode
        {
            get { return commodityCode; }
            set { commodityCode = value; }
        }


        [StringLength(150)]
        [DataMember]
        public string ProductDescription
        {
            get { return productDescription; }
            set { productDescription = value; }
        }

        [StringLength(50)]
        [DataMember]
        public string ProductQuantity
        {
            get { return productQuantity; }
            set { productQuantity = value; }
        }

        [StringLength(50)]
        [DataMember]
        public string ProductUnit
        {
            get { return productUnit; }
            set { productUnit = value; }
        }

        [StringLength(50)]
        [DataMember]
        public string ExporterName
        {
            get { return exporterName; }
            set { exporterName = value; }
        }
        [DataMember]
        public ICollection<Buyers> Buyers { get; set; }
        [StringLength(15)]
        [DataMember]
        public string Status { get { return this.status; } set { this.status = value; } }

        #endregion


        #region Constructors

        public Products()
        {

        }


        #endregion

        #region Methods
        #endregion
    }
}
