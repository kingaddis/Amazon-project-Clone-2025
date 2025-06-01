import React, { useState,useContext } from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
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
  const [loading,setLoading]=useState({
    signIn:false,
    signUp:false
  })
  const navigate=useNavigate()
  const [{user},dispatch]=useContext(DataContext)

  const navigation = useNavigate();
  const navStateData = useLocation()
  console.log(navStateData)

// console.log(user)
  const authHandler = async (e) => {
  e.preventDefault();
  const action = e.target.name;
  // console.log(action);

  if (action === 'signin') {
    setLoading({...loading,signIn:true})
signInWithEmailAndPassword(auth, email, password)
  .then((userInfo) => {
    dispatch({
      type: type.SET_USER,
      user: userInfo.user,
    });

    // Delay turning off spinner by 1.5 seconds
    setTimeout(() => {
      setLoading({ ...loading, signIn: false });
    }, 1500);
    navigate(navStateData?.state?.redirect || "/");
  })
  .catch((err) => {
    setError(err.message);

    // Delay turning off spinner by 1.5 seconds
    setTimeout(() => {
      setLoading({ ...loading, signIn: false });
    }, 1500);
  });
} else if (action === 'signup') {
  setLoading({ ...loading, signUp: true });

  createUserWithEmailAndPassword(auth, email, password)
    .then((userInfo) => {
      dispatch({
        type: type.SET_USER,
        user: userInfo.user,
      });

      // Delay hiding spinner
      setTimeout(() => {
        setLoading({ ...loading, signUp: false });
      }, 1500); // 1.5 seconds delay
      navigate(navStateData?.state?.redirect || "/");
    })
    .catch((err) => {
      setError(err.message);

      // Delay hiding spinner
      setTimeout(() => {
        setLoading({ ...loading, signUp: false });
      }, 1500);
    });
}
  }
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

        {
          navStateData?.state?.msg && (<small
            style={{
              padding:"5px",
              textAlign:"center",
              color:"red",
              fontWeight:"bold",
            }}
            >
              {navStateData?.state?.msg}
            </small>
          )
        }
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

  

        <button type="submit" name="signin" onClick={authHandler} disabled={loading.signIn}>
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

<button type="button" name="signup" onClick={authHandler} disabled={loading.signUp}>
  {loading.signUp ? (
    <ClipLoader color="#ffffff" size={20} />
  ) : (
    "Create your Amazon account"
  )}
</button>
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <Link to="/signin">Already have an account? Sign in</Link>
      </div>
    </section>
  );
}

export default Auth;
