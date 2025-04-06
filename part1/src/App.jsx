import { useState } from "react";

const History = (props) => {
    if (props.allClicks.length === 0) {
        return <div>the app is used by pressing the buttons</div>;
    }
    return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

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

    const setToZero = () => {
        setLeft(0);
        setRight(0);
        setAll(0);
        setClicks([]);
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
                margin: "350px 500px",
            }}>
            <div>
                {left}
                <Button onClick={setLeftClick} text="left" />
                {total}
                <button onClick={setToZero}>reset</button>
                <Button onClick={setRightClick} text="right" />
                {right}
                <History allClicks={clicks} />
            </div>
        </div>
    );
};

export default App;
