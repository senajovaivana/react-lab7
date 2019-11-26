import React from 'react'
import styles from './EmployeeClass.css'

const NewEmployeeForm  = ({
                              name,
                              age,
                              email,
                              phoneNumber,
                              setLabelName,
                              isEmail,
                              onChangeName,
                              onChangeAge,
                              onChangeEmail,
                              onChangePhoneNumber,
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
            <button> Submit </button>

        </div>
    );
};

export default NewEmployeeForm;