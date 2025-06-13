const CountryInfo = ({ country }) => {
    return (
        <>
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
            </div>
            <div>
                <h2>Languages</h2>
                <ul style={{ textAlign: "left", display: "inline-block" }}>
                    {Object.values(country.languages).map((lang, index) => (
                        <li key={index}>{lang}</li>
                    ))}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        </>
    );
};

export default CountryInfo;
