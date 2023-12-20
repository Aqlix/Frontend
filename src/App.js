import React, { useState } from 'react';
import './App.css';
import ImageSlider from './imageSlider';

const App = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });

  const [userId, setUserId] = useState(null);
  const [savedUsers, setSavedUsers] = useState([]); //handle sve chlne pr, ye update hoga wiht new data

  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const [imageFile, setImageFile ] = useState(null);

  const handleimg = (e) => { setImageFile(e.target.files[0]) }
  //  console.log(imageFile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  // console.log(userData)
  // register- vali API
  const handleSave = async () => {
    console.log(userData)
    try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('fullName', userData.fullName);
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    console.log(formData)
      const response = await fetch(' http://localhost:5000/register', {
        method: 'POST',
      
        // body: JSON.stringify(formData)
        body: formData
      });

      const data = await response.json();
      console.log('User saved:', data);
      setUserId(data._id);
      setSavedUsers([...savedUsers, data]);

      setUserData({
        fullName: '',
        username: '',
        email: '',
        password: ''
      });
      setImageFile(null);


    } catch (error) {
      console.error('Error saving user :', error);
    }
    
  };
  // 
  const handleUpdate = async () => {
    try {
      if (!userId) {
        console.error('User ID not available.');
        return;
      }

      const response = await fetch(` http://localhost:5000/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log(' updated data::', data);


      //     setSavedUsers(savedUsers.map((user) => (user._id === userId ? data : user)));

      //     setIsUpdateFormOpen(false);
      //   } catch (error) {
      //     console.error('Error updating user:', error);
      //   }
      // };



      setSavedUsers(savedUsers.map((user) => (user._id === userId ? data : user)));

      setIsUpdateFormOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleUpdateUser = (user) => {
    setUserData({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      password: user.password
    });

    setUserId(user._id);
    setIsUpdateFormOpen(true);
  };

  return (
    <>
    <div className="container">
      <h1>(Check console for API responses)</h1>
      <div className="form-group">
        <label>Profile Photo:</label>
        <input type='file' name="file" onChange={handleimg} />

      </div>
      <div className="form-group">
        <label>Full Name:</label>
        <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" name="username" value={userData.username} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" name="email" value={userData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="text" name="password" value={userData.password} onChange={handleChange} />
      </div>

      <button className="btn" onClick={handleSave}>
        Save User
      </button>


      {savedUsers.length > 0 && (
        <div className="saved-users">
          <h2>Saved Users</h2>
          {savedUsers.map((user, index) => (
            <div key={index} className="user-post">
           <img className='' src={`http://localhost:5000/uploads/${user.image}`} alt="USERPic" />
              <p>Full Name: {user.fullName}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>

              <button className="btn btn-update" onClick={() => handleUpdateUser(user)}>
                Update User
              </button>
            </div>
          ))}
        </div>
      )}



      {isUpdateFormOpen && (
        <div className="update-form">
          <h2>Update User</h2>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" name="email" value={userData.email} onChange={handleChange} />
          </div>

          <button className="btn" onClick={handleUpdate}>
            Update User
          </button>
          <button className="btn btn-cancel" onClick={() => setIsUpdateFormOpen(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
    <div>
    {/* <ImageSlider /> */}
    </div>
    </>
  );
};

export default App;
