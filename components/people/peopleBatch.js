import databaseResponseCheck from "./peopleUtils.js";

/* POST BATCH people */
function peopleBatchPost(database, app) {
    app.post("/api/v1/batch/people", async (req, res) => {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                error: "Invalid Request",
                message: "There is no body in your request"
            });
        } else {
            let results = await database.batchPost(req.body);
            const dbResponse = databaseResponseCheck(results, req.body);
            res.status(dbResponse.statusCode).json(dbResponse.bodyResponse);
        };
    });
};

export default { peopleBatchPost };