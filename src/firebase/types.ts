export type FieldName = string;

export type OrderBy = [FieldName, "desc" | "asc"];

export type ResponseWithCursor<T> = { docs: T[]; cursor?: any };
