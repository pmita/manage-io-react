import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {
    //STATE
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    //useEFFECT for real time data documents
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((snapshot) => { //snapshot returns an unsubscribe method
            if(snapshot.data()){
                setDocument({ ...snapshot.data(), id : snapshot.id })
                setError(null);
            } else {
                setError('This document does not exist');
            }
        }, (err) => {
            console.log(err.message);
            setError('Failed to get document')
        })

        //clean-up function
        return () => unsubscribe()
    }, [collection, id])

    return { document, error };
}