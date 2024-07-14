export class UnwrapError<T> extends Error {
  constructor(
    message: string,
    public data: T,
  ) {
    super(message);
    this.name = 'UnwrapError';
    Object.setPrototypeOf(this, UnwrapError.prototype);
  }
}
