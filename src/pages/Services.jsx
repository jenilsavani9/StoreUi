import React, { useEffect } from 'react';

import AddModal from '../components/ui/Feature/AddModal';
import FeatureCard from '../components/ui/Feature/FeatureCard';
import { CONTEXT_TYPE } from '../constants/constant';
import { useStateValue } from '../contexts/StateProvider';
import { LoadFeature } from '../services/Features';

function Services() {

    const [{ features }, dispatch] = useStateValue();

    async function LoadFeatures() {
        try {
            const response = await LoadFeature()
            dispatch({
                type: CONTEXT_TYPE.SET_FEATURE,
                features: response.data.payload
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        LoadFeatures();
    }, [])


    return (
        <div>
            <div className='container'>

                <div className="d-flex justify-content-between mt-3">
                    <h2>Features</h2>
                    <AddModal />
                </div>

                <div className=''>
                    <div className="row">
                        {features.length == 0 ? <div>No features found</div> : features.map((item, index) => {
                            return <FeatureCard key={index} feature={item} />
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Services