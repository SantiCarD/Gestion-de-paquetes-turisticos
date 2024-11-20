using ClienteApp.Model;
using ClienteApp.Service;
using ClienteProyecto.Model;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ClienteProyecto.Service
{
    public class GuiasService
    {
        private readonly HttpClient _httpClient;

        public GuiasService()
        {

        }

        // Obtener todos los paquetes culturales
        public List<Guia> ListarGuias()
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest("/api/guides/get/", Method.Get); // Usar el método GET

            // Ejecutar la solicitud
            var response = client.Execute(request);
            MessageBox.Show(response.StatusCode.ToString());

            // Manejo de la respuesta
            if (response.IsSuccessStatusCode)
            {
                var options2 = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true // Permitir coincidencias sin importar el caso
                };
                // Deserializar la respuesta JSON en una lista de paquetes culturales
                return JsonSerializer.Deserialize<List<Guia>>(response.Content, options2);
            }

            MessageBox.Show("Error al obtener los paquetes.");
            return new List<Guia>(); // Retornar una lista vacía en caso de error
        }





        // Buscar paquete cultural por Id
        public Guia BuscarGuiaPorId(int id)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest($"/api/guides/getById/{id}", Method.Get);
            var response = client.Execute(request);
            try
            {
                MessageBox.Show(response.StatusCode.ToString());

                if (response.IsSuccessStatusCode)
                {
                    var options2 = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true // Permitir coincidencias sin importar el caso
                    };
                    Guia guia = JsonSerializer.Deserialize<Guia>(response.Content, options2);
                    return guia;
                }
                else
                {
                    dynamic jsonObj = JsonSerializer.Deserialize<ExpandoObject>(response.Content);
                    //response.Text = Convert.ToString(jsonObj.message);
                    MessageBox.Show(Convert.ToString(jsonObj.message));
                }
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show($"Error de red: {ex.Message}");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ocurrió un error inesperado: {ex.Message}");
            }

            return null;
        }



        // Buscar paquete cultural por Nombre
        public Guia BuscarGuiaPorNombre(string nombre)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest($"/api/guides/getByName/{Uri.EscapeDataString(nombre)}", Method.Get);
            var response = client.Execute(request);

            try
            {
                MessageBox.Show(response.StatusCode.ToString());

                if (response.IsSuccessStatusCode)
                {
                    var options2 = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true // Permitir coincidencias sin importar el caso
                    };

                    Guia guia = JsonSerializer.Deserialize<Guia>(response.Content, options2);
                    return guia;
                }
                else
                {
                    dynamic jsonObj = JsonSerializer.Deserialize<ExpandoObject>(response.Content);
                    MessageBox.Show(Convert.ToString(jsonObj.message)+" xdddd");
                }
            }
            catch (HttpRequestException ex)
            {
                MessageBox.Show($"Error de red: {ex.Message}");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ocurrió un error inesperado: {ex.Message}");
            }

            return null;
        }



        // Adicionar paquete cultural
        public bool AdicionarGuia(int tid, string tnombre, double tcalificacion, int tedad, DateTime tfechaNacimiento)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest("/api/guides/create", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            var fechaISOF = tfechaNacimiento.ToString("yyyy-MM-ddTHH:mm:ss");
            request.AddBody(new
            {
                id = tid,
                nombre = tnombre,
                calificacion = tcalificacion,
                edad = tedad,
                fechaNacimiento = fechaISOF
            });

            var response = client.Execute(request);
            MessageBox.Show(response.StatusCode.ToString());

            if (!response.IsSuccessStatusCode)
            {
                dynamic jsonObj = JsonSerializer.Deserialize<Guia>(response.Content);
                MessageBox.Show($"Error: {Convert.ToString(jsonObj.message)}"); // Muestra el mensaje de error del servidor
            }

            return response.IsSuccessStatusCode;
        }


        // Actualizar paquete cultural
        public bool ActualizarGuia(int tid, string tnombre, double tcalificacion, int tedad, DateTime tfechaNacimiento)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest($"/api/guides/put/{tid}", Method.Put);
            request.AddHeader("Content-Type", "application/json");

            var fechaISOF = tfechaNacimiento.ToString("yyyy-MM-ddTHH:mm:ss");

            request.AddBody(new
            {
                id = tid,
                nombre = tnombre,
                calificacion = tcalificacion,
                edad = tedad,
                fechaNacimiento = fechaISOF
            });

            var response = client.Execute(request);
            MessageBox.Show(response.StatusCode.ToString());

            if (!response.IsSuccessStatusCode)
            {
                dynamic jsonObj = JsonSerializer.Deserialize<ExpandoObject>(response.Content);
                MessageBox.Show($"Error: {Convert.ToString(jsonObj.message)}"); // Muestra el mensaje de error del servidor
            }

            return response.IsSuccessStatusCode;
        }



        // Eliminar paquete cultural
        public bool EliminarGuia(int id)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest($"/api/guides/delete/{id}", Method.Delete); // Usar el método DELETE

            // Ejecutar la solicitud
            var response = client.Execute(request);
            MessageBox.Show(response.StatusCode.ToString());

            // Manejo de errores
            if (!response.IsSuccessStatusCode)
            {
                dynamic jsonObj = JsonSerializer.Deserialize<ExpandoObject>(response.Content);
                MessageBox.Show($"Error: {Convert.ToString(jsonObj.message)}"); // Muestra el mensaje de error del servidor
            }

            return response.IsSuccessStatusCode; // Retorna el resultado de la operación
        }

    }
}

