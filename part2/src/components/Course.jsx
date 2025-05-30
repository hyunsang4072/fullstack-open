const Header = ({ header }) => {
    return <h1>{header}</h1>;
};

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Total = ({ parts }) => {
    const cnt = parts.reduce((s, c) => s + c.exercises, 0);
    return <p style={{ fontWeight: "bold" }}>total of {cnt} exercises!!!</p>;
};

const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            {course.parts.map((c) => (
                <Part key={c.id} part={c} />
            ))}
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;
