using AngNetEcommerce.API.Models;

namespace AngNetEcommerce.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any products.
            if (context.Products.Any())
            {
                return;   // DB has been seeded
            }

            var users = new User[]
            {
                new User { FullName = "Admin User", Email = "admin@example.com", PasswordHash = "admin123", Role = "Admin", CreatedAt = DateTime.UtcNow },
                new User { FullName = "John Doe", Email = "john@example.com", PasswordHash = "user123", Role = "User", CreatedAt = DateTime.UtcNow }
            };

            foreach (var u in users)
            {
                context.Users.Add(u);
            }
            context.SaveChanges();

            var products = new Product[]
            {
                new Product { Name = "iPhone 15 Pro", Category = "Electronics", Price = 999, StockQuantity = 50, Description = "The latest iPhone with titanium design.", ImageUrl = "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=2070&auto=format&fit=crop", CreatedAt = DateTime.UtcNow },
                new Product { Name = "MacBook Air M2", Category = "Electronics", Price = 1199, StockQuantity = 30, Description = "Supercharged by M2 chip.", ImageUrl = "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop", CreatedAt = DateTime.UtcNow },
                new Product { Name = "Sony WH-1000XM5", Category = "Electronics", Price = 349, StockQuantity = 100, Description = "Noise cancelling headphones.", ImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop", CreatedAt = DateTime.UtcNow },
                new Product { Name = "Men's T-Shirt", Category = "Clothing", Price = 19.99m, StockQuantity = 200, Description = "Cotton t-shirt.", ImageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop", CreatedAt = DateTime.UtcNow },
                new Product { Name = "Running Shoes", Category = "Clothing", Price = 89.99m, StockQuantity = 75, Description = "Comfortable running shoes.", ImageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop", CreatedAt = DateTime.UtcNow },
                new Product { Name = "The Great Gatsby", Category = "Books", Price = 12.99m, StockQuantity = 150, Description = "Classic novel.", ImageUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop", CreatedAt = DateTime.UtcNow },
                new Product { Name = "Clean Code", Category = "Books", Price = 45.00m, StockQuantity = 40, Description = "A Handbook of Agile Software Craftsmanship.", ImageUrl = "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop", CreatedAt = DateTime.UtcNow }
            };

            foreach (var p in products)
            {
                context.Products.Add(p);
            }
            context.SaveChanges();
        }
    }
}
