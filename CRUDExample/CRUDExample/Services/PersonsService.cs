using System;
using CRUDExample.Controllers;
using CRUDExample.Models;
using CRUDExample.Models.DTO;
using CRUDExample.Models.Enums;
using CRUDExample.Services.Helpers;

namespace CRUDExample.Services
{
    public class PersonsService
    {
        private readonly List<Person> _persons;

        public PersonsService(bool initialize = true)
        {
            _persons = new List<Person>();
            PersonsInitializeList personsInitializeList = new PersonsInitializeList();
            _persons = personsInitializeList.AddPersons(_persons, initialize);
        }

        /// <summary>
        /// Adds a new person into the list of persons
        /// </summary>
        /// <param name="personRequest">Person to add</param>
        /// <returns>Returns the Same person details, along with newly generated PersonId</returns>
        /// <exception cref="ArgumentNullException"></exception>
        public PersonResponce AddPerson(PersonRequest? personRequest)
        {
            if (personRequest == null)
            {
                throw new ArgumentNullException();
            }

            ValidationHelper<PersonRequest>.ModelValidations(personRequest);

            Person person = personRequest.ToPerson();
            person.PersonID = Guid.NewGuid();
            _persons.Add(person);
            return person.ToPersonResponse(); ;
        }

        /// <summary>
        /// Return all Countries
        /// </summary>
        /// <returns>Returns a list of object of CountriesResponse type</returns>
        public List<PersonResponce> GetAllPersons()
        {
            return _persons.Select(person => person.ToPersonResponse()).ToList();
        }

        /// <summary>
        /// Return a person object based in the given person id
        /// </summary>
        /// <param name="perrsonID">PersonID to search</param>
        /// <returns>Returns Matching person as personResponce object</returns>
        public PersonResponce? GetPersonByPersonID(Guid? perrsonID)
        {
            PersonResponce? personResponse = null;
            if (perrsonID != null)
            {
                personResponse = _persons.Find(person => person.PersonID == perrsonID)?.ToPersonResponse();
            }

            return personResponse;
        }

        /// <summary>
        /// Returns all Person objects that matches with the given search field and search string
        /// </summary>
        /// <param name="searchBy">Search field to search</param>
        /// <param name="searchString">Search string to search</param>
        /// <returns>Returns all matching persons based on the given search field and search string</returns>
        public List<PersonResponce> GetFilteredPersons(string searchBy, string? searchString)
        {
            List<PersonResponce> matchingPerson = GetAllPersons();
            if (!string.IsNullOrEmpty(searchBy) && !string.IsNullOrEmpty(searchString))
            {
                matchingPerson = searchBy switch
                {
                    nameof(PersonResponce.FirstName) => matchingPerson.Where(person =>
                        person.FirstName.Contains(searchString, StringComparison.CurrentCultureIgnoreCase)).ToList(),
                    nameof(PersonResponce.LastName) => matchingPerson.Where(person =>
                        person.LastName.Contains(searchString, StringComparison.CurrentCultureIgnoreCase)).ToList(),
                    nameof(PersonResponce.JobTitle) => matchingPerson.Where(person =>
                        person.JobTitle.Contains(searchString, StringComparison.CurrentCultureIgnoreCase)).ToList(),
                    nameof(PersonResponce.Salary) => matchingPerson.Where(person =>
                        person.Salary.Value.ToString().Contains(searchString)).ToList(),
                    nameof(PersonResponce.Email) => matchingPerson.Where(person =>
                        person.Email.Contains(searchString, StringComparison.CurrentCultureIgnoreCase)).ToList(),
                    nameof(PersonResponce.Gender) => matchingPerson.Where(person =>
                        person.Gender.Contains(searchString, StringComparison.CurrentCultureIgnoreCase)).ToList(),
                    nameof(PersonResponce.Address) => matchingPerson.Where(person =>
                        person.Address.Contains(searchString, StringComparison.CurrentCultureIgnoreCase)).ToList(),
                    nameof(PersonResponce.Country) => matchingPerson.Where(person =>
                        person.Country.Contains(searchString, StringComparison.CurrentCultureIgnoreCase)).ToList(),
                    nameof(PersonResponce.DateOfBirth) => matchingPerson.Where(person =>
                        person.DateOfBirth.Value.ToString("dd MMMM yyyy")
                            .Contains(searchString, StringComparison.CurrentCultureIgnoreCase)).ToList(),
                    _ => new List<PersonResponce>()
                };
            }

            return matchingPerson;
        }

