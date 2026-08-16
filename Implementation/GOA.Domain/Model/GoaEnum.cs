using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GOA.Domain.Model
{
    public class GoaEnum
    {
        public enum businessReach
        {
            Unknown,
            Local,
            Regional,
            National,
            International
        }

        public enum AuthorityToBuy
        {
            Unknown,
            Yes,
            No,
            Joint
        }

        public enum BusinessSize
        {
            Unknown,
            Small,
            Medium,
            Large,
            Multinational
        }

        public enum BusinessStatus
        {
            Unknown,
            Starting,
            Operational,
            Restructuring,
            Bankrupt,
            Sold
        }

        public enum BusinessType
        {
            Unknown,
            SoleTrader,
            Limited,
            Partnership,
            Corporation,
            Charity,
            Government,
            Education,
            Other
        }

        public enum BuyingLikelihood
        {
            Unknown,
            Unlikely,
            Fair,
            High,
            Bought
        }

        public enum BuyingPower
        {
            Unknown,
            Poor,
            Fair,
            Healthy,
            Wealthy
        }

        public enum ContactEvery
        {
            Unknown,
            Daily,
            Week,
            Weekly,
            Fortnightly,
            Monthly,
            Quarterly,
            Yearly,
            Never
        }

        public enum EmailMarket
        {
            Unknown,
            Yes,
            No
        }

        public enum Gender
        {
            Unknown,
            Male,
            Female
        }

        public enum GiveDiscounts
        {
            Unknown,
            Never,
            Sometimes,
            Always
        }

        public enum MaritalStatus
        {
            Unknown,
            Single,
            Engaged,
            Married,
            Separated,
            Divorced,
            Widowed
        }

        public enum OnPrefSupplyList
        {
            Unknown,
            Yes,
            No,
            Progressing
        }

        public enum PersonStatus
        {
            Unknown,
            Well,
            Pregnant,
            Leaving,
            Retired,
            Sick,
            Deceased
        }

        public enum Position
        {
            Unknown,
            Owner,
            Manager,
            Director,
            Partner,
            Board,
            Worker
        }
        public enum ContactType
        {
            Person,
            Company
        }
        public enum ContactDetailsType
        {
            Phone,
            Email,
            Website,
            IM,
            BusinessDetails,
            PersonalDetails
        }
        public enum LoginStatus
        {
            ACTIVE,
            CLOSED,
            TIMEOUT
        }
        public enum ContactStatus
        {
            Active,
            Deleted,
            Suspended,
            Inactive
        }
    }
}
