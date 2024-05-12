// test for item controller

const request = require("supertest");
const express = require("express");
const itemRouter = require("../../routes/Item");
const app = express();
app.use(express.json());
app.use("/item", itemRouter);
const Item = require("../../Models/item");

const {
  create,
  updateItem,
  deleteItem,
  previewItem,
} = require("../../controllers/Item");
jest.mock("../../../Models/item");

// test case for create item controller

describe("create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new item and return the created item", async () => {
    const newItem = {
      username: "testuser",
      itemName: "New Item",
      AssetsClass: "Current Assets",
      AssetsSubClass: "Test Subclass",
    };

    const savedItem = {
      ...newItem,
      _id: "663e270eee7493d3dedd27ed",
    };

    const itemInstanceMock = {
      save: jest.fn().mockResolvedValue(savedItem),
    };

    Item.mockImplementation(() => itemInstanceMock);

    const req = {
      body: newItem,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await create(req, res);

    expect(itemInstanceMock.save).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ item: savedItem });
  });
  it("should handle errors and return 500 Internal Server Error", async () => {
    const newItem = {
      username: "testuser",
      itemName: "New Item",
      AssetsClass: "Current Assets",
      AssetsSubClass: "Test Subclass",
    };

    const errorMessage = "Database error";

    Item.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }));

    const req = {
      body: newItem,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

// test case for view all item controller
describe("Item Veiw function tests", () => {
  it("should return all items", async () => {
    // Mock the behavior of Supplyer.find() to return a predefined list of supplyers
    const mockedItems = [
      {
        username: "testuser",
        itemName: "Test Item",
        AssetsClass: "Current Assets",
        AssetsSubClass: "Test Subclass",
      },

      { username: "user2", itemName: "Item 2" },
    ];
    Item.find.mockResolvedValue(mockedItems);

    // Send a request to the endpoint
    const response = await request(app).get("/item/view-item");

    // Verify that the response contains the expected list of supplyers
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedItems);
  });
});

// test case for view specific item controller
describe("Item View function tests", () => {
  it("should return details of a specific item", async () => {
    // Mock the behavior of Item.findById() to return a predefined item
    const mockedItems = {
      username: "testitem",
      itemName: "Test Item",
      AssetsClass: "Current Assets",
      AssetsSubClass: "Test Subclass",
    };
    Item.findById.mockResolvedValue(mockedItems);

    // Mock request and response objects
    const req = { params: { id: "663e270eee7493d3dedd27ed" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the previewItem function
    await previewItem(req, res);

    // Verify that Item.findById() was called with the correct ID
    expect(Item.findById).toHaveBeenCalledWith("663e270eee7493d3dedd27ed");

    // Verify that the response status is 200 and the items details are returned
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedItems);
  });

  it("should return 404 if item is not found", async () => {
    // Mock Item.findById() to return null, indicating that the item is not found
    Item.findById.mockResolvedValue(null);

    // Mock request and response objects
    const req = { params: { id: "nonExistentId" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the previewItem function
    await previewItem(req, res);

    // Verify that Item.findById() was called with the correct ID
    expect(Item.findById).toHaveBeenCalledWith("nonExistentId");

    // Verify that the response status is 404
    expect(res.status).toHaveBeenCalledWith(404);
    // Verify that the appropriate message is returned
    expect(res.json).toHaveBeenCalledWith({ status: "Item not found" });
  });

  it("should handle errors properly", async () => {
    // Mock Supplyer.findById() to throw an error
    Item.findById.mockRejectedValue(new Error("Database error"));

    // Mock request and response objects
    const req = { params: { id: "663e270eee7493d3dedd27ed" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the previewSupplyer function
    await previewItem(req, res);

    // Verify that Supplyer.findById() was called with the correct ID
    expect(Item.findById).toHaveBeenCalledWith("663e270eee7493d3dedd27ed");

    // Verify that the response status is 500 and the appropriate error message is returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "Error with getting item",
      error: "Database error",
    });
  });
});

// test case for update item controller
describe("updateItem", () => {
  it("should update an existing item", async () => {
    // Mock the behavior of Item.findByIdAndUpdate() to return a predefined item
    const updatedItem = {
      _id: "663e270eee7493d3dedd27ed",
      username: "testuser",
      itemName: "Updated Item",
      AssetsClass: "Current Assets",
      AssetsSubClass: "Test Subclass",
    };
    Item.findByIdAndUpdate.mockResolvedValue(updatedItem);

    // Mock request and response objects
    const req = {
      params: { id: "663e270eee7493d3dedd27ed" },
      body: {
        username: "testuser",
        itemName: "Updated Item",
        AssetsClass: "Current Assets",
        AssetsSubClass: "Test Subclass",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the updateItem function
    await updateItem(req, res);

    // Verify that Item.findByIdAndUpdate() was called with the correct arguments
    expect(Item.findByIdAndUpdate).toHaveBeenCalledWith(
      "663e270eee7493d3dedd27ed",
      {
        username: "testuser",
        itemName: "Updated Item",
        AssetsClass: "Current Assets",
        AssetsSubClass: "Test Subclass",
      },
      { new: true }
    );

    // Verify that the response status is 200 and the updated item is returned
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "Item updated",
      Item: updatedItem,
    });
  });

  it("should return 404 if item is not found", async () => {
    // Mock Item.findByIdAndUpdate() to return null, indicating that the item is not found
    Item.findByIdAndUpdate.mockResolvedValue(null);

    // Mock request and response objects
    const req = {
      params: { id: "nonExistentId" },
      body: {
        username: "testuser",
        itemName: "Updated Item",
        AssetsClass: "Current Assets",
        AssetsSubClass: "Test Subclass",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the updateItem function
    await updateItem(req, res);

    // Verify that the response status is 404 and the appropriate message is returned
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: "Item not found" });
  });

  // Add more test cases for invalid item ID, handling errors, etc.
});

// test case for delete item controller
describe("deleteItem", () => {
  it("should delete an existing item", async () => {
    // Mock the behavior of Item.findByIdAndDelete() to return a predefined item
    const deletedItem = {
      _id: "663e270eee7493d3dedd27ed",
      username: "testuser",
      itemName: "Item to be deleted",
      AssetsClass: "Current Assets",
      AssetsSubClass: "Test Subclass",
    };
    Item.findByIdAndDelete.mockResolvedValue(deletedItem);

    // Mock request and response objects
    const req = {
      params: { id: "663e270eee7493d3dedd27ed" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the deleterItem function
    await deleteItem(req, res);

    // Verify that Item.findByIdAndDelete() was called with the correct ID
    expect(Item.findByIdAndDelete).toHaveBeenCalledWith(
      "663e270eee7493d3dedd27ed"
    );

    // Verify that the response status is 200 and the appropriate message is returned
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: "Item deleted" });
  });

  it("should return 404 if item is not found", async () => {
    // Mock Item.findByIdAndDelete() to return null, indicating that the item is not found
    Item.findByIdAndDelete.mockResolvedValue(null);

    // Mock request and response objects
    const req = {
      params: { id: "nonExistentId" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the deleterItem function
    await deleteItem(req, res);

    // Verify that the response status is 404 and the appropriate message is returned
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: "Item not found" });
  });

  // Add more test cases for invalid item ID, handling errors, etc.
});
