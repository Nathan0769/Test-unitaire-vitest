import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { Robot, createLayout } from "../Robot.js";
import { House } from "../House.js";
import { Piece } from "../Piece.js";

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

  test("test checkBattery <= 0", () => {
    const robot = new Robot();
    robot.position = [2, 3];
    robot.battery = 0;

    robot.checkBattery();

    expect(console.log).toBeCalledTimes(2);
    expect(robot.battery).toBe(100);
    expect(robot.position).toEqual([0, 0]);
  });

  test("test logBattery with battery at 100", () => {
    const robot = new Robot();

    robot.logBattery();

    expect(console.log).toHaveBeenCalledWith("🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩");
  });

  test("test logBattery with battery at 50", () => {
    const robot = new Robot();
    robot.battery = 50;

    robot.logBattery();

    expect(console.log).toHaveBeenCalledWith("🟩🟩🟩🟩🟩🟥🟥🟥🟥🟥");
  });

  test("move position > Math.abs(1)", () => {
    const robot = new Robot();
    robot.move(3, 0);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  test("move position normal", () => {
    const robot = new Robot();
    robot.move(1, 0);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(robot.position).toEqual([1, 0]);
    expect(robot.battery).toBeLessThan(100);
  });

  test("clean house ", () => {
    const robot = new Robot();
    const house = new House(createLayout([5, 5]), robot);
    robot.battery = 100;

    robot.clean(house);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(robot.battery).toEqual(95);
  });

  test("doWork ", () => {
    const robot = new Robot();
    const house = new House(createLayout([5, 5]), robot);

    const result = robot.doWork(house);

    expect(result).toBe(true);
  });

  test("createLayout test size and content", () => {
    const size = [3, 3];
    const result = createLayout(size);

    expect(result.length).toBe(size[0]);
    expect(result[0].length).toBe(size[1]);

    result.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toBeInstanceOf(Piece);
        expect(["clean", "dirty"]).toContain(cell.state);
      });
    });
  });
});
