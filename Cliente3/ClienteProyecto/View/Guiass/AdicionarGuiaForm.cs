using ClienteProyecto.Service;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ClienteProyecto.View.g
{
    public partial class AdicionarGuiaForm : Form
    {
        private GuiasService _guiasService;
        public AdicionarGuiaForm()
        {
            InitializeComponent();
            _guiasService = new GuiasService();
        }

        private void title_Click(object sender, EventArgs e)
        {

        }
        private void btnAdicionar_Click(object sender, EventArgs e)
        {
           
        }
        private void AdicionarGuiaForm_Load(object sender, EventArgs e)
        {

        }

        private void dtFechaInicio_ValueChanged(object sender, EventArgs e)
        {

        }

        private void txtId_TextChanged(object sender, EventArgs e)
        {

        }
        private void clear()
        {
            txtId.Text = "";
            txtNombre.Text = "";
            txtPrecio.Text = "";
            textBox1.Text = "";
        }
        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                // Validaciones
                if (string.IsNullOrWhiteSpace(txtNombre.Text))
                {
                    MessageBox.Show("El nombre no puede estar vacío.");
                    return;
                }

                if (!double.TryParse(txtPrecio.Text, out double precio) || precio <= 0)
                {
                    MessageBox.Show("El precio debe ser un número mayor que 0.");
                    return;
                }

                DateTime fechaInicio = dtFechaInicio.Value;

                _guiasService.AdicionarGuia(int.Parse(txtId.Text), txtNombre.Text, double.Parse(textBox1.Text), int.Parse(txtPrecio.Text), fechaInicio);
                clear();
            }
            catch (FormatException ex)
            {
                MessageBox.Show("Error de formato: " + ex.Message);
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show("Error de conexión: " + ex.Message);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Errorr: {ex.Message}");
            }
        }
    }
}
