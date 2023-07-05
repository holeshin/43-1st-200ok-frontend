import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import auth, { signInWithEmailAndPassword } from '../../fConfig';
import './Login.scss';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userInfo;

  const navigate = useNavigate();

  const idCondition = email.includes(('@', 4) && '.com');
  const pwCondition = password.length >= 5;

  const updateUserInfo = e => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const enterKeyUp = event => {
    if (event.keyCode === 13) {
      login();
    }
  };

  const login = async () => {
    try {
      let data = await signInWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem('token', JSON.stringify(user));
          localStorage.setItem(
            'user',
            JSON.stringify(user.email.substring(0, user.email.indexOf('@')))
          );
          navigate('/');
        }
      });
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('비밀번호가 틀립니다.');
        setUserInfo(prevState => ({ ...prevState, password: '' }));
      } else if (error.code === 'auth/user-not-found') {
        alert('회원가입 해주세요');
        navigate('/SignUp');
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <section className="login" onKeyUp={enterKeyUp}>
      <form className="loginForm">
        <Link to="/">
          <img className="mainLogo" src="images/logo.png" alt="mainLogo" />
        </Link>
        <div>
          <input
            className="idInput"
            type="text"
            placeholder="이메일을 입력하세요."
            onChange={updateUserInfo}
            name="email"
            value={email}
          />
          <input
            className="pwInput"
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={updateUserInfo}
            name="password"
            value={password}
          />
          <div className="saveEmail">
            <input type="checkbox" />
            <label>이메일 저장</label>
          </div>
          <span>
            <button
              className={
                idCondition && pwCondition ? 'activeButton' : 'unActiveButton'
              }
              type="button"
              disabled={!idCondition || !pwCondition}
              onClick={login}
            >
              로그인 하기
            </button>
          </span>
          <div>
            <a className="signUp" href="/signup">
              회원가입
            </a>
            <a className="lostAccounts" href="/lostAccounts">
              이메일, 비밀번호 찾기
            </a>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
