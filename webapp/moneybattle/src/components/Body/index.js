import React, {useState, useEffect} from 'react';
import './Body.scss';
import { uid } from 'uid';
import customToast from '../CustomToast/CustomToast';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
const Body =  (props) => {
    const setValues = () => {
        
    }
    return (<div className='body-container'>
        {/* {
            showHospitalDialog &&
            <HospitalEditDialog 
            editHospital={editHospital}
            isNewHospitalAdded={isNewHospitalAdded}
            show={showHospitalDialog} 
            handleClose={() => setShowHospitalDialog(false)}
            update={() => updateHospital()}
            onChangeInput={(data) => {
                if(isNaN(data.covidCapacity) || isNaN(data.nonCovidCapacity) || data.name === "") {
                    customToast.error("Covid Capacity, nonCovidCapacity should be number, Name should be non-null");
                    setEditHospital({
                        ...data,
                        covidCapacity: data.originalValue.covidCapacity,
                        nonCovidCapacity: data.originalValue.nonCovidCapacity,
                        name: data.originalValue.name
                    });
                } else {
                    setEditHospital({
                        ...data,
                        covidCapacity: parseInt(data.covidCapacity, 10),
                        nonCovidCapacity: parseInt(data.nonCovidCapacity, 10),
                        name: data.name
                    });
                }
            }}
            />
        } */}
        <div className='flex'>
            <Dice setValues={setValues} />
        </div>
    </div>)
}
export default Body;