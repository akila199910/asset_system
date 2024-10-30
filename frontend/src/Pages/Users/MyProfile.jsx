import React, { useEffect, useState } from 'react';
import { myProfileApi } from '../../Api/UsersApi/MyProfileApi';
import Navbar from '../../Components/Navbar/Navbar';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await myProfileApi();
        setUser(data.data.user); 
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (

    <div className="flex flex-col w-full h-screen">
      <Navbar/>
      {user &&
       (
        <div>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>Status:</strong> {user.status ? 'Active' : 'Inactive'}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {user.profile && (
            <div>
              <p><strong>Profile Picture:</strong></p>
              <img src={user.profile.profilePic} alt="Profile" />
            </div>
          )}
        </div>
        
        
      )
      
      }
    </div>
  );
};

export default MyProfile;
