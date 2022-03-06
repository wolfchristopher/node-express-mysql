import request from "supertest";
import makeApp from "../../../app";
import { jest } from "@jest/globals";

const createPeopleTable = jest.fn();
const batchPost = jest.fn();

const app = makeApp({
    createPeopleTable,
    batchPost
});

describe("People Batch", () => {
    describe("POST /api/v1/batch/people", () => {
        beforeEach(() => {
            batchPost.mockReset();
            batchPost.mockResolvedValue(0);
        });
        it("should return a 200 on a successful post to api/v1/batch/people", async () => {
            const data = [["Luke Skywalker", 172, 22], ["Leia Organa", 168, 22]]
            batchPost.mockReset();
            batchPost.mockResolvedValue(data);
            await request(app).post("/api/v1/batch/people").send(data).expect(201)
        });
    });


});
