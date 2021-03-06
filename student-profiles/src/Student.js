import { useState } from 'react';

const Student = ({ student, saveTags, studentTags }) => {
    const [toggle, setToggle] = useState(0);

    const grades = student.grades.map((grade, index) => {
        return <p className="grades">Test {index + 1}: {grade}%</p>
    },
    );

    const tags = studentTags.map((tag) => {
        return <p style={{ display: "inline", margin: "0 10px 0 10px", padding: "5px 5px 5px 5px", backgroundColor: 'lightgray' }}>{tag}</p>
    }
    )

    const handleGradeDropdown = () => {
        (toggle === 0) ? setToggle(1) : setToggle(0);
    }

    let sum = 0;
    for (let i = 0; i < student.grades.length; i++) {
        sum += parseInt(student.grades[i]);
    }

    return (
        <div className="container">
            <div className="img-box">
                <img src={student.pic} id="image-border" alt="Student" />
            </div>
            <div className="student-info">
                <h1>{student.firstName} {student.lastName}</h1>
                <p>Email: {student.email}</p>
                <p>Company: {student.company}</p>
                <p>Skill: {student.skill}</p>
                <p>Average: {sum / student.grades.length}%</p>
                <br></br>
                {toggle === 1 ? grades : ""}
                <br></br>
                <div style={{ textAlign: 'left' }}>{toggle === 0 ? "" : tags}</div>
                <br></br>
                {toggle !== 0 ? <input className="add-tag-input" type="text" placeholder="Add a tag" onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        saveTags(event.currentTarget.value, student.id);
                        event.currentTarget.value = ""
                    }
                }} /> : ""}
            </div>
            <div className="toggle">
                <button onClick={handleGradeDropdown} className="expand-btn"><i className={`fa fa-${toggle === 0 ? "plus" : "minus"}`}></i></button>
            </div>
        </div>

    );
}

export default Student;