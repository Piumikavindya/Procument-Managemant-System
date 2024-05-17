const mongoose = require("mongoose");
const Notice = require("../../Models/noticeDoc");
const path = require("path");
const fs = require("fs");

describe("uploadnotice", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { name: "Test Notice" },
      file: {
        path: path.join(__dirname, "test-file.pdf"),
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

 /*  it("should upload a notice successfully", async () => {
    const uploadnotice = require("../../../controllers/noticeDoc").uploadnotice;
    await uploadnotice(req, res);
    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(res.status).not.toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "File successfully uploaded" })
    );
  });
 */
  it("should handle file upload error", async () => {
    const uploadnotice = require("../../controllers/noticeDoc").uploadnotice;
    req.file = undefined;
    await uploadnotice(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "No file uploaded" });
  });
});

describe("viewNotice", () => {
  it("should fetch all notices", async () => {
    const viewNotice = require("../../controllers/noticeDoc").viewNotice;
    const mockNotices = [{ name: "Notice 1" }, { name: "Notice 2" }];
    jest.spyOn(Notice, "find").mockResolvedValueOnce(mockNotices);
    const res = {
      json: jest.fn(),
    };
    await viewNotice({}, res);
    expect(res.json).toHaveBeenCalledWith({ notice: mockNotices });
  });

  it("should handle error when fetching notices", async () => {
    const viewNotice = require("../../controllers/noticeDoc").viewNotice;
    jest
      .spyOn(Notice, "find")
      .mockRejectedValueOnce(new Error("Database error"));
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await viewNotice({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

describe("downloadNotice", () => {
  it("should download a notice", async () => {
    const downloadNotice =
      require("../../controllers/noticeDoc").downloadNotice;
    const mockNotice = { file: "test-file.pdf" };
    jest.spyOn(Notice, "findById").mockResolvedValueOnce(mockNotice);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      download: jest.fn(),
    };
    await downloadNotice({ params: { id: "mock-id" } }, res);
    expect(res.download).toHaveBeenCalledWith(
      expect.stringContaining("test-file.pdf")
    );
  });

  it("should handle notice not found", async () => {
    const downloadNotice =
      require("../../controllers/noticeDoc").downloadNotice;
    jest.spyOn(Notice, "findById").mockResolvedValueOnce(null);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await downloadNotice({ params: { id: "mock-id" } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: "notice not found" });
  });
});

describe("deleterNotice", () => {
  it("should delete a notice", async () => {
    const deleterNotice =
      require("../../controllers/noticeDoc").deleterNotice;
    const mockDelete = jest.fn();
    jest.spyOn(Notice, "findByIdAndDelete").mockResolvedValueOnce(mockDelete);
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await deleterNotice({ params: { id: "mock-id" } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: "notice deleted" });
  });

  it("should handle error while deleting a notice", async () => {
    const deleterNotice =
      require("../../controllers/noticeDoc").deleterNotice;
    jest
      .spyOn(Notice, "findByIdAndDelete")
      .mockRejectedValueOnce(new Error("Database error"));
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await deleterNotice({ params: { id: "mock-id" } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "Error with delete notice",
      error: "Database error",
    });
  });
});
