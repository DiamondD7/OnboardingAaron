using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Project2.Model
{
    public class Stores
    {
        [Key]
        public int StoreId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string StoreName { get; set; }

        public string StoreAddress { get; set; }
    }
}
