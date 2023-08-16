import { AnyAction } from "redux";

// intersection type that combines the provided function type (AC) with additional properties and a method
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// createAction overloaded signatures
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
// export const createAction = (type, payload) => {
//   return { type, payload };
// };
