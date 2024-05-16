/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
//DISPATCH-ACTION REDUX-CORE
import { fetchDepartments, updateDepartment } from '../../../redux/actions/departmentAction';
//ICONS
import { FaUpload } from "react-icons/fa6";
import { FaUserEdit, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
//TOASTER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditDepartment = (props) => {
    
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    console.log("DATA SA FETCH DEPARTMENT", props);
    console.log("SELECTED ID SA USE PARAMS", id);

    useEffect(() => {
        props.fetchDepartments();
    }, []);

    //e-open ang modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
        const editEmployeeDetailsDialog = document.getElementById('editEmployeeDetails');
        if (editEmployeeDetailsDialog) {
            editEmployeeDetailsDialog.showModal();
        }
    };

    //close ang modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        const editEmployeeDetailsDialog = document.getElementById('editEmployeeDetails');
        if (editEmployeeDetailsDialog) {
            editEmployeeDetailsDialog.close();
        }
    };

    const [formDataUpdateDepartment, setFormDataUpdateDepartment] = useState({
        dept_name: '',
        dept_description: '',
        dept_status_id: '',
    });

    const handleChangeUpdateData = (ez) => {
        setFormDataUpdateDepartment({
            ...formDataUpdateDepartment,
            [ez.target.name]: ez.target.value,
        });
    };

    const handleSubmitDepartmentData = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            props.updateEmployee(id, formDataUpdateDepartment);
        } catch (error) {
            window.alert("ERROR");
        };
    }
    
    const departmentCollectionArrays = props.departmentData?.departments?.data?.department;
    
    function departmentsDetails(departmentCollectionArrays, id) {
        let item = [];

        if (departmentCollectionArrays) {
            for (let ez = 0; ez < departmentCollectionArrays.length; ez++) {
                if (departmentCollectionArrays[ez].id == id) {
                    item.push(departmentCollectionArrays[ez]);
                }
            }
        }
        return item;
    }
    
    const departments = departmentsDetails(departmentCollectionArrays, id);
    // console.log("AYAW KOL", departments);

    if (props.loading) {
        return <div>
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
        </div>;
      }

    return (
        <div className="hero max-w-full">
            <ToastContainer />
            {isModalOpen && (
                <dialog id="editEmployeeDetails" className="modal">
                    <div className=" modal-box w-11/12 max-w-5xl bg-amber-100">
                        <h3 className="font-bold text-3xl text-black">EDIT EMPLOYEE DETAILS</h3>

                        <div className="modal-action">
                            <form method="dialog" onSubmit={handleSubmitDepartmentData}>
                                <div className="grid grid-cols-3 gap-6">

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-2xl">Fullname</span>
                                        </label>
                                        {departments && departments.map((item, index) => (
                                            <input
                                                key={index}
                                                name="dept_name" //key para sa form data
                                                onChange={handleChangeUpdateData}
                                                type="text"
                                                placeholder="text"
                                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                                defaultValue={item.dept_name}
                                                style={{ backgroundColor: 'black' }}
                                            />
                                        ))}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-2xl">Email</span>
                                        </label>
                                        {departments && departments.map((item, index) => (
                                            <input
                                                key={index}
                                                name="dept_description" //key para sa formData
                                                onChange={handleChangeUpdateData}
                                                type="text"
                                                placeholder="email"
                                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                                defaultValue={item.dept_description}
                                                style={{ backgroundColor: 'black' }}
                                            />
                                        ))}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-2xl">Status</span>
                                        </label>
                                       
                                            <select
                                                key={index}
                                                name="dept_status_id"
                                                className="select shadow-2xl text-2xl w-full max-w-xs"
                                                style={{ backgroundColor: 'black', color: "#fef3c6" }}
                                                onChange={handleChangeUpdateData}
                                                >
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                    </div>


                                </div>
                                <br />
                                <div className="flex ...">
                                    <div>
                                        <button type="submit" className="btn bg-transparent" style={{ fontSize: "40px", color: "black", border: "none" }} >
                                            <FaSave style={{ fontSize: "25px", color: "black", marginRight: "5px" }} />
                                        </button>
                                    </div>

                                    <div>
                                        <button onClick={handleCloseModal} className="btn bg-transparent" style={{ fontSize: "40px", color: "black", border: "none" }} >
                                            <IoMdCloseCircle style={{ fontSize: "25px", color: "black", marginRight: "5px" }} />
                                        </button>
                                    </div>
                                </div>
                            </form>


                        </div>
                        <center>
                            <span id="loading-infinity" className={`loading loading-infinity loading-lg ${isLoading ? 'block' : 'hidden'} spinner-blue`}></span>
                        </center>
                    </div>
                </dialog>

            )}

            {Array.isArray(departmentsDetails) && departmentsDetails.length > 0 ? (
                <>
                    <div className="hero min-h-screen bg-amber-100 rounded-t-lg">

                        <button style={{ marginRight: "93%", marginBottom: "65%" }} >
                            <Link to="/employee/dashboard">
                                <FaLongArrowAltLeft style={{ fontSize: "50px", color: "black", marginRight: "90%", marginBottom: "65%" }} />
                            </Link>
                        </button>

                        <div className="hero-content flex flex-col items-center">

                            <div className="hero-content flex-col lg:flex-row py-0 px-0">
                                <div className="flex-1">

                                    <div className="grid grid-cols-3 gap-6">
                                    <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl">Department</span>
                                    </label>
                                    {departments && departments.map((item, index) => (
                                        <input
                                            key={index}
                                            name="dept_name" //key para sa formData
                                            onChange={handleChangeUpdateData}
                                            type="text"
                                            placeholder="text"
                                            className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                            defaultValue={item.dept_}
                                            style={{ backgroundColor: 'black' }}
                                        />
                                    ))}
                                </div>
                                    <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl">Email</span>
                                    </label>
                                    {departments && departments.map((item, index) => (
                                        <input
                                            key={index}
                                            name="dept_description" //key para sa formData
                                            onChange={handleChangeUpdateData}
                                            type="text"
                                            placeholder="email"
                                            className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                            defaultValue={item.dept_description}
                                            style={{ backgroundColor: 'black' }}
                                        />
                                    ))}
                                </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black text-2xl">Status</span>
                                            </label>
                                            {departments && departments.map((item, index) => (
                                                <select key={index} className="select shadow-2xl text-2xl w-full max-w-xs" style={{ backgroundColor: 'transparent', color: "black", border: "" }} disabled>
                                                    <option value="Active" selected={item.dept_status_id === 1}>{item.dept_status_id === 1 ? 'Active' : 'Inactive'}</option>
                                                    <option value="Inactive" selected={item.dept_status_id === 0}>{item.dept_status_id === 0 ? 'Inactive' : 'Active'}</option>
                                                </select>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={handleOpenModal}>
                                        <FaUserEdit onClick={() => document.getElementById('editDepartmentDetails').showModal()} style={{ fontSize: "40px", color: "black", marginLeft: "-65%", marginBottom: "-100" }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <center>
                        <span id="loading-infinity" className={`loading loading-infinity loading-lg ${isLoading ? 'block' : 'hidden'} spinner-blue`}></span>
                    </center>
                </>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        departmentData: state.departmentState,
        loading: state.departmentState.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDepartments: () => dispatch(fetchDepartments()),
        updateDepartment: (deptartmentId, updateDepartmentData) => dispatch(updateDepartment(deptartmentId, updateDepartmentData)),
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(EditDepartment);