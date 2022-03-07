export default function databaseResponseCheck(results, body) {
    if (results.code) {
      return errorFilterCheck(results);
    } else if (Array.isArray(results) && !results.length) {
        return {
            statusCode: 404,
            bodyResponse: {
                error: "NOT_FOUND",
                message: "NOT FOUND NO ID IN DATABASE"
            }
        }
    } else {
        return validResponseFilterCheck(results, body)
    }
}

function errorFilterCheck(results) {
    if (results.code === "ER_BAD_NULL_ERROR") {
        return {
            statusCode: 422,
            bodyResponse: { error: results.code, message: results.message}
        }
    } else if (results.code === "ER_WRONG_VALUE_COUNT_ON_ROW") {
        return {
            statusCode: 400,
            bodyResponse: { error: results.code, message: results.message}
        }
    } else {
        return {
            statusCode: 500,
            bodyResponse: { error: results.code, message: results.message }
        }
    }
}

function validResponseFilterCheck(results, body) {
    if (body != null) {
        return {
            statusCode: 201,
            bodyResponse: { AffectedRows: results, Values: body }
        }
    } else {
        return {
            statusCode: 200,
            bodyResponse: results
        }
    }
}