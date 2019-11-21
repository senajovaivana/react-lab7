import React from 'react'
import styles from './EmployeeClass.css'
import PropTypes from 'prop-types';

const NewEmployeeForm  = ({
                              name,
                              age,
                              email,
                              phoneNumber,
                              onClickSubmit,
                              setLabelName,
                              isEmail,
                              onChangeName,
                              onChangeAge,
                              onChangeEmail,
                              onChangePhoneNumber,
                              errors
                          }) => {


    return (

        <div className={'styledInput'} >
            <label className={'bold'}>Adding new employee</label>
            <label> Age </label>
            <input type="number" value={age} onChange={onChangeAge}/>

            <label> {setLabelName} </label>
            <input type="text" value={name} onChange={onChangeName} />

            {isEmail &&
                <>
                    <label> Email </label>
                    <input type="text" value={email}  onChange={onChangeEmail} />
                </>
            }

            {!isEmail &&
            <>
                <label> Parent Phone No </label>
                <input type="text" value={phoneNumber}  onChange={onChangePhoneNumber}/>
            </>
            }
            <button onClick={onClickSubmit}> Submit </button>
            {errors.size !== 0 &&
                <div className={'redColor'}>
                    {errors.map(e => <div key={e}> {e} </div>)}
                </div>
            }
        </div>
    );

};


export default NewEmployeeForm;