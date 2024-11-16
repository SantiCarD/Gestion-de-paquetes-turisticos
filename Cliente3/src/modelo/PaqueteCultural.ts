// Importa las clases o tipos que necesites
import { Guide } from './Guide'; // Asegúrate de importar tu clase Guide correctamente

export class PaqueteCultural {
  // Definimos las propiedades
  private id: number;
  private nombre: string;
  private precio: number;
  private fechaInicio: string;
  private fechaFin: string;
  private guias: number[];

  // Constructor para inicializar las propiedades
  constructor(
    id: number,
    nombre: string,
    precio: number,
    fechaInicio: string,
    fechaFin: string,
    guias: number[] = []
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.guias = guias;
  }

  // Getters y setters
  get getid(): number {
    return this.id;
  }

  set setid(value: number) {
    this.id = value;
  }

  get getnombre(): string {
    return this.nombre;
  }

  set setnombre(value: string) {
    this.nombre = value;
  }

  get getprecio(): number {
    return this.precio;
  }

  set setprecio(value: number) {
    this.precio = value;
  }

  get getfechaInicio(): string {
    return this.fechaInicio;
  }

  set setfechaInicio(value: string) {
    this.fechaInicio = value;
  }

  get getfechaFin(): string {
    return this.fechaFin;
  }

  set setfechaFin(value: string) {
    this.fechaFin = value;
  }

  get getguias(): number[] {
    return this.guias;
  }

  set setguias(value: number[]) {
    this.guias = value;
  }

  // Método para verificar si un guía existe en la lista de guías
  public guideExist(id: number): boolean {
    return this.guias.some(guide => guide === id);
  }

  // Método para añadir un guía
  public addGuide(guide: number): void {
    if (!this.guideExist(guide)) {
      this.guias.push(guide);
    } else {
      console.log(`El guía con ID ${guide} ya existe.`);
    }
  }

  // Método para eliminar un guía por ID
  public removeGuideById(id: number): boolean {
    const index = this.guias.findIndex(guide => guide === id);
    if (index !== -1) {
      this.guias.splice(index, 1);
      return true;
    }
    console.log(`No se encontró el guía con ID ${id}.`);
    return false;
  }

  toString(): string {
    const guiasStr = this.guias
      .map((guia) => guia.toString())
      .join('\n');

    return `Paquete Cultural:
    ID: ${this.id}
    Nombre: ${this.nombre}
    Precio: ${this.precio}
    Fecha de Inicio: ${this.fechaInicio}
    Fecha de Fin: ${this.fechaFin}
    Guías:
    ${guiasStr}`;
  }
  toStringg(): string {
    const guiasStr = this.guias
      .map((guia) => guia.toString())
      .join('\n');
      return guiasStr;
  }
}
