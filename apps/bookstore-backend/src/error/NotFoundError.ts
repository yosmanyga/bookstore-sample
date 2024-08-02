import {KnownError} from "./KnownError";

class NotFoundError extends KnownError {
  constructor(
    entity: string,
    id: string | number | object
  ) {
    super(`${entity} with id ${id} was not found.`);
  }
}

export {
  NotFoundError
}
