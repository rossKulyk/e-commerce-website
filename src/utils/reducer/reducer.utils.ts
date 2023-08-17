import { AnyAction } from "redux";

// intersection type that combines the provided function type (AC) with additional properties and a method
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

//create new Matchable type out of AC
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;
//create new Matchable type out of AC
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;
//
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

// type action
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};
// type action
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
