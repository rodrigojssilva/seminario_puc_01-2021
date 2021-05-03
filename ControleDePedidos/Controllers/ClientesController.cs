using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControleDePedidos.Data;
using ControleDePedidos.Models;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace ControleDePedidos.Controllers
{
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    [ApiController]
    [SwaggerTag(description: "Controle de todos os cadastros de clientes!")]
    public class ClientesController : ControllerBase
    {
        private readonly ControleDePedidosContext _context;
        private readonly IDataRepository<Cliente> _clienteRepository;

        public ClientesController(ControleDePedidosContext context,
                                  IDataRepository<Cliente> clienteRepository)
        {
            _context = context;
            _clienteRepository = clienteRepository;
        }

        /// <summary>
        /// Retorna todos os clientes cadastrados em ordem alfabética
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Cliente> GetAllClientes()
        {
            return _context.Clientes.OrderBy(x => x.Nome);
        }

        /// <summary>
        /// Retorna um único cliente de acordo com o Id buscado
        /// </summary>
        /// <response code="417">Se o Id for 999</response>     
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(id == 999)
            {
                return new ObjectResult("Você não pode buscar por 999.") { StatusCode = (int) HttpStatusCode.ExpectationFailed };
            }

            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        /// <summary>
        /// Atualiza as informações do cliente
        /// </summary>
        /// <remarks>
        /// Exemplo: 
        /// 
        ///     PUT
        ///     {
        ///         "clienteId": 1,
        ///         "nome": "Nome do Cliente",
        ///         "documento": "111.222.333-96"
        ///     }
        ///     
        /// </remarks>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente([FromRoute] int id, [FromBody] Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            if (id != cliente.ClienteId)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                _clienteRepository.Update(cliente);
                var save = await _clienteRepository.SaveAsync(cliente);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Cliente atualizado com sucesso!");
        }

        /// <summary>
        /// Cria um cliente no banco de dados
        /// </summary>
        /// <remarks>
        /// Exemplo: 
        /// 
        ///     POST
        ///     {
        ///         "clienteId": 0,
        ///         "nome": "Nome do Cliente",
        ///         "documento": "111.222.333-96"
        ///     }
        ///     
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente([FromBody] Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _clienteRepository.Add(cliente);
            await _clienteRepository.SaveAsync(cliente);

            return CreatedAtAction("GetCliente", new { id = cliente.ClienteId }, cliente);
        }

        /// <summary>
        /// Deleta um cliente do banco de dados
        /// </summary>                
        [HttpDelete("{id}")]
        [SwaggerOperation("DeleteOperation")]
        [SwaggerResponse(200, Type = typeof(string), Description = "Cliente deletado!")]
        [SwaggerResponse(500, Type = typeof(string), Description = "Erro interno.")]
        [SwaggerResponse(404, Type = typeof(string), Description = "Cliente não encontrado.")]
        public async Task<IActionResult> DeleteCliente([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Dados inválidos!");
            }

            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _clienteRepository.Delete(cliente);
            await _context.SaveChangesAsync();

            return Ok(cliente);
        }

        private bool ClienteExists(int id)
        {
            return _context.Clientes.Any(e => e.ClienteId == id);
        }
    }
}
