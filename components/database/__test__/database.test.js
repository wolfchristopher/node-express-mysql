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
        it("should call console.log on error", async () => {
            let error = new Error("SOME_ERROR_MESSAGE");
            mockQuery.mockImplementationOnce(() => {throw error});
            await database.createPeopleTable();
            // const consoleSpy = jest.spyOn(console, "log").mockImplementation();
            expect(console.log).toBeCalledTimes(1);
        });
        it("should should console.log a error message on error", async () => {
            let error = new Error("SOME_ERROR_MESSAGE");
            mockQuery.mockImplementationOnce(() => {throw error});
            await database.createPeopleTable();
            const consoleSpy = jest.spyOn(console, "log").mockImplementation();
            expect(consoleSpy).toHaveBeenCalledWith(
                "Error Creating People Table",
                error
            );
        });
    });
});