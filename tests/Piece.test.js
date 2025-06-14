import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { Piece } from "../Piece.js";

describe("Test Piece", () => {
  test("get emoji clean", () => {
    const piece = new Piece("clean");
    const result = piece.getEmoji();

    expect(result).toBe("🧼");
  });

  test("get emoji clean_by_robot", () => {
    const piece = new Piece("clean_by_robot");
    const result = piece.getEmoji();

    expect(result).toBe("🧽");
  });

  test("get emoji dirty", () => {
    const piece = new Piece("dirty");
    const result = piece.getEmoji();

    expect(result).toBe("💩");
  });

  test("isClean true for 'clean'", () => {
    const piece = new Piece("clean");
    expect(piece.isClean).toBe(true);
  });

  test("isClean true for 'clean_by_robot'", () => {
    const piece = new Piece("clean_by_robot");
    expect(piece.isClean).toBe(true);
  });

  test("isClean false for 'dirty'", () => {
    const piece = new Piece("dirty");
    expect(piece.isClean).toBe(false);
  });

  test("clean for clean ", () => {
    const piece = new Piece("clean");
    const result = piece.clean();

    expect(result).toBe(undefined);
  });

  test("clean for clean_by_robot", () => {
    const piece = new Piece("clean_by_robot");
    const result = piece.clean();

    expect(result).toBe(undefined);
  });

  test("clean for dirty", () => {
    const piece = new Piece("dirty");
    const result = piece.clean();

    expect(result).toBe("clean_by_robot");
  });
});
