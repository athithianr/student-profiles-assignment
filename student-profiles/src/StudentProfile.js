import axios from 'axios';
import { useState, useEffect } from 'react';
import Student from './Student';

const StudentProfile = () => {
    const populateStudents = () => {
        axios.get('https://www.hatchways.io/api/assessment/students')
            .then(response => {
                setStudentList(response.data.students);
                setError("");
            })
            .catch(error => {
                console.error(error);
                setError(<h1>No Students were found!</h1>);
            })
    }

    const [studentList, setStudentList] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState("");
    const [TagName, setTagName] = useState("");

    const saveTags = (tagName, id) => {
        let tags = [];
        if (studentList[id - 1].hasOwnProperty('tags')) {
            tags = studentList[id - 1].tags;
        }
        tags.push(tagName);
        let updatedStudentList = [...studentList];
        updatedStudentList[id - 1].tags = tags;
        setStudentList(updatedStudentList);
    }

    const renderedStudentList = studentList.filter((val) => {
        if (searchName === "")
            return val;
        else if (val.firstName.toLowerCase().includes(searchName.toLowerCase()) || val.lastName.toLowerCase().includes(searchName.toLowerCase()))
            return val;
        else
            return null;
    }).filter((val) => {
        if (TagName === "")
            return val;
        else if (val.tags && val.tags.length !== 0) {
            for (let i = 0; i < val.tags.length; i++) {
                if (val.tags[i].toLowerCase().includes(TagName.toLowerCase()))
                    return val;
            }
            return null;
        }
        else
            return null;
    })
        .map((student) => {
            return <Student key={student.id} student={student} saveTags={saveTags} studentTags={student.hasOwnProperty('tags') ? student.tags : []}></Student>;
        });


    useEffect(() => {
        populateStudents();
    }, []);

    return (
        <div className="student-list">
            <input style={{ fontSize: '18px', padding: '20px 20px 5px 20px' }} id="name-input" type="text" placeholder="Search By name" onChange={(event) => {
                setSearchName(event.target.value);
            }} />
            <input style={{ fontSize: '18px', padding: '20px 20px 5px 20px' }} id="tag-input" type="text" placeholder="Search By tags" onChange={(event) => {
                setTagName(event.target.value);
            }} />
            {renderedStudentList}
            {error}
        </div>
    );
}

export default StudentProfile;