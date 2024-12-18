import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Signup() {
    const [credendtials, setcredendtials] = useState({name:"",email:"",password:"",geolocation:""});
    let [address, setAddress] = useState("");
    const navigate = useNavigate();
    const baseUrl = "https://aahar-backend-1.onrender.com/";

    const handleClick = async (e) => {
        e.preventDefault();
        let navLocation = () => {
          return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
          });
        }
        let latlong = await navLocation().then(res => {
          let latitude = res.coords.latitude;
          let longitude = res.coords.longitude;
          return [latitude, longitude]
        })
        console.log(latlong)
        let [lat, long] = latlong
        const response = await fetch(`${baseUrl}api/auth/getlocation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ latlong: { lat, long } })
    
        });
        const { location } = await response.json()
        setAddress(location);
        setcredendtials({ ...credendtials, [e.target.name]: location })
      }
    
    const handleSubmit = async(e)=>{
         e.preventDefault();
         const response = await fetch(`${baseUrl}api/auth/createuser`,{
            method:'POST',
            headers:{
                  'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name : credendtials.name,email:credendtials.email,
                password:credendtials.password,location:credendtials.geolocation
            })
         });
         const json = await response.json()
         if(!json.success){
            alert("Enter Valid Data");
         }
         else{
          alert("Successfully Signed Up! Now redirecting to Login page");
      // Navigate to the login page
      navigate("/login");
         }
    }
    const onChange = (event)=>{
        setcredendtials({...credendtials,[event.target.name]:event.target.value})
    }
    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
        <div>
        <Navbar />
        </div>
  
          <div className='container' >
            <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
              <div className="m-3">
                <label htmlFor="name" className="form-label" style={{ color: "MediumSeaGreen" }}>Name</label>
                <input type="text" className="form-control" name='name' value={credendtials.name} onChange={onChange} aria-describedby="emailHelp" />
              </div>
              <div className="m-3">
                <label htmlFor="email" className="form-label" style={{ color: "MediumSeaGreen" }}>Email address</label>
                <input type="email" className="form-control" name='email' value={credendtials.email} onChange={onChange} aria-describedby="emailHelp" />
              </div>
              <div className="m-3">
                <label htmlFor="address" className="form-label" style={{ color: "MediumSeaGreen" }}>Address</label>
                <fieldset>
                  <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
                </fieldset>
              </div>
              <div className="m-3">
                <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
              </div>
              <div className="m-3">
                <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: "MediumSeaGreen" }}>Password</label>
                <input type="password" className="form-control" value={credendtials.password} onChange={onChange} name='password' />
              </div>
              <button type="submit" className="m-3 btn btn-success">Submit</button>
              <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
            </form>
          </div>
        </div>
    )
}
