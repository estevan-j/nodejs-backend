const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API of Users and Auth",
            version: "1.0.0",
            description: "API for managing users and authentication",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}



const specs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use(("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)));
}

module.exports = setupSwagger;

