import { useState } from "react";
import "./App.css";
// import axios from 'axios';
import { fetchGitHubData } from "./helper/wrapped.mjs";

function App() {
  const [name, setName] = useState("");
  // const [allRepos, setAllRepos] = useState('')
  const [favLang, setFavLang] = useState(" ");
  const [bigRepo, setBigRepo] = useState(" ");
  const [bigSize, setBigSize] = useState(" ");
  const [lang, setLang] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(name);
      let responsePromise = fetchGitHubData(name);
      console.log(responsePromise);
      responsePromise.then((responseData) => {
        const languagesData = [];
        Object.entries(responseData.languages.data).forEach(
          ([language, count]) => {
            languagesData.push({ language, count });
          }
        );
        setLang(languagesData);
        setFavLang(responseData.favouriteLanguage[0]);
        setBigRepo(responseData.biggestRepo);
        setBigSize(responseData.biggestSize);
        console.log(responseData);
      });
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
    // setResponse to be response from api call
  };

  return (
    <>
      <div className="parent">
        <form onSubmit={submitHandler}>
          <input
            className="input"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="button" type="submit">
            Submit
          </button>
          <div>
            {favLang !== " " && <h1>Your favourite language was {favLang}</h1>}
            {bigRepo !== " " && (
              <h1>
                Your biggest repo was {bigRepo} at {bigSize}{" "}
              </h1>
            )}
            {lang.length > 0 && (
              <h1>
                Top languages:
                <ul>
                  {lang.map(({ language, count }) => (
                    <li key={language}>{`${language}: ${count}`}</li>
                  ))}
                </ul>
              </h1>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default App;

// const headers = {
//   'Content-Type': 'application/json',
//   // Include other headers as needed (e.g., Authorization, etc.)
// };

// const axiosResponse = await axios.post(
//   'https://n1u5q98j65.execute-api.eu-west-2.amazonaws.com/dev/name-upload',
//   // Include your request data here
//   { key: 'value' },
//   {
//     headers: headers,
//   }
// );

// console.log('Request Headers:', axiosResponse.config.headers);
// console.log('Response Data:', axiosResponse.data);
