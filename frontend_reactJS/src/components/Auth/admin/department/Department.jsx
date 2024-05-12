import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { HiStatusOnline } from "react-icons/hi";
import { MdOutlineNoAccounts } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { connect } from 'react-redux';
import { fetchDepartments } from '../../../redux/actions/departmentAction';

const Department = (props) => {
  console.log("DATA SA FETCH DEPARTMENT", props && props);
  
  useEffect(() => {
    props.fetchDepartments();
  },[])

  const getAllDepartmentCollectionArrays = props?.departmentData?.departments?.data?.department;
  console.log("DATA SA PROPS DRILLING", getAllDepartmentCollectionArrays);

  const getAllDepartments = (getAllDepartmentCollectionArrays) => {
    let items = [];
    if (Array.isArray(getAllDepartmentCollectionArrays)) {
      getAllDepartmentCollectionArrays.forEach(department => {
        items.push(department);
      });
    }
    return items;
  }
  
  const departmentArrays = getAllDepartments(getAllDepartmentCollectionArrays);
  console.log("DATA NA GIKAN SA ARROW FUNCTION FOREACH", departmentArrays);

  if (props.loading) {
    return <div>
    <span className="loading loading-ball loading-xs"></span>
    <span className="loading loading-ball loading-sm"></span>
    <span className="loading loading-ball loading-md"></span>
    <span className="loading loading-ball loading-lg"></span>
    </div>;
  }

  return (
    <div className='bg-base-200 h-full w-full'>
      <div className='bg-base-300 h-full w-full'>
        <div className="overflow-x-auto">
        {Array.isArray(departmentArrays) && departmentArrays.length > 0 ? (

          <table className="table w-full h-full">
              <thead className='bg-amber-100 pr-3 pl-3 pb-3 pt-3'>
                <tr>
                  <th className='text-1xl text-black'>NO.</th>
                  <th className='text-1xl text-black'>DEPARTMENT NAME</th>
                  <th className='text-1xl text-black'>DEPARTMENT DESCRIPTION</th>
                  <th className='text-1xl text-black'>DEPARTMENT STATUS</th>
                  <th className='text-1xl text-black'>ACTION</th>
                </tr>
              </thead>
              <tbody>
              {departmentArrays && departmentArrays.map((item, index) => (
                <tr>
                  <th>{index}</th>
                  <td>{item.dept_name}</td>
                  <td>{item.dept_description}</td>
                  <td>{item.dept_status_id}</td>
                  <td>
                  <div className="flex">
                  <div className="flex-none mr-3">
                      <Link to={`/employee/details/${item.id}`} className="text-black">
                          <FaEye style={{ fontSize: "20px", color: "black", padding: "0%" }} />
                      </Link>

                  </div>
                  <div className="flex-none mr-3">
                      <MdAutoDelete
                      onClick={() => {
                              setDeactivateEmployeeId(item.id); 
                              document.getElementById('removeEmployee').showModal()
                          }}
                       style={{ fontSize: "20px", color: "black" }} />
                  </div>
              </div>
                  </td>
                </tr>
              ))}
              
              </tbody>
            </table>
        ) : (
          <h1>NO DATA</h1>
        )
       } 
        </div>  
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    departmentData: state.departmentState,
    loading: state.departmentState.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepartments: () => dispatch(fetchDepartments()),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
