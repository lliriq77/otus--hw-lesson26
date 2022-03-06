import { calendarData } from "./calendobj";

describe("calendarData", () => {
  it("is an object", () => {
    expect(calendarData).toBeInstanceOf(Object);
  });
  it("each data entry has five properties", () => {
    expect(Object.keys(calendarData[0]).length).toBe(5);
  });
});
