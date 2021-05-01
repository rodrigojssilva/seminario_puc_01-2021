using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ControleDePedidos.Models;

namespace ControleDePedidos.Data
{
    public class ControleDePedidosContext : DbContext
    {
        public ControleDePedidosContext (DbContextOptions<ControleDePedidosContext> options)
            : base(options)
        {
        }

        public DbSet<ControleDePedidos.Models.Cliente> Cliente { get; set; }
    }
}
