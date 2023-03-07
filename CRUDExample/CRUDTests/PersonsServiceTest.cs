using System;
using CRUDExample;
using CRUDExample.Controllers;
using CRUDExample.Models;
using CRUDExample.Models.DTO;
using CRUDExample.Models.Enums;
using CRUDExample.Services;
using Xunit.Abstractions;
namespace CRUDTests
{
    public class PersonsServiceTest
    {
        private readonly PersonsService _personsService;
        private readonly ITestOutputHelper _testOutputHelper;

        public PersonsServiceTest(ITestOutputHelper testOutputHelper)
        {
            _personsService = new PersonsService(false);
            _testOutputHelper = testOutputHelper;
        }

        // When PersonRequest is null, it should throw ArgumentNullException
        [Fact]
        public void AddPerson_NullPerson()
        {
            PersonRequest? personRequest = null;

            Assert.Throws<ArgumentNullException>(() =>
            {
                _personsService.AddPerson(personRequest);
            });
        }

        // When the PersonName is null, it should throw ArgumentNullException
        [Fact]
        public void AddPerson_PersonNameIsNull()
        {
            PersonRequest? personRequest = new PersonRequest()
            {
                FirstName = null
            };

            Assert.Throws<ArgumentException>(() =>
            {
                _personsService.AddPerson(personRequest);
            });
        }

        // When we supply proper person details, it should insert the person into person List;
        // and it should return an object of PersonResponse.
        [Fact]
        public void AddPerson_ProperPersonDetails()
        {
            PersonRequest person = PersonRequest();
            PersonResponce personResponse = _personsService.AddPerson(person);
            List<PersonResponce> allPersons = _personsService.GetAllPersons();
            Assert.True(personResponse.PersonID != Guid.Empty);
            Assert.Contains(personResponse, allPersons);
        }

        [Fact]
        public void GetAllPersons_ListIsEmpty()
        {
            List<PersonResponce> personResponseList = _personsService.GetAllPersons();
            Assert.Empty(personResponseList);
        }

        [Fact]
        public void GetAllPersons_ListIsContainAllElement()
        {

            List<PersonResponce> expectedPersonResponseList = AddPerson();
            List<PersonResponce> actualPersonResponseList = _personsService.GetAllPersons();
            expectedPersonResponseList.ForEach(expectedPerson => Assert.Contains(expectedPerson, actualPersonResponseList));

            // Print expectedPerson and actualPerson
            expectedPersonResponseList.ForEach(person => _testOutputHelper.WriteLine(person.ToString()));
            actualPersonResponseList.ForEach(person => _testOutputHelper.WriteLine(person.ToString()));
        }

        // If personID is null, it should return null as PersonResponse
        [Fact]
        public void GetPersonByPersonID_PersonIDIsNull()
        {
            Guid? personID = null;
            PersonResponce? personResponse = _personsService.GetPersonByPersonID(personID);
            Assert.Null(personResponse);
        }

        // If personID is Valid and not matching a person,
        // it should return null as PersonResponse
        [Fact]
        public void GetPersonByPersonID_ListIsNotContainPerson()
        {
            PersonRequest person = PersonRequest();
            _personsService.AddPerson(person);
            PersonResponce? personResponse = _personsService.GetPersonByPersonID(new Guid());
            Assert.Null(personResponse);
        }

        // If personID is Valid and matching a person,
        // it should return the matching person details as PersonResponse object
        [Fact]
        public void GetPersonByPersonID_ListIsContainPerson()
        {
            PersonRequest person = PersonRequest();
            PersonResponce? expectedPerson = _personsService.AddPerson(person);
            PersonResponce? actualPerson = _personsService.GetPersonByPersonID(expectedPerson.PersonID);
            Assert.Equal(expectedPerson, actualPerson);

            //Print expectedPerson and actualPerson
            _testOutputHelper.WriteLine(expectedPerson.ToString());
            _testOutputHelper.WriteLine(actualPerson?.ToString());
        }

