import { useState } from "react";

function StudentForm() {
  const [formdata, setFormdata] = useState({
    name: "",
    dept: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormdata({
      ...formdata,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Student Registered Successfully!");

    setFormdata({
      name: "",
      dept: "",
      email: "",
      password: ""
    });
  }

  return (
    <>
      <h1>Student Registration Form</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formdata.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="dept"
          placeholder="Enter your department"
          value={formdata.dept}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter your Gmail"
          value={formdata.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formdata.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Register</button>

      </form>
    </>
  );
}

export default StudentForm;