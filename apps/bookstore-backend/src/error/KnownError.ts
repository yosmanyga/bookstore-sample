class KnownError extends Error {
  constructor(
    message: string
  ) {
    super(message);
  }
}

export {
  KnownError
}
