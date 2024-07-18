import { Data } from "./EmpoliData";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setData(Data);
  }, []);

  // for edit
  const handleEdit = (id) => {
    alert(id);
    const item = data.find((item) => item.id === id);
    if (item) {
      setUpdate(true);
      setId(id);
      setFirstName(item.firstName);
      setLastName(item.lastName);
      setAge(item.age);
    }
  };

  // for delete
  const handleDelete = (id) => {
    alert(id);
    if (
      id > 0 &&
      window.confirm("Are you sure you want to delete this record?")
    ) {
      const filteredData = data.filter((item) => item.id !== id);
      setData(filteredData);
    }
  };

  // for save
  const handleSave = (e) => {
    e.preventDefault();
    let error = ""; // Initialize error
    if (!firstName) error += "First name is required. ";
    if (!lastName) error += "Last name is required. ";
    if (age <= 0) error += "Age must be greater than 0. ";
    if (!error) {
      alert("Record Saved");
      const newObject = {
        id: data.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      };
      setData([...data, newObject]);
      handleClear();
    } else {
      alert(`Error: ${error}`);
    }
  };

  // for clear
  const handleClear = () => {
    alert("Record Cleared");
    setFirstName("");
    setLastName("");
    setAge(0);
    setUpdate(false);
  };

  // for update
  const handleUpdate = () => {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedData = [...data];
      updatedData[index] = { id, firstName, lastName, age };
      setData(updatedData);
      handleClear();
    }
  };

  return (
    <div className="App">
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
          marginBottom: "20px",
        }}
      >
        <div>
          <label>
            First Name
            <input
              type="text"
              placeholder="Enter your first Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>

        <div>
          <label>
            Last Name
            <input 
              type="text"
              placeholder="Enter your Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>

        <div>
          <label>
            Age
            <input
              type="number"
              placeholder="Enter your Age"
              onChange={(e) => setAge(parseInt(e.target.value))}
              value={age}
            />
          </label>
        </div>

        <div>
          {!update ? (
            <button className="btn btn-dark" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn btn-dark" onClick={handleUpdate}>
              Update
            </button>
          )}
          <button className="btn btn-danger" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>sr.no</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>{" "}
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
