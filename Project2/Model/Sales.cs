using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Project2.Model
{
    public class Sales
    {
        [Key]
        public int SaleId { get; set; }

        [Required(ErrorMessage = "Customer is required.")]
        public string Customer { get; set; }

        [Required(ErrorMessage = "Product is required.")]
        public string Product { get; set; }

        [Required(ErrorMessage = "Store is required.")]
        public string Store { get; set; }

        [Required(ErrorMessage = "Date is required.")]
        public string DateSold { get; set; }
    }
}
