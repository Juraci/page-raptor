import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SidePanel from "../content/SidePanel.vue";

describe("SidePanel", () => {
  it("renders the panel header", () => {
    const wrapper = mount(SidePanel);
    expect(wrapper.find(".panel-header").text()).toBe("Page Raptor");
  });

  it("renders the analyze button", () => {
    const wrapper = mount(SidePanel);
    expect(wrapper.find("#analyze-btn").exists()).toBe(true);
  });

  it("renders the toggle button", () => {
    const wrapper = mount(SidePanel);
    expect(wrapper.find("#toggle-btn").exists()).toBe(true);
  });

  it("panel is visible by default", () => {
    const wrapper = mount(SidePanel);
    expect(wrapper.find(".panel").classes()).not.toContain("hidden");
  });

  it("clicking toggle hides the panel", async () => {
    const wrapper = mount(SidePanel);
    await wrapper.find("#toggle-btn").trigger("click");
    expect(wrapper.find(".panel").classes()).toContain("hidden");
  });

  it("clicking analyze produces results when page has elements", async () => {
    const wrapper = mount(SidePanel, { attachTo: document.body });
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", "Submit");
    btn.textContent = "Submit";
    document.body.appendChild(btn);
    await wrapper.find("#analyze-btn").trigger("click");
    expect(wrapper.find("#results-container").classes()).toContain("has-results");
    btn.remove();
    wrapper.unmount();
  });
});
