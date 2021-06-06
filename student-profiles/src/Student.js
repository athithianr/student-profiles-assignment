import { useState, useEffect } from 'react';

const Student = ({ student, renderItem}) => {
    const [Grades, setGrades] = useState("");
    const [Tags, setTags] = useState([]);

    const grades = student.grades.map((grade, index) => {
        return <p className="grades">Test {index + 1}: {grade}%</p>
    },
    );

    const tags = Tags.map((tag) => {
        return <p style={{display: "inline", margin: "0 10px 0 10px", padding: "5px 5px 5px 5px", backgroundColor:'lightgray'}}>{tag}</p>
    }
    )

    const handleGradeDropdown = () => {
        (Grades === "") ? setGrades(grades) : setGrades("");
    }

    let sum = 0;
    for (let i = 0; i < student.grades.length; i++) {
        sum += parseInt(student.grades[i]);
    }
    useEffect(() => {
        renderItem(Tags, student.id);
    }, [Tags]);

    useEffect(() => {
        if(student.hasOwnProperty('tags') && student.tags.length != 0)
        {
            console.log("Hello from " + student.firstName);
            setTags(student.tags);
        }
    }, [student]);


    return (
        <div className="container">
            <div className="left-half">
                <img src={student.pic} id="circle" alt="Student" />
            </div>
            <div className="right-half">
                <div className="temp">
                    <h1>{student.firstName} {student.lastName}</h1>
                    <p>Email: {student.email}</p>
                    <p>Company: {student.company}</p>
                    <p>Skill: {student.skill}</p>
                    <p>Average: {sum / student.grades.length}%</p>
                    <br></br>
                    {Grades}
                    <br></br>
                    <div style={{ textAlign: 'left'}}>{Grades === "" ? "" : tags}</div>
                    <br></br>
                    {Grades !== "" ? <input id="tag-input" type="text" placeholder="Add a tag" onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            setTags(Tags.concat(event.target.value))
                            event.currentTarget.value = ""
                        }
                    }} /> : ""}
                </div>
            </div>
            <div className="third">
                <button onClick={handleGradeDropdown} className="expand-btn"><i className={`fa fa-${Grades === "" ? "plus" : "minus"}`}></i></button>
            </div>
        </div>

    );
}

export default Student;