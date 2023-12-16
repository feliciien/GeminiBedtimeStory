import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import "./App.css";

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
      <h1>BedTime</h1>
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
            <div className="col-sm-6 col-md-4">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </select>
            </div>
            <div className="col-sm-6 col-md-4">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="col-sm-6 col-md-4">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="col-sm-6 col-md-4">
              <label htmlFor="hobbies" className="form-label">
                Hobbies
              </label>
              <input
                type="text"
                className="form-control"
                id="hobbies"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
              />
            </div>
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
        Developed By <a href="https://lablab.ai/u/@Youknowsthevibes">youknowsthevibes</a>
      </div>
    </div>
  );
}

export default App;
