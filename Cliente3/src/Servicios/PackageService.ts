import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { PaqueteCultural } from '../modelo/PaqueteCultural';

class PackageService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8090/api/packages',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Obtener todos los paquetes culturales
  async listarPaquetes(): Promise<Array<PaqueteCultural>> {
    try {
      const response: AxiosResponse<any> = await this.client.get('/get/');
  
      // Mapeo de los datos recibidos para convertir a instancias de PaqueteCultural
      const paquetes = response.data.map((item) => new PaqueteCultural(
        item.id, // item.id en lugar de item.getid
        item.nombre, // item.nombre en lugar de item.getnombre
        item.precio, // item.precio en lugar de item.getprecio
        item.fechaInicio, // Fecha inicio
        item.fechaFin, // Fecha fin
        item.guiasId
      ));
  
      // Mostrar los datos de paquetes en formato JSON
      const paquetesJson = JSON.stringify(paquetes, null, 2);
      console.log('Paquetes recibidos:', paquetesJson); // Imprime en consola para depuración
  
      return paquetes;
  
    } catch (error) {
      console.error('Error al obtener los paquetes:', error);
      return [];
    }
  }
  

  // Crear nuevo paquete cultural
  async crearPaquete(paquete: PaqueteCultural): Promise<Boolean | null> {
    try {
      
      const x = JSON.stringify(paquete, null, 2); 
     
      alert(x)
      const response: AxiosResponse<PaqueteCultural> = await this.client.post('/create', x);
      console.log(response.data);
      return true;
      }
     catch (error) {
      console.error('Error al crear el paquete cultural:', error);
      return null;
    }
  }
  async formatDates(obj) {
    const formattedObj = { ...obj }; // Crea una copia del objeto original

    // Recorre las propiedades del objeto
    for (const key in formattedObj) {
        if (formattedObj.hasOwnProperty(key)) {
            const value = formattedObj[key];

            // Verifica si la propiedad es una instancia de Date
            if (value instanceof Date) {
                // Formatea la fecha al formato deseado
                formattedObj[key] = value.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
            }
        }
    }

    return formattedObj; // Retorna el objeto con fechas formateadas
}

  // Actualizar paquete cultural
  async actualizarPaquete(id: number, paquete: PaqueteCultural): Promise<PaqueteCultural | null> {
    try {
      const response: AxiosResponse<PaqueteCultural> = await this.client.put(`/put/${id}`, JSON.stringify(paquete));
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el paquete cultural:', error);
      return null;
    }
  }

  // Eliminar paquete cultural
  async eliminarPaquete(id: number): Promise<boolean> {
    try {
      await this.client.delete(`/delete/${id}`);
      return true;
    } catch (error) {
      console.error('Error al eliminar el paquete cultural:', error);
      return false;
    }
  }

  // Obtener guías disponibles

  // Buscar paquete cultural por ID
  async buscarPaquetePorId(id: number): Promise<PaqueteCultural | null> {
    try {
      const response: AxiosResponse<any> = await this.client.get(`/getById/${id}`);
      if (response.data) {
        const x =new PaqueteCultural(
          response.data.id,
          response.data.nombre,
          response.data.precio,
          response.data.fechaInicio,
          response.data.fechaFin,
          response.data.guiasId
        );
        return x;
      }
      return null;
    } catch (error) {
      console.error('Error al buscar el paquete cultural por ID:', error);
      return null;
    }
  }

  // Buscar paquete cultural por nombre
  async buscarPaquetePorNombre(nombre: string): Promise<PaqueteCultural | null> {
    try {
      const response: AxiosResponse<any> = await this.client.get(`/getByName/${encodeURIComponent(nombre)}`);
      if (response.data) {
        const x =new PaqueteCultural(
          response.data.id,
          response.data.nombre,
          response.data.precio,
          response.data.fechaInicio,
          response.data.fechaFin,
          response.data.guiasId
        );
        return x;
      }
      return null;
    } catch (error) {
      console.error('Error al buscar el paquete cultural por nombre:', error);
      return null;
    }
  }
}

export default new PackageService();
