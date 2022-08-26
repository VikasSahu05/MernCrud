import axios from 'axios';
import React, { useEffect, useState } from 'react';
const AddUser = () => {
        // const navigate = useNavigate();
        const initialValue = {name:"",age:"",address:"",contactno:""};
        const [formValue,setFormValue] = useState(initialValue);

        const [formErrors,setFormErrors] = useState({});
        const [isSubmit,setIsSubmit] = useState(false);
        
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
            
                setFormValue({
                    ...formValue,[name]:value
                });

        });

        const submitUser = async e=>{
            e.preventDefault();
            setFormErrors(validate(formValue));
            setIsSubmit(true);

            const formData = new FormData();

            formData.append("name",name);
            formData.append("age",age);
            formData.append("address",address);
            formData.append("contactno",contactno);
            formData.append("empImage",empImage);

            await axios.post("http://localhost:8000/employees/add",formData);
            
        }

        useEffect(()=>{
            console.log(formErrors)
            if(Object.keys(formErrors).length === 0 && isSubmit){
                console.log(formValue);
            }
        },[formErrors])

        const validate = (value)=>{
            const errors = {}
            const regex = /^[a-zA-Z '.-]*$/i;
            // const regexContact = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
            if(!value.name){
                errors.name = "Name is Required!";
            }else if(!regex.test(value.name)){
                errors.name = "This is not a valid name!";
            }
            if(!value.age){
                errors.age = "Age is Required!";
            }
            if(!value.address){
                errors.address = "Address is Required!";
            }else if(!regex.test(value.address)){
                errors.address = "This is not a valid address!";
            }
            if(!value.contactno){
                errors.contactno = "Contact no is Required!";
            }else if(value.contactno.length > 10){
                errors.contactno = "Please enter 10 digit contact no !";
            }else if(value.contactno.length < 10){
                errors.contactno = "Please enter 10 digit contact no !";
            }
            return errors;
        };

        const {name,age,address,contactno} = user; //array destructuring
 
    return (
        <div className='container'>
            <h2 className='text-center'>Add Employee</h2>
            <div className='row d-flex justify-content-center my-5'>
                <div className='col-sm-4 p-3 form-group shadow'>
                <form onSubmit={(e)=>submitUser(e)} encType="multipart/form-data">
                {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='text-success'>Employee Added successfully</div>):(<></>)}
                    <input className='form-control' value={formValue.name} onInput={(e)=>onInputChange(e)} type="text" placeholder='Name' name="name"/>
                    <span className='text-danger'>{formErrors.name}</span>
                    <br/>
                    <input className='form-control' type="text" value={formValue.age} onInput={(e)=>onInputChange(e)}placeholder='Age' name="age"/>
                    <span className='text-danger'>{formErrors.age}</span>
                    <br/>
                    <input className='form-control' type="text" value={formValue.address} onInput={(e)=>onInputChange(e)}placeholder='Address' name="address"/>
                    <span className='text-danger'>{formErrors.address}</span>
                    <br/>
                    <input className='form-control' type="text" value={formValue.contactno} onInput={(e)=>onInputChange(e)} placeholder='Contact No' name="contactno"/>
                    <span className='text-danger'>{formErrors.contactno}</span>
                    <br/>

                    <label className='mt-2' htmlFor='file'>Choose Employee Image</label>
                    <input type="file" filename="empImage" className='mb-2 form-control-file' onChange={onChangeFile}/>

                    <button type="submit" className='btn btn-outline-success' >Add</button>
                    </form>
                </div>
            </div>   
        </div>
    )
}

export default AddUser;