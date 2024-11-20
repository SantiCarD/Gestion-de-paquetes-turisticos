using ClienteApp.Model;
using ClienteApp.Service;
using ClienteProyecto.Model;
using ClienteProyecto.Service;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ClienteProyecto.View.Guiass
{
    public partial class ListarGuiaForm : Form
    {
        private GuiasService _service;

        public ListarGuiaForm()
        {
            InitializeComponent();
            _service = new GuiasService();
        }
        private void ListarPaquetesForm_Load(object sender, EventArgs e)
        {
            FiltrarGuias(txtFilter.Text); // Cargar paquetes al inicio
        }

        private void btnFiltrar_Click(object sender, EventArgs e) // Cambia el nombre según tu botón
        {
            string filterText = txtFilter.Text.Trim(); // Obtener texto del filtro
            FiltrarGuias(filterText); // Filtrar paquetes
        }
        private void btnRefrescar_Click(object sender, EventArgs e)
        {
            CargarGuias();
        }
        private void CargarGuias()
        {
            try
            {
                // Llamada al servicio REST para listar todos los paquetes
                var guias = _service.ListarGuias();

                // Limpia las filas anteriores para evitar duplicados
                dgvPaquetes.Rows.Clear();
                dgvPaquetes.Columns.Add("id", "ID");
                dgvPaquetes.Columns.Add("nombre", "Nombre");
                dgvPaquetes.Columns.Add("calificacion", "Calificacion");
                dgvPaquetes.Columns.Add("edad", "Edad");
                dgvPaquetes.Columns.Add("fechaNacimiento", "FechaNacimiento");


                // Recorre cada paquete y agrega una fila al DataGridView
                foreach (Guia guia in guias)
                {

                    // Agregar la fila con los datos del paquete
                    dgvPaquetes.Rows.Add(
                        guia.id,
                        guia.nombre,
                        guia.calificacion,
                        guia.edad,
                        guia.fechaNacimiento
                    );
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }
        public void FiltrarGuias(string filterText)
        {
            List<Guia> paquetesFiltrados = new List<Guia>();
            try
            {
                // Llamada al servicio para filtrar los paquetes
                foreach (Guia guia in _service.ListarGuias())
                {
                    if (guia.nombre.Contains(filterText))
                    {
                        paquetesFiltrados.Add(guia);
                    }
                }

                foreach (Guia paquete in paquetesFiltrados)
                {

                    dgvPaquetes.Rows.Clear();
                    dgvPaquetes.Columns.Add("id", "ID");
                    dgvPaquetes.Columns.Add("nombre", "Nombre");
                    dgvPaquetes.Columns.Add("calificacion", "Calificacion");
                    dgvPaquetes.Columns.Add("edad", "Edad");
                    dgvPaquetes.Columns.Add("fechaNacimiento", "FechaNacimiento");

                    dgvPaquetes.Rows.Add(
                        paquete.id,
                        paquete.nombre,
                        paquete.calificacion,
                        paquete.edad,
                        paquete.fechaNacimiento
                    );
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string filterText = txtFilter.Text.Trim(); // Obtener texto del filtro
            FiltrarGuias(filterText); // Filtrar paquetes
        }
    }
}
