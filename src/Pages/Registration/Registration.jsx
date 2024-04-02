import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Registration = () => {
    const [errormsg, setErrormsg] = useState('')
    const [successmsg, setSuccessmsg] = useState('')
    const [showPass, setShowPass] = useState(false)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const email = (e.target.email.value)
        const pass = (e.target.password.value)
        const accepted = (e.target.tarms.checked)
        console.log(email, pass, accepted)
        setErrormsg('')
        setSuccessmsg('')

        if (pass.length < 6) {
            setErrormsg('Your Password must be greatter than 6 words')
            return
        }
        else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(pass)) {
            setErrormsg('You Should must use atleast 1 capital latter, number and special cherecter')
            return
        }
        else if(!accepted){
            setErrormsg('please check our tarms & conditions')
            return
        }


        createUserWithEmailAndPassword(auth, email, pass)
            .then(result => {
                const user = result.user
                console.log(user)
                setSuccessmsg('account seccessfully created')
                sendEmailVerification(user)
                .then(()=>{
                    alert('check Your Email')
                })
            })
            .catch(error => {
                console.log(error)
                setErrormsg(error.message)
            });

    }
    return (
        <div>
            <div className="  ">
            <h1 className="text-5xl font-bold text-center pt-4">Please Register</h1>
                <div className="flex justify-center py-14 ">
                    <div className="w-2/5   border-2 border-gray-300 rounded-xl bg-base-100">
                        <form className="card-body" onSubmit={handleFormSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <label className="input input-bordered flex items-center gap-2">
                                    <input 
                                    name="password" 
                                    type={showPass ? 'text' : 'password'} 
                                    className="grow" 
                                    placeholder="Search" />
                                    <span className="text-2xl"
                                    onClick={()=> setShowPass(!showPass)}>
                                        {
                                            showPass? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                                        }
                                    </span>
                                </label>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="">
                                <input type="checkbox" name="tarms" id="tarms" />
                                <label className="ml-2" htmlFor="tarms">Tarms and Conditions</label>
                            </div>
                            <div className="form-control mt-3">
                                <button className="btn btn-primary">Registration</button>
                            </div>
                            <p className="text-red-700">{errormsg}</p>
                            <p className="text-green-700">{successmsg}</p>
                        <p>Allready have an Account? Please <Link to='/login' className="underline">Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;