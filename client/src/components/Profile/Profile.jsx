import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProfile, getUsers } from '../../redux/actions/user';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(getProfile())
    
    }, []);
  

  return (
    <div>Profile</div>
  )
}

export default Profile;