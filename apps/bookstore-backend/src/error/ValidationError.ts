import {KnownError} from "./KnownError";

class ValidationError extends KnownError {
  constructor(message?: string) {
    super(message || "Invalid data.");
  }
}

export {
  ValidationError
}
