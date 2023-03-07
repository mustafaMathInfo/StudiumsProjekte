using System;
using CRUDExample.Models.Enums;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CRUDExample.Models.DTO
{
	public class PersonRequest
	{
		[Required(ErrorMessage = "First Name cannot be empty")]
		public string? FirstName { get; set; }
		
		[Required(ErrorMessage = "Last Name cannot be empty")]
		public string? LastName { get; set; }
		public string? JobTitle { get; set; }
		
		public int? Salary { get; set; }

        [Required(ErrorMessage = "Email cannot be empty")]
        [EmailAddress(ErrorMessage = "Email should be a valid")]
        public string? Email { get; set; }

		public DateTime? DateOfBirth { get; set; }
		public GenderOptions? Gender { get; set; }
		
		public string? Country { get; set; }
		public string? Address { get; set; }
		public bool ReceiveNewsLetters { get; set; }
		
        ///  Converts the current Object of PersonRequest into Object of Person
        public Person ToPerson() => new Person()
        {
            FirstName = this.FirstName,
            LastName = this.LastName,
            JobTitle = this.JobTitle,
            Salary = this.Salary,
            Email = this.Email,
            DateOfBirth = this.DateOfBirth,
            Gender = this.Gender.ToString(),
			Country = this.Country,
			Address = this.Address,
			ReceiveNewsLetters = this.ReceiveNewsLetters
        };

        public override string ToString()
        {
            return $"First Name: {FirstName}, " +
                   $"Email: {Email}, " +
                   $"Gender: {Gender}, " +
                   $"Address: {Address}, " +
                   $"Country: {Country}";
        }
    }
}

