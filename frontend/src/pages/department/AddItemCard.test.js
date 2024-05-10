import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { AddItemCard } from "./AddItemCard "; // Assuming this is the correct import path
import { useNavigate } from "react-router-dom";

// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AddItemCard component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(<AddItemCard />);

    expect(screen.getByText("Add Items")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Add a description")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add cost")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Add quantity required")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Add quantity available")
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  test("handles cancel click correctly", () => {
    render(<AddItemCard />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockNavigate).toHaveBeenCalledWith("/reqform"); // Check if navigate is called with the correct argument
  });

  test("handles add item click correctly", async () => {
    render(<AddItemCard />);

    const mockedResponse = {
      data: {
        newItem: {
          itemName: "Test Item",
          cost: "10",
          qtyRequired: "5",
          qtyAvailable: "10",
        },
      },
    };

    // Mocking axios.post correctly
    axios.post = jest.fn().mockResolvedValue(mockedResponse);
  });
});
