import { getUserOrderStates } from "./1";

console.log(
  getUserOrderStates([
    "initial",
    "inWork",
    "buyingSupplies",
    "producing",
    "fullfilled",
  ])
);
