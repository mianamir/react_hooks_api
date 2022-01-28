import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state, action) => {

  // using this reducer we cab group the multiple states of email here

  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')}; // check valid/val
  }


  if (action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};
  }

  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {

  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6}; // check valid/val
  }


  if (action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6};
  }

  return {value: '', isValid: false};

};






const Login = (props) => {
  // because we are using useReducer then remove these separate states 
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // for managing the complex state use the useReducer
  const [emailState, dispatchEmail] = useReducer(
    emailReducer, 
    {value: '', 
    isValid: null
    }
    );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer, 
    {value: '', 
    isValid: null
    }
    );

  // useEffect( () => {
  //   console.log('EFFECT IS RUNNING!');

  //   // cleanup 
  //   return () => {
  //     console.log('CLEAN UP!');
  //   };
  // }, [enteredPassword]); // with no dependencies will run only once when component will load 1st time
  
  
  // extracting the state from the objects 
  const {isValid: emailValid} = emailState; 
  const {isValid: passwordValid} = passwordState;


  useEffect( () => {

    const timeoutIdentifier = setTimeout( () => {

      console.log('Checking form validity...');

      setFormIsValid(
        emailValid && passwordValid
      );

    }, 500);

    // cleanup function 
    return () => {
      console.log('CLEANUP...');
      // clear the timeout using default browser function
      clearTimeout(timeoutIdentifier);
    };
    
  }, [emailValid, passwordValid]);


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({
      type: 'USER_INPUT', 
      val: event.target.value
    });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({
      type: 'USER_INPUT', 
      val: event.target.value
    });

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);

    dispatchEmail({type: 'INPUT_BLUR'});

  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({type: 'INPUT_BLUR'});

  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
