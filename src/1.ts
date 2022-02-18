type FIXME = Exclude<OrderState, "buyingSupplies" | "producing">[];

export const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];

export const getUserOrderStates = (arg: OrderState[]): FIXME => {
  const filteredStates = [] as FIXME;
  arg.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
