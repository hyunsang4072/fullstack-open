import { useState } from "react";

const Display = ({ count }) => {
    return <div>{count}</div>;
};

const Button = ({ onClick, text }) => {
    return (
        <div>
            <button onClick={onClick}>{text}</button>
        </div>
    );
};

const App = () => {
    const [counter, setCounter] = useState(0);

    const incrementByOne = () => setCounter(counter + 1);
    const decrementByTwo = () => setCounter(counter - 2);
    const resetCounter = () => setCounter(0);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <Display count={counter} />
            </div>
            <div>
                <Button onClick={incrementByOne} text={"Add"} />
            </div>
            <div>
                <Button onClick={decrementByTwo} text={"Subtract"} />
            </div>
            <div>
                <Button onClick={resetCounter} text={"Reset"} />
            </div>
        </div>
    );
};

export default App;
