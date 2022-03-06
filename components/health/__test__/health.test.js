import makeApp from "../../../app.js";
import request from "supertest";
import { jest } from "@jest/globals";

const createPeopleTable = jest.fn();

const app = makeApp({
    createPeopleTable
});

it("GET Health Endpoint", async () => {
    await request(app)
        .get('/api/v1/health')
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body.message).toContain("OK")
        });
});