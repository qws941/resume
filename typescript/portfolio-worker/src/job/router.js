export class Router {
  constructor() {
    this.routes = [];
  }

  add(method, pattern, handler) {
    const regex = new RegExp(
      '^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$',
    );
    this.routes.push({ method, pattern, regex, handler });
  }

  get(pattern, handler) {
    this.add('GET', pattern, handler);
  }
  post(pattern, handler) {
    this.add('POST', pattern, handler);
  }
  put(pattern, handler) {
    this.add('PUT', pattern, handler);
  }
  delete(pattern, handler) {
    this.add('DELETE', pattern, handler);
  }

  async handle(request, url) {
    const method = request.method;
    const pathname = url.pathname;

    for (const route of this.routes) {
      if (route.method !== method) continue;

      const match = pathname.match(route.regex);
      if (match) {
        request.params = match.groups || {};
        request.query = Object.fromEntries(url.searchParams);
        return await route.handler(request);
      }
    }

    return null;
  }
}
