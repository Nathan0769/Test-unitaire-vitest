import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { House } from "../House.js";
import { createLayout, Robot } from "../Robot.js";

describe("Robot test", () => {
  const originalConsoleLog = console.log;

  beforeAll(() => {
    console.log = vi.fn((...params) => {
      originalConsoleLog(...params);
    });
  });

  beforeEach(() => {
    // Réinitialiser le mock de console.log avant chaque test
    vi.mocked(console.log).mockReset();
  });

  test("nearestDirtyPiece robot is on a dirty position ", () => {
    const robot = new Robot();
    const size = [3, 3];
    const house = new House(createLayout(size), robot);

    house.layout[0][0].state = "dirty";

    const result = house.nearestDirtyPiece();

    expect(result).toEqual([0, 0]);
  });

  test("logLayout house creation", () => {
    const robot = new Robot();
    const size = [3, 3];
    const house = new House(createLayout(size), robot);

    house.logLayout();

    expect(console.log).toHaveBeenCalledTimes(3);
  });

  test("clean dirty piece", () => {
    const robot = new Robot();
    const size = [3, 3];
    const house = new House(createLayout(size), robot);
    house.layout[0][0].state = "dirty";

    house.clean(robot.position);
    expect(house.layout[0][0].state).toBe("clean_by_robot");
  });

  test("clean clean piece", () => {
    const robot = new Robot();
    const size = [3, 3];
    const house = new House(createLayout(size), robot);
    house.layout[0][0].state = "clean";

    house.clean(robot.position);
    expect(house.layout[0][0].state).toBe("clean");
  });

  test("isAllClean when the house is already clean ", () => {
    const robot = new Robot();
    const size = [1, 2];
    const house = new House(createLayout(size), robot);

    house.layout[0][0].state = "clean";
    house.layout[0][1].state = "clean";

    const result = house.isAllClean();

    expect(result).toBe(true);
  });

  test("isAllClean when the house is dirty and clean ", () => {
    const robot = new Robot();
    const size = [1, 2];
    const house = new House(createLayout(size), robot);

    house.layout[0][0].state = "clean";
    house.layout[0][1].state = "dirty";

    const result = house.isAllClean();

    expect(result).toBe(false);
  });
});
