import { useRef, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/layout/header/header';
import { UserAuth } from '../../types/user-auth';
import { useActionCreators } from '../../hooks';
import { authorizationActions } from '../../store/slices/authorization';

export default function Login(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { loginAction } = useActionCreators(authorizationActions);

  function formSubmitHandle(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      const userAuth: UserAuth = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      loginAction(userAuth);
    }
  }

  return (
    <>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>

      <div className="page page--gray page--login">
        <Header isHiddenNav />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form onSubmit={formSubmitHandle} className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
