export abstract class ControllerBase {
  ok<T>(body: T) {
    return { statusCode: 200, body };
  }

  created<T>(body: T) {
    return { statusCode: 201, body };
  }

  noContent() {
    return { statusCode: 204, body: undefined };
  }

  badRequest<T>(body: T) {
    return { statusCode: 400, body };
  }

  unauthorized<T>(body: T) {
    return { statusCode: 401, body };
  }

  notFound() {
    return { statusCode: 404, body: { message: "Not Found" } };
  }
}
