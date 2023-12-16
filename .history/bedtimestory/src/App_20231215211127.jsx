import { useState } from "react";
import "./App.css"; // Import the CSS file for styles
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [hobbies, setHobbies] = useState("");

  const genAI = new GoogleGenerativeAI("YOUR-API-KEY-HERE");

  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Think you are a mom who has ${age} years old ${gender} in ${country}. Your child's favorite things are ${hobbies}. You are a caring mother about your children and you have to tell a wonderful story for your child every single night. So generate a bedtime story for the child based on the child's favorite things, country, and age. Also, at the end of the story, you have to give some advice for kids to be good and do good for society. Also, motivate them to believe in themselves`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setApiData(text);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name, gender, age, country, hobbies);
    fetchData();
  };

  return (
    <div className="container">
      <h1>Google Gemini Pro AI Integration With React</h1>
      <div className="mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-6 col-md-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Add similar columns for other form fields */}
            {/* Adjust column classes based on the desired layout */}
            {/* Example:
                <div className="col-sm-6 col-md-4">
                  ...
                </div>
            */}
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary mt-3 w-100">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="">
        {!loading && <p className="text-align-left">{apiData}</p>}
        {loading && <p>Loading...</p>}
      </div>
      <div className="mt-4">
        Developed By <a href="https://udarax.me">UDARAX</a>
      </div>
    </div>
  );
}

export default App;
