// // src/pages/Auth.jsx

import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import classes from './Signup.module.css';
import { auth } from '../../Utility/firebase';
import ClipLoader from "react-spinners/ClipLoader";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { type } from '../../Utility/action.type';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  const navStateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();
    const action = e.target.name;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError(""); // reset error on new submit

    if (action === 'signin') {
      setLoading({ ...loading, signIn: true });
      try {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });

        setTimeout(() => {
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        }, 1500);
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          setLoading({ ...loading, signIn: false });
        }, 1500);
      }
    } else if (action === 'signup') {
      setLoading({ ...loading, signUp: true });
      try {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });
        setTimeout(() => {
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        }, 1500);
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          setLoading({ ...loading, signUp: false });
        }, 1500);
      }
    }
  };

  return (
    <section className={classes.authContainer}>
      <Link to="/">
        <img
          className={classes.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.signupBox}>
        <h1>Sign-in</h1>

        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{error}</p>
          )}

          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            disabled={loading.signIn}
          >
            {loading.signIn ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's{' '}
          <Link to="#">Conditions of Use</Link> and{' '}
          <Link to="#">Privacy Notice</Link>.
        </p>

        <button
          type="button"
          name="signup"
          onClick={authHandler}
          disabled={loading.signUp}
        >
          {loading.signUp ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            "Create your Amazon account"
          )}
        </button>

        <Link to="/signin" style={{ marginTop: "10px", display: "block" }}>
          Already have an account? Sign in
        </Link>
      </div>
    </section>
  );
}

export default Auth;
