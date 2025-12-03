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
                new Product { Name = "iPhone 15 Pro", Category = "Electronics", Price = 999, StockQuantity = 50, Description = "The latest iPhone with titanium design.", ImageUrl = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846363993", CreatedAt = DateTime.UtcNow },
                new Product { Name = "MacBook Air M2", Category = "Electronics", Price = 1199, StockQuantity = 30, Description = "Supercharged by M2 chip.", ImageUrl = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665", CreatedAt = DateTime.UtcNow },
                new Product { Name = "Sony WH-1000XM5", Category = "Electronics", Price = 349, StockQuantity = 100, Description = "Noise cancelling headphones.", ImageUrl = "https://m.media-amazon.com/images/I/51SKmu2G9FL._AC_UF1000,1000_QL80_.jpg", CreatedAt = DateTime.UtcNow },
                new Product { Name = "Men's T-Shirt", Category = "Clothing", Price = 19.99m, StockQuantity = 200, Description = "Cotton t-shirt.", ImageUrl = "https://m.media-amazon.com/images/I/71-3HjGNDUL._AC_UY1000_.jpg", CreatedAt = DateTime.UtcNow },
                new Product { Name = "Running Shoes", Category = "Clothing", Price = 89.99m, StockQuantity = 75, Description = "Comfortable running shoes.", ImageUrl = "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg", CreatedAt = DateTime.UtcNow },
                new Product { Name = "The Great Gatsby", Category = "Books", Price = 12.99m, StockQuantity = 150, Description = "Classic novel.", ImageUrl = "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg", CreatedAt = DateTime.UtcNow },
                new Product { Name = "Clean Code", Category = "Books", Price = 45.00m, StockQuantity = 40, Description = "A Handbook of Agile Software Craftsmanship.", ImageUrl = "https://m.media-amazon.com/images/I/41xShlnTZTL._AC_UF1000,1000_QL80_.jpg", CreatedAt = DateTime.UtcNow }
            };

            foreach (var p in products)
            {
                context.Products.Add(p);
            }
            context.SaveChanges();
        }
    }
}
