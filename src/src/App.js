import logo from "./logo.svg";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { auto } from "@popperjs/core";

import axios from "axios";

//State stuff
import React, { useState } from "react";

async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", description);

  const result = await axios.post("http://localhost:5000/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

function App() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: selectedFile, description: name });
    console.log(result);
    setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="App">
      <Container fluid className="container-fluid">
        <Container
          className="content container"
          style={{ textAlign: "center" }}
        >
          <form onSubmit={submit}>
            <h1 style={{ marginBottom: "3vh" }}>
              Upload a photo to the server!
            </h1>
            <Row>
              <Col style={{ textAlign: "center", margin: auto }}>
                <Col>
                  <label>
                    <h6 style={{ textDecoration: "underline" }}>Description</h6>
                  </label>
                </Col>
                <Col>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Col>
            </Row>

            <Row>
              <Col
                style={{
                  textAlign: "center",
                  marginLeft: "4vw",
                  marginTop: "5vh",
                }}
              >
                <input type="file" accept="image/*" onChange={fileSelected} />
              </Col>
            </Row>
            <Col style={{ marginTop: "2vh" }}>
              <Button
                type="submit"
                variant="secondary"
                style={{ marginTop: "1vh" }}
              >
                Submit
              </Button>
            </Col>
          </form>
        </Container>
      </Container>
    </div>
  );
}

export default App;
// import { useState } from "react";
// import axios from "axios";

// import "./App.css";

// async function postImage({ image, description }) {
//   const formData = new FormData();
//   formData.append("image", image);
//   formData.append("description", description);

//   const result = await axios.post("http://localhost:5000/upload", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return result.data;
// }

// function App() {
//   const [file, setFile] = useState();
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);

//   const submit = async (event) => {
//     event.preventDefault();
//     const result = await postImage({ image: file, description });
//     setImages([result.image, ...images]);
//   };

//   const fileSelected = (event) => {
//     const file = event.target.files[0];
//     setFile(file);
//   };

//   return (
//     <div className="App">
//       <form onSubmit={submit}>
//         <input onChange={fileSelected} type="file" accept="image/*"></input>
//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           type="text"
//         ></input>
//         <button type="submit">Submit</button>
//       </form>

//       {images.map((image) => (
//         <div key={image}>
//           <img src={image}></img>
//         </div>
//       ))}

//       <img src="/images/9fa06d3c5da7aec7f932beb5b3e60f1d"></img>
//     </div>
//   );
// }

// export default App;
