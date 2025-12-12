using AngNetEcommerce.API.Data;
using AngNetEcommerce.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngNetEcommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        [Authorize(Roles = "Admin,Seller")]
        public async Task<ActionResult<DashboardStatsDto>> GetDashboardStats()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalOrders = await _context.Orders.CountAsync();
            var totalRevenue = await _context.Orders.SumAsync(o => o.TotalPrice);
            var totalProducts = await _context.Products.CountAsync();
            var pendingOrders = await _context.Orders.CountAsync(o => o.OrderStatus == "Pending");

            return new DashboardStatsDto
            {
                TotalUsers = totalUsers,
                TotalOrders = totalOrders,
                TotalRevenue = totalRevenue,
                TotalProducts = totalProducts,
                PendingOrders = pendingOrders
            };
        }

        [HttpGet("charts")]
        [Authorize(Roles = "Admin,Seller")]
        public async Task<ActionResult<object>> GetChartData()
        {
            // Monthly Sales (Last 6 Months)
            var sixMonthsAgo = DateTime.Now.AddMonths(-5);
            var salesData = await _context.Orders
                .Where(o => o.OrderDate >= sixMonthsAgo)
                .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    TotalSales = g.Sum(o => o.TotalPrice)
                })
                .OrderBy(x => x.Year).ThenBy(x => x.Month)
                .ToListAsync();

            // Order Status Distribution
            var statusData = await _context.Orders
                .GroupBy(o => o.OrderStatus)
                .Select(g => new
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            return new
            {
                Sales = salesData,
                StatusDistribution = statusData
            };
        }

        [HttpGet("user-stats")]
        [Authorize]
        public async Task<ActionResult<object>> GetUserStats()
        {
            var userIdStr = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
            
            var userId = int.Parse(userIdStr);

            var totalOrders = await _context.Orders.CountAsync(o => o.UserId == userId);
            var completedOrders = await _context.Orders.CountAsync(o => o.UserId == userId && o.OrderStatus == "Delivered");
            
            return new
            {
                TotalOrders = totalOrders,
                CompletedOrders = completedOrders
            };
        }
    }
}
