import React from 'react'
import {Accordion, Badge, Button,Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {deleteNotesAction} from "../action/NoteAction"
export default function Accord({note,isUser=true}) {

    const{title,category,content,user}=note
    console.log(user.name,"username")
    const id=note._id
    const userLogin= useSelector(state => state.userLogin)
    const {accessToken}=userLogin.userInfo
 
    const dispatch=useDispatch()
    const deleteHandler=(id) =>{
      if (window.confirm("Are You Sure?")){
        console.log(accessToken,'aaatoken')
              dispatch(deleteNotesAction(accessToken,id))
              /*const options={
                method:"delete",
                headers:{
                  Authorization:`Bearer ${accessToken}`
                }
              }
              fetch(`http://localhost:5000/api/note/delete/${id}`,options)
              .then((response)=>response.json())
              .then((message)=>{
                console.log(message)
                window.location.reload();
  
              })
              .catch(err=>
                console.log(err))*/
            
      }
    }
    
  return (
    <Accordion >
         <Card style={{margin:"10px"}}>
          <Card.Header style={{display:"flex",justifyContent:"space-between"}}>
          
            <span
            style={{
              flex:1,
              alignSelf:"center",
              color:"black",
              fontSize:18,
              cursor:"pointer"
            }}
            >
            <Accordion.Toggle eventKey="0" variant="link" as={Card.Text}>{title}</Accordion.Toggle></span>
            {isUser && <div>
            <Link to={`/editnote/${id}`}><Button>Edit</Button></Link>
              
              <Button variant='danger' onClick={() => deleteHandler(id)} className="mx-2">Delete</Button>
            </div>}
          </Card.Header>
          <Accordion.Collapse eventKey='0'>
          <Card.Body>
          <h4>
            <Badge variant='success'>
              category: {category}
            </Badge> 
            <Badge variant='warning' className='mx-2'>
              Author: {user.name}
            </Badge>
          </h4>
        <blockquote className="blockquote mb-0">
          <p>
          { content && <span dangerouslySetInnerHTML={{__html:content}}>
             
            </span>}
          
          </p>
          <footer className="blockquote-footer">
          created on  {note.createdAt.substring(0, 10)}
          </footer>
        </blockquote>
      </Card.Body>
      </Accordion.Collapse>
        </Card>
        </Accordion>
  )
}
