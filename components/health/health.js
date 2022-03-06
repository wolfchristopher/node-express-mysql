/* GET Health Endpoint */
function healthEndpoint(app) {
    app.get("/api/v1/health", function (req, res, next) {
        res.json({ message: "OK" });
    });
};

export default healthEndpoint;