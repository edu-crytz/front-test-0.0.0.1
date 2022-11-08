import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home-Page'
import { TestSignIn } from './pages/Test-SignIn'
import { TestSignUp } from './pages/Test-SignUp'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signin' element={<TestSignIn />} />
            <Route path='/signup' element={<TestSignUp />} />
        </Routes>
    )
}