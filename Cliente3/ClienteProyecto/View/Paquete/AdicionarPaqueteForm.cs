using System;
using System.Dynamic;
using System.Net;
using System.Text.Json;
using System.Windows.Forms;
using ClienteApp.Model;
using ClienteApp.Service;
using RestSharp; // Para trabajar con RestSharp
using System; // Para tipos básicos como int, string, etc.
using System.Net; // Para el manejo de códigos de estado HTTP
using System.Text.Json; // Para la deserialización de JSON
using System.Windows.Forms;
using System.Net.Http;
using ClienteProyecto.Model;
using ClienteProyecto.Service;
using System.Collections.Generic;
using System.Collections;
using System.Linq; // Para usar los formularios y MessageBox


namespace ClienteProyecto.View
{
    public partial class AdicionarPaqueteForm : Form
    {
        private PaqueteCulturalService _service; 
        private GuiasService _guiasService;
        private ArrayList Idguias;

        public AdicionarPaqueteForm()
        {
            InitializeComponent();
            _service = new PaqueteCulturalService();
            _guiasService = new GuiasService();
            Idguias = new ArrayList();
            LlenarComboCriterio();
        }

        private async void btnAdicionar_Click(object sender, EventArgs e)
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
                DateTime fechaFin = dtFechaFin.Value;

                if (fechaInicio > fechaFin)
                {
                    MessageBox.Show("La fecha de inicio debe ser anterior a la fecha de fin.");
                    return;
                }


                _service.AdicionarPaquete(int.Parse(txtId.Text), txtNombre.Text, double.Parse(txtPrecio.Text), fechaInicio, fechaFin, Idguias);
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
                Idguias = new ArrayList();
                textBox1.Text = "";
            }
        }
        private void clear()
        {
            txtId.Text = "";
            txtNombre.Text = "";
            textBox1.Text = "";
            txtPrecio.Text = "";
            Idguias = new ArrayList();
        }
        
        private void LlenarComboCriterio()
        {
            comboBox1.Items.Clear();

            if (_guiasService.ListarGuias().Count() == 0)
            {
                comboBox1.Items.Add("No hay guias");
                button1.Enabled = false;
            }
            else
            {
                foreach (Guia guia in _guiasService.ListarGuias())
                {
                    comboBox1.Items.Add(guia.nombre);
                }
                
            }
            comboBox1.SelectedIndex = 0;

        }

        private void button1_Click(object sender, EventArgs e)
        {
            Guia guia = _guiasService.BuscarGuiaPorNombre(comboBox1.SelectedItem.ToString());
            Idguias.Add(guia.id);
            List<String> Nguias = new List<String>();
            foreach(int i in Idguias)
            {
                Nguias.Add(_guiasService.BuscarGuiaPorId(i).nombre);
            }
            textBox1.Text = string.Join(", ", Nguias);
            ;
        }

        private void txtId_TextChanged(object sender, EventArgs e)
        {

        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
