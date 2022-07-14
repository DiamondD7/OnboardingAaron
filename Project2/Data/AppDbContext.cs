using Microsoft.EntityFrameworkCore;
using Project2.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project2.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext>options) : base(options)
        {

        }

        public DbSet<Customers> Customers { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Stores> Stores { get; set; }
        public DbSet<Sales> Sales { get; set; }
    }
}
