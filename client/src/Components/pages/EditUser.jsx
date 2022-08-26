import React, { useEffect, useState } from 'react';
import { useNavigate , useParams  } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);
  const [user,setUser] = useState({
      name:'',
      age:'',
      address:'',
      contactno:'',
  });

  const [empImage,setEmpImage]=useState("");

        const onChangeFile = (e) =>{
            setEmpImage(e.target.files[0]);
        }


  const onInputChange = ((event)=>{
      console.log(event.target.value);
      const value = event.target.value;
      const name = event.target.name;

      setUser({
          ...user,
          [name]:value
      })
  });

  useEffect(()=>{
    axios.get(`http://localhost:8000/employees/emp/${id}`).then((response)=>{
      setUser(response.data);
      setEmpImage(response.data);
      console.log(response.data);
     })
  },[])

  const submitUser = async e=>{
      e.preventDefault();

      
      const formData = new FormData();

      formData.append("name",name);
      formData.append("age",age);
      formData.append("address",address);
      formData.append("contactno",contactno);
      formData.append("empImage",empImage);

      await axios.put(`http://localhost:8000/employees/update/${id}`,formData);
      console.log('Employee successfully updated')
      navigate('/');
  }


  console.log(user);
  const {name,age,address,contactno} = user; //array destructuring
return (
  <div className='container'>
      <h2 className='text-center'>Update Employee</h2>
       <div className='row d-flex justify-content-center my-5'>
           <div className='col-sm-4 p-3 form-group shadow'>
           <form onSubmit={(e)=>submitUser(e)} encType="multipart/form-data">
              <input className='form-control' value={name} onInput={(e)=>onInputChange(e)} type="text" placeholder='Name' name="name"/>
              <br/>
              <input className='form-control' type="text" value={age} onInput={(e)=>onInputChange(e)}placeholder='Age' name="age"/><br/>
              <input className='form-control' type="text" value={address} onInput={(e)=>onInputChange(e)}placeholder='Address' name="address"/><br/>
              <input className='form-control' type="text" value={contactno} onInput={(e)=>onInputChange(e)} placeholder='Contact No' name="contactno"/><br/>
              <br/>
              <label htmlFor='file'>Choose Employee Image</label>
                    <input type="file" filename="empImage" className='form-control-file' onChange={onChangeFile}/>
              <button type="submit" className='btn btn-outline-success' >Update User</button>
              </form>
           </div>
       </div>   
  </div>
)
}

export default EditUser;