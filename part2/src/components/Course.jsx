const List = ({ content }) => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            {content.name} {content.exercises}
        </div>
    );
};

const Course = (props) => {
    const { course } = props;
    const total = course.parts.reduce((s, p) => {
        return s + p.exercises;
    }, 0);

    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((c) => (
                <List key={c.id} content={c} />
            ))}
            <p>total of {total} exercises</p>
        </div>
    );
};

export default Course;
