using CRUDExample.Models;
using CRUDExample.Models.Enums;

namespace CRUDExample.Services.Helpers;

public class PersonsInitializeList
{
    public List<Person> AddPersons(List<Person> persons, bool initializeValue)
    {
        if (initializeValue)
        {
            persons.AddRange(new List<Person>()
            {
                new Person()
                {
                    FirstName = "Ruby",
                    LastName = "Leith",
                    JobTitle = "Registered Nurse",
                    Salary = 3000,
                    PersonID = Guid.Parse("1ED35044-739A-488B-AADB-6843EBF2A415"),
                    Email = "rubyLeith@gmail.com",
                    Address = "Auf dem Campus 6",
                    Gender = GenderOptions.Female.ToString(),
                    Country = "Germany",
                    DateOfBirth = DateTime.Parse("1991-06-08"),
                    ReceiveNewsLetters = true
                },
                new Person()
                {
                    FirstName = "Marius",
                    LastName = "Drury",
                    JobTitle = "Technical Writer",
                    Salary = 4000,
                    PersonID = Guid.Parse("AE7DAE83-601A-4E35-8F76-4454AD17EDF0"),
                    Email = "mdrury1@yelp.com",
                    Address = "9 Trailsway Pass",
                    Gender = GenderOptions.Male.ToString(),
                    Country = "Brazil",
                    DateOfBirth = DateTime.Parse("1980-12-02"),
                    ReceiveNewsLetters = true
                },
                new Person()
                {
                    FirstName = "Brendin",
                    LastName = "Aldridge",
                    JobTitle = "Senior Cost Accountant",
                    Salary = 8000,
                    PersonID = Guid.Parse("474B5195-E6CE-4F0A-8EE5-1AD5AD5E5A2B"),
                    Email = "dchadwick2@marketwatch.com",
                    Address = "00611 Cody Hill",
                    Gender = GenderOptions.Female.ToString(),
                    Country = "USA",
                    DateOfBirth = DateTime.Parse("1986-07-19"),
                    ReceiveNewsLetters = true
                },
                new Person()
                {
                    FirstName = "Helena",
                    LastName = "Enston",
                    JobTitle = "Compensation Analyst",
                    Salary = 6000,
                    PersonID = Guid.Parse("E422EA81-776E-44A6-804B-B87B4A43906C"),
                    Email = "henston3@sun.com",
                    Address = "9 Rigney Way",
                    Gender = GenderOptions.Female.ToString(),
                    Country ="Czech Republic",
                    DateOfBirth = DateTime.Parse("1970-12-19"),
                    ReceiveNewsLetters = true
                },
                new Person()
                {
                    FirstName = "Lazaro",
                    LastName = "Mitchel",
                    JobTitle = "Environmental Tech",
                    Salary = 3800,
                    PersonID = Guid.Parse("54BC1FD2-4AE1-44F7-A771-31CBDB762236"),
                    Email = "lmitchel4@artisteer.com",
                    Address = "2 Mallory Terrace",
                    Gender = GenderOptions.Male.ToString(),
                    Country = "Indonesia",
                    DateOfBirth = DateTime.Parse("1991-08-16"),
                    ReceiveNewsLetters = true
                },
                new Person()
                {
                    FirstName = "Tasha",
                    LastName = "Breen",
                    JobTitle = "Operator",
                    Salary = 8000,
                    PersonID = Guid.Parse("D39B711B-D86F-4495-8F42-FD5B1077ECC4"),
                    Email = "tbreen6@wix.com",
                    Address = "55983 Alpine Place",
                    Gender = GenderOptions.Female.ToString(),
                    Country = "Australia",
                    DateOfBirth = DateTime.Parse("1976-08-01"),
                    ReceiveNewsLetters = true
                },
                new Person()
                {
                    FirstName = "Culver",
                    LastName = "Martygin",
                    JobTitle = "Office Assistant III",
                    Salary = 2000,
                    PersonID = Guid.Parse("F43CB8D2-1AC1-4560-8728-F2A5DEB18082"),
                    Email = "cmartygin7@squarespace.com",
                    Address = "66 Sage Junction",
                    Gender = GenderOptions.Male.ToString(),
                    Country = "Russia",
                    DateOfBirth = DateTime.Parse("1995-05-08"),
                    ReceiveNewsLetters = true
                },
                new Person()
                {
                    FirstName = "Devinne",
                    LastName = "Coombe",
                    JobTitle = "Junior Executive",
                    Salary = 2000,
                    PersonID = Guid.Parse("EA2F7B59-79A0-4B4A-9D2C-5106E088DE88"),
                    Email = "dcoombe8@cyberchimps.com",
                    Address = "664 Portage Pas",
                    Gender = GenderOptions.Female.ToString(),
                    Country = "Portugal",
                    DateOfBirth = DateTime.Parse("1988-07-25"),
                    ReceiveNewsLetters = true
                },
                new Person()
                {
                    FirstName = "Devondra",
                    LastName = "Sheldon",
                    JobTitle = "VP Product Management",
                    Salary = 3000,
                    PersonID = Guid.Parse("471E4C74-270B-4338-B2C3-070EDFD62461"),
                    Email = "dsheldon9@examiner.com",
                    Address = "89 Caliangt Junctions",
                    Gender = GenderOptions.Female.ToString(),
                    Country = "Iraq",
                    DateOfBirth = DateTime.Parse("1982-06-19"),
                    ReceiveNewsLetters = true
                }

            });
        }

        return persons;
    }
}