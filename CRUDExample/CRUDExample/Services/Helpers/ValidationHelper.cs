using System;
using System.ComponentModel.DataAnnotations;

namespace CRUDExample.Services.Helpers
{
    public class ValidationHelper<T>
    {
        internal static void ModelValidations(T t)
        {
            ValidationContext validationContext = new ValidationContext(t);
            List<ValidationResult> validationResults = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(t, validationContext, validationResults, true);
            if (!isValid)
            {
                throw new ArgumentException(validationResults.FirstOrDefault()?.ErrorMessage);
            }
        }
    }
}

