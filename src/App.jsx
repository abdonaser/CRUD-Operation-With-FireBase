import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./helpers/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { setUserId } from "firebase/analytics";
import { ColorRing } from "react-loader-spinner";
function App() {
  const allCollections = ["anotherDetails", "usersInfo"];
  const [allUsers, SetAllUsers] = useState([]);
  const [collectionName, setCollectionName] = useState("anotherDetails");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [tableCaption, setTableCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllDocuments = async (collectionName) => {
    setLoading(true);
    const collectionRef = collection(db, collectionName);
    const getAllDocs = await getDocs(collectionRef);
    const allDocuments = getAllDocs.docs.map((doc) => doc.data());
    SetAllUsers(allDocuments);
    setTableCaption(collectionName);
    setLoading(false);
  };

  const handleSubmit = async (collectionName) => {
    setLoading(true);
    const userId = uuidv4();
    await setDoc(doc(db, collectionName, userId), {
      id: userId,
      username: username,
      gender: gender,
    });
    getAllDocuments(collectionName);
    setLoading(false);
  };

  const updateUser = async (collectionName, userId) => {
    setLoading(true);
    const userDocRef = doc(db, collectionName, userId);
    await updateDoc(userDocRef, {
      id: userId,
      username: username,
      gender: gender,
    });
    getAllDocuments(collectionName);
    setLoading(false);
  };
  const deleteUser = async (collectionName, userId) => {
    setLoading(true);
    await deleteDoc(doc(db, collectionName, userId));
    getAllDocuments(collectionName);
    setLoading(false);
  };

  const setAllToForm = async (user) => {
    setLoading(true);
    setUserId(user.id);
    setUsername(user.username);
    setGender(user.gender);
    setLoading(false);
  };
  const styles = {
    form: {
      maxWidth: "80%",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    formGroup: {
      marginBottom: "15px",
      width: "100%",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      textAlign: "left",
      fontSize: "15px",
    },
    input: {
      width: "100%",
      padding: "10px",
      boxSizing: "border-box",
      borderRadius: "4px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
      transition: "border-color 0.3s",
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
      transition: "border-color 0.3s",
    },
    button: {
      padding: "15px  30px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
  };

  useEffect(() => {
    getAllDocuments(allCollections[0]);
  }, []);

  return (
    <>
      <div style={{ ...styles.form, width: "80%" }}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Collection Reference:
          </label>
          <select
            id="username"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            style={styles.select}
            required>
            <option value="">{allCollections[0]}</option>
            {allCollections.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            userId:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="gender" style={styles.label}>
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={styles.select}
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
              handleSubmit(collectionName);
            }}
            style={styles.button}>
            Submit
          </button>
          <button
            onClick={() => {
              updateUser(collectionName, userId);
            }}
            style={styles.button}>
            Update
          </button>
          <button
            onClick={() => {
              deleteUser(collectionName, userId);
            }}
            style={styles.button}>
            Delete
          </button>
          <button
            onClick={() => {
              getAllDocuments(collectionName);
            }}
            style={styles.button}>
            Display All
          </button>
        </div>
      </div>
      <div className="table-container">
        <table style={{ position: "relative" }} className="user-table">
          <caption>{tableCaption}</caption> {/* Caption added here */}
          <thead>
            <tr>
              <th>UserID</th>
              <th>UserName</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            )}
            {allUsers.map((user) => (
              <tr key={user.userID} onClick={() => setAllToForm(user)}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
