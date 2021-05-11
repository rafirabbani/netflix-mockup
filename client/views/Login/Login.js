import React, { useState } from 'react'
import CreateAccount from './CreateAccount'
import apiLogin from './ApiLogin'


export default function Login() {

    const [modal, setModal] = useState(false);
	const [login, setLogin] = useState({
		user_email: undefined,
		user_password: undefined
	})
	
	const handleChange = name => event => {
		setLogin({...login, [name]: event.target.value })
	}

	const onLogin = (e) => {
		e.preventDefault();
		const req = {
			user_email: login.user_email,
			user_password: login.user_password
		}
		apiLogin.signIn(req).then(result => {
			localStorage.setItem('token', result.data.token);
			localStorage.setItem('user_type', result.data.users.user_type);
			console.log(localStorage.getItem('token'), localStorage.getItem('user_type'))
		})
	} 



    return (
        <>
        <div>
            <body class="font-mono bg-gray-900">
		        {/* <!-- Container --> */}
		        <div class="container mx-auto">
			        <div class="flex justify-center px-6 my-12">
				    {/* <!-- Row --> */}
				        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
					    {/* <!-- Col --> */}
					<div
						class="w-full h-auto bg-gray-900 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
					></div>
					{/* <!-- Col --> */}
					<div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-center text-gray-500">Admin Dashboard Login</h3>
						<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="user_email">
									Email
								</label>
								<input
									class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="user_email" name='user_email' type="text"
									placeholder="Email"
									onChange={handleChange('user_email')}
								/>
							</div>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="password">
									Password
								</label>
								<input
									class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="user_password" name='user_password' type="password"
									placeholder="Password"
									onChange={handleChange('user_password')}
								/>
							</div>
							<div class="mb-6 text-center">
								<button
									class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="button"
									onClick={onLogin}
								>
									Sign In
								</button>
							</div>
							<hr class="mb-6 border-t" />
							<div class="text-center">
                                <button type='button' onClick={() => setModal(true)}>
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									
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
    </>
    )
}
