interface ExtendedError extends Error {
  parent?: string;
}

export interface CustomError {
  status: number;
  message: string;
  response?: any;
}

export const handleDatabaseError = (error: unknown): CustomError => {
  if (error === null || error === undefined) {
    return { status: 500, message: "Internal Server Error" };
  }

  if (typeof error === "object" && "status" in error && "message" in error) {
    return error as CustomError;
  }

  if (error instanceof Error) {
    const err = error as ExtendedError;
    switch (err.name) {
      case "SequelizeConnectionRefusedError":
      case "SequelizeConnectionError":
        return { status: 503, message: "Database connection error" };
      case "ConnectionRefusedError":
        return { status: 503, message: "Database not available" };
      case "SequelizeDatabaseError":
        return { status: 500, message: "Database access error" };
      case "SequelizeUniqueConstraintError":
        return {
          status: 400,
          message: err.parent ? `${err.parent}` : "Unique constraint error",
        };
      case "SequelizeEagerLoadingError":
        return {
          status: 400,
          message: err.parent ? `${err.parent}` : "Non-associated relationship",
        };
      default:
        return { status: 500, message: "Internal Server Error" };
    }
  }

  return { status: 500, message: "Internal Server Error" };
};
