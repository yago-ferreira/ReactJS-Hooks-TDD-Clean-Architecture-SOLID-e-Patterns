import React, { useState }from 'react'
import Styles from './login-styles.scss'
import { FormStatus, Header, Footer } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

type StateProps = {
    isLoading: boolean
    errorMessage: string
}

const Login: React.FC = () => {
    const [state] = useState<StateProps>({
        isLoading: false,
        errorMessage: ''
    })
    return (
        <div className={Styles.login}>
            <Header />
            <Context.Provider value={state}>

            <form className={Styles.form}>
                <h2>Login</h2>
                <div className={Styles.inputWrap}>
                    <input type="email" name="email" placeholder="Digite seu e-mail" />
                    <input type="password" name="password" placeholder="Digite sua senha" />
                </div>
               
                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar Conta</span>
                <FormStatus />
            </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login