using ClienteProyecto.Model;
using System;
using System.Collections.Generic;

namespace ClienteApp.Model
{
    public class PaqueteCultural
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public double precio { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFin { get; set; }
        public List<int> guiasId { get; set; } = new List<int>();

        public PaqueteCultural() { }

        public PaqueteCultural(int id, string nombre, double precio, DateTime fechaInicio, DateTime fechaFin, List<int> guiasId)
        {
            this.id = id;
            this.nombre = nombre;
            this.precio = precio;
            this.fechaInicio = fechaInicio;
            this.fechaFin = fechaFin;
            this.guiasId = guiasId;
        }

        public override string ToString()
        {
            return $"ID: {id}, Nombre: {nombre}, Precio: {precio:C2}, Inicio: {fechaInicio:d}, Fin: {fechaFin:d}, guias: {guiasId.Count: xd}";
        }
    }
}