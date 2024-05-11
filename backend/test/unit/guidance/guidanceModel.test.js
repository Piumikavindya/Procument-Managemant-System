const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the noticedocSchema
const noticedocSchema = new Schema({
  name: { type: String, required: [true, "Please provide a name"] },
  file: { type: String, required: [true, "Please provide a file"] },
});

const NoticeDoc = mongoose.model("NoticeDoc", noticedocSchema);

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/testDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe("NoticeDoc Model", () => {
  // Test Case 1: Create a new notice document successfully
  it("should create a new notice document successfully", async () => {
    const noticeDoc = new NoticeDoc({
      name: "Test Notice",
      file: "/path/to/file.pdf",
    });
    const savedNoticeDoc = await noticeDoc.save();
    expect(savedNoticeDoc).toHaveProperty("name", "Test Notice");
    expect(savedNoticeDoc).toHaveProperty("file", "/path/to/file.pdf");
  });

  // Test Case 2: Create a new notice document without a name
  it("should fail to create a new notice document without a name", async () => {
    const noticeDoc = new NoticeDoc({ file: "/path/to/file.pdf" });
    await expect(noticeDoc.save()).rejects.toThrow();
  });

  // Test Case 3: Create a new notice document without a file
  it("should fail to create a new notice document without a file", async () => {
    const noticeDoc = new NoticeDoc({ name: "Test Notice" });
    await expect(noticeDoc.save()).rejects.toThrow();
  });

  // Test Case 4: Find a notice document by name
  it("should find a notice document by name", async () => {
    const noticeDoc = new NoticeDoc({
      name: "Test Notice",
      file: "/path/to/file.pdf",
    });
    await noticeDoc.save();
    const foundNoticeDoc = await NoticeDoc.findOne({ name: "Test Notice" });
    expect(foundNoticeDoc).toHaveProperty("name", "Test Notice");
  });

  // Test Case 5: Find a notice document by file
  it("should find a notice document by file", async () => {
    const noticeDoc = new NoticeDoc({
      name: "Test Notice",
      file: "/path/to/file.pdf",
    });
    await noticeDoc.save();
    const foundNoticeDoc = await NoticeDoc.findOne({
      file: "/path/to/file.pdf",
    });
    expect(foundNoticeDoc).toHaveProperty("file", "/path/to/file.pdf");
  });

  // Test Case 6: Update a notice document's name
  it("should update a notice document's name", async () => {
    const noticeDoc = new NoticeDoc({
      name: "Test Notice",
      file: "/path/to/file.pdf",
    });
    await noticeDoc.save();
    noticeDoc.name = "Updated Notice";
    const updatedNoticeDoc = await noticeDoc.save();
    expect(updatedNoticeDoc).toHaveProperty("name", "Updated Notice");
  });

  // Test Case 7: Update a notice document's file
  it("should update a notice document's file", async () => {
    const noticeDoc = new NoticeDoc({
      name: "Test Notice",
      file: "/path/to/file.pdf",
    });
    await noticeDoc.save();
    noticeDoc.file = "/path/to/updated-file.pdf";
    const updatedNoticeDoc = await noticeDoc.save();
    expect(updatedNoticeDoc).toHaveProperty(
      "file",
      "/path/to/updated-file.pdf"
    );
  });

  // Test Case 8: Delete a notice document
  it("should delete a notice document", async () => {
    const noticeDoc = new NoticeDoc({
      name: "Test Notice",
      file: "/path/to/file.pdf",
    });
    await noticeDoc.save();
    const deleteResult = await NoticeDoc.deleteOne({ _id: noticeDoc._id });
    expect(deleteResult.deletedCount).toBe(1);
  });
});
