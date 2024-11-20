using System;
using System.Windows.Forms;
using ClienteProyecto.View;
using ClienteProyecto.View.g;
using ClienteProyecto.View.Guiass;

namespace ClienteProyecto
{
    public partial class Principal : Form
    {
        public Principal()
        {
            InitializeComponent();
        }

        private void adicionarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                new AdicionarPaqueteForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de adicionar: {ex.Message}");
            }
        }

        private void eliminarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                new EliminarPaqueteForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de eliminar: {ex.Message}");
            }
        }

        private void listarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                new ListarPaquetesForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de listar: {ex.Message}");
            }
        }

        private void buscarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                new BuscarPaqueteCulturalForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de buscar: {ex.Message}");
            }
        }

        private void actualizarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                new ActualizarPaqueteForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de actualizar: {ex.Message}");
            }
        }

        // Asegúrate de que tienes un formulario AcercaDe o elimina este método si no lo tienes
        private void acercaDeToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                new AcercaDe().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de 'Acerca de': {ex.Message}");
            }
        }

        private void contactoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                new Contacto().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de 'Acerca de': {ex.Message}");
            }
        }

        private void buscarToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            try
            {
                new BuscarGuiaForm1().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de 'Buscar Guia': {ex.Message}");
            }
        }

        private void adicionarToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            try
            {
                new AdicionarGuiaForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de 'Buscar Guia': {ex.Message}");
            }
        }

        private void eliminarToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            try
            {
                new EliminarGuiaForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de 'Buscar Guia': {ex.Message}");
            }
        }

        private void actualizarToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            try
            {
                new ActualizarGuiaForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de 'Buscar Guia': {ex.Message}");
            }
        }

        private void listarToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            try
            {
                new ListarGuiaForm().Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al abrir la ventana de 'Buscar Guia': {ex.Message}");
            }
        }
    }
}