import React, { useState, useEffect, useCallback } from "react";
// import 'Compount\login.js';
import "./App.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  const fetchUserProfiles = () => {
    axios.get("http://localhost:8081/api/v1/user-profile").then((res) => {
      console.log(res);
      //  const data =res.data;
      setUserProfiles(res.data);
    });
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return userProfiles.map((userProfile, index) => {
    return (
      <div key={index}>
        {userProfile.userProfileId ? (
          <img
            src={`http://localhost:8081/api/v1/user-profile/${userProfile.userProfileId}/image/download`}
          />
        ) : null}

        {/*todo : profile image*/}
        <br />
        <br />
        <h1>{userProfile.username}</h1>
        <p>{userProfile.userProfileId}</p>
        <MyDropzone {...userProfile} />
        <br />
      </div>
    );
  });
};

function MyDropzone({ userProfileId }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(
        `http://localhost:8081/api/v1/user-profile/${userProfileId}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        console.log("file uploaded Sucessfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        // <p>Drop the files here ...</p> :
        // <p>Drag 'n' drop Profile image, or click to Select Profile Image</p>
        <p class="heading">
          <span>D</span>
          <span>r</span>
          <span>o</span>
          <span>p</span>
          {/* <span class="space"></span> */}
          <span>e</span>
          <span>d</span>
        </p>
      ) : (
        <p class="heading">
          <span>D</span>
          <span>r</span>
          <span>o</span>
          <span>p</span>
          <span class="space"></span>
          <span>h</span>
          <span>e</span>
          <span>r</span>
          <span>e</span>
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <UserProfiles />
    </div>
  );
}

export default App;
