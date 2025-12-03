using System.ComponentModel.DataAnnotations.Schema;

namespace AngNetEcommerce.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string OrderStatus { get; set; } = "Pending";
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}
