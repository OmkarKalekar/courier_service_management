import { useEffect, useState } from "react";
import { GetEmployeeDetailsAPI, UpdateEmployeeDetailsAPI } from "../Services/AdminService";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Update({id, updateData, toggleComponent}) {

  var [user, setUser] = useState({first_name: "", last_name: "", email:"", address: "", mobile: "", status:""});


  const navigate = useNavigate();
    


    const user_id = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("token");
    const data = {
      user_id : user_id,
      token :token
    }
  





    useEffect (() =>{
      GetEmployeeDetails();
    },[id])

    const onTextChange = (args) =>{
        var copy = {...user};
        copy[args.target.name] = args.target.value;
        setUser(copy);
    }

    const GetEmployeeDetails = async() =>{
      debugger;
      let response = await GetEmployeeDetailsAPI(id,data);
      if(response.status == 200){
        if(response.data == "EXPIRED" || response.data == "INVALID"){
          navigate("/login");
          toast.warning("Session Time Expired");
        }
        else{
          setUser(response.data);
        }
      }else{
        toast.error('Error while getting employee details')
      }
    }


    const UpdateEmployeeDetails = async() =>{
        debugger;
        let response = await UpdateEmployeeDetailsAPI(id, user, data)
        if(response.status == 200){
          if(response.data == "EXPIRED" || response.data == "INVALID"){
            navigate("/login");
            toast.warning("Session Time Expired");
          }
          else{
            toggleComponent("EmployeeDirectory");
            toast.success("Employee Details Updated Succeessfully");
          }            
        }else{
          toast.error("Error Occured During Updating");
        }
    }

    return ( <>
    <div className="container row">
    <div className="col"></div>
      <div className="Auth-form-content col">
      <h3 className="Auth-form-title">Update User</h3>
      <div className="form-group mt-3">
      <label>First Name</label>
          <input
              type="text"
              name="first_name"
              className="form-control mt-1"
              value={user.first_name}
              onChange={onTextChange}
              required
              />
      </div>
      <div className="form-group mt-3">
      <label>Last Name</label>
      <input
          type="text"
          name="last_name"
          className="form-control mt-1"
          value={user.last_name}
          onChange={onTextChange}
          required
          />
      </div>
      <div className="form-group mt-3">
      <label>Address</label>
      <input
          type="text"
          name="address"
          className="form-control mt-1"
          value={user.address}
          onChange={onTextChange}
          required
          />
      </div>
      <div className="form-group mt-3">
      <label>Mobile Number</label>
      <input
          type="number"
          name="mobile"
          className="form-control mt-1"
          value={user.mobile}
          onChange={onTextChange}
          required
          />
      </div>
      <div className="form-group mt-3">
          <label>Email address</label>
          <input
          type="email"
          name='LoginEmail'
          className="form-control mt-1"
          value={user.email}
          onChange={onTextChange}
          required>
          </input>
      </div>
      <div className="form-group mt-3">
          <label>Status</label>
          <input
          type="text"
          name='status'
          className="form-control mt-1"
          value={user.status}
          onChange={onTextChange}
          required>
          </input>
      </div>
      <div className="row mt-3">
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary btn-block" onClick={UpdateEmployeeDetails}>
              Update
            </button>
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-danger btn-block" onClick={() => toggleComponent("EmployeeDirectory")}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="col"></div>
    </div>
    </> );
}

export default Update;