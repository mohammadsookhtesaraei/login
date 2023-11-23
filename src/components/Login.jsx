

import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { validate } from "../function/validate";
import { ToastContainer } from 'react-toastify';
import { notify } from "./toast";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom"

import styles from "./Login.module.css";

const Login = () => {

    // ref
    const formRef=useRef(null);


  // state data
  const [data, setData] = useState({
    email: "",
    password: "",
    
  });

  //   state errors
  const [errors, setErrors] = useState({});

//   state touch

  const [touch,setTouch]=useState({});

  // changeHandler

  const changeHandler = (event) => {
    const { type, name, value, checked } = event.target;

    const newValue = type === "checkbox" ? checked : value;

    setData((prevData) => ({ ...prevData, [name]: newValue }));
  };

//   touchHandler 
  const touchHandler = (event) => {
    const {name}=event.target;
    setTouch((prevTouch)=> ({...prevTouch,[name]:true}))
  }


//   formHandler

  const formHandler = (event) => {
    event.preventDefault();
      if(!Object.keys(errors).length){
        notify("You singed successfully" ,"success")
        axios.post("https://jsonplaceholder.typicode.com/users",data)
        .then(response => {
            console.log("دیتا با موفقیت ارسال شد",response.data)
        })
        .catch(error => {
            console.error("ارسال دیتا با خطا مواجه شده است بررسی کنید",error)
        })
        formRef.current.reset();
  
        setData({
          email: "",
          password: "",
        
        })
      } else {
        notify("Invalid Dat!" ,"error")
        setTouch({
            email: true,
            password: true,
            
        })
      }
  }

  //   useEffect

  useEffect(() => {
    setErrors(validate(data,"login"));
  }, [data,touch]);

  return (
    <div className={styles.container}>
      <form  ref={formRef} onSubmit={formHandler} className={styles.form}>
        <h1 className={styles.header}>Login</h1>
     
        {/* email */}
        <div className={styles.formBox}>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={changeHandler}
            onFocus={touchHandler}
            placeholder="email"
          />
          {errors.email && touch.email && <span>{errors.email}</span>}
        </div>
        {/* password */}
        <div className={styles.formBox}>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            onFocus={touchHandler}
            placeholder="password"
          />
          {errors.password && touch.password && <span>{errors.password}</span>}
        </div>
        <div className={styles.btn}>
            <button type="submit">Login</button>
        </div>

        <div className={styles.loginBox}>
            <h6>if you do not have a new account register now ?</h6>
            <Link to={"/singup"}>Register</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
