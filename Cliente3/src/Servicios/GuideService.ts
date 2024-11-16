import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Guide } from '../modelo/Guide';

class GuideService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api/guides',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Obtener todas las guías
  async listarGuias(): Promise<Array<Guide>> {
    try {
      const response: AxiosResponse<any> = await this.client.get('/get/');
      
      // Mapeo de los datos recibidos para convertir a instancias de Guide
      const guias = response.data.map((item) => new Guide(
        item.id, // Cambiado de item.getid a item.id
        item.nombre, // Cambiado de item.getnombre a item.nombre
        item.calificacion, // Cambiado de item.getcalificacion a item.calificacion
        item.edad, // Cambiado de item.getedad a item.edad
        item.fechaNacimiento // Cambiado de item.getfechaNacimiento a item.fechaNacimiento
      ));
  
      // Mostrar los datos de guías en formato JSON
      const guiasJson = JSON.stringify(guias, null, 2); // Convierte la lista de guías a JSON legible
      console.log('Guías recibidas:', guiasJson); // Imprime en consola
  
  
      return guias;
  
    } catch (error) {
      console.error('Error al obtener las guías:', error);
      return [];
    }
  }
  
  
  
  // Crear nueva guía
  async adicionarGuia(guide: Guide): Promise<boolean> {
    try {
      const x = JSON.stringify(guide, null, 2); // Muestra el JSON en un formato legible
      const response: AxiosResponse<Guide> = await this.client.post('/create', x);
      console.log(response.data);
      return true;
    } catch (error) {
      console.error('Error al crear la guía:', error);
      
      return false;
    }
  }
  
  
  // Buscar guía por ID
  async buscarGuiaPorId(id: number): Promise<Guide | null> {
    try {
      const response: AxiosResponse<any> = await this.client.get(`/getById/${id}`);
      console.log('Datos recibidos:', response.data);
      
      if (response.data) {
        // Creamos una nueva instancia de Guide con los datos recibidos
        return new Guide(
          response.data.id,
          response.data.nombre,
          response.data.calificacion,
          response.data.edad,
          response.data.fechaNacimiento
        );
      }
      return null;
    } catch (error) {
      console.error('Error al buscar la guía por ID:', error);
      return null;
    }
  }

  // Buscar guía por nombre
  async buscarGuiaPorNombre(nombre: string): Promise<Guide | null> {
    try {
      const response: AxiosResponse<any> = await this.client.get(`/getByName/${encodeURIComponent(nombre)}`);
      console.log(response.data);
      if (response.data) {
        // Creamos una nueva instancia de Guide con los datos recibidos
        return new Guide(
          response.data.id,
          response.data.nombre,
          response.data.calificacion,
          response.data.edad,
          response.data.fechaNacimiento
        );
      }
      return null;
    } catch (error) {
      console.error('Error al buscar la guía por nombre:', error);
      return null;
    }
  }

  

  // Actualizar guía existente
  async actualizarGuia(id: number, guide: Guide): Promise<boolean> {
    try {
      const response: AxiosResponse<Guide> = await this.client.put(`/put/${id}`, guide);
      console.log(response.data);
      return true;
    } catch (error) {
      console.error('Error al actualizar la guía:', error);
      return false;
    }
  }

  // Eliminar guía
  async eliminarGuia(id: number): Promise<boolean> {
    try {
      const response: AxiosResponse<void> = await this.client.delete(`/delete/${id}`);
      console.log('Guía eliminada correctamente.');
      return true;
    } catch (error) {
      console.error('Error al eliminar la guía:', error);
      return false;
    }
  }
}

export default new GuideService();
