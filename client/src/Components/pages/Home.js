import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl = "http://localhost:8000/employees/";

const Home = () => {

    const [users,setUsers] = useState([]);
    useEffect(()=>{
        
        axios.get(baseUrl).then((response)=>{
            setUsers(response.data.reverse());
            console.log(response.data);
        })
      
    },[]);

    const deleteUser = async (id) =>{
      console.log("Deleted"+id);
      await axios.delete(`http://localhost:8000/employees/delete/${id}`);
      axios.get(baseUrl).then((response)=>{
        setUsers(response.data);
    })
    }

  return (
    <div className='table table-responsive table-striped container my-5 border shadow'>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <td scope="col">Image</td>
      <th scope="col">Age</th>
      <th scope="col">Address</th>
      <th scope="col">Contact No</th>
    </tr>
  </thead>
  <tbody>
  {
      users.map((val,index)=>(
        <tr key={index}>
        <th scope="row">{index+1}</th>
        <td>{val.name}</td>
        <td><img src={`./uploads/${val.empImage}`} alt="" width={100} height={100}/></td>
        <td>{val.age}</td>
        <td>{val.address}</td>
        <td>{val.contactno}</td>
        <td>
            <Link to={"update/"+val._id}><button className='btn btn-outline-warning m-2'>Edit</button></Link>
            <button type="button" onClick={()=>deleteUser(`${val._id}`)} className='btn btn-danger'>Delete</button>

        </td>
        </tr>
      ))
  }
   
    
  </tbody>
</table>
    </div>

  )
}

export default Home