import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'

const HomePage = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken')
    return navigate('/')
  }

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  if (!user) {
    return (
      <div>
        <h4>Log in to view this page.</h4>
      </div>
    )
  }

  const { id, email, username, favroute, password } = user

  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  }

  const userInfoStyles = {
    margin: '1rem',
    fontSize: '1.2rem',
  }

  return (
    <div style={styles}>
      <div>
        <h3>
          Welcome<span className="username"> @{username}</span>
        </h3>
        <h3>
          Your userId in mongo db is<span className="userId"> {id}</span>
        </h3>
        <h3>
          Your registered email is<span className="email"> {email}</span>
        </h3>
        <h3>
          Your favorite route is<span className="favroute"> {favroute}</span>
        </h3>
        <h3>
          Your password is<span className="password"> {password} ( hashed )</span>
        </h3>
      </div>
      <button onClick={(e) => handleClick(e)}>Log Out</button>
    </div>
  )
}

export default HomePage
