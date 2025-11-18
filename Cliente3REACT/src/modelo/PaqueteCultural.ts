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

  toString(): string {
    var x: string = ".";
    this.guias.forEach((guia) => {x+=guia.valueOf()});
    return x;
  }
  toStringg(): string {
    const guiasStr = this.guias
      .map((guia) => guia)
      .join('\n');
      return guiasStr;
  }
}