        /// <summary>
        /// Return sorted list of person
        /// </summary>
        /// <param name="allPersons">Represents list of persons to sort</param>
        /// <param name="sortBy">Name of the property(key), based on which the persons should be sorted</param>
        /// <param name="sortOrder">ASC or DESC</param>
        /// <returns>Return sorted list of person as PersonResponse list</returns>
        public List<PersonResponce> GetSortedPersons(List<PersonResponce> allPersons, string sortBy,
            SortOrderEnum sortOrder)
        {
            List<PersonResponce> sortedPersonsList = new List<PersonResponce>();
            if (!string.IsNullOrEmpty(sortBy) && sortOrder == SortOrderEnum.ASC)
            {
                sortedPersonsList = sortBy switch
                {
                    nameof(Person.FirstName) => allPersons.OrderBy(person => person.FirstName).ToList(),
                    nameof(Person.LastName) => allPersons.OrderBy(person => person.LastName).ToList(),
                    nameof(Person.JobTitle) => allPersons.OrderBy(person => person.JobTitle).ToList(),
                    nameof(Person.Salary) => allPersons.OrderBy(person => person.Salary).ToList(),
                    nameof(Person.Email) => allPersons.OrderBy(person => person.Email).ToList(),
                    nameof(Person.Gender) => allPersons.OrderBy(person => person.Gender).ToList(),
                    nameof(Person.Address) => allPersons.OrderBy(person => person.Address).ToList(),
                    nameof(Person.DateOfBirth) => allPersons.OrderBy(person => person.DateOfBirth).ToList(),
                    _ => allPersons
                };
            }

            if (!string.IsNullOrEmpty(sortBy) && sortOrder == SortOrderEnum.DESC)
            {
                sortedPersonsList = sortBy switch
                {
                    nameof(Person.FirstName) => allPersons.OrderByDescending(person => person.FirstName).ToList(),
                    nameof(Person.LastName) => allPersons.OrderByDescending(person => person.LastName).ToList(),
                    nameof(Person.JobTitle) => allPersons.OrderByDescending(person => person.JobTitle).ToList(),
                    nameof(Person.Salary) => allPersons.OrderByDescending(person => person.Salary).ToList(),
                    nameof(Person.Email) => allPersons.OrderByDescending(person => person.Email).ToList(),
                    nameof(Person.Gender) => allPersons.OrderByDescending(person => person.Gender).ToList(),
                    nameof(Person.Address) => allPersons.OrderByDescending(person => person.Address).ToList(),
                    nameof(Person.DateOfBirth) => allPersons.OrderByDescending(person => person.DateOfBirth).ToList(),
                    _ => allPersons
                };
            }

            return sortedPersonsList;
        }

        /// <summary>
        /// Update the specified person details based on the given person ID
        /// </summary>
        /// <param name="personUpdateRequest">Person details to update, including person id</param>
        /// <returns>return the person response object after Update</returns>
        /// <exception cref="ArgumentNullException"></exception>
        public PersonResponce UpdatePerson(PersonUpdateRequest? personUpdateRequest)
        {
            if (personUpdateRequest == null)
            {
                throw new ArgumentNullException();
            }

            //validation
            ValidationHelper<PersonUpdateRequest>.ModelValidations(personUpdateRequest);

            //get matching person object to update
            Person? matchingPerson = _persons.FirstOrDefault(person => person.PersonID == personUpdateRequest.PersonID);
            if (matchingPerson == null)
            {
                throw new ArgumentException("Given Person ID doesn't exist");
            }

            // update all details
            matchingPerson.FirstName = personUpdateRequest.FirstName;
            matchingPerson.LastName = personUpdateRequest.LastName;
            matchingPerson.JobTitle = personUpdateRequest.JobTitle;
            matchingPerson.Salary = personUpdateRequest.Salary;
            matchingPerson.Email = personUpdateRequest.Email;
            matchingPerson.DateOfBirth = personUpdateRequest.DateOfBirth;
            matchingPerson.Gender = personUpdateRequest.Gender.ToString();
            matchingPerson.Address = personUpdateRequest.Address;
            matchingPerson.Country = personUpdateRequest.Country;
            matchingPerson.ReceiveNewsLetters = personUpdateRequest.ReceiveNewsLetters;
            return matchingPerson.ToPersonResponse();
        }

        /// <summary>
        /// Deletes a person based on the given person id
        /// </summary>
        /// <param name="personID">PersonId to deleted</param>
        /// <returns>Returns true, if the deletion is successful, otherwise false</returns>
        /// <exception cref="ArgumentNullException"></exception>
        public bool DeletePerson(Guid? personID)
        {
            bool foundPerson = false;
            if (personID == null)
            {
                throw new ArgumentNullException();
            }

            //get matching person object to update
            Person? matchingPerson = _persons.FirstOrDefault(person => person.PersonID == personID);
            if (matchingPerson != null)
            {
                foundPerson = _persons.Remove(matchingPerson);
            }
            return foundPerson;
        }
    }
}