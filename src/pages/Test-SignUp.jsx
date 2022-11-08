import { Fragment, useState } from 'react'
import { Auth } from "aws-amplify";
import { Link } from 'react-router-dom';

export const TestSignUp = () => {
    const [username, setUsername] = useState("");
    const [Name, setName] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [redirectToHomePage, setRedirectToHomePage] = useState(false);

    if (redirectToHomePage) {
        return <Link to="/"></Link>
    }


    async function handleSubmit(event) {
        event.preventDefault(true);

        const params = {
            username: username,
            password: password,
            attributes: {
                name: Name
            }
        }

        console.log("HandleSubmit");

        try {
            const { user } = await Auth.signUp(params);
            alert("Cadastro realizado com sucesso, por favor verifique sua caixa de email e resgate o código", user);
            console.log("Sing-Up FOI", user);
        } catch (error) {
            console.log('error signing up:', error);
            alert(error.message);
            setError(true);
        }
    }

    async function handle2Submit(event) {
        event.preventDefault(true);
        try {
            const data = await Auth.confirmSignUp(username, confirmCode);
            alert("SIGN-UP CONFIRMADO");
            console.log("USER CONFIRMED : ", data);
            const signIn = await Auth.signIn(username, password);
            alert("SIGN-IN CONFIRMADO");
            console.log("***SIGN-IN CONFIRMED : ", signIn);
            setRedirectToHomePage(true);
        } catch (error) {
            console.log('error signing or confirming sign-up:', error);
            alert(error.message);
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
                            <label className='subtitle has-text-grey' htmlFor="email">Nome:</label>
                            <br />
                            <input
                                type="text"
                                name="name"
                                value={Name}
                                onChange={(e) => { setName(e.target.value) }}
                                required
                                className='input is-normal'
                                placeholder='Seu Nome'
                            />

                            <br />
                            <br />

                            <label className='subtitle has-text-grey' htmlFor="email">Email:</label>
                            <br />
                            <input
                                type="email"
                                name="email"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
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
                            {error && <h5 color="danger">Email or Password invalid</h5>}
                        </form>
                        <br />

                        <form onSubmit={handle2Submit}>
                            <label className='subtitle has-text-grey' htmlFor="email">Code:</label>
                            <br />
                            <input
                                type="text"
                                name="confirmCode"
                                value={confirmCode}
                                onChange={(e) => { setConfirmCode(e.target.value) }}
                                required
                                className='input is-normal'
                                placeholder='código'
                            />

                            <br />
                            <br />
                            <button type="submit" className='button-log'>Login</button>
                        </form>
                    </div>

                </div>

                <div className="column is-one-third"></div>

            </div>
        </Fragment>
    )
}
