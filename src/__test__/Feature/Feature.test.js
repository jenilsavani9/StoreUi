import react from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import FeatureCard from '../../components/ui/Feature/FeatureCard';

describe('FeatureCard', () => {
    const mockFeature = {
        id: 1,
        name: 'no cost emi'
    };

    it("render the feature card", () => {
        render(<FeatureCard feature={mockFeature}/>)
        expect(getByText("no cost emi"));
    });
})