using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Project2.Model
{
    public class Customers
    {
        [Key]
        public int CustomerId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string CustomerName { get; set; }

        public string CustomerAddress { get; set; }
    }
}
