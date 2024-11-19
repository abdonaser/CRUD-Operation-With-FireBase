import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { database } from "../helpers/firebaseConfig";
import TableContent from "./TableContent";
import {
  child,
  get,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import axios from "axios";

function RealtimeDatabase() {
  const allCollections = ["anotherDetails", "usersInfo"];
  const [allUsers, SetAllUsers] = useState([]);
  const [collectionName, setCollectionName] = useState("anotherDetails");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [tableCaption, setTableCaption] = useState("");
  const [loading, setLoading] = useState(false);
  function convertToArray(dataObject) {
    const dataArray = Object.keys(dataObject).map((key) => ({
      ...dataObject[key],
    }));
    return dataArray;
  }

  const getAllDocuments = async () => {
    setLoading(true);
    //' ---------------------------------- First  way {onValue}
    // const dataRef = ref(database, "users");
    // onValue(dataRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log("Data: ", data);
    // });
    //' ---------------------------------- Second  way {get}
    const dataRef = ref(database);
    get(child(dataRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log("snapshot.val() ->", snapshot.val());
          // console.log(
          //   "snapshot.val() Array ->",
          //   convertToArray(snapshot.val())
          // );

          SetAllUsers(convertToArray(snapshot.val()));
        } else {
          console.log("No data available");
          SetAllUsers([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    //' ---------------------------------- By Axios
    // try {
    //   const response = await axios.get(
    //     "https://testfirebase-fc8e4-default-rtdb.firebaseio.com/users.json"
    //   );

    //   if (response.data) {
    //     // Convert the object to an array if needed
    //     const dataObject = response.data;
    //     console.log("convertToArray ->", convertToArray(dataObject));
    //     SetAllUsers(convertToArray(dataObject)); // Set your state with the array
    //   } else {
    //     console.log("No data available");
    //   }
    // } catch (error) {
    //   console.error("Error fetching data: ", error);
    // }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // '-----------------------------By set
    // const userId = uuidv4();
    // set(ref(database, "users/" + userId), {
    //   id: userId,
    //   username: username,
    //   gender: gender,
    // });

    // getAllDocuments();
    // '-----------------------------By axios
    try {
      const userId = uuidv4();
      // Construct the URL for posting data to Firebase
      const url = `https://testfirebase-fc8e4-default-rtdb.firebaseio.com/users/${userId}.json`;

      // Use Axios to send a POST request with the user data
      await axios.put(url, {
        id: userId,
        username: username,
        gender: gender,
      });

      console.log("Data added successfully!");

      // Fetch the updated list of documents
      getAllDocuments();
    } catch (error) {
      console.error("Error adding data: ", error);
    }
    setLoading(false);
  };

  const updateUser = async (userId) => {
    setLoading(true);
    // '---------------------------------- Frist way By Update
    // const dataRef = ref(database, `users/${userId}`);
    // update(dataRef, {
    //   username: username,
    //   gender: gender,
    // })
    //   .then(() => {
    //     console.log("Data updated successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error updating data: ", error);
    //   });
    // getAllDocuments();

    //' -----------------------------By axios
    try {
      // Replace the URL with your Firebase Realtime Database URL
      const url = `https://testfirebase-fc8e4-default-rtdb.firebaseio.com/users/${userId}.json`;

      // Make a PATCH request to update the data
      const response = await axios.patch(url, {
        username: username,
        gender: gender,
        otheInfo: "magnon",
      });

      console.log("Data updated successfully!", response.data);

      // Optionally, you can fetch the updated documents
      getAllDocuments();
    } catch (error) {
      console.error("Error updating data: ", error);
    }
    setLoading(false);
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    //' -------------------------First way by Remove
    // const dataRef = ref(database, `users/${userId}`);
    // remove(dataRef)
    //   .then(() => {
    //     console.log("Data deleted successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting data: ", error);
    //   });

    // getAllDocuments();

    //' ----------------------------second By Axios
    try {
      // Construct the URL to the specific user you want to delete
      const url = `https://testfirebase-fc8e4-default-rtdb.firebaseio.com/users/${userId}.json`;

      // Make the DELETE request using Axios
      await axios.delete(url);

      console.log("Data deleted successfully!");

      // Fetch the updated list of documents
      getAllDocuments();
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
    setLoading(false);
  };

  const setAllToForm = async (user) => {
    setLoading(true);
    setUserId(user.id);
    setUsername(user.username);
    setGender(user.gender);
    setLoading(false);
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <>
      <div className="form">
        <div className="formGroup">
          <label htmlFor="username" className="label">
            Collection Reference:
          </label>
          <select
            id="username"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="select"
            required>
            <option value="">{allCollections[0]}</option>
            {allCollections.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="username" className="label">
            userId:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="username" className="label">
            username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="gender" className="label">
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select"
            required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="button">
            Submit
          </button>
          <button
            onClick={() => {
              updateUser(userId);
            }}
            className="button">
            Update
          </button>
          <button
            onClick={() => {
              deleteUser(userId);
            }}
            className="button">
            Delete
          </button>
          <button
            onClick={() => {
              getAllDocuments();
            }}
            className="button">
            Display All
          </button>
        </div>
      </div>

      <TableContent
        loading={loading}
        tableCaption={tableCaption}
        allUsers={allUsers}
        setAllToForm={setAllToForm}
      />
    </>
  );
}

export default RealtimeDatabase;
