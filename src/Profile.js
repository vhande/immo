import React, { useEffect, useState, useContext } from 'react'
import Token from './Context/Token'

function Profile() {
    const [err,setErr] = useState("")
    const context = useContext(Token)
    const validate = ()  => {
        fetch('http://localhost:4000/profile',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
    
        body:JSON.stringify({
          "token": localStorage.getItem("token")
        })
    })
    .then(res=>res.json())
        .then(data => {
          if (data.error) {
            setErr(data.error)
            localStorage.removeItem("token")
            context.setToken(null)
          }
        })
    }
    useEffect(()=> {   
        validate()
    },[])
  return (
    <>
    {err == "" ? <h1 className="m-5">Welcome {context.firstname} </h1> : <h1>{err}</h1>} 
    </>
  )
}

export default Profile