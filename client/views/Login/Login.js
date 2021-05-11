import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import CreateAccount from './CreateAccount'
import apiLogin from './ApiLogin'
import Warning from './Warning'

export default function Login() {

	const history = useHistory();
    const [modal, setModal] = useState(false);
	const [warning, setWarning] = useState(false);
	const [login, setLogin] = useState({
		user_email: undefined,
		user_password: undefined
	});
	
	const handleChange = name => event => {
		setLogin({...login, [name]: event.target.value });
	}

	const onLogin = (e) => {
		e.preventDefault();
		const req = {
			user_email: login.user_email,
			user_password: login.user_password
		}
		apiLogin.signIn(req).then(result => {
			localStorage.setItem('data', JSON.stringify({token: result.data.token, user_type: result.data.users.user_type}));
		});
		const data = JSON.parse(localStorage.getItem('data'))
		if (data.user_type === 'ADMIN') {
			history.push('/netflix-mockup/dashboard/')
		}
		else {
			setWarning(true)
			apiLogin.signOut().then(result => {
				localStorage.removeItem('data')
				console.log(result)
				console.log(localStorage.getItem('data'), document.cookie)	
			})
		}
	} 



    return (
        <>
        <div>
            <body className="font-mono bg-gray-900">
		        {/* <!-- Container --> */}
		        <div className="container mx-auto">
			        <div className="flex justify-center px-6 my-12">
				    {/* <!-- Row --> */}
				        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
					    {/* <!-- Col --> */}
					<div
						className="w-full h-auto bg-gray-900 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
					></div>
					{/* <!-- Col --> */}
					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center text-gray-900">Admin Dashboard Login</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700">
									Email
								</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="user_email" name='user_email' type="text"
									placeholder="Email"
									onChange={handleChange('user_email')}
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700">
									Password
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="user_password" name='user_password' type="password"
									placeholder="Password"
									onChange={handleChange('user_password')}
								/>
							</div>
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="button"
									onClick={onLogin}
								>
									Sign In
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
                                <button type='button' onClick={() => setModal(true)}>
								<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									
								>
									Create an Account!
								</a>
                                </button>
							    </div>
						        </form>
					        </div>
				        </div>
			        </div>
		        </div>
	        </body>
        </div>
        {
            modal ? <CreateAccount 
            title={'Create an Account'}
            setModal={() => setModal(false)}
            /> : null
        }
		{
			warning ? <Warning 
			setWarning={() => setWarning(false)}
			/> : null
		}
    </>
    )
}
