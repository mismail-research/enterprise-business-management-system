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
    public class Profile
    {
         [Key]
        [DataMember]
        public int ProfileId { get; set; }

        [DataMember]
        public string UserId { get; set; }

        [DataMember]
        [ForeignKey("UserId")]
        public UserProfile UserProfile { get; set; }

        [DataMember]
        [StringLength(50)]
        public string Title { get; set; }

        [DataMember]
        [StringLength(50)]
        public string FirstName { get; set; }

        [DataMember]
        [StringLength(50)]
        public string LastName { get; set; }

        [DataMember]
        [StringLength(50)]
        public string Designation { get; set; }

        [DataMember]
        [StringLength(200)]
        public string AboutMe { get; set; }

        [DataMember]
        [StringLength(200)]
        public string PictureUrl { get; set; }

        
        [DataMember]
        public DateTime CreatedDate { get; set; }

        [DataMember]
        public DateTime UpdatedDate { get; set; }

        public Profile()
        {
          
            this.FirstName = "First Name";
            this.LastName = "Last Name";       
            this.Designation = "Designation";
            this.Title = "Mr.";
            this.CreatedDate = DateTime.Now;
            this.UpdatedDate = DateTime.Now;
        }
    }
}
