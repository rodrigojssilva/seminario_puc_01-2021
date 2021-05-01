using ControleDePedidos.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleDePedidos.Data
{
    public class ControleDePedidosContext : DbContext
    {
        public ControleDePedidosContext (DbContextOptions<ControleDePedidosContext> options)
            : base(options)
        {
        }

        public DbSet<Cliente> Clientes { get; set; }
    }
}
