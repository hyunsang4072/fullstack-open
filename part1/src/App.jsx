import { useState } from "react";

const App = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [clicks, setClicks] = useState([]);
    const [total, setAll] = useState(0);

    const setLeftClick = () => {
        setClicks([...clicks].concat("L"));
        // console.log(clicks);
        setLeft(left + 1);
        setAll((t) => t + 1);
    };

    const setRightClick = () => {
        setClicks([...clicks].concat("R"));
        // console.log(clicks);
        setRight(right + 1);
        setAll((t) => t + 1);
    };

    console.log(total);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid",
                padding: "50px 25px",
                margin: "0 500px",
            }}>
            <div>
                {left}
                <button onClick={setLeftClick}>left</button>
                {total}
                {clicks.join("")}
                <button onClick={setRightClick}>right</button>
                {right}
            </div>
        </div>
    );
};

export default App;
