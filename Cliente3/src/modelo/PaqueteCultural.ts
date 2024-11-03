// Importa las clases o tipos que necesites

export class PaqueteCultural {
  // Definimos las propiedades
  private id: number;
  private nombre: string;
  private precio: number;
  private fechaInicio: string;
  private fechaFin: string;

  // Constructor para inicializar las propiedades
  constructor(
    id: number,
    nombre: string,
    precio: number,
    fechaInicio: string,
    fechaFin: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
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


  toString(): string {
    return `Paquete Cultural:
    ID: ${this.id}
    Nombre: ${this.nombre}
    Precio: ${this.precio}
    Fecha de Inicio: ${this.fechaInicio}
    Fecha de Fin: ${this.fechaFin}`;
  }
}
