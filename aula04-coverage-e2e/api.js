const http = require("http");
const DEFAULT_USER = { username: "gwelter", password: "123" };

const routes = {
  "/contacts:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },
  "/login:post": async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);
      const { username, password } = user;
      if (
        username !== DEFAULT_USER.username ||
        password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write("unauthorized");
        return response.end();
      }
    }
    response.write("login successful");
    return response.end();
  },
  default: (request, response) => {
    response.write("Hello World");
    return response.end();
  },
};

const handler = function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;

  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("App running at port 3000"));

module.exports = app;
