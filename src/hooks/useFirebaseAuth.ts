import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  NextOrObserver,
  sendEmailVerification,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

interface IFirebaseAuth {
  authStatus: 'loading' | 'authenticated' | 'unauthenticated';
  formStatus?: 'submitting' | 'succeeded' | 'error';
  user?: User;
  errorText?: string;
}

export const useFirebaseAuth = () => {
  const [firebaseAuth, setFirebaseAuth] = useState<IFirebaseAuth>({ authStatus: 'loading' });

  const { authStatus, formStatus, user, errorText } = firebaseAuth;

  const authStateChanged: NextOrObserver<User> = async(user) => {
    if (user) {
      console.log('Login successfully');
      //const idToken = await user.getIdToken();
      //console.log('Id token: '+idToken);
      setFirebaseAuth((preState) => {
        return { ...preState, authStatus: 'authenticated', user: { ...user } };
      });
    } else {
      console.log('Logout successfully');
      setFirebaseAuth((preState) => {
        return { ...preState, authStatus: 'unauthenticated' };
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  const resetErrorStatus = useCallback(() => {
    setFirebaseAuth((preState) => {
      return { ...preState, formStatus: undefined, errorText: undefined };
    });
  }, []);

  const signOutFB = useCallback(() => {
    setFirebaseAuth((preState) => {
      return { ...preState, formStatus: 'submitting' };
    });

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Logout successfully');
        setFirebaseAuth({ authStatus: 'unauthenticated', formStatus: 'succeeded' });
      })
      .catch((error) => {
        // An error happened.
        console.log('Logout error');
        const errorMessage = error.message as string;
        setFirebaseAuth({ authStatus: 'unauthenticated', formStatus: 'error', errorText: errorMessage });
      });
  }, []);

  const sendEmailVerificationFB = useCallback(async () => {
    if (!auth.currentUser) return;
    const user: User = auth.currentUser;

    setFirebaseAuth((preState) => {
      return { ...preState, formStatus: 'submitting', user: { ...user } };
    });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'succeeded' };
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message as string;
        console.log('error.message: ' + errorMessage);
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'error', errorText: errorMessage };
        });
      });
  }, []);

  const sendPasswordResetEmailFB = useCallback((email: string) => {
    setFirebaseAuth((preState) => {
      return { ...preState, formStatus: 'submitting' };
    });

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'succeeded' };
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message as string;
        console.log('error.message: ' + errorMessage);
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'error', errorText: errorMessage };
        });
      });
  }, []);

  const createUserWithEmailAndPasswordFB = useCallback((email: string, password: string) => {
    setFirebaseAuth((preState) => {
      return { ...preState, formStatus: 'submitting' };
    });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        sendEmailVerification(user).then(() => {
          // Password reset email sent!
        });

        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'succeeded', user: { ...user } };
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message as string;
        console.log('error.message: ' + errorMessage);
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'error', errorText: errorMessage };
        });
      });
  }, []);

  const signInWithEmailAndPasswordFB = useCallback((email: string, password: string) => {
    setFirebaseAuth((preState) => {
      return { ...preState, formStatus: 'submitting' };
    });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'succeeded', user: { ...user } };
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message as string;
        console.log('error.message: ' + errorMessage);
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'error', errorText: errorMessage };
        });
      });
  }, []);

  const signInWithGoogleFB = useCallback(() => {
    setFirebaseAuth((preState) => {
      return { ...preState, formStatus: 'submitting' };
    });

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // // The signed-in user info.
        const user = result.user;
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'succeeded', user: { ...user } };
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message as string;
        console.log('error.message: ' + errorMessage);
        setFirebaseAuth((preState) => {
          return { ...preState, formStatus: 'error', errorText: errorMessage };
        });
      });
  }, []);

  return {
    authStatus,
    formStatus,
    user,
    errorText,
    resetErrorStatus,
    signOutFB,
    sendPasswordResetEmailFB,
    sendEmailVerificationFB,
    createUserWithEmailAndPasswordFB,
    signInWithEmailAndPasswordFB,
    signInWithGoogleFB,
  };
};
