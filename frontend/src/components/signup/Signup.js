import { React, useState, useEffect } from 'react'
import './Signup.css'
import { Navigate, useNavigate } from 'react-router-dom'

const Signup = ({setFlag}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchPortfolioManagers();
  }, []);

  const fetchPortfolioManagers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/portfolio-managers');
      const data = await response.json();
      // console.log(data)
      setManagers(data);
    } catch (error) {
      console.error('Error fetching Portfolio Managers:', error);
    }
  };

  const handleUserName = (event) => {
    const { name, value } = event.target;
    setUserName(value);
  };

  const handlePassword = (event) => {
    const { name, value } = event.target;
    setPassword(value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userName)
    console.log(password)
    console.log(isChecked)

    if(isChecked == true){
      if(userName == 'admin' && password == 'admin'){
        alert('Welcome admin... ')
        setFlag(true)
        navigate('/admin')
      }
      else{
        alert('Incorrect login credentials')
      }
    }
    else{
      var x = false;
      console.log("user")
      managers.forEach((manager) => {
        if(manager.email == userName && manager.password == password){
          console.log('matched')
          x = true
          alert('Welcome... ')
          navigate('/home')
          
        }
      })
      if(x == false){
        alert('Incorrect login credentials')
      }
    }

  };






  return (
    <div className='full-cont'>

      <div className='message-cont'>
        <div className='welcome-cont'>
          Welcome to Project Management Application
        </div>
        <div className='h3-cont'>
          <h3>SignIn as Admin/Manager</h3>
        </div>
      </div>

      <div className='form-contt'>
        <form className="form" onSubmit={handleFormSubmit}>
          <p className="heading">Login</p>
          <input className="input" placeholder="Username" type="text" onChange={handleUserName} />
          <input className="input" placeholder="Password" type="password" onChange={handlePassword} />
          <div class="custom-control custom-checkbox">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} style={{ marginTop: '8px' }} />
            <label htmlFor="myCheckbox" style={{ marginLeft: '10px' }}>As admin</label>
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup