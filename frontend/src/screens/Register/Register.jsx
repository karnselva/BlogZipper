import React,{useState,useEffect} from 'react'
import MainScreen from '../../components/MainScreen'
import ErrorMessage from "../../components/ErrorMessage"
import Loading from '../../components/Loading'
import { Button, Form} from 'react-bootstrap'
import {useNavigate}  from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {userRegisterAction} from "../../action/UserAction"

export default function Register() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[confirmpassword,setConfirmPassword]=useState("")
  const[name,setName]=useState("")
  const[pic,setPic]=useState()
  const[message,setMessage]=useState(null)
  const[picMessage,setPicMessage]=useState(null)

  const dispatch=useDispatch()
  const userRegister=useSelector(state=>state.userRegister)
  const{loading,userInfo,error}=userRegister

  console.log(userInfo,"registerUser")
  const navigate=useNavigate()
  useEffect(()=>{
    if(userInfo){
       navigate("../login")
    }
  },[userInfo,navigate])


  const picDetails=(picInfo)=>{
     
     if (picInfo.type==="image/jpeg" || "image/png"){
            
             const data=new FormData()
             data.append("file",picInfo)
             data.append("upload_preset","notezipper")
             data.append("cloud_name","dzd1elpnb")
             fetch("https://api.cloudinary.com/v1_1/dzd1elpnb/image/upload",{
              method:"post",
              body:data
            }).then((res)=>res.json()).then((data)=>setPic(data.url.toString()))
            .catch((err)=>setPicMessage(err))
     }
     else{
      setPicMessage("upload image")
     }
     
  }

 const formHandler= async(e)=>{
  e.preventDefault()
  if (password!==confirmpassword){
    setMessage("Password Do Not Match")
  }
  else{
    setMessage(null)
    const registerData={
      email,
      name,
      password,
      pic
    }
    //console.log(registerData)
    dispatch(userRegisterAction(registerData))
    
    
    

  }
  
 }



  return (
    
       <MainScreen title="LOGIN">
        <div className='login-container'>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            {picMessage && <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>}
            {loading && <Loading/>}
            <Form onSubmit={formHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control  type="text" value={name}  onChange={(e)=>setName(e.target.value)} placeholder="Enter name"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={confirmpassword}  onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="confirm Password"/>
                </Form.Group>
                <Form.Group controlId="pic">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.File
              onChange={(e)=>picDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              accept='image/*'
              custom
            />
          </Form.Group>                

                <Button variant='primary' type='sumbit'>Register</Button>
            </Form>
        </div>
        </MainScreen>
      
    
  )
}
