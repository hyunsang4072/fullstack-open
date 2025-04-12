import { useState } from "react";

const AnecdoteButton = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const VoteButton = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Display = ({ text }) => {
    return <div>{text}</div>;
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const handleNext = () => {
        const randInd = getRandomInt(anecdotes.length);
        setSelected(randInd);
    };

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
    const [mostVoted, setMostVoted] = useState(0);

    // var arr = new Uint8Array(anecdotes.length);
    const vote = () => {
        const copy = Uint8Array.from(votes);
        copy[selected] += 1;
        setVotes(copy);
        const getMostVoted = copy.indexOf(Math.max(...copy));
        setMostVoted(getMostVoted);
    };

    return (
        <div>
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 30,
                }}>
                <h1>Anecdote of the day</h1>
                {anecdotes[selected]}
                <br />
                has {votes[selected]} votes
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 30,
                }}>
                <VoteButton text={"Vote"} onClick={vote} />
                <AnecdoteButton text={"Next anecdote"} onClick={handleNext} />
            </div>
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                }}>
                <h1>Most Voted</h1>
                <Display text={anecdotes[mostVoted]} />
            </div>
        </div>
    );
};

export default App;
