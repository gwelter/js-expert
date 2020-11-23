const assert = require("assert");
const request = require("supertest");
const { describe, it } = require("mocha");

const app = require("./api");

describe("API Suite test", () => {
  describe("/contacts", () => {
    it("should request the contact page and return HTTP status 200", async () => {
      const response = await request(app).get("/contacts").expect(200);

      assert.deepStrictEqual(response.text, "Contacts Page!");
    });
  });

  describe("/hello", () => {
    it("should request the default page and return HTTP status 200", async () => {
      const response = await request(app).get("/hello").expect(200);

      assert.deepStrictEqual(response.text, "Hello World!");
    });
  });

  describe("/login", () => {
    it("should login successfully and return HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "gwelter", password: "123" })
        .expect(200);

      assert.deepStrictEqual(response.text, "Login succeeded!");
    });

    it("should unauthorize a request when using wrong credentials and return HTTP status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "wrong", password: "wrong" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, "Login failed!");
    });
  });
});
