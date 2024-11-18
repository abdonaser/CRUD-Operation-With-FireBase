import { useState } from "react";
import "./App.css";
import FireStoreDatabase from "./Components/FireStoreDatabase";
import RealtimeDatabase from "./Components/RealtimeDatabase";

function App() {
  const [type, setType] = useState("fireStoreDataBase");
  const [active, setActive] = useState("fireStoreDataBase");
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "5px",
            width: "50%",
            margin: "auto",
            fontSize: "20px",
          }}>
          <button
            style={{
              fontSize: "18px",
              borderRadius: "20px",
              backgroundColor: `${
                active == "fireStoreDataBase" ? "red" : "#4caf50"
              }`,
            }}
            className="button"
            onClick={() => {
              setType("fireStoreDataBase");
              setActive("fireStoreDataBase");
            }}>
            FireStoreDatabase
          </button>
          <button
            style={{
              fontSize: "18px",
              borderRadius: "20px",
              backgroundColor: `${
                active == "realtimeDatabase" ? "red" : "#4caf50"
              }`,
            }}
            className="button"
            onClick={() => {
              setType("realtimeDatabase");
              setActive("realtimeDatabase");
            }}>
            RealTime DataBase
          </button>
        </div>

        {type == "fireStoreDataBase" ? (
          <FireStoreDatabase />
        ) : (
          <RealtimeDatabase />
        )}
      </div>
    </>
  );
}

export default App;
