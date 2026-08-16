using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

using Microsoft.AspNet.Identity.EntityFramework;

namespace GOA.Domain.Model
{
    /// <summary>
    ///  User Profile entity
    /// </summary>
    [DataContract(IsReference = true)]
    public class UserProfile : IdentityUser
    {
        [DataMember]
        [StringLength(50)]
        public string FirstName { get; set; }

        [DataMember]
        [StringLength(50)]
        public string LastName { get; set; }

    }
}
