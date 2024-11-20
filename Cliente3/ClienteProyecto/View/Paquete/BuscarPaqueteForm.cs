using System;
using System.Linq;
using System.Windows.Forms;
using System.Windows.Forms.VisualStyles;
using ClienteApp.Model;

using ClienteApp.Service;
using ClienteProyecto.Model;

namespace ClienteProyecto.View
{
    public partial class BuscarPaqueteCulturalForm : Form
    {
        private PaqueteCulturalService _service;

        public BuscarPaqueteCulturalForm()
        {
            InitializeComponent();
            _service = new PaqueteCulturalService();
            LlenarComboCriterio();
        }

        private void LlenarComboCriterio()
        {
            // Limpia el ComboBox para evitar duplicados
            cbCriterio.Items.Clear();

            // Agrega las opciones "Id" y "Nombre" al ComboBox
            cbCriterio.Items.Add("Id");
            cbCriterio.Items.Add("Nombre");

            // Selecciona el primer elemento por defecto
            cbCriterio.SelectedIndex = 0;
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            try
            {
                string criterio = cbCriterio.SelectedItem.ToString();
                PaqueteCultural paquete = null;

                if (criterio == "Id") // Si el criterio es buscar por Id
                {
                    int resultado;
                    if (int.TryParse(txtValor.Text, out resultado))
                    {
                        // Realizamos la búsqueda por Id utilizando el servicio REST
                        paquete = _service.BuscarPaquetePorId(resultado);
                    }
                    else
                    {
                        MessageBox.Show("Por favor, ingrese un Id válido.");
                        return;
                    }
                }
                else if (criterio == "Nombre") // Si el criterio es buscar por Nombre
                {
                    string nombre = txtValor.Text;
                    // Realizamos la búsqueda por Nombre utilizando el servicio REST
                    paquete = _service.BuscarPaquetePorNombre(nombre);
                }

                if (paquete != null)
                {
                    
                    MostrarPaquete(paquete);
                }
                else
                {
                    MessageBox.Show("Paquete no encontrado.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }


        private void MostrarPaquete(PaqueteCultural paquete)
        {
            txtId.Text = paquete.id.ToString();
            txtNombre.Text = paquete.nombre;
            txtPrecio.Text = paquete.precio.ToString();
            textFechaI.Text = paquete.fechaInicio.ToShortDateString();
            textFechaF.Text = paquete.fechaFin.ToShortDateString();

            if (paquete.guiasId.Count == 0)
            {
                textBox1.Text = "No hay guias";
            }
            else
            {
                textBox1.Text = string.Join(", ", paquete.guiasId);
            }

        }

        


            private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void panel2_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
