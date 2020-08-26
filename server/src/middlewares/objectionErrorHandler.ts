import { ValidationError, NotFoundError } from 'objection';

import {
    DBError,
    ConstraintViolationError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError,
} from 'objection-db-errors';

const sendError = (res, status, err, data?) => {
    res.status(status || 400).send({
        message: err.message,
        type: err.type || 'UnknownValidationError',
        data: err.data || {},
    });
};

export function objectionErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError || err instanceof DataError) {
        sendError(res, 400, err);
    } else if (err instanceof NotFoundError) {
        sendError(res, 404, err);
    } else if (err instanceof UniqueViolationError || err instanceof ForeignKeyViolationError) {
        sendError(res, 409, err, {
            columns: err instanceof UniqueViolationError ? err.columns : null,
            table: err.table,
            constraint: err.constraint,
        });
    } else if (err instanceof NotNullViolationError) {
        sendError(res, 400, err, {
            column: err.column,
            table: err.table,
        });
    } else if (err instanceof ForeignKeyViolationError) {
        sendError(res, 409, err, {
            table: err.table,
            constraint: err.constraint,
        });
    } else if (err instanceof CheckViolationError) {
        sendError(res, 400, err, { table: err.table, constraint: err.constraint });
    } else if (err instanceof DBError) {
        sendError(res, 500, err);
    } else {
        next(err);
    }
}
