import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);



  /** writing a function to send data */

  const addFriend = () => {
    Axios.post("https://app-myfriends-backend.herokuapp.com/addfriend", {
      name: name,
      age: age,
    }).then((response) => {
      setListOfFriends([...listOfFriends, { _id: response.data._id, name: name, age: age }]);
    });
  };

  /** writing a function to send data END*/



  /** writing a function to update the age */

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");
    Axios.put("https://app-myfriends-backend.herokuapp.com/update", { newAge: newAge, id: id }).then(
      () => {
      setListOfFriends(
        listOfFriends.map((val)=>{
          return val._id == id 
            ? {_id: id, name: val.name, age: newAge} 
            : val;
      }))
    });
  };

  /** writing a function to update the age END*/



  /** writing a function to delete the user or friend */

  const deleteFriend = (id) => {
    Axios.delete(`https://app-myfriends-backend.herokuapp.com/delete/${id}`).then(() => {
      setListOfFriends(listOfFriends.filter((val)=>{
        return val._id != id;
      }))
    });
  };


  /** writing a function to delete the user or friend END*/



  /** using useEffect --- read data */

  useEffect(() => {
    Axios.get("https://app-myfriends-backend.herokuapp.com/read")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, {}); // so it won't be call infinte amount of times.

  /** using useEffect --- read data END*/



  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Your Friend Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Your Friend Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <button onClick={addFriend}>Add Friend</button>
      </div>

      <div className="listOfFriends">
        {listOfFriends.map((val) => {
          return (
            
            <div className="friendContainer">
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age} </h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                Update
              </button>
              <button id="removeBtn" 
              onClick={() => {
                  deleteFriend(val._id);
                }}
              >
                Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
