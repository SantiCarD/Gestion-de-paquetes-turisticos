using ClienteApp.Model;
using ClienteProyecto.Model;
using ClienteProyecto.Service;
using System;
using System.Collections;
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
    public partial class ActualizarGuiaForm : Form
    {
        private GuiasService _guiasService;
        private Guia _guiaActual;
        public ActualizarGuiaForm()
        {
            InitializeComponent();
            _guiasService = new GuiasService();
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
        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {

        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            try
            {
                string criterio = cbCriterio.SelectedItem.ToString();
                Guia guia = null;

                if (criterio == "Id") // Si el criterio es buscar por Id
                {
                    int resultado;
                    if (int.TryParse(txtBusqueda.Text, out resultado))
                    {
                        // Realizamos la búsqueda por Id utilizando el servicio REST
                        guia = _guiasService.BuscarGuiaPorId(resultado);
                    }
                    else
                    {
                        MessageBox.Show("Por favor, ingrese un Id válido.");
                        return;
                    }
                }
                else if (criterio == "Nombre") // Si el criterio es buscar por Nombre
                {
                    string nombre = txtBusqueda.Text;
                    // Realizamos la búsqueda por Nombre utilizando el servicio REST
                    guia = _guiasService.BuscarGuiaPorNombre(nombre);
                }

                if (guia != null)
                {
                    MostrarPaquete(guia);
                    _guiaActual = guia; // Guardar el paquete encontrado
                }
                else
                {
                    MessageBox.Show("Guia no encontrado.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }
        private void MostrarPaquete(Guia guia)
        {
            txtNombre.Text = guia.nombre;
            textBox1.Text = guia.id.ToString();
            textBox2.Text = guia.edad.ToString();
            textBox6.Text = guia.calificacion.ToString();
            textBox7.Text = guia.fechaNacimiento.ToShortDateString();
            textBox5.Text = guia.nombre;
            textBox3.Text = guia.edad.ToString();
            textBox4.Text = guia.calificacion.ToString();
            dtNuevaFechaFin.Value = guia.fechaNacimiento;
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
        }
        private void btnActualizar_Click(object sender, EventArgs e)
        {
            try
            {
                if (_guiaActual == null)
                {
                    MessageBox.Show("Por favor, busque un Guia primero.");
                    return;
                }


                // Llamada al servicio REST para actualizar el paquete
                bool resultado = _guiasService.ActualizarGuia(int.Parse(textBox1.Text), textBox5.Text, double.Parse(textBox4.Text), int.Parse(textBox3.Text), dtNuevaFechaFin.Value);
                clear();
                // Mostrar el estado de la operación
                MessageBox.Show(resultado ? "Guia actualizado con éxito." : "Guia al actualizar el paquete.");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }
    }
}
