import { useState } from 'react';

const Student = ({ student }) => {
    const [Grades, setGrades] = useState("");
    const [Tags, setTags] = useState([]);

    const grades = student.grades.map((grade, index) => {
        return <p class="grades">Test {index + 1}: {grade}%</p>
    },
    );

    const handleGradeDropdown = () => {
        if (Grades == "") {
            setGrades(grades);
        }
        else {
            setGrades("");
        }
    }

    let sum = 0;
    for (let i = 0; i < student.grades.length; i++) {
        sum += parseInt(student.grades[i]);
    }

    return (
        <div class="container">
            <div class="left-half">
                <img src={student.pic} id="circle" alt="BigCo Inc. logo" />
            </div>
            <div class="right-half">
                <div className="temp">
                    <h1>{student.firstName} {student.lastName}</h1>
                    <p>Email: {student.email}</p>
                    <p>Company: {student.company}</p>
                    <p>Skill: {student.skill}</p>
                    <p>Average: {sum / student.grades.length}%</p>
                    <br></br>
                    {Grades}
                    {Grades !== "" ? Tags : ""}
                    {Grades !== "" ? <input id="tag-input" type="text" placeholder="Add a tag" onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            setTags(Tags.concat(event.target.value) + "  ")
                            event.currentTarget.value = ""
                        }
                    }} /> : ""}
                </div>
            </div>
            <div class="third">
                <button onClick={handleGradeDropdown} class="expand-btn"><i className={`fa fa-${Grades === "" ? "plus" : "minus"}`}></i></button>
            </div>
        </div>

    );
}

export default Student;