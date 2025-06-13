import { useState, useEffect } from "react";
import Country from "./components/Country";
import CountryInfo from "./components/CountryInfo";
import findCountry from "./services/countries";
import "./App.css";

function App() {
    const [countries, setCountries] = useState(null);
    const [name, setName] = useState("Start Typing Here...");
    const [possibleCountries, setPossibleCountries] = useState(null);

    // fetch data
    useEffect(() => {
        const promise = findCountry.getAll();
        promise.then((response) => setCountries(response.data));
    }, []);

    const getCountry = (event) => {
        event.preventDefault();
        const foundCountry = countries.find(
            (c) => c.name.common.replace(/\s+/g, "").toLowerCase() === name
        );
        setPossibleCountries(foundCountry ? [foundCountry] : []);
    };

    // handle user input query
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        const possible = countries.filter((c) =>
            c.name.common
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(value.replace(/\s+/g, "").toLowerCase())
        );
        setPossibleCountries(possible);
        console.log(possible);
    };

    return (
        <>
            <div>Hello, World!</div>
            <div>
                find countries:
                <form onSubmit={getCountry}>
                    <input value={name} onChange={handleNameChange} />
                    <button type="submit">search</button>
                </form>
                {possibleCountries && possibleCountries.length <= 10 ? (
                    possibleCountries.length == 1 ? (
                        <CountryInfo
                            key={possibleCountries[0].area}
                            country={possibleCountries[0]}
                        />
                    ) : (
                        possibleCountries.map((c) => (
                            <Country
                                key={c.area}
                                foundCountry={c.name.common}
                            />
                        ))
                    )
                ) : possibleCountries && possibleCountries.length > 10 ? (
                    <p>Too many countries to render...</p>
                ) : null}
            </div>
        </>
    );
}

export default App;
