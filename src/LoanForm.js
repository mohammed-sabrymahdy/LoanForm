import { useState } from "react";
import "./LoanForm.css";

export default function LoanForm() {
  const [inputForm, setInputForm] = useState({
    name: "",
    age: "",
    email: "",
    checkbox: false,
    salary: "",
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputForm((form) => ({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value) && value !== "") {
        setEmailError("Please enter a valid email (e.g., example@domain.com)");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputForm.email)) {
      setEmailError("Please enter a valid email (e.g., example@domain.com)");
      return;
    }

    console.log("Form submitted:", inputForm);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Loan Request</h1>
        <hr />
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={inputForm.name}
          type="text"
          onChange={handleChange}
          name="name"
          required
        />
        <label htmlFor="age">Age:</label>
        <input
          value={inputForm.age}
          type="number"
          id="age"
          onChange={handleChange}
          name="age"
          min={10}
          max={100}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          value={inputForm.email}
          id="email"
          name="email"
          onChange={handleChange}
          type="email"
          required
        />
        {emailError && <p className="error">{emailError}</p>}
        <label htmlFor="checkbox">Are you an employee?</label>
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          checked={inputForm.checkbox}
          onChange={handleChange}
        />
        <hr />
        <label htmlFor="salary">Salary:</label>
        <select
          id="salary"
          name="salary"
          value={inputForm.salary}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select salary range
          </option>
          <option value="0-1000">0 - 1000</option>
          <option value="1001-3000">1001 - 3000</option>
          <option value="3001-5000">3001 - 5000</option>
          <option value="5000+">5000+</option>
        </select>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
