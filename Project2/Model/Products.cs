using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Project2.Model
{
    public class Products
    {
        [Key]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string ProductName { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid integer Number")]
        public int ProductPrice { get; set; }
    }
}
