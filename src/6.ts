type FIXME = Exclude<OrderState, "buyingSupplies" | "producing">;

const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];

// Hint: type guards
export const getUserOrderStates = (arg: OrderState[]): FIXME[] =>
  arg.filter(
    (state): state is FIXME =>
      state !== "buyingSupplies" && state !== "producing"
  );
