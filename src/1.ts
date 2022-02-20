type FIXME<T, U> = Exclude<OrderState, T | U>[];

const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];

export const getUserOrderStates = (
  arg: OrderState[]
): FIXME<"buyingSupplies", "producing"> => {
  const filteredStates = [] as FIXME<"buyingSupplies", "producing">;
  arg.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
