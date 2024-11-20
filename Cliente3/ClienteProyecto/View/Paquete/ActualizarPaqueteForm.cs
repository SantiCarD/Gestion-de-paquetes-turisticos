using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using ClienteApp.Model;
using ClienteApp.Service;
using ClienteProyecto.Model;
using ClienteProyecto.Service;

namespace ClienteProyecto.View
{
    public partial class ActualizarPaqueteForm : Form
    {
        private PaqueteCulturalService _service;
        private PaqueteCultural _paqueteActual;
        private GuiasService _guiasService;
        private ArrayList Idguias;
        private List<int> Idguiass;

        public ActualizarPaqueteForm()
        {
            InitializeComponent();
            _service = new PaqueteCulturalService();
            _guiasService = new GuiasService();
            Idguias = new ArrayList();
            LlenarComboCriterio();
            LlenarComboGuias();
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

        private async void btnBuscar_Click(object sender, EventArgs e)
        {
            try
            {
                string criterio = cbCriterio.SelectedItem.ToString();
                PaqueteCultural paquete = null;

                if (criterio == "Id") // Si el criterio es buscar por Id
                {
                    int resultado;
                    if (int.TryParse(txtBusqueda.Text, out resultado))
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
                    string nombre = txtBusqueda .Text;
                    // Realizamos la búsqueda por Nombre utilizando el servicio REST
                    paquete = _service.BuscarPaquetePorNombre(nombre);
                }

                if (paquete != null)
                {
                    MostrarPaquete(paquete);
                    _paqueteActual = paquete; // Guardar el paquete encontrado
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

        private async void btnActualizar_Click(object sender, EventArgs e)
        {
            try
            {
                if (_paqueteActual == null)
                {
                    MessageBox.Show("Por favor, busque un paquete primero.");
                    return;
                }


                // Llamada al servicio REST para actualizar el paquete
                bool resultado =  _service.ActualizarPaquete(int.Parse(textBox1.Text), textBox5.Text, double.Parse(textBox3.Text), dtNuevaFechaInicio.Value, dtNuevaFechaFin.Value, Idguias);
                clear();
                // Mostrar el estado de la operación
                MessageBox.Show(resultado ? "Paquete actualizado con éxito." : "Error al actualizar el paquete.");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }

        private void LlenarComboGuias()
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
        private void MostrarPaquete(PaqueteCultural paquete)
        {
            txtNombre.Text = paquete.nombre;
            textBox1.Text = paquete.id.ToString();
            textBox2.Text = paquete.precio.ToString();
            textBox6.Text = paquete.fechaInicio.ToShortDateString();
            textBox7.Text = paquete.fechaFin.ToShortDateString();
            textBox5.Text = paquete.nombre;
            textBox3.Text = paquete.precio.ToString();
            dtNuevaFechaInicio.Value = paquete.fechaInicio;
            dtNuevaFechaFin.Value = paquete.fechaFin;
            if (paquete.guiasId.Count() == 0)
            {
                textBox4.Text = "No hay guias";
                textBox8.Text = "No hay guias";
            }
            else
            {
                List<String> Nguias = new List<String>();
                foreach (int i in paquete.guiasId)
                {
                    Idguias.Add(i);
                    Nguias.Add(_guiasService.BuscarGuiaPorId(i).nombre);
                }
                textBox4.Text = string.Join(", ", Nguias);
                textBox8.Text = string.Join(", ", Nguias);
            }
            
        }

        private void clear()
        {
            txtNombre.Text = "";
            textBox1.Text = "";
            textBox2.Text = "";
            textBox6.Text = "";
            textBox7.Text = "";
            textBox5.Text = "";
            textBox3.Text = "";
            textBox4.Text = "";
            textBox8.Text = "";
            Idguiass = new List<int>();
            Idguias = new ArrayList();
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void label10_Click(object sender, EventArgs e)
        {

        }

        private void textBox4_TextChanged(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                // Buscar el guía por nombre en el ComboBox
                Guia guia = _guiasService.BuscarGuiaPorNombre(comboBox1.SelectedItem.ToString());

                if (guia == null)
                {
                    MessageBox.Show("Guía no encontrado.");
                    return;
                }

                // Buscar el paquete cultural por ID ingresado
                PaqueteCultural paq = _service.BuscarPaquetePorId(int.Parse(textBox1.Text));

                if (paq == null)
                {
                    MessageBox.Show("Paquete no encontrado.");
                    return;
                }

                // Obtener los IDs de los guías asociados al paquete (como referencia, no para bloqueo)
                List<int> IdGuiasEnPaquete = paq.guiasId.Select(g => g).ToList();

                // Verificar si el guía ya fue agregado en esta sesión (lista local)
                if (Idguias.Contains(guia.id))
                {
                    MessageBox.Show("Este guía ya fue agregado en la sesión actual.");
                    return;
                }

                // Agregar el guía a la lista local solo si no está ya en esta sesión
                Idguias.Add(guia.id);
                MessageBox.Show("Guía agregado exitosamente.");

                // Actualizar el TextBox8 con los nombres de los guías agregados en la sesión actual
                List<string> Nguias = new List<string>();

                foreach (int id in Idguias)
                {
                    string nombreGuia = _guiasService.BuscarGuiaPorId(id).nombre;
                    Nguias.Add(nombreGuia);
                }

                textBox8.Text = string.Join(", ", Nguias);
            }
            catch (FormatException)
            {
                MessageBox.Show("El ID del paquete debe ser un número válido.");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ocurrió un error: {ex.Message}");
            }
        }




        private void button2_Click(object sender, EventArgs e)
        {
            // Limpiar las listas locales para la nueva selección
            Idguias.Clear();  // Resetear los guías seleccionados en esta sesión
            textBox8.Text = "";  // Limpiar el TextBox de nombres de guías
            MessageBox.Show("Selección de guías limpiada.");
        }

        private void cbCriterio_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void txtBusqueda_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
