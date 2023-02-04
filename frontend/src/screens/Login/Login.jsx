import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ErrorMessage from "../../components/ErrorMessage"
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import "./Login.css"
import {userLoginAction} from "../../action/UserAction"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
export default function Login({ history }) {
  const[email,setEmail]=useState("")
  const dispatch=useDispatch()
  const[password,setPassword]=useState("")
  
  const navigate=useNavigate()

  const userLogin=useSelector(state=>state.userLogin)
  const{loading,userInfo,error}=userLogin
  console.log("userInfo IN LOGIN COMPONENT",userInfo)
  const formHandler= async (e)=>{
    e.preventDefault()
    console.log(email,password)
    const data={email,password}
    dispatch(userLoginAction(data))
  }
  useEffect(()=>{
    if(userInfo){
       navigate("../allnotes")
    }
  },[userInfo])
 
  return (
    <>
      <MainScreen title="LOGIN">
        <div className='login-container'>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading/>}
            <Form onSubmit={formHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                </Form.Group>

                <Button variant='primary' type='sumbit'>sumbit</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New User ? <Link to="/register">Register Here</Link>
                </Col>
            </Row>
        </div>

      </MainScreen>
    </>
  )
}
