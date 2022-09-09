import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const View = () => {
// using use params, fetching id
    const { id } = useParams();

    //navgate function
    const navigate = useNavigate();

    // state variable
    const [student, setStudent] = useState({});

    // useEffect
    useEffect(() => {
        const studentData = async () => {
            try {
                // fetching data from json server
                const students = await axios.get(`http://localhost:3333/students/${id}`)
                setStudent(students.data);
            } catch (error) {
                console.log("Somthing web worng");
            }
        }

        studentData()
    }, [id])

    return (
        <div className="container">
            <div className="row gy-2 p-2">
                <div className="col-12 text-center bg-danger text-white">
                    <div className="p-2">Student Details</div>
                </div>
                <div className="col-12">
                    <div className="p-2">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#ID</th>
                                    <th scope="col">First name</th>
                                    <th scope="col">Last name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{student.id}</th>
                                    <td>{student.stuname}</td>
                                    <td>{student.stulastname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.password}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-4 m-auto">
                    {/* navigate to home page */}
                    <button className='btn btn-primary' onClick={()=>{
                        navigate('/')
                    }}>Back to home</button>
                </div>
            </div>
        </div >
    )
}

export default View