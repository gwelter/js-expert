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
});