        // First we will add few persons, and then we will search based on person name
        // If person name is empty or null, it should return all Person Object
        [Fact]
        public void GetFilteredPersons_SearchStringIsEmpty()
        {
            AddPerson();
            List<PersonResponce> expectedPersonResponseList = _personsService.GetAllPersons();
            List<PersonResponce> actualPersonResponseList = _personsService.GetFilteredPersons(nameof(Person.FirstName), "");
            expectedPersonResponseList.ForEach(expectedPerson => Assert.Contains(expectedPerson, actualPersonResponseList));
        }

        // First we will add few persons, and then we will search based on person name
        // If person name is not matching, it should return empty List
        [Fact]
        public void GetFilteredPersons_SearchStringIsNotMatch()
        {
            AddPerson();
            List<PersonResponce> personList = _personsService.GetFilteredPersons(nameof(Person.FirstName), "Jabbar");
            Assert.Empty(personList);
        }

        // First we will add few persons, and then we will search based on person Address
        // If person Address  is matching, it should return matching Person 
        [Fact]
        public void GetFilteredPersons_SearchStringIsMatch()
        {
            List<PersonResponce> expectedPersonResponseList = AddPerson();
            List<PersonResponce> actualPersonResponseList = _personsService.GetFilteredPersons(nameof(Person.Address), "Auf");
           Assert.Contains(actualPersonResponseList.First(), expectedPersonResponseList);
        }

        // First we will add few persons, and then we will sort based on personName in DESC
        // It should return persons list in descending on PersonName 
        [Fact]
        public void GetSortedPersons()
        {
            List<PersonResponce> expectedPersonResponseList = AddPerson();
            List<PersonResponce> actualSortedPersonList = _personsService.GetSortedPersons(expectedPersonResponseList,nameof(Person.FirstName),SortOrderEnum.DESC);
            List<PersonResponce> expectedSortedPersonList = expectedPersonResponseList.OrderByDescending(temp => temp.FirstName).ToList();
            for (int i = 0; i < actualSortedPersonList.Count; i++)
            {
                Assert.Equal(expectedSortedPersonList[i], actualSortedPersonList[i]);
            }
            actualSortedPersonList.ForEach(person => _testOutputHelper.WriteLine(person.ToString()));
            expectedSortedPersonList.ForEach(person => _testOutputHelper.WriteLine(person.ToString()));
        }
        
        //When we supply null as PersonUpdateRequest, it should throw ArgumentNullException
        [Fact]
        public void UpdatePerson_NullPerson()
        {
            PersonUpdateRequest? personUpdateRequest = null;
            Assert.Throws<ArgumentNullException>(() =>
            {
                _personsService.UpdatePerson(personUpdateRequest);
            });
        }
        
        // When the PersonID is Invalid, it should throw ArgumentException
        [Fact]
        public void UpdatePerson_InvalidPersonID()
        {
            PersonUpdateRequest? personUpdateRequest = new PersonUpdateRequest()
            {
                PersonID = Guid.NewGuid()
            };

            Assert.Throws<ArgumentException>(() =>
            {
                _personsService.UpdatePerson(personUpdateRequest);
            });
        }
        
        // When the PersonName of PersonUpdateRequest is null, it should throw ArgumentNullException
        [Fact]
        public void UpdatePerson_FirstNameIsNull()
        {
            PersonRequest personRequest = PersonRequest();
            PersonResponce personResponse = _personsService.AddPerson(personRequest);
            PersonUpdateRequest personUpdateRequest = personResponse.ToPersonUpdateRequest();
            personUpdateRequest.FirstName = null;
            Assert.Throws<ArgumentException>(() =>
            {
                _personsService.UpdatePerson(personUpdateRequest);
            });
        }

        // When we supply proper person details, it should insert the person into person List;
        // and it should return an Update object of PersonResponse.
        [Fact]
        public void UpdatePerson_ProperPersonDetails()
        {
            PersonRequest personRequest = PersonRequest();
            PersonResponce personResponse = _personsService.AddPerson(personRequest);
            personResponse.FirstName = "William";
            personResponse.LastName = "Culver";
            personResponse.Email = "William@gmial.com";
            personResponse.JobTitle = "Operator";
            personResponse.Salary = 4000;
            PersonUpdateRequest personUpdateRequest = personResponse.ToPersonUpdateRequest();
            PersonResponce actualPersonUpdated = _personsService.UpdatePerson(personUpdateRequest);
            PersonResponce expectedPersonUpdated = _personsService.GetPersonByPersonID(actualPersonUpdated.PersonID);
            Assert.Equal(expectedPersonUpdated, actualPersonUpdated);
        }

