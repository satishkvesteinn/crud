
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'


const Home = () => {
    // state are defined
    const [student, setStudent] = useState([]);
    const [createStudent, setCreateStudent] = useState({
        stuname: "",
        stulastname: "",
        email: "",
        password: ""
    })
    const [status, setStatus] = useState(false)

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
            // api post for json server
            await axios.post("http://localhost:3333/students", createStudent)
            setCreateStudent({
                stuname: "",
                stulastname: "",
                email: "",
                password: ""
            })
            setStatus(true)
        } catch (error) {
            console.log(error);
        }
    }

    // data delete function
    const handleDelete = async id => {
        // api delete to json server
        await axios.delete(`http://localhost:3333/students/${id}`);
        var newStudents = student.filter(item => {
            return item.id !== id
        })
        setStudent(newStudents)
    }

    // useEffect hooks
    useEffect(() => {

        // fetching data on rendring time
        const studentData = async () => {
            try {
                const students = await axios.get("http://localhost:3333/students")
                setStudent(students.data);
                setStatus(false)
            } catch (error) {
                console.log("Somthing web worng");
            }
        }
        studentData()
    }, [status === true])


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mb-3 text-center bg-primary text-white">
                        <div className="p-2">React CRUD with API Call</div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-10 m-auto shadow mb-3">
                                <div className="p-0">
                                    <form className="row gy-2 p-2" onSubmit={formSubmit}>
                                        <div className="col-12 text-center bg-success text-white">
                                            <div className="p-2">Add Student</div>
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
                                            <button className="w-100 btn-primary btn" type='submit'>Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>


                            <div className="col-10 m-auto shadow">
                                <div className="p-0">
                                    <div className="row gy-2 p-2">
                                        <div className="col-12 text-center bg-danger text-white">
                                            <div className="p-2">Student list</div>
                                        </div>
                                        <div className="col-12">
                                            <div className="p-2">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No</th>
                                                            <th scope="col">First name</th>
                                                            <th scope="col">Last name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Password</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            student.map((data, index) => {
                                                                return (
                                                                    <tr>
                                                                        <th scope="row">{index + 1}</th>
                                                                        <td>{data.stuname}</td>
                                                                        <td>{data.stulastname}</td>
                                                                        <td>{data.email}</td>
                                                                        <td>{data.password}</td>
                                                                        <td className='d-flex justify-content-between'>
                                                                            {/*view button */}
                                                                            <Link to={`view/${data.id}`}><i className="bi bi-eye-fill"></i></Link>
                                                                            {/* edit button */}
                                                                            <Link to={`edit/${data.id}`}><i className="bi bi-pencil-fill"></i></Link>
                                                                            {/* delete button */}
                                                                            <i className="bi bi-trash-fill" onClick={() => {
                                                                                handleDelete(data.id)
                                                                            }}></i>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home