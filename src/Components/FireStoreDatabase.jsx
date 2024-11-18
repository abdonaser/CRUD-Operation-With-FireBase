import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../helpers/firebaseConfig";
import TableContent from "./TableContent";

function FireStoreDatabase() {
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

  useEffect(() => {
    getAllDocuments(allCollections[0]);
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
              handleSubmit(collectionName);
            }}
            className="button">
            Submit
          </button>
          <button
            onClick={() => {
              updateUser(collectionName, userId);
            }}
            className="button">
            Update
          </button>
          <button
            onClick={() => {
              deleteUser(collectionName, userId);
            }}
            className="button">
            Delete
          </button>
          <button
            onClick={() => {
              getAllDocuments(collectionName);
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

export default FireStoreDatabase;
