using ClienteApp.Model;
using ClienteProyecto.Model;
using ClienteProyecto.Service;
using RestSharp;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace ClienteApp.Service
{
    public class PaqueteCulturalService
    {
        private readonly HttpClient _httpClient;

        private GuiasService _guiasService;
        public PaqueteCulturalService()
        {
            _guiasService = new GuiasService();
        }

        // Obtener todos los paquetes culturales
        public List<PaqueteCultural> ListarPaquetes()
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest("/api/packages/get/", Method.Get); // Usar el método GET

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
                return JsonSerializer.Deserialize<List<PaqueteCultural>>(response.Content, options2);
            }

            MessageBox.Show("Error al obtener los paquetes.");
            return new List<PaqueteCultural>(); // Retornar una lista vacía en caso de error
        }

       



        // Buscar paquete cultural por Id
        public PaqueteCultural BuscarPaquetePorId(int id)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest($"/api/packages/getById/{id}", Method.Get);
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
                    PaqueteCultural paquete = JsonSerializer.Deserialize<PaqueteCultural>(response.Content, options2);
                    MessageBox.Show(paquete.ToString());
                    return paquete;
                }
                else
                {
                    dynamic jsonObj = JsonSerializer.Deserialize<ExpandoObject>(response.Content);
                    //response.Text = Convert.ToString(jsonObj.message);
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
        public PaqueteCultural BuscarPaquetePorNombre(string nombre)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest($"/api/packages/getByName/{Uri.EscapeDataString(nombre)}", Method.Get);
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

                    PaqueteCultural paquete = JsonSerializer.Deserialize<PaqueteCultural>(response.Content, options2);
                    return paquete;
                }
                else
                {
                    dynamic jsonObj = JsonSerializer.Deserialize<ExpandoObject>(response.Content);
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



        // Adicionar paquete cultural
        public bool AdicionarPaquete(int tid, string tnombre, double tprecio, DateTime tfechaInicio, DateTime tfechaFin, ArrayList Idguias)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest("/api/packages/create", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            var fechaISOI = tfechaInicio.ToString("yyyy-MM-ddTHH:mm:ss");
            var fechaISOF = tfechaFin.ToString("yyyy-MM-ddTHH:mm:ss");
            request.AddBody(new
            {
                id= tid,
                nombre= tnombre,
                precio= tprecio,
                fechaInicio= fechaISOI,
                fechaFin= fechaISOF,
                guias= Idguias
            });

            var response = client.Execute(request);
            MessageBox.Show(response.StatusCode.ToString());

            if (!response.IsSuccessStatusCode)
            {
                dynamic jsonObj = JsonSerializer.Deserialize<PaqueteCultural>(response.Content);
                MessageBox.Show($"Error: {Convert.ToString(jsonObj.message)}"); // Muestra el mensaje de error del servidor
            }
            MessageBox.Show(response.Content);

            PaqueteCultural nuevoPaquete = JsonSerializer.Deserialize<PaqueteCultural>(response.Content);

            return response.IsSuccessStatusCode;
        }


        // Actualizar paquete cultural
        public bool ActualizarPaquete(int tid, string tnombre, double tprecio, DateTime tfechaInicio, DateTime tfechaFin, ArrayList Idguias)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest($"/api/packages/put/{tid}", Method.Put);
            request.AddHeader("Content-Type", "application/json");

            var fechaISOI = tfechaInicio.ToString("yyyy-MM-ddTHH:mm:ss");
            var fechaISOF = tfechaFin.ToString("yyyy-MM-ddTHH:mm:ss");

            request.AddBody(new
            {
                id = tid,
                nombre = tnombre,
                precio = tprecio,
                fechaInicio = fechaISOI,
                fechaFin = fechaISOF,
                guias = Idguias
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
        public bool EliminarPaquete(int id)
        {
            var options = new RestClientOptions("http://localhost:8090");
            var client = new RestClient(options);
            var request = new RestRequest($"/api/packages/delete/{id}", Method.Delete); // Usar el método DELETE

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
