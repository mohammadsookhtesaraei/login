import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { validate } from "../function/validate";
import { ToastContainer } from 'react-toastify';
import { notify } from "./toast";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom"
import styles from "./SingUp.module.css";


const SingUp = () => {

    // ref
    const formRef=useRef(null);


  // state data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    check: false,
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
        notify("successfully" ,"success")
        axios.post("https://jsonplaceholder.typicode.com/users",data)
        .then(response => {
            console.log("دیتا با موفقیت ارسال شد",response.data)
        })
        .catch(error => {
            console.error("ارسال دیتا با خطا مواجه شده است بررسی کنید",error)
        })
        formRef.current.reset();
  
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          check: false,
        })
      } else {
        notify("Invalid Dat!" ,"error")
        setTouch({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
            check: true,
        })
      }
  }

  //   useEffect

  useEffect(() => {
    setErrors(validate(data,"singUp"));
  }, [data,touch]);

  return (
    <div className={styles.container}>
      <form  ref={formRef} onSubmit={formHandler} className={styles.form}>
        <h1 className={styles.header}>registration form</h1>
        {/* name */}
        <div className={styles.formBox}>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={changeHandler}
            onFocus={touchHandler}
            placeholder="name"
          />
          {errors.name && touch.name && <span>{errors.name}</span>}
        </div>
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
        {/* confirmPassword */}
        <div className={styles.formBox}>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={changeHandler}
            onFocus={touchHandler}
            placeholder="confirmPassword"
          />
          {errors.confirmPassword && touch.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        {/* checkbox */}
        <div className={styles.checkBox}>
            <div>
          <label htmlFor="accept">I accept terms & conditions</label>
          <input
            type="checkbox"
            id="accept"
            name="check"
            value={data.check}
            onChange={changeHandler}
          />

            </div>
          {errors.check && <span>{errors.check}</span>}
        </div>
        <div className={styles.btn}>
            <button type="submit">register now</button>
        </div>

        <div className={styles.loginBox}>
            <h6>Do you already have an account ?</h6>
            <Link to={"/login"}>Login</Link>

        </div>
        
      </form>
      <ToastContainer />
    </div>
  );
};

export default SingUp;
