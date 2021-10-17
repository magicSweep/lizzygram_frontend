import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  screen,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Groggy } from ".";

let _render: RenderResult;

describe("Groggy", () => {
  beforeEach(() => {
    _render = render(<Groggy />);
  });

  afterEach(cleanup);

  test("matches snapshot", () => {
    const { baseElement } = _render;
    expect(baseElement).toMatchSnapshot();
  });
});
