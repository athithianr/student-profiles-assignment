import axios from 'axios';
import { useState, useEffect } from 'react';
import Student from './Student';

const StudentProfile = () => {

    const callAPI = () => {
        axios.get('https://www.hatchways.io/api/assessment/students')
            .then(response => {
                console.log(response.data.students);
                setStudentList(response.data.students);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const [studentList, setStudentList] = useState([]);
    const [searchName, setSearchName] = useState("");


    const renderedStudentList = studentList.filter((val) => {
        if (searchName == "") {
            return val;
        }
        else if (val.firstName.toLowerCase().includes(searchName.toLowerCase()) || val.lastName.toLowerCase().includes(searchName.toLowerCase())) {
            return val;
        }
    }
    )
        .map((student, index) => {
            return <Student student={student}></Student>;
        });
    useEffect(() => {
        callAPI();
    }, []);
    return (
        <div className="student-list">
            <input id="name-input" type="text" placeholder="Search By Name" onChange={(event) => {
                setSearchName(event.target.value);
            }} />
            <input id="tag-input" type="text" placeholder="Search By Name" onChange={(event) => {
                setSearchName(event.target.value);
            }} />
            {renderedStudentList}
        </div>
    );
}



export default StudentProfile;