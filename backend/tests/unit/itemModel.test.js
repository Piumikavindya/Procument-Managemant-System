// test for item model

const mongoose = require("mongoose");
const Item = require("../../Models/item");

describe("Item Model", () => {
  // Connect to MongoDB before running tests
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect from MongoDB after running tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test item creation
  it("should create a new item", async () => {
    const newItemData = {
      username: "testuser",
      itemName: "Test Item",
      AssetsClass: "Current Assets",
      AssetsSubClass: "Test Subclass",
    };

    const newItem = await Item.create(newItemData);
    expect(newItem.username).toBe(newItemData.username);
    expect(newItem.itemName).toBe(newItemData.itemName);
    expect(newItem.AssetsClass).toBe(newItemData.AssetsClass);
    expect(newItem.AssetsSubClass).toBe(newItemData.AssetsSubClass);
  });
});
