using System;
using CRUDExample.Models.DTO;
using CRUDExample.Models.Enums;

namespace CRUDExample.Models
{
    public class Person
    {
        public Guid PersonID { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? JobTitle { get; set; }
        public int? Salary { get; set; }
        public string? Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Country { get; set; }
        public string? Address { get; set; }
        public bool ReceiveNewsLetters { get; set; }

        /// <summary>
        /// Converts the current Object of Person into Object of PersonResponse
        /// </summary>
        /// <returns></returns>
        public PersonResponce ToPersonResponse() => new PersonResponce()
        {
            PersonID = this.PersonID,
            FirstName = this.FirstName,
            LastName= this.LastName,
            JobTitle = this.JobTitle,
            Salary = this.Salary,
            Email = this.Email,
            DateOfBirth = this.DateOfBirth,
            Gender = this.Gender,
            Country = this.Country,
            Address = this.Address,
            ReceiveNewsLetters = this.ReceiveNewsLetters,
            Age = (this.DateOfBirth!=null)? Math.Round((DateTime.Now - this.DateOfBirth.Value).TotalDays / 365.25):null
        };
    }

    
}