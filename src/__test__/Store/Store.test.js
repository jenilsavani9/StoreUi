import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StoreCard from '../../components/ui/Store/StoreCard';
import { StateProvider, useStateValue } from '../../contexts/StateProvider';

jest.mock('../../contexts/StateProvider', () => ({
    useStateValue: jest.fn(() => [{}, jest.fn()]),
}));

const initialState = {};
const reducer = (state, action) => state;

describe('StoreCard', () => {
    beforeEach(() => {
        mockContext = jest.fn();
        useStateValue.mockReturnValue(mockContext);
    });

  const mockStore = {
    storesId: 1,
    storeName: 'Test Store',
    status: true,
    addressLine1: 'Address Line 1',
    addressLine2: 'Address Line 2',
    cityName: 'City',
    countryName: 'Country',
    locationLink: 'https://example.com',
    StoreFeature: [
      { name: 'Feature 1' },
      { name: 'Feature 2' },
    ],
  };

  it('renders store card correctly', () => {
    const { getByText } = render(<StoreCard {...mockStore} />);
    
    expect(getByText('Test Store')).toBeInTheDocument();
    expect(getByText('Address Line 1 Address Line 2')).toBeInTheDocument();
    expect(getByText('City, Country')).toBeInTheDocument();
    expect(getByTestId('map-link')).toHaveAttribute('href', 'https://example.com');
    expect(getByText('Feature 1')).toBeInTheDocument();
    expect(getByText('Feature 2')).toBeInTheDocument();
  });

  it('calls deleteStore function when delete button is clicked', () => {
    const { getByText } = render(<StoreCard {...mockStore} />);
    const deleteButton = getByText('Delete');
    const deleteStoreSpy = jest.spyOn(StoreCard.prototype, 'deleteStore');
    
    fireEvent.click(deleteButton);
    
    expect(deleteStoreSpy).toHaveBeenCalled();
  });
});
