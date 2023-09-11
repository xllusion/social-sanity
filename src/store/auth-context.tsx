import axios from 'axios';
import { User } from 'firebase/auth';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { IUser } from '../../types';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { client } from '../utils/client';

interface IAuthContext {
  userProfile?: IUser;
  user?: User;
  allUsers: IUser[];
  authStatus: 'loading' | 'authenticated' | 'unauthenticated';
  formStatus?: 'submitting' | 'succeeded' | 'error';
  errorText?: string;
  resetErrorStatus: () => void;
  signOutFB: () => void;
  sendEmailVerificationFB: () => void;
  sendPasswordResetEmailFB: (email: string) => void;
  createUserWithEmailAndPasswordFB: (email: string, password: string) => void;
  signInWithEmailAndPasswordFB: (email: string, password: string) => void;
  signInWithGoogleFB: () => void;
  fetchAllUsers: () => void;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<undefined | IUser>(undefined);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const firebaseAuth = useFirebaseAuth();
  const { authStatus, user, signOutFB } = firebaseAuth;

  const fetchAllUsers = useCallback(async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
    setAllUsers([...response.data]);
  }, []);

  useEffect(() => {
    if (authStatus === 'authenticated' && user?.emailVerified && !userProfile) {
      const newUserProfile = {
        _id: user.uid,
        _type: 'user',
        userName: user.displayName ? user.displayName : 'Your Name',
        image: user.photoURL ? user.photoURL : '/img/user.png',
      };

      // Create user profile on sanity if not exists
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userprofile`, newUserProfile)
        .then((res) => {
          console.log(res.data);
          setUserProfile(newUserProfile);
        })
        .catch((err) => {
          console.log(err.data);
          signOutFB();
        });

    } else if (authStatus === 'unauthenticated') {
      setUserProfile(undefined);
    }
  }, [authStatus, signOutFB, user, userProfile]);

  return <AuthContext.Provider value={{ ...firebaseAuth, userProfile, allUsers, fetchAllUsers }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
