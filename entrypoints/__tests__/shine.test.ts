import { describe, it, expect } from "vitest";
import { shine } from "../content/collections/shine";

describe("shine", () => {
  it("applies box shadow and border styles to the element", () => {
    const element = document.createElement("div");
    shine(element);
    expect(element.style.boxShadow).toBe("0 0 15px rgba(81, 250, 200, 1)");
    expect(element.style.border).toBe("1px solid rgba(81, 250, 200, 1)");
  });
});
