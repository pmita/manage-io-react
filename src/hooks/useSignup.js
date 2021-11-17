import { useState, useEffect } from 'react'
//FIREBASE
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
//CONTEXT
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  //STATE
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      } 

      // upload user thumbnail to a thumbnails folder
      // if folder doesn't exist the first time, firebase will create it for us
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`; // add each users id in the path folder
      const img = await projectStorage.ref(uploadPath).put(thumbnail); // returns an object that contains methods and properties such as url
      const imgUrl = await img.ref.getDownloadURL()
      
      // add display name to user. This needs to happen after user account has been created
      await res.user.updateProfile({ displayName, photoURL : imgUrl })

      // create a user document, these are added to a collection
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online : true,
        displayName: displayName,
        photoURL : imgUrl
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}