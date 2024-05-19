import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import DownloadRequest from './DownloadRequest';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

jest.mock('axios');
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('DownloadRequest component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/downloadRequest" element={<DownloadRequest />} />
        </Routes>
      </MemoryRouter>
    );
  });
});
