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
    public class StoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StoresController(AppDbContext context)
        {
            _context = context;
        }

        // eg. GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stores>>> GetStores()
        {
            return await _context.Stores.ToListAsync();
        }

        // eg. GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Stores>> GetStores(int id)
        {
            var stores = await _context.Stores.FindAsync(id);

            if (stores == null)
            {
                return NotFound();
            }

            return stores;
        }

        // eg. PUT: api/Stores/5
        [HttpPut]
        public async Task<IActionResult> PutStores(Stores stores)
        {
            _context.Stores.Update(stores);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // eg. POST: api/Stores
        [HttpPost]
        public async Task<ActionResult<Stores>> PostStores(Stores stores)
        {
            _context.Stores.Add(stores);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStores", new { id = stores.StoreId }, stores);
        }

        // eg. DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStores(int id)
        {
            var stores = await _context.Stores.FindAsync(id);
            if (stores == null)
            {
                return NotFound();
            }

            _context.Stores.Remove(stores);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoresExists(int id)
        {
            return _context.Stores.Any(e => e.StoreId == id);
        }
    }
}
