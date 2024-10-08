export class ServicesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServicesError";
  }
}
