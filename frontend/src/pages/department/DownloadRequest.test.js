import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'; // Mock axios for API calls
import DownloadRequest from './DownloadRequest';

jest.mock('axios'); // Mock axios

describe('DownloadRequest component', () => {
  test('renders request list component', async () => {
    render(<DownloadRequest />);

    // Wait for the request list component to appear
    await waitFor(() => {
      expect(screen.getByText('Request List')).toBeInTheDocument();
    });
  });

  test('fetches and downloads PDF on mount', async () => {
    const mockRequestId = 'mockRequestId';
    axios.get.mockResolvedValueOnce({ data: 'mockPDFData' });

    render(<DownloadRequest />);

    // Wait for the PDF to be downloaded
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8000/fetchPdf/${mockRequestId}`, {
        responseType: 'blob',
      });
    });

    // Wait for redirect
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/ViewForRequest');
    });
  });

  test('handles error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Mock error'));

    render(<DownloadRequest />);

    // Wait for alert to appear
    await waitFor(() => {
      expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
    });
  });
});
