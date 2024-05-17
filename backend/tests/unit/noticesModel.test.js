const mongoose = require('mongoose');
const  noticedocSchema  = require('../../Models/noticeDoc');

describe('noticedocSchema', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testDB', {
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

  it('should create a valid noticedoc', async () => {
    const validNoticedoc = new noticedocSchema({
      name: 'Test Notice',
      file: 'test.pdf',
    });
    const savedNoticedoc = await validNoticedoc.save();

    expect(savedNoticedoc._id).toBeTruthy();
    expect(savedNoticedoc.name).toBe('Test Notice');
    expect(savedNoticedoc.file).toBe('test.pdf');
  });
  it('should fail to create a noticedoc without a file', async () => {
    const invalidNoticedoc = new noticedocSchema({
      name: 'Test Notice',
    });

    let error;
    try {
      await invalidNoticedoc.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
    expect(error.errors.file).toBeTruthy();
  });
});