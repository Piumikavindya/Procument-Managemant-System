// guidanceController.test.js
const request = require('supertest');
const express = require('express');
const guidanceRouter = require('../../routes/guidanceDoc');
const app = express();
app.use(express.json());
app.use('/guidance', guidanceRouter);
const Guidance = require('../../Models/guidanceDoc');
const path = require('path');

const {
  upload,
  viewGuidance,
  downloadGuidance,
  deleteGuidance,
} = require('../../controllers/guidanceDoc');

jest.mock('../../Models/guidanceDoc');



describe('viewGuidance', () => {
  it('should return all guidance documents', async () => {
    const mockedGuidance = [
      {
        name: 'Test Guidance 1',
        file: '/path/to/file1.pdf',
      },
      {
        name: 'Test Guidance 2',
        file: '/path/to/file2.pdf',
      },
    ];
    Guidance.find.mockResolvedValue(mockedGuidance);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await viewGuidance({}, res);

    expect(Guidance.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ guidance: mockedGuidance });
  });
});

describe('downloadGuidance', () => {
  it('should download a guidance file', async () => {
    const mockGuidance = {
      _id: '63e270eee7493d3dedd27ed',
      name: 'Test Guidance',
      file: '/path/to/file.pdf',
    };
    Guidance.findById.mockResolvedValue(mockGuidance);

    const req = {
      params: {
        id: '63e270eee7493d3dedd27ed',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      download: jest.fn(),
    };

    await downloadGuidance(req, res);

    expect(Guidance.findById).toHaveBeenCalledWith('63e270eee7493d3dedd27ed');
    expect(res.download).toHaveBeenCalledWith(
      path.join(__dirname, '../../', mockGuidance.file)
    );
  });

  it('should return 404 if guidance is not found', async () => {
    Guidance.findById.mockResolvedValue(null);

    const req = {
      params: {
        id: 'nonExistentId',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await downloadGuidance(req, res);

    expect(Guidance.findById).toHaveBeenCalledWith('nonExistentId');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: 'guidance not found' });
  });
});

describe('deleteGuidance', () => {
  it('should delete a guidance', async () => {
    const guidanceId = '63e270eee7493d3dedd27ed';
    const deletedGuidance = { _id: guidanceId };
    Guidance.findByIdAndDelete.mockResolvedValue(deletedGuidance);

    const req = {
      params: {
        id: guidanceId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await deleteGuidance(req, res);

    expect(Guidance.findByIdAndDelete).toHaveBeenCalledWith(guidanceId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: 'Guidance deleted' });
  });

  it('should return 404 if guidance is not found', async () => {
    const guidanceId = 'nonExistentId';
    Guidance.findByIdAndDelete.mockResolvedValue(null);

    const req = {
      params: {
        id: guidanceId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await deleteGuidance(req, res);

    expect(Guidance.findByIdAndDelete).toHaveBeenCalledWith(guidanceId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ status: 'Guidance not found' });
  });

  it('should return 500 if an error occurs', async () => {
    const guidanceId = '63e270eee7493d3dedd27ed';
    const error = new Error('Database error');
    Guidance.findByIdAndDelete.mockRejectedValue(error);

    const req = {
      params: {
        id: guidanceId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await deleteGuidance(req, res);

    expect(Guidance.findByIdAndDelete).toHaveBeenCalledWith(guidanceId);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error with delete guidance',
      error: error.message,
    });
  });
});



/* describe('upload', () => {
  it('should upload a new guidance and return the created guidance', async () => {
    // Mock the file upload
    const mockFile = {
      path: path.join(__dirname, 'test.pdf'),
    };

    const req = {
      body: {
        name: 'Test Guidance',
      },
      file: mockFile,
    };

    const savedGuidance = {
      name: 'Test Guidance',
      file: mockFile.path,
      _id: '63e270eee7493d3dedd27ed',
    };

    const guidanceInstanceMock = {
      save: jest.fn().mockResolvedValue(savedGuidance),
    };

    Guidance.mockImplementation(() => guidanceInstanceMock);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await upload(req, res);

    expect(guidanceInstanceMock.save).toHaveBeenCalledWith();
    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      guidance: savedGuidance,
      message: 'File successfully uploaded',
    });
  });

  it('should return 400 if no file is uploaded', async () => {
    const req = {
      body: {
        name: 'Test Guidance',
      },
      file: undefined,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await upload(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'No file uploaded' });
  });
}); */