import { it, expect, describe } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { add, usd } from "../libs/convert";
import App from "../src/App";

describe("UI", () => {
	render(<App />);

	it("should render title correctly", () => {
		expect(screen.getByRole("title")).toBeInTheDocument();
	});

	it("should show correct result", async () => {
		await fireEvent.change(screen.getByRole("input"), {
			target: { value: 2 },
		});

		await fireEvent.click(screen.getByRole("submit"));

		expect(screen.getByRole("result").textContent).toBe("8640");
	});
});

describe("convert module", () => {
    it("should return 3 for 1 and 2", () => {
		expect(add(1, 2)).toBe(3);
	});

	it("should be 4320 for 1", () => {
		expect(usd(1)).toBe(4320);
	});

	it("should be 4320 for 2", () => {
		expect(usd(2)).toBe(8640);
	});
});

