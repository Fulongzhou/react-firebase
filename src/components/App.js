import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import { Col, Container, Button } from "react-bootstrap";
import { db, auth, storage } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  //new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState(0);
  const [isActionMovie, setIsActionMovie] = useState(false);

  // update Title State
  const [updateTitle, setUpdateTitle] = useState("");

  //File upload state
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");
  // console.log(moviesCollectionRef);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseyear: newReleaseYear,
        actionMovie: isActionMovie,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);
    } catch (err) {
      console.error(err);
    }
  };
  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc, { title: updateTitle });
    } catch (err) {
      console.error(err);
    }
  };
  const uploadeFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getMovieList = async () => {
      //read the data, set the movie list
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, [onSubmitMovie]);

  return (
    <Container
      className="d-flex align-item-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100 " style={{ maxWidth: "400px" }}>
        <div className="w-100 mb-3">
          <Auth />
        </div>
        <div className="w-100 mb-3" style={{ maxWidth: "400px" }}>
          <input
            placeholder="Moive title..."
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <input
            placeholder="Release Year..."
            onChange={(e) => setNewReleaseYear(Number(e.target.value))}
          />
          <br />
          <input
            type="checkbox"
            checked={isActionMovie}
            onChange={(e) => setIsActionMovie(e.target.checked)}
          />
          <label>Action Movie</label>
          <br />
          <Button onClick={onSubmitMovie}>Submit Movie</Button>
        </div>
        <div>
          {movieList.map((movie) => (
            <div>
              <Col key={movie.id} className="text-right mb-3">
                <h1 style={{ color: movie.actionMovie ? "green" : "red" }}>
                  Movie Title: {movie.title}
                </h1>
                <p>Realse Date: {movie.releaseyear}</p>
                <Button className="mb-2" onClick={() => deleteMovie(movie.id)}>
                  Delete Movie
                </Button>
                <br />
                <input
                  placeholder="new title..."
                  onChange={(e) => setUpdateTitle(e.target.value)}
                />
                <button onClick={() => updateMovie(movie.id)}>
                  Update Title
                </button>
              </Col>
            </div>
          ))}
        </div>
        <div>
          <input
            className="mb-2"
            type="file"
            onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <Button className="mb-5" variant="primary" onClick={uploadeFile}>
            Upload File
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default App;
