import { useEffect } from "react";
import {Container, Form,FormControl,Nav,Navbar,NavDropdown,} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";

import { logoutAction } from "../../action/UserAction";

export default function Header(props) {
  
  const {setSearch}=props
  const userLogin=useSelector(state => state.userLogin)
  const {userInfo}=userLogin
 
  const dispatch=useDispatch()
  useEffect(() => {}, [userInfo]);
  


  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" >
    <Container>
      <Navbar.Brand >
        <Link to="/">Tech Blog</Link>
           
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto">
          
        { userInfo && <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e)=>setSearch(e.target.value)}
              />
            </Form>}
         
        </Nav>
        <Nav>
          
            <>
              { userInfo && <Nav.Link href="/allnotes">All Blog</Nav.Link>}
              { userInfo && <Nav.Link href="/mynotes">My Blog</Nav.Link>}

              <Nav.Link href="/login">{ userInfo ? `${userInfo.user.name}` : "login"}</Nav.Link>
              {userInfo && <NavDropdown
                
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">
                  { <img
                    alt=""
                    src={`${userInfo.user.pic}`}
                    width="25"
                    height="25"
                    style={{ marginRight: 10 }}
                  /> }
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={()=>{
                  dispatch(logoutAction())
                  
               
                  }} >
                  Logout
                </NavDropdown.Item>
               
              </NavDropdown>}
            </>
        
            
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
