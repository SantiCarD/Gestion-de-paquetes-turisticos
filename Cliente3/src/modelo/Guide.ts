// Definimos la clase Guide (Guía)
export class Guide {
    // Propiedades de la clase Guide
    private id: number;
    private nombre: string;
    private calificacion: number;
    private edad: number;
    private fechaNacimiento: string;
  
    // Constructor para inicializar las propiedades
    constructor(
      id: number,
      nombre: string,
      calificacion: number,
      edad: number,
      fechaNacimiento: string
    ) {
      this.id = id;
      this.nombre = nombre;
      this.calificacion = calificacion;
      this.edad = edad;
      this.fechaNacimiento = fechaNacimiento;
    }
  
    // Getters y setters
    get getId(): number {
      return this.id;
    }
  
    set setId(value: number) {
      this.id = value;
    }
  
    get getNombre(): string {
      return this.nombre;
    }
  
    set setNombre(value: string) {
      this.nombre = value;
    }
  
    get getCalificacion(): number {
      return this.calificacion;
    }
  
    set setCalificacion(value: number) {
      this.calificacion = value;
    }
  
    get getEdad(): number {
      return this.edad;
    }
  
    set setEdad(value: number) {
      this.edad = value;
    }
  
    get getFechaNacimiento(): string {
      return this.fechaNacimiento;
    }
  
    set setFechaNacimiento(value: string) {
      this.fechaNacimiento = value;
    }
  
    // Método para representar la clase en formato string
    toString(): string {
      return `Guía:
      ID: ${this.id}
      Nombre: ${this.nombre}
      Calificación: ${this.calificacion}
      Edad: ${this.edad}
      Fecha de Nacimiento: ${this.fechaNacimiento}`;
    }
  }
  