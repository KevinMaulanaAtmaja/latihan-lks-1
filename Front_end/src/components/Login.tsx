import { useState, useEffect } from 'react';

const Login = ({ onSend }) => {
    const [IDCardNumber, setIDCardNumber] = useState('');
    const [Password, setPassword] = useState('');
    const validate = () => {
        return IDCardNumber.length > 0 && Password.length > 0
    }


    return (
        <>
            <main>
                <header className="jumbotron">
                    <div className="container text-center">
                        <h1 className="display-4">Vaccination Platform</h1>
                    </div>
                </header>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form className="card card-default">
                                <div className="card-header">
                                    <h4 onClick={onSend} className="mb-0">Login</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">ID Card Number</div>
                                        <div className="col-8">
                                            <input onChange={(e) => setIDCardNumber(e.target.value)} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Password</div>
                                        <div className="col-8">
                                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center mt-4">
                                        <div className="col-4"></div>
                                        <div className="col-8">
                                            <button disabled={!validate()} className="btn btn-primary">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </main >
        </>
    )
}
export default Login;