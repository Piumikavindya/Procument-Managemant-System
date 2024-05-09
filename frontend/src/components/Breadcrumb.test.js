import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import userEvent from '@testing-library/user-event';

describe("Breadcrumb component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Breadcrumb
          crumbs={[
            { label: "Home", link: "/adminhome/:id" },
            { label: "Manage Guidance", link: "/ManageGuidance" },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
        />
      </MemoryRouter>
    );
  });

  it("renders correct breadcrumb items", () => {
    const crumbs = [
      { label: "Home", link: "/adminhome/:id" },
      { label: "Manage Guidance", link: "/ManageGuidance" },
      { label: "Manage Users", link: "/userList" },
      { label: "Manage Vendors", link: "/allvendors" },
      { label: "Items", link: "/AllItem" },
      { label: "Dashboard", link: "" },
      { label: "Manage Guidance", link: "/ManageGuidance" },
      { label: "Manage Notices", link: "/ManageNotice" },
      { label: "Department", link: "" },
      { label: "Budget & Plan", link: "" },
      { label: "Manage Year Plan", link: "/EventPlanner" },
    ];
    render(
      <MemoryRouter>
        <Breadcrumb crumbs={crumbs} />
      </MemoryRouter>
    );

    crumbs.forEach((crumb) => {
      const crumbElements = screen.getAllByText(crumb.label);
      expect(crumbElements.length).toBeGreaterThan(0);
    });
  });

  it("generates correct link for dynamic routes", () => {
    const crumbs = [
      { label: "Home", link: "/adminhome/:id" },
      { label: "Manage Guidance", link: "/ManageGuidance" },
    ];
    render(
      <MemoryRouter initialEntries={["/adminhome/:123"]}>
        <Breadcrumb crumbs={crumbs} />
      </MemoryRouter>
    );
    const link = screen.getByText("Home");
  
    expect(link).toHaveAttribute("href", expect.stringContaining("/adminhome/"));

  });
  
});
