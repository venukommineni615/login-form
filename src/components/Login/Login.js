import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailReducer=(state,action)=>{
    switch(action.type){
      case "INPUT-VALUE":
        return {value:action.val,validity:action.val.includes("@")}
      case "INPUT-VALIDITY":
        return {value:state.value,validity:state.value.includes('@')}
      default:
        return state
    }
}
const passwordReducer=(state,action)=>{
    switch(action.type){
      case "INPUT-VALUE":
        return {value:action.val,validity:action.val.trim().length>6}
      case "INPUT-VALIDITY":
        return {value:state.value,validity:state.value.trim().length>6}
      default:
        return state
    }
}
const collegeReducer=(state,action)=>{
    switch(action.type){
      case "INPUT-VALUE":
        return {value:action.val,validity:action.val.trim().length>2}
      case "INPUT-VALIDITY":
        return {value:state.value,validity:state.value.trim().length>2}
      default:
        return state
    }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',validity:null})
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',validity:null})
  const [collegeState,dispatchCollege]=useReducer(collegeReducer,{value:'',validity:null})
  
  useEffect(() => {
      const set = setTimeout(() => {
      setFormIsValid(
        emailState.validity && passwordState.validity && collegeState.validity
      );
    }, 100);
  
    return () => {
      console.log('Cleanup function');
      clearTimeout(set);
     
    };
  }, [emailState.value, passwordState.value, collegeState.value]);
  
  const emailHandler=(event)=>{
    dispatchEmail({type:"INPUT-VALUE",val:event.target.value})
  }
  const passwordHandler=(event)=>{
    dispatchPassword({type:"INPUT-VALUE",val:event.target.value})
  }
  const collegeHandler=(event)=>{
    dispatchCollege({type:"INPUT-VALUE",val:event.target.value})
  }
  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT-VALIDITY"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"INPUT-VALIDITY"})
  };
  const validateCollegeHandler = () => {
    dispatchCollege({type:"INPUT-VALIDITY"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value,collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.validity === false ? classes.invalid : ''
          }`}
        >
          
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
           onChange={emailHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeState.validity === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College:</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.validity === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordHandler}
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
