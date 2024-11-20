using ClienteApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClienteProyecto.Model
{
    public class Guia
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public double calificacion { get; set; }
        public int edad { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public PaqueteCultural paqueteCultural { get; set; }
        public void AsignarPaqueteCultural(PaqueteCultural paquete)
        {
            paqueteCultural = paquete;
        }


        public Guia() { }

        public Guia(int id, String nombre, double calificacion, int edad, DateTime fechaNacimiento)
        {
            this.id = id;
            this.nombre = nombre;
            this.calificacion = calificacion;
            this.edad = edad;
            this.fechaNacimiento = fechaNacimiento;
        }

        public override string ToString()
        {
            return $"ID: {id}, Nombre: {nombre}, Calificacion: {calificacion:C2}, Edad: {edad:d}, Fecha Nacimiento: {fechaNacimiento:d}";
        }
    }
}
