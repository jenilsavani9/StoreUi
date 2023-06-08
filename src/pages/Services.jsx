import React, { useEffect } from 'react'
import FeatureCard from '../components/ui/Feature/FeatureCard'
import { useStateValue } from '../contexts/StateProvider'
import axios from 'axios';
import { CONTEXT_TYPE } from '../constants/constant';
import jwt_decode from "jwt-decode";
import AddModal from '../components/ui/Feature/AddModal';

function Services() {

    const [{ features }, dispatch] = useStateValue();

    async function LoadFeature() {
        try {
            const decoded = jwt_decode(localStorage.getItem('token'));
            const response = await axios({
                method: 'get',
                url: `api/Feature?UserId=${decoded.UserId}`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch({
                type: CONTEXT_TYPE.SET_FEATURE,
                features: response.data.result
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        LoadFeature();
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