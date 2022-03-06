import database from "../database.js";
import { jest } from "@jest/globals";

const mockQuery = jest.fn();

jest.mock("mysql2", () => ({
    createPool: () => ({
        promise: () => ({
            query: mockQuery
        })
    })
}));

describe("database", () => {
    describe("createPeopleTable()", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        beforeEach(() => {
            consoleSpy.mockClear();
        });
        it("should console.log success message on table creation", async () => {
            mockQuery.mockImplementationOnce(() => {
                return true
            });
            await database.createPeopleTable();
            const consoleSpy = jest.spyOn(console, "log");
            expect(consoleSpy).toHaveBeenCalledWith("Created People Table");
        })
    });
});