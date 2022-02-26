import { Service } from "./calendapi";

describe("Service", () => {
  const serv = new Service();
  beforeAll(async () => {
    await serv.create({
      id: 100001,
      date: Date.parse("2022-2-23"),
      status: "openned",
      tag: "red",
      description: "homework create API",
    });
    await serv.create({
      id: 100002,
      date: Date.parse("2022-2-24"),
      status: "openned",
      tag: "green",
      description: "create tests API",
    });
    await serv.create({
      id: 100003,
      date: Date.parse("2022-2-25"),
      status: "cancelled",
      tag: "yellow",
      description: "Complete API homework",
    });
  });

  it("creates localStorage entries", async () => {
    expect(await serv.read()).toStrictEqual([
      {
        id: 100001,
        date: 1645563600000,
        status: "openned",
        tag: "red",
        description: "homework create API",
      },
      {
        id: 100002,
        date: 1645650000000,
        status: "openned",
        tag: "green",
        description: "create tests API",
      },
      {
        id: 100003,
        date: 1645736400000,
        status: "cancelled",
        tag: "yellow",
        description: "Complete API homework",
      },
    ]);
  });

  it("updates data", async () => {
    await serv.update({
      id: 100002,
      date: Date.parse("2022-2-24"),
      status: "openned",
      tag: "red",
      description: "create tests API",
    });

    expect(await serv.read()).toStrictEqual([
      {
        id: 100001,
        date: 1645563600000,
        status: "openned",
        tag: "red",
        description: "homework create API",
      },
      {
        id: 100002,
        date: 1645650000000,
        status: "openned",
        tag: "red",
        description: "create tests API",
      },
      {
        id: 100003,
        date: 1645736400000,
        status: "cancelled",
        tag: "yellow",
        description: "Complete API homework",
      },
    ]);
  });

  it("removes chosen entry", async () => {
    await serv.delete({
      id: 100002,
      date: Date.parse("2022-2-24"),
      status: "openned",
      tag: "red",
      description: "create tests API",
    });

    expect(await serv.read()).toStrictEqual([
      {
        id: 100001,
        date: 1645563600000,
        status: "openned",
        tag: "red",
        description: "homework create API",
      },
      {
        id: 100003,
        date: 1645736400000,
        status: "cancelled",
        tag: "yellow",
        description: "Complete API homework",
      },
    ]);
  });

  it("filters by date", async () => {
    expect(await serv.filterDate(Date.parse("2022-2-23"))).toStrictEqual([
      {
        id: 100001,
        date: 1645563600000,
        status: "openned",
        tag: "red",
        description: "homework create API",
      },
    ]);
  });

  it("filters by description", async () => {
    expect(await serv.filterDescript("create")).toStrictEqual([
      {
        id: 100001,
        date: 1645563600000,
        status: "openned",
        tag: "red",
        description: "homework create API",
      },
    ]);
  });

  it("filters by status", async () => {
    expect(await serv.filterStatus("openned")).toStrictEqual([
      {
        id: 100001,
        date: 1645563600000,
        status: "openned",
        tag: "red",
        description: "homework create API",
      },
    ]);
  });

  it("filters by tag", async () => {
    expect(await serv.filterTag("yellow")).toStrictEqual([
      {
        id: 100003,
        date: 1645736400000,
        status: "cancelled",
        tag: "yellow",
        description: "Complete API homework",
      },
    ]);
  });
});
