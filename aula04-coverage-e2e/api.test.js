const { describe, it } = require("mocha");
const request = require("supertest");
const assert = require("assert");

const app = require("./api");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP status 200", async () => {
      const response = await request(app).get("/contacts").expect(200);
      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent page /hi and return the default page", async () => {
      const response = await request(app).get("/hi").expect(200);
      assert.deepStrictEqual(response.text, "Hello World");
    });
  });

  describe("/login", () => {
    it("should login successfully and return HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "gwelter", password: "123" })
        .expect(200);

      assert.deepStrictEqual(response.text, "login successful");
    });

    it("should fail and return HTTP status 401 with wrong credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "gwelter", password: "wrong" })
        .expect(401);

      assert.deepStrictEqual(response.text, "unauthorized");
    });
  });
});
