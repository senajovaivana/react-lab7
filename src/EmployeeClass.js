import React from 'react'
import styles from './EmployeeClass.css'

class EmployeeClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: undefined,
        };
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
}

export default EmployeeClass;