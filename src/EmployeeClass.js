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
            errors: []
        };
        this.handleAddEmployee = this.handleAddEmployee.bind(this);
        this.handleSubmitingEmployee = this.handleSubmitingEmployee.bind(this);
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
                    onClickSubmit={this.handleSubmitingEmployee}
                    errors={this.state.errors}
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

    handleChangeName = e => this.setState({name: e.target.value});
    handleChangePhoneNumber = e => this.setState({phoneNumber: e.target.value});

    handleChangeAge = e => {
        let age = e.target.value;
        let labelName = age >= 18 ? 'Name' : 'Parent name';
        let isEmailOrPhoneNmb = age >= 18;
        this.setState({ ...this.state, age: age, isEmail : isEmailOrPhoneNmb, labelName : labelName});
    };

    handleChangeEmail = e => this.setState({email: e.target.value});

    handleAddEmployee() {
        this.setState({addEmployee : true});
    }

    handleSubmitingEmployee() {
        let errors = [];
        if (this.state.isEmail) {
            if (this.state.email.length < 5) {
                errors.push("Email should be at least 5 characters long.");
            }
            if (this.state.email.split("").filter(x => x === "@").length !== 1) {
                errors.push("Email should contain a @.");
            }
            if (this.state.email.indexOf(".") === -1) {
                errors.push("Email should contain at least one dot.");
            }
        } else {
            if (this.state.phoneNumber.length !== 9) {
                errors.push("Phone number should be 9 characters long.");
            }
            if (this.state.phoneNumber.match(/^[0-9]+$/) == null) {
                errors.push("Phone number should contain only digits.");
            }
        }
        this.setState({errors: errors});
    }

}

export default EmployeeClass;