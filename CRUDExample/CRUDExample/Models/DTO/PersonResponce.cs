using System;
using CRUDExample.Models.Enums;

namespace CRUDExample.Models.DTO
{
    public class PersonResponce
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
        public double? Age { get; set; }

        /// <summary>
        /// Compares the current object data with the parameter Object
        /// </summary>
        /// <param name="obj">The PersonResponse Object</param>
        /// <returns>True or false, indicating whether all details are matches with
        /// the specified parameter object  </returns>
        public override bool Equals(object? obj)
        {
            if (obj == null || obj.GetType() != typeof(PersonResponce))
            {
                return false;
            }
            PersonResponce personResponse = (PersonResponce)obj;
            return
                this.PersonID == personResponse.PersonID &&
                this.FirstName == personResponse.FirstName &&
                this.LastName == personResponse.LastName &&
                this.JobTitle == personResponse.JobTitle &&
                this.Salary == personResponse.Salary &&
                this.Email == personResponse.Email &&
                this.DateOfBirth == personResponse.DateOfBirth &&
                this.Gender == personResponse.Gender &&
                this.Country == personResponse.Country &&
                this.Address == personResponse.Address &&
                this.ReceiveNewsLetters == ReceiveNewsLetters;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return $"Person ID: {PersonID}, " +
                   $"First Name: {FirstName}, " +
                   $"Last Name: {LastName}, " +
                   $"Email: {Email}, " +
                   $"Gender: {Gender}, " +
                   $"Country: {Country}" +
                   $"Address: {Address}, " +
                   $"Age: {Age}";
        } 
        
        //  Converts the current Object of PersonUpdateRequest into Object of Person
        public PersonUpdateRequest ToPersonUpdateRequest() => new PersonUpdateRequest()
        {
            PersonID = this.PersonID,
            FirstName = this.FirstName,
            LastName = this.LastName,
            JobTitle = this.JobTitle,
            Salary = this.Salary,
            Email = this.Email,
            DateOfBirth = this.DateOfBirth,
            Gender = (GenderOptions)Enum.Parse(typeof(GenderOptions), Gender, true),
            Address = this.Address,
            Country = Country,
            ReceiveNewsLetters = this.ReceiveNewsLetters
        };
    }
}

