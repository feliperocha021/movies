import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

// type guard para FetchBaseQueryError
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

// type guard para SerializedError
function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === "object" && error !== null && "message" in error;
}

export function getErrorMessage(err: unknown): string {
  if (isFetchBaseQueryError(err)) {

    if (err.data && typeof err.data === "object" && "error" in err.data) { 
      return (err.data as { error: string }).error; 
    }

    switch (err.status) {
      case 400: return "Invalid data";
      case 401: return "Invalid credentials";
      case 403: return "Access denied";
      case 409: return "Data conflict (user already exists)";
      case 500: return "Internal server error";
      default: return `Unexpected error (${err.status})`;
    }
  }
  if (isSerializedError(err)) {
    return err.message ?? "Unexpected error";
  }
  return "Erro desconhecido";
}
