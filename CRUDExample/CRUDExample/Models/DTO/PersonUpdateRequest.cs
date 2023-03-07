using System;
using System.ComponentModel.DataAnnotations;
using CRUDExample.Models.Enums;

namespace CRUDExample.Models.DTO
{
	public class PersonUpdateRequest
	{
		
		[Required(ErrorMessage = "Person Id cannot be empty")]
		public Guid PersonID { get; set; }
		
		[Required(ErrorMessage = "First Name cannot be empty")]
		public string? FirstName { get; set; }
		
		[Required(ErrorMessage = "Last Name cannot be empty")]
		public string? LastName { get; set; }
		
		[Required(ErrorMessage = "Job Title cannot be empty")]
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
		
		//  Converts the current Object of PersonUpdateRequest into Object of Person
		public Person ToPerson() => new Person()
		{
			PersonID = this.PersonID,
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
	}

}

