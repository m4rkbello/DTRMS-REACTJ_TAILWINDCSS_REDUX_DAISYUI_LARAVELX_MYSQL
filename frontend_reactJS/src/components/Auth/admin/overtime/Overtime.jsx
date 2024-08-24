/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//REDUXISM
import {fetchOvertimes} from '../../../redux/actions/overtimeAction';

//ICONS
import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Overtime = (props) => {
  console.log("DATA SA fetchOvertimes", props);
//OVERTIMES USESTATE
  const [selectedRateId, setSelectedRateId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

useEffect(() => {
  props.fetchOvertimes();
},[]);


//DISPLAY ANG DATA SA TABLE!
const departmentsObjectDataCollection = props.departmentData?.departments?.data?.details;
const getDepartmentNameById = (departmentId) => {
  const department = departmentsObjectDataCollection?.find(dept => dept.id === departmentId);
  return department ? department.department_name : 'NO DEPARTMENT';
};



  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
    <div className="flex flex-col bg-transparent mb-10 shadow-slate-900/100" >
    <div className="flex items-center text-sm breadcrumbs">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className='flex items-center hover:text-white'>
            <FcPrevious style={{ height: "2rem", width: "2rem" }} />
            <span className="ml-2">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/employee/dashboard" className='flex items-center hover:text-white'>
            <FcFolder 
            style={{ height: "2rem", width: "2rem" }} />
            <span className="ml-2">Rates</span>
          </Link>
        </li>
        <li>
          <Link to="" className='flex items-center hover:text-white'>
            <FcOpenedFolder style={{ height: "2rem", width: "2rem" }} />
            <span className="ml-2">Data</span>
          </Link>
        </li>
      </ul>
    </div>
  </div>

  <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
    <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">

      <div className='glass shadow-slate-900/100'>
        <div className="grid grid-cols-3 items-center mt-10 mb-10 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
          <div>
            <span className="inline-grid grid-cols-3 gap-4 py-5">
              <div className="p-3 flex justify-start">
                <input
                  type="text"
                  placeholder="Search"
          
                  className="border-b-4 bg-transparent text-md rounded text-black custom-placeholder-text-color"
                />
              </div>
              <div className="p-3 flex justify-end">
                <FcSearch style={{ height: "2rem", width: "2rem" }} />
              </div>
            </span>
          </div>
          <div className="pb-5 pt-5 flex justify-center">
            <h3 className="font-bold text-4xl text-black">RATE LIST</h3>
          </div>
          <div className="p-3 flex justify-end">
            <FcPlus 

              style={{ height: "3rem", width: "3rem" }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 flex flex-col items-center justify-center">
    
      {/*** 
        {props.loading ? (
         */}
          <div className="flex flex-col gap-4 w-full max-w-5xl ps-2 pe-2">
            <div className="skeleton h-48 w-full"></div>
            <div className="skeleton h-6 w-36"></div>
            <div className="skeleton h-6 w-full"></div>
            <div className="skeleton h-6 w-full"></div>
          </div>
          {/***
          ) : filteredRates.length === 0 ? (
              */}
          <div className="w-full max-w-5xl text-center text-lg font-semibold text-gray-500">
            <div className="mockup-browser  border border-t-4 pb-10 pt-10">
              <div className="mockup-browser-toolbar">
                <div className="input text-black-400">https://markbello.com</div>
              </div>
              <div className="flex justify-center text-black px-4 py-16 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <span
                  style={{ fontSize: '30px', fontWeight: 'Bolder' }}
                >
                  <b>
                    AYAW NA PANGITAA ANG "
                    {/***
                      
                      {searchQuery}
                      */}
                    " KAY WALA!
                  </b>

                </span>
              </div>
            </div>
          </div>
          {/***
            
          ) : currentRates?.length > 0 ? (
            */}
          <div className="w-full max-w-5xl">
            <table className="table glass w-full border-2 border-black">
              <thead className="text-red">
                <tr className="md:table-row" style={{ fontSize: "17px", backgroundColor: 'black', color: "white" }}>
                  <th className="md:table-cell text-white"></th>
                  <th className="md:table-cell text-white">NAME</th>
                  <th className="md:table-cell text-white">AMOUNT</th>
                  <th className="md:table-cell text-white">DETAILS</th>
                  <th className="md:table-cell text-white">DESCRIPTION</th>
                  <th className="md:table-cell text-white">DEPARTMENT</th>
                  <th className="md:table-cell text-white">ACTION</th>
                </tr>
              </thead>
              <tbody className='text-black'>
              {/***

                {currentRates.map((item) => (
                  item.rate_status_id !== 0 && (
                    <tr className="md:table-row" 
                    key={item.id}
                    >
                      <td className="md:table-cell"><FcSalesPerformance style={{ fontSize: "40px", color: "transparent" }} /></td>
                      <td className="md:table-cell">{item.rate_name}</td>
                      <td className="md:table-cell">
                        <span>&#8369;</span>
                        <b>{item.rate_amount_per_day}</b>
                      </td>
                      <td className="md:table-cell">{item.rate_details}</td>
                      <td className="md:table-cell">{item.rate_description}</td>
                      <td className="md:table-cell text-center">
                     
                        
                        {getDepartmentNameById(item.rate_department_id)}
                        
                      </td>
                      <td className="md:table-cell">
                        <div className="flex items-center space-x-2">
                          <Link to={`/admin/rate/edit/${item.id}`}>
                            <FcViewDetails
                              style={{ height: "2rem", width: "2rem" }}
                            />
                          </Link>

                          <FcEmptyTrash
                            // onClick={() => handleDeactivateRate(item.id)}
                            style={{ height: "2rem", width: "2rem" }}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                ))}
                  */}

              </tbody>
            </table>
            <div className="flex justify-center mt-4 mb-4">
              <div className="join grid grid-cols-2">
                <button
                  className="join-item btn btn-outline  glass"
                  // onClick={() => handlePageChange(currentPage - 1)}
                  // disabled={currentPage === 1}
                >
                  <FcPrevious
                    style={{ height: "2rem", width: "2rem" }}
                  /> Previous
                </button>
                <button
                  className="join-item btn btn-outline glass"
                  // onClick={() => handlePageChange(currentPage + 1)}
                  // disabled={currentPage === totalPages}
                >
                  Next
                  <FcNext
                    style={{ height: "2rem", width: "2rem" }}
                  />
                </button>
              </div>
            </div>
          </div>
        ) : (

          <div className="mockup-browser  border border-t-4 pb-10 pt-10">
            <div className="mockup-browser-toolbar">
              <div className="input text-black-400">https://markbello.com</div>
            </div>
            <div className="flex justify-center px-4 py-16 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
              <span
                style={{ fontSize: '50px', fontWeightL: 'Bolder' }}
              >
                <b>
                  AYAW NA PANGITAA ANG WALA!
                </b>
              </span>
            </div>
          </div>
          {/***
          )}
              */}
      </div>
    </div>
  </div>
  
    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    overtimeData: state.overtimeState,
    loading: state.rateState.loading,
  }
}

const mapDispatchToPProps = (dispatch) => {
  return {
    fetchOvertimes: () => dispatch(fetchOvertimes()),
  }
}


export default connect(mapStateToProps, mapDispatchToPProps)(Overtime);