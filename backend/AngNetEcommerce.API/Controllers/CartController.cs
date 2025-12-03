using AngNetEcommerce.API.Data;
using AngNetEcommerce.API.DTOs;
using AngNetEcommerce.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AngNetEcommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirst("id")?.Value ?? "0");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCart()
        {
            var userId = GetUserId();
            return await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart(CartItemDto cartItemDto)
        {
            var userId = GetUserId();
            
            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == cartItemDto.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += cartItemDto.Quantity;
                await _context.SaveChangesAsync();
                return Ok(existingItem);
            }

            var cartItem = new CartItem
            {
                UserId = userId,
                ProductId = cartItemDto.ProductId,
                Quantity = cartItemDto.Quantity
            };

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cartItem.Id }, cartItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, CartItemDto cartItemDto)
        {
            var userId = GetUserId();
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (cartItem == null)
            {
                return NotFound();
            }

            cartItem.Quantity = cartItemDto.Quantity;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var userId = GetUserId();
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
