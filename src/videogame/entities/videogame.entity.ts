export class VideogameEntity {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly genero: string,
    public readonly plataforma: string,
    public readonly fechaLanzamiento: Date,
    public readonly precio: number,
  ) {}
}
