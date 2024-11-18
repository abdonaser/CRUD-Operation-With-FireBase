import { ColorRing } from "react-loader-spinner";

function TableContent({ tableCaption, loading, allUsers, setAllToForm }) {
  return (
    <div>
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
    </div>
  );
}

export default TableContent;