        //When peronID is null, it should throw ArgumentNullException
        [Fact]
        public void DeletePerson_NullPerson()
        {
            AddPerson();
            Guid? personID = null;
            Assert.Throws<ArgumentNullException>(() =>
            {
                _personsService.DeletePerson(personID);
            });
        }
        
        // When the PersonID is Invalid, it should throw ArgumentException
        [Fact]
        public void DeletePerson_InvalidPersonID()
        { 
            AddPerson();
            PersonUpdateRequest? personUpdateRequest = new PersonUpdateRequest()
            {
                PersonID = Guid.NewGuid()
            };
           bool deletedPerson = _personsService.DeletePerson(personUpdateRequest.PersonID);
           Assert.False(deletedPerson);
        }
        
        // When we supply proper person details, it should remove the person base on PersonId from person List;
        // and it should return an removed object of PersonResponse.
        [Fact]
        public void DeletePerson_ProperPersonDetails()
        {
            List<PersonResponce> personResponse = AddPerson();
            bool deletedPerson = _personsService.DeletePerson(personResponse.First().PersonID);
            Assert.True(deletedPerson);
        }

        private List<PersonResponce> AddPerson()
        {
            List<PersonRequest> personRequestList = new List<PersonRequest>() {
               new PersonRequest()
               {
                FirstName = "Mustafa",
                LastName = "Waleed",
                JobTitle = "Developer",
                Salary = 4000,
                Email = "mustafa@gmail.com",
                Address = "Auf dem Campus 6",
                Gender = GenderOptions.Male,
                Country = "Iraq",
                DateOfBirth = DateTime.Parse("1991-05-05"),
                ReceiveNewsLetters = true
               },
               new PersonRequest()
               {
                   FirstName = "Ruby",
                   LastName = "Leith",
                   JobTitle = "Registered Nurse",
                   Salary = 3000,
                   Email = "dsheldon9@examiner.com",
                   Address = "09 Hoard Avenue",
                   Gender = GenderOptions.Female,
                   Country = "Argentina",
                   DateOfBirth = DateTime.Parse("1991-06-08"),
                   ReceiveNewsLetters = true
               },
               new PersonRequest()
               {
                   FirstName = "Marius",
                   LastName = "Drury",
                   JobTitle = "Technical Writer",
                   Salary = 4000,
                   Email = "mdrury1@yelp.com",
                   Address = "9 Trailsway Pass",
                   Gender = GenderOptions.Male,
                   Country = "Brazil",
                   DateOfBirth = DateTime.Parse("1980-12-02"),
                   ReceiveNewsLetters = true
               },
               new PersonRequest()
               {
                   FirstName = "Brendin",
                   LastName = "Aldridge",
                   JobTitle = "Senior Cost Accountant",
                   Salary = 8000,
                   Email = "dchadwick2@marketwatch.com",
                   Address = "00611 Cody Hill",
                   Gender = GenderOptions.Female,
                   Country = "Germany",
                   DateOfBirth = DateTime.Parse("1986-07-19"),
                   ReceiveNewsLetters = true
               },
            };
            return personRequestList.Select(temp => _personsService.AddPerson(temp)).ToList();
        }

        private PersonRequest PersonRequest()
        {
            return new PersonRequest()
            {
                FirstName = "Waleed",
                LastName = "Jabbar",
                JobTitle = "Doctor",
                Salary = 4000,
                Email = "Waleed@gmail.com",
                Address = "Auf dem Campus 6",
                Gender = GenderOptions.Male,
                DateOfBirth = DateTime.Parse("1964-09-22"),
                ReceiveNewsLetters = true,
                Country = "Iraq"
            };
        }

    }
}

