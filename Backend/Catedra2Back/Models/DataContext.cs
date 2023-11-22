using Microsoft.EntityFrameworkCore;

namespace Catedra2Back.Models;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public DbSet<Producto> Productos { get; set; } = null!;
}