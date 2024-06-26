import fetchMock from 'jest-fetch-mock';

import { render, fireEvent, act, waitFor, screen } from '@testing-library/react';

import { OpenPixApp } from '../__fixtures__/OpenPixApp';

beforeEach(() => {
  fetchMock.resetMocks();
  jest.resetModules(); // reset require('Widget') between tests
});

it('should generate charge and call onPay callback', async () => {
  render(<OpenPixApp />);

  expect(screen.getByText('OpenPix')).toBeTruthy();

  const correlationID = 'correlationID';
  const brCode = 'brCode';

  act(() => {
    // POST - /api/openpix/v1/charge
    fetchMock.mockResponseOnce(
      JSON.stringify({
        error: null,
        charge: {
          status: 'ACTIVE',
          customer: {
            name: 'Dan',
            email: 'email0@entria.com.br',
            phone: '119912345670',
            taxID: {
              taxID: '31324227036',
              type: 'BR:CPF',
            },
          },
          value: 100,
          comment: 'good',
          correlationID,
          brCode,
          createdAt: '2021-03-02T17:28:51.882Z',
          updatedAt: '2021-03-02T17:28:51.882Z',
        },
      }),
    );
  });

  const btn = screen.getByText('Create Charge').closest('button');
  fireEvent.click(btn);

  await waitFor(() => expect(fetchMock.mock.calls.length).toBe(1));

  await waitFor(() => {
    expect(screen.getByText(brCode)).toBeInTheDocument();
  })

  act(() => {
    // GET - /api/openpix/v1/charge
    fetchMock.mockResponseOnce(
      JSON.stringify({
        error: null,
        charge: {
          status: 'COMPLETED',
          customer: {
            name: 'Dan',
            email: 'email0@entria.com.br',
            phone: '119912345670',
            taxID: {
              taxID: '31324227036',
              type: 'BR:CPF',
            },
          },
          value: 100,
          comment: 'good',
          correlationID,
          brCode,
          createdAt: '2021-03-02T17:28:51.882Z',
          updatedAt: '2021-03-02T17:28:51.882Z',
        },
      }),
    );
  });

  await waitFor(() => expect(fetchMock.mock.calls.length).toBe(2));

  expect(screen.getByText('Paid')).toBeInTheDocument();
});
