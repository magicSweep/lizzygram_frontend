import { OrderByDirection, WhereFilterOp } from "firebase/firestore";

export type FieldName = string;

export type Value = any;

export type OrderBy = [FieldName, OrderByDirection];

export type ResponseWithCursor<T> = { docs: T[]; cursor?: any };

export type Constraint = [FieldName, WhereFilterOp, Value];
