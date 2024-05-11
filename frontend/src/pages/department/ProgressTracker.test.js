import React from 'react';
import { render, screen ,fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ProgressTracker from './ProgressTracker';

// Mock axios get request
jest.mock('axios');

describe('ProgressTracker component', () => {
  test('renders ProgressTracker component', async () => {
    // Mock response data
    const mockResponseData = [
      { requestId: '1', purpose: 'Mock purpose 1', department: 'Mock department 1', status: 'Pending', date: new Date(), sendTo: 'Mock sender 1' },
      { requestId: '2', purpose: 'Mock purpose 2', department: 'Mock department 2', status: 'Approved', date: new Date(), sendTo: 'Mock sender 2' },
      // Add more mock data as needed
    ];

    // Mock axios.get to return a resolved promise with mock data
    axios.get.mockResolvedValue({ data: mockResponseData });

    // Render the component with BrowserRouter as the context provider
    render(
      <BrowserRouter>
        <ProgressTracker />
      </BrowserRouter>
    );

    // Expect loading indicator to not be displayed initially
    expect(screen.queryByText('Loading...')).toBeNull();

    // Expect the table rows to be rendered based on the mock data
    expect(await screen.findByText('Mock purpose 1')).toBeInTheDocument();
    expect(await screen.findByText('Mock purpose 2')).toBeInTheDocument();

    // Add more test assertions as needed
  });
 
});
