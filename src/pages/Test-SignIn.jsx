import { Fragment, useState } from 'react'
import { Auth } from "aws-amplify";
import { Link } from 'react-router-dom';

export const TestSignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [RedirectToRegister, setRedirectToRegister] = useState(false);
    const [redirectToHomePage, setRedirectToHomePage] = useState(false);

    if (redirectToHomePage) {
        return <Link to="/"></Link>
    }
    if (RedirectToRegister) {
        return <Link to="/signup"></Link>
    }

    async function handleSubmit(event) {
        event.preventDefault(true);

        console.log("HandleSubmit");

        try {

            await Auth.signIn(email, password);
            alert("FOIII");
            console.log("FOI");
            setRedirectToHomePage(true);
        } catch (error) {
            alert(error.message);
            console.log(error);
            setError(true);
        }
    }


    return (
        <Fragment>
            <div id='card-node' className="columns is-gapless">

                <div className="column is-one-third"></div>

                <div className="column is-one-third card-box">
                    <div className='card-content'>

                        <div className='card-img'></div>
                        <br />
                        <br />

                        <form onSubmit={handleSubmit}>
                            <label className='subtitle has-text-grey' htmlFor="email">Email:</label>
                            <br />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                className='input is-normal'
                                placeholder='seuEmail@email.com'
                            />

                            <br />
                            <br />


                            <label className='subtitle has-text-grey' htmlFor="password">Password:</label>
                            <br />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className='input is-normal'
                                placeholder='**********'
                            />
                            <br />
                            <br />

                            <div className='content columns is-gapless'>
                                <div className='column is-one-fifths'></div>

                                <div className='column is-one-fifths'>
                                    <button type="submit" className='button-log'>Login</button>
                                </div>
                                <div className='column is-one-fifths'></div>
                            </div>

                            <div className='content columns is-gapless'>
                                <div className='column is-one-fifths'></div>

                                <div className='column is-one-fifths'>
                                    <button onClick={(e) => {
                                        e.preventDefault(true);
                                        setRedirectToRegister(true);
                                    }} className='button-log'>Cadastrar-se</button>
                                </div>
                                <div className='column is-one-fifths'></div>
                            </div>
                            {error && <h5 color="danger">Email or Password invalid</h5>}
                        </form>
                    </div>

                </div>

                <div className="column is-one-third"></div>

            </div>
        </Fragment>
    )
}