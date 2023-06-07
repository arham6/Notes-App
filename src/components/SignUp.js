import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
function SignUp(props) {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
      e.preventDefault()
      const {name,email,password}=credentials
      const response=await fetch("http://localhost:5000/api/auth/createuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
          },
          body: JSON.stringify({name,email,password})
      })
      const json=await response.json()
      console.log(json)
      if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken)
        navigate('/')
        props.showAlert("account created successfully","success")
      }
      else{
          props.showAlert("invalid credentials","danger")
      }
  }
  const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className='container mt-3'>
      <h2 className='my-2'>Sign Up to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input onChange={onChange} name='name' type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input onChange={onChange} name='email' type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input minLength={5} required onChange={onChange} name='password' type="password" className="form-control" id="password"/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input minLength={5} required onChange={onChange} name='cpassword' type="password" className="form-control" id="cpassword"/>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default SignUp