import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import "@testing-library/jest-dom/extend-expect";

describe("Blog tests", () => {
  test("renders only title and author not likes nor url", async () => {
    const blog = {
      title: "test title",
      author: "test author",
      url: "test.com",
      likes: 0,
    };

    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector(".blogContent");
    expect(div).toHaveTextContent("test title");
    expect(div).not.toHaveTextContent("likes");
    expect(div).not.toHaveTextContent("test.com");
  });
});
