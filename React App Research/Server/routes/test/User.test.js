const request = require("supertest");
const app = require("../group_route");


test ("two numbers are added", () => {
    expect(2 + 2).toBe(4);
});



test ("GET /viewgroup", async () => {
    const response = await request(app)
        .get("/group/viewgroup");
    expect(response.statusCode).toBe(200);
});