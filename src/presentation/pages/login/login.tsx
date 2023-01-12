import React from 'react'
import Styles from './login-styles.scss'
import { FormStatus, Header, Footer } from '@/presentation/components'

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <Header />
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
            <Footer />
        </div>
    )
}

export default Login