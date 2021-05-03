using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ControleDePedidos.Models
{
    public class Cliente
    {
		[Key]
		[DefaultValue(0)]
		public int ClienteId { get; set; }

		[Required]
		[DefaultValue("")]
		public string Nome { get; set; }

		[Required]
		[MaxLength(14)]
		[DefaultValue("")]
		public string Documento { get; set; }		
	}
}
