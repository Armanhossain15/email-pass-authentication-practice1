import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef(null);
    const handleSubmit =(e)=>{
        e.preventDefault()
       const email = e.target.email.value
       const pass = e.target.pass.value
       const activeted = e.target.trams.checked
       setSuccess('')
       setError('')
       if(!activeted){
        setError('Please Check Tarms And Conditions')
        return
       }
       console.log(email, pass, activeted)
    signInWithEmailAndPassword(auth, email, pass)
    .then(result=>{
        console.log(result.user)
        setSuccess('account login successfully')
        if(!result.user.emailVerified){
            alert('check Your email and verify it')
        }
    })
    .catch(error =>{
        console.log(error)
        setError(error.message)
    })
    }

    const handleForgetPass=()=>{
        const email = emailRef.current.value
        setError('')
        // console.log('forgetting Password', )
        if(!email){
            setError('please provide a email')
            return
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setError('please provide a valid email')
            return
        }
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('please check your email')
        })
        .catch(error=>{
            setError(error.message)
        })
    }
    return (
        <div className="">
             <h1 className="text-5xl font-bold text-center pt-4">Please Login</h1>
            <div className="flex justify-center items-center py-16">
                <div className="card w-2/5  border-2 border-gray-300 rounded-lg ">
                   
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                            name="email" 
                            ref={emailRef}
                            type="email" 
                            placeholder="email" 
                            className="input input-bordered" 
                            required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="pass" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPass} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div >
                            <input type="checkbox" name="trams" id="trams" />
                            <label className="ml-2" htmlFor="trams"> Trams And Conditions</label>
                        </div>
                        <div className="form-control mt-3">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div>
                            <p className="text-red-700">{error}</p>
                            <p className="text-green-700">{success}</p>
                        </div>
                    <p>New To this Website? Please <Link to='/registration' className="underline">Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;