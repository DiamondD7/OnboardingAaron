using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project2.Data;
using Project2.Model;

namespace Project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalesController(AppDbContext context)
        {
            _context = context;
        }

        // eg. GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
            return await _context.Sales.ToListAsync();
        }

        // eg. GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // eg. PUT: api/Sales/5
        [HttpPut]
        public async Task<IActionResult> PutSales(Sales sales)
        {
            _context.Sales.Update(sales);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // eg. POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sales.SaleId }, sales);
        }

        // eg. DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.SaleId == id);
        }
    }
}
