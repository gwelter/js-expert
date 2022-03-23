const http = require("http");

const routes = {
  "/contacts:get": (request, response) => {
    response.write("contact us page");
    response.end();
  },
  default: (_, response) => {
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
