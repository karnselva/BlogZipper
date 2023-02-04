import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import Login from "./screens/Login/Login";
import AllNotes from "./screens/MyNotes/AllNotes";
import Register from "./screens/Register/Register";
import CreateNote from "./screens/Single Note/CreateNote";
import EditNote from "./screens/Single Note/EditNote";
import {Route, Routes} from "react-router-dom"
import {ProtectedRoute, PublicRoute} from "./ProtectedRoute"
import { useState } from "react";
import NotFound from "./screens/NotFound/NotFound";
const categorys=["All","HTML and CSS","JavaScript","Programming","Server Side","Data Analytics"]

function App() {
  const [search,setSearch]=useState("")

  return (
    <>
      <Header setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path="/mynotes" element={<ProtectedRoute><MyNotes search={search} categorys={categorys}/></ProtectedRoute>}/>
        <Route path="/allnotes" element={<ProtectedRoute><AllNotes search={search} categorys={categorys}/></ProtectedRoute>}/>
        <Route path="/createnote" element={<ProtectedRoute><CreateNote /></ProtectedRoute>}/>
        <Route path="/editnote/:id" element={<ProtectedRoute><EditNote/></ProtectedRoute>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      
      
    </>
  );
}

export default App;
