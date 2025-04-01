const userService = require('../services/userService');

const errorHandler = (err, req, res, next) => {
    console.error(`"[Error] ${new Date().toISOString()} - ${err.message}`);
    console.log(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || getDefaultErrorMessage(statusCode);
    const response = err.response || getDefaultErrorResponse(statusCode, req);

    res.status(statusCode).json({
        status: statusCode,
        message,
        response,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    });
}


const getDefaultErrorMessage = (statusCode) => {
    switch (statusCode) {
        case 400: return 'Bad Request';
        case 401: return 'Unauthorized';
        case 403: return 'Forbidden';
        case 404: return 'Not Found';
        case 422: return 'Validation Error';
        default: return 'Internal Server Error';
    }
}


const getDefaultErrorResponse = (statusCode, req) => {
    switch (statusCode) {
        case 400: retun `Datos inválidos ${JSON.stringify(req.response)}`;
        case 401: return 'No autorizado';
        case 403: return 'Acceso denegado';
        case 404: return 'No encontrado';
        case 422: return 'Datos no cumplen con la validacion requerida';
        default: return 'Error interno del servidor';
    }
}

const notFoundHandler = (req, res, next) => {
    const error = new Error(`La ruta ${req.originalUrl} no fue encontrada`);
    error.status = 404;
    next (error);
}

const malFormedRequestHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        const error = new Error('Solicitud mal formada');
        error.status = 400;
        next(error);
    }
}


const canManageUsers = async (req, res, next) => {
    try {
        const username = req.params.user;
        const email = req.user.email;
        const authenticatedUser = await userService.getUserByEmail(email);

        if (!authenticatedUser) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            return next(error);
        }
        if (authenticatedUser.isAdmin){
            return next();
        }

        const requestUser = await userService.getUserByUsername(username);
        if (!requestUser) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            return next(error);
        }
        if (requestUser.email === email){
            return next();
        }
        const error = new Error('No tienes permiso para realizar esta acción');
        error.status = 403;
        return next(error);
    } catch (error) {
        error.status = 500;
        error.message = 'Error al verificar permisos de usuario';
        next (error);
    }
}


module.exports = {
    errorHandler,
    notFoundHandler,
    malFormedRequestHandler,
    canManageUsers
}