import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Signup.module.css';
import { auth } from '../../Utility/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { DataContext } from '../../Componets/DataProvider/DataProvider';
import { type } from '../../Utility/action.type';
function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [{user},dispatch]=useContext(DataContext)
console.log(user)
  const authHandler = async (e) => {
  e.preventDefault();
  const action = e.target.name;
  console.log(action);

  if (action === 'signin') {
    signInWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });
      })
      .catch((err) => {
        setError(err.message);
      });

  } else if (action === 'signup') {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });
      })
      .catch((err) => {
        setError(err.message);
      });
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
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

          <button type="submit" name="signin" onClick={authHandler}>
            Sign In
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's{' '}
          <Link to="#">Conditions of Use</Link> and{' '}
          <Link to="#">Privacy Notice</Link>.
        </p>

        <button type="button" name="signup" onClick={authHandler}>
          Create your Amazon account
        </button>

        <Link to="/signin">Already have an account? Sign in</Link>
      </div>
    </section>
  );
}

export default Auth;
