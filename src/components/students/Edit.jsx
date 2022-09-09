import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

const Edit = () => {

// using use params, fetching id
    const { id } = useParams();
    
    //navgate function
    const navigate = useNavigate();

    // state are defined
    const [status, setStatus] = useState(false)
    const [createStudent, setCreateStudent] = useState({
        stuname: "",
        stulastname: "",
        email: "",
        password: ""
    })

    // onchange handle function
    const changeHandle = (e) => {
        setCreateStudent({
            ...createStudent,
            [e.target.name]: e.target.value
        })
    }

// from submit sfunction
    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            // api put method for json server
            await axios.put(`http://localhost:3333/students/${id}`, createStudent)
            setStatus(true)
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect
    useEffect(() => {
        const studentData = async () => {
            try {
                // api get for json server
                const students = await axios.get(`http://localhost:3333/students/${id}`)
                setCreateStudent(students.data);
            } catch (error) {
                console.log("Somthing web worng");
            }
        }

        studentData()
    }, [id])

    return (
        <div className="container">
            <div className="row">
                <div className="col-10 m-auto shadow mb-3">
                    <div className="p-0">
                        <form className="row gy-2 p-2" onSubmit={formSubmit}>
                            <div className="col-12 text-center bg-success text-white">
                                <div className="p-2">Update Student Information</div>
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" name="stuname"
                                    value={createStudent.stuname} onChange={changeHandle} placeholder="First name" aria-label="First name" />
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" name="stulastname" value={createStudent.stulastname} onChange={changeHandle} placeholder="Last name" aria-label="Last name" />
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" name="email" value={createStudent.email} onChange={changeHandle} placeholder="Email" aria-label="Email" />
                            </div>
                            <div className="col-6">
                                <input type="password" className="form-control" name="password" value={createStudent.password} onChange={changeHandle} placeholder="Password" aria-label="Password" />
                            </div>
                            <div className="col-5 m-auto mt-2">
                                <button className="w-100 btn-primary btn" type='submit'>UPDATE</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-3 m-auto">
                    <button className='btn btn-primary w-100' onClick={()=>{
                        navigate('/')
                    }}>Back to home</button>
                </div>
            </div>
        </div>
    )
}

export default Edit