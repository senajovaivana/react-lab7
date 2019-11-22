import React from 'react'
import NewEmployeeForm from "./NewEmployeeForm";
import styles from './EmployeeClass.css'

class EmployeeClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: undefined,
            addEmployee: false,
            name : "",
            labelName : "Name",
            age: 0,
            email : "",
            isEmail : true,
            phoneNumber: "",
            validationName: [],
            validationEmailAndPhoneNmbr: [],
            validationAge: [],
            isAgeCorrect: false,
            isNameCorrect: false,
            isEmailAndPhoneCorrect: false,
        };
        this.handleAddEmployee = this.handleAddEmployee.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    //fetching data of employees from server from previous lab
    componentDidMount() {
        fetch('http://localhost:3004/employees')
            .then(response => response.json())
            .then(data => this.setState({data : data }));
    }

    render() {
        return (
            <>
                <h1>Employees</h1>
                <button onClick={this.handleAddEmployee}>ADD NEW EMPLOYEE </button>
                {this.state.addEmployee &&
                <NewEmployeeForm
                    name={this.state.name}
                    onChangeName={this.handleChangeName}
                    age={this.state.age}
                    onChangeAge={this.handleChangeAge}
                    email={this.state.email}
                    onChangeEmail={this.handleChangeEmail}
                    setLabelName={this.state.labelName}
                    isEmail={this.state.isEmail}
                    phoneNumber={this.state.phoneNumber}
                    onChangePhoneNumber={this.handleChangePhoneNumber}
                    errors={[...this.state.validationName, ...this.state.validationEmailAndPhoneNmbr,
                             ...this.state.validationAge]}
                    isReadyToSubmit={this.state.isEmailAndPhoneCorrect && this.state.isAgeCorrect &&
                                     this.state.isNameCorrect}
                    onClickSubmit={this.handleSubmitForm}
                />
                }

                {this.state.data != null &&
                <div className={'styledInput'}>
                    <label className={'bold'}>List of employees</label>
                    <table>
                        <tbody>
                        {this.state.data.map(employee =>
                            <tr key={employee.id} style={{textAlign: "center"}} className={(employee.isActive ? 'blackColor' : 'redColor' )}>
                                <td> {employee.name} </td>
                                <td> {employee.age} </td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
                }
            </>
        );
    }

    handleSubmitForm() {
        this.props.history.push('/success');
    }

    handleChangeName = e => {
        let name = e.target.value;
        this.setState({name: name});
        let isCorrect = false;
        let errors = [];
        if (name !== null) {
            if (name.length < 3) {
                errors.push("Name should be at least 3 characters long.");
            } else {
                isCorrect = true;
            }
        }
        this.setState({validationName: errors, isNameCorrect: isCorrect});
    };

    handleChangePhoneNumber = e => {
        let number =  e.target.value;
        let isCorrect = false;
        this.setState({phoneNumber: number});
        let errors = [];
        if (number !== null) {
            if (number.length !== 9) {
                errors.push("Phone number should be 9 characters long.");
            }
            if (number.match(/^[0-9]+$/) == null) {
                errors.push("Phone number should contain only digits.");
            }
            if (errors.length === 0)
                isCorrect = true;
        }
        this.setState({validationEmailAndPhoneNmbr : errors, isEmailAndPhoneCorrect: isCorrect});
    };

    handleChangeAge = e => {
        let age = e.target.value;
        let isCorrect = false;
        let labelName = age >= 18 ? 'Name' : 'Parent name';
        let isEmailOrPhoneNmb = age >= 18;
        this.setState({age: age, isEmail : isEmailOrPhoneNmb, labelName : labelName});
        let errors = [];
        if (age !== null) {
            if (age > 120) {
                errors.push("Age cannot be bigger than 120.");
            } else if (age < 0) {
                errors.push("Age cannot be negative number.");
            } else {
                isCorrect = true;
            }
        }
        this.setState({validationAge : errors, isAgeCorrect: isCorrect});
    };

    handleChangeEmail = e => {
        let email =  e.target.value;
        let isCorrect = false;
        this.setState({email: email});
        let errors = [];
        if (email != null) {
            if (email.length < 5) {
                errors.push("Email should be at least 5 characters long.");
            }
            if (email.split("").filter(x => x === "@").length !== 1) {
                errors.push("Email should contain a @.");
            }
            if (email.indexOf(".") === -1) {
                errors.push("Email should contain at least one dot.");
            }
            if (errors.length === 0)
                isCorrect = true;
        }
        this.setState({validationEmailAndPhoneNmbr : errors, isEmailAndPhoneCorrect: isCorrect});
    };

    handleAddEmployee() {
        this.setState({addEmployee : true});
    }
}

export default EmployeeClass;