import React, { useRef, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(passwordRef.current.value, passwordConfirmRef.current.value)
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      // console.log(emailRef.current.value, passwordRef.current.value);
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch {
      // console.log(error)
      setError(error, "Failed to create an account");
    }

    setLoading(false);
  }
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <span className="text-danger">
            {auth?.currentUser
              ? `Welcome ${auth?.currentUser?.email} !`
              : `Please Sign In First !`}
          </span>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-100 mb-3"
              type="submit">
              Sign Up
            </Button>
          </Form>
          <Button
            onClick={signInWithGoogle}
            className="w-100 mb-3"
            type="submit">
            Sign In With Google
          </Button>
          <Button onClick={logOut} className="w-100" type="submit">
            Log Out
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">Already have an account?</div>
    </>
  );
}
