import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import VacationEventForm from './VacationEventForm';
import BusinessTripEventFrom from './BusinessTripEventFrom';
import OutworkEventForm from './OutworkEventForm';

const AttendanceAdd = ( props ) => {
    const [workState, setWorkState] = useState("");
    return (
        <div>
        {
            props.type === 'outwork'
            ? <Form>
                <Form.Check
                    type='radio'
                    id='outwork'
                    label='출장'
                    name='outwork'
                    onChange={ () => setWorkState('business')}
                    />
                <Form.Check
                    type='radio'
                    id='outwork'
                    label='외근'
                    name='outwork'
                    onChange={ () => setWorkState('outwork')}
                    />
            </Form>
            : ( 
                props.type ==='vacation' 
                ? <VacationEventForm />
                : null
                )
        }
        { workState === 'business' && <BusinessTripEventFrom /> }
        { workState === 'outwork' && <OutworkEventForm /> }
        </div>
    );
};

export default AttendanceAdd;