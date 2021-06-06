import axios from 'axios';
import { useState, useEffect } from 'react';
import Student from './Student';

const StudentProfile = () => {

    const populateStudents = () => {
        axios.get('https://www.hatchways.io/api/assessment/students')
            .then(response => {
                console.log(response.data.students);
                setStudentList(response.data.students);
            })
            .catch(error => {
                console.error(error);
                setError("No Students were found!");
            })
    }

    const [studentList, setStudentList] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [Error, setError] = useState("");
    const [TagName, setTagName] = useState("");

    const renderItem = (x, id) =>
    {
        let array = studentList;
        array[id-1].tags = x;
        setStudentList(array);
    }

    const renderedStudentList = studentList.filter((val) => {
        if (searchName === "")
            return val;
        else if (val.firstName.toLowerCase().includes(searchName.toLowerCase()) || val.lastName.toLowerCase().includes(searchName.toLowerCase()))
            return val;
        else
            return null;
    }).filter((val) => {
        if(TagName === "")
            return val;
        else if(val.tags && val.tags.length != 0) {
            for(let i=0;i<val.tags.length;i++)
            {
                if(val.tags[i].toLowerCase().includes(TagName.toLowerCase()))
                {
                    return val;
                }
            }
        }
    })
        .map((student, index) => {
            return <Student student={student} renderItem={renderItem}></Student>;
        });

        
    useEffect(() => {
        populateStudents();
    }, []);

    return (
        <div className="student-list">
            <input id="name-input" type="text" placeholder="Search By Name" onChange={(event) => {
                setSearchName(event.target.value);
            }} />
            <input id="tag-input" type="text" placeholder="Search By Tags" onChange={(event) => {
                setTagName(event.target.value);
            }} />
            {renderedStudentList}
            {Error}
        </div>
    );
}



export default StudentProfile;