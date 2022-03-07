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
        it("should return inserted results on a successful post to api/v1/batch/people", async () => {
            const data = [["Luke Skywalker", 172, 22], ["Leia Organa", 168, 22]];
            const results = {AffectedRows: 2, Values: data };
            batchPost.mockReset();
            batchPost.mockResolvedValue(2);
            let response = await request(app).post("/api/v1/batch/people").send(data);
            expect(response.body).toStrictEqual(results);
        });
        it("should return 'Invalid Request' message if body is null on post to api/v1/batch/people", async () => {
            batchPost.mockReset();
            batchPost.mockResolvedValue(null);
            let response = await request(app).post("/api/v1/batch/people").send(null);
            expect(response.body).toStrictEqual({
                error: "Invalid Request",
                message: "There is no body in your request"
            });
        });
        it("should return 400 Bad Request error if body is undefined on post to api/v1/batch/people", async () => {
            batchPost.mockReset();
            batchPost.mockResolvedValue(undefined);
            await request(app).post("/api/v1/batch/people").send(undefined).expect(400);
        });
        it("should return an Error Code and Message if body is undefined on post to api/v1/batch/people", async () => {
            batchPost.mockReset();
            batchPost.mockResolvedValue(undefined);
            let response = await request(app)
                .post("/api/v1/batch/people")
                .send(undefined);
            expect(response.body).toStrictEqual({
                error: "Invalid Request",
                message: "There is no body in your request"
            });
        });
        it("should return a 422 response code if there is a null value on post to /api/v1/batch/people", async () => {
            const data = [[null, 177, 32], ["Leia Organa", 168, 22]];
            batchPost.mockReset();
            batchPost.mockResolvedValue({
                code: "ER_BAD_NULL_ERROR",
                message: "Column 'name' cannot be null"
            });
            await request(app).post("/api/v1/batch/people").send(data).expect(422);
        });
        it("should return Error code and message if body has a null value on a post to api/v1/batch/people", async () => {
            const data = [[null, 177, 32], ["Leia Organa", 168, 22]];
            batchPost.mockReset();
            batchPost.mockResolvedValue({
                code: "ER_BAD_NULL_ERROR",
                message: "Column 'name' cannot be null"
            });
            let response = await request(app)
                .post("/api/v1/batch/people")
                .send(data);
            expect(response.body).toStrictEqual({
                error: "ER_BAD_NULL_ERROR",
                message: "Column 'name' cannot be null"
            });
        });
        it("should return a 400 response code if there is not enough column values on a post to api/v1/batch/people", async () => {
            const data = [[177, 32], ["Leia Organa", 168, 22]];
            batchPost.mockReset();
            batchPost.mockResolvedValue({
                code: "ER_WRONG_VALUE_COUNT_ON_ROW",
                message: "Column count doesn't match value count at row 1"
            });
            await request(app).post("/api/v1/batch/people").send(data).expect(400);
        });
        it("should return an Error Code and Message if body has too few column values on a post to api/v1/batch/people", async () => {
            const data = [[177, 32], ["Leia Organa", 168, 22]];
            batchPost.mockReset();
            batchPost.mockResolvedValue({
                code: "ER_WRONG_VALUE_COUNT_ON_ROW",
                message: "Column count doesn't match value count at row 1"
            });
            let response = await request(app).post("/api/v1/batch/people").send(data);
            expect(response.body).toStrictEqual({
                error: "ER_WRONG_VALUE_COUNT_ON_ROW",
                message: "Column count doesn't match value count at row 1"
            });
        });
        it("should return a 500 response code if there is a generic server error code on a post to api/v1/batch/people", async () => {
            const data = [["Luke Skywalker", 177, 32], ["Leia Organa", 168, 22]];
            batchPost.mockReset();
            batchPost.mockResolvedValue({
                code: "GENERIC_ERROR_CODE",
                message: "SOME RANDOM ERROR MESSAGE"
            });
            await request(app).post("/api/v1/batch/people").send(data).expect(500);
        });
        it("should return an Error Code and Message if there is a generic server error code on a post to api/v1/batch/people", async () => {
            const data = [["Luke Skywalker", 177, 32], ["Leia Organa", 168, 22]];
            batchPost.mockReset();
            batchPost.mockResolvedValue({
                code: "GENERIC_ERROR_CODE",
                message: "SOME RANDOM ERROR MESSAGE"
            });
            let response = await request(app).post("/api/v1/batch/people").send(data);
            expect(response.body).toStrictEqual({
                error: "GENERIC_ERROR_CODE",
                message: "SOME RANDOM ERROR MESSAGE"
            });
        });
    });
});
