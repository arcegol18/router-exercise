import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import googleIcon from '../../../src/icons/google.svg';


export const LoginPage = () => {

    // const formData = {
    //   email: 'jesus@google.com',
    //   password: '123456'
    // }

    const { email, password, onInputChange } = useForm();
    

    const {status} = useSelector(state => state.auth)
    const isAuthenticating = useMemo(() => status==='checking', [status]);
    
    
    const dispatch = useDispatch();

    const onGoogleSignIn = () => {
      dispatch(startGoogleSignIn());
    }

    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(startLoginWithEmailPassword(email, password));
    }


    return (
      <form
        className="form"
        onSubmit={onSubmit}
      >
        <h1>Iniciar sesión</h1>
        <label htmlFor="correo"></label>
        <input
          type="email"
          id="correo"
          name="email"
          value={email}
          placeholder="Tu correo"
          onChange={onInputChange}
          />
        <label htmlFor="contraseña"></label>
        <input
          type="password"
          id = "contraseña"
          name = "password"
          value={password}
          placeholder='Tu contraseña'
          onChange={onInputChange}  
          />
        <div className="signIn_buttons">
          <button
            type="submit"
            disabled={isAuthenticating}
            >
            SignIn
          </button>
          <button
            type="submit"
            onClick={onGoogleSignIn}
            disabled={isAuthenticating}
          >
            <img
              src={googleIcon}
              alt='Icono Google'
              className='google__icon'
            />
              Google

          </button>
        </div>
        <div className="form__msg">
          <p>
            ¿Todavía no tienes una cuenta? 
            <Link to="/auth/register" className="form__link">Crear cuenta</Link>
          </p>
        </div>
      </form>
  )
}
