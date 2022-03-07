import databaseResponseCheck from "../peopleUtils.js";

// UNIT TESTS
describe("peopleUtils", () => {
    describe("databaseResponseCheck()", () => {
        it("should return an object with a status code 200", () => {
            const results = [[1, "Luke Skywalker", 172, 22]];
            let result = databaseResponseCheck(results, null);
            expect(result).toStrictEqual({
                statusCode: 200,
                bodyResponse: results
            });
        });
        it("should return an object with a status code 201 and body response with AffectedRows and Values", () => {
            const results = 3;
            const body = [[1, "Luke Skywalker", 172, 22], [2, "Leia Organa", 168, 22]];
            let result = databaseResponseCheck(results, body);
            expect(result).toStrictEqual({
                statusCode: 201,
                bodyResponse: { AffectedRows: results, Values: body }
            });
        });
        it("should return an object with a status code 422 and body response with an Error and Message", () => {
            const results = {
                code: "ER_BAD_NULL_ERROR",
                message: "Column 'name' cannot be null"
            };
            const body = [[null, 172, 28]];
            let result = databaseResponseCheck(results, body);
            expect(result).toStrictEqual({
                statusCode: 422,
                bodyResponse: { error: results.code, message: results.message}
            });
        });
        it("should return an object with a status code 404 and body response with an Error and Message", () => {
            const results = {
                code: "NOT_FOUND",
                message: "NOT FOUND NO ID IN DATABASE"
            };
            const body = [];
            let result = databaseResponseCheck([], body);
            expect(result).toStrictEqual({
                statusCode: 404,
                bodyResponse: { error: results.code, message: results.message}
            });
        });
    });
});
