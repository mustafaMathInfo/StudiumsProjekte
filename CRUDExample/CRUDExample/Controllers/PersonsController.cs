using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUDExample.Models.DTO;
using CRUDExample.Models.Enums;
using CRUDExample.Services;
using Microsoft.AspNetCore.Mvc;

namespace CRUDExample.Controllers
{
    [Route("persons")]
    public class PersonsController : Controller
    {
        private readonly PersonsService _personsService;

        public PersonsController(PersonsService personsService)
        {
            _personsService = personsService;
        }

        [Route("index")]
        [Route("/")]
        public IActionResult Index(string searchBy, string? searchString,
                        string sortBy = "FirstName", SortOrderEnum sortOrder = SortOrderEnum.ASC)
        {
            ViewBag.SearchFields = new Dictionary<string, string>()
            {
                {nameof(PersonResponce.FirstName),"First Name"},
                {nameof(PersonResponce.LastName),"Last Name"},
                {nameof(PersonResponce.JobTitle),"Job Title"},
                {nameof(PersonResponce.Salary),"Salary"},
                {nameof(PersonResponce.Email),"Email"},
                {nameof(PersonResponce.DateOfBirth),"DateOfBirth"},
                {nameof(PersonResponce.Gender),"Gender"},
                {nameof(PersonResponce.Country),"Country"},
                {nameof(PersonResponce.PersonID),"PersonID"},
                {nameof(PersonResponce.Address),"Address"}
            };
            
            List<PersonResponce> persons = _personsService.GetFilteredPersons(searchBy, searchString);
            ViewBag.CurrentSearchBy = searchBy;
            ViewBag.CurrentSearchString = searchString;
            //Sort
            persons = _personsService.GetSortedPersons(persons, sortBy, sortOrder);
            ViewBag.CurrentSortBy = sortBy;
            ViewBag.CurrentSortOrder = sortOrder.ToString();

            return View(persons);
        }

        [Route("create")]
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [Route("create")]
        [HttpPost]
        public IActionResult Create(PersonRequest personRequest)
        {
            
            if (!ModelState.IsValid)
            {
                ViewBag.Errors = ModelState.Values.SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage).ToList();
                return View();
            }
            _personsService.AddPerson(personRequest);
            return RedirectToAction("Index", "Persons");
        }

        [Route("[action]/{personID}")]
        [HttpGet]
        public IActionResult Edit(Guid personID)
        {
           PersonResponce? personResponce =_personsService.GetPersonByPersonID(personID);
           if(personResponce == null)
            {
                return RedirectToAction("Index");
            }
           PersonUpdateRequest? personUpdate = personResponce?.ToPersonUpdateRequest();
           return View(personUpdate);
        }

        [Route("[action]/{PersonID}")]
        [HttpPost]
        public IActionResult EditRequest(PersonUpdateRequest? personUpdate)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Errors = ModelState.Values.SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage).ToList();
                return View();
            }
            _personsService.UpdatePerson(personUpdate);
            return RedirectToAction("Index", "Persons");
        }

        [Route("[action]/{personID}")]
        [HttpGet]
        public IActionResult Delete(Guid personID)
        {
            PersonResponce? personResponce = _personsService.GetPersonByPersonID(personID);
            if (personResponce == null)
            {
                return RedirectToAction("Index");
            }
            _personsService.DeletePerson(personID);
            return RedirectToAction("Index", "Persons");
        }
    }
}