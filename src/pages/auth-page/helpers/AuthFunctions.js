import { supabase } from '../../../lib/QueryClient'

export const handleGoogleSignin = async ()=>{
    try {
        const {user,session,error} = await supabase.auth.signInWithOAuth({
            provider:'google',
          })
          
        if (error) {
            console.error('Error signing in with Google: ',error.message)
        }else{
            console.log('User: ',user),
            console.log('Session: ',session)
        }
    } catch (error) {
console.error('Unexpeced error occured signing in Google: ',error);  
    }
}


export const signOut = async()=>{
    const { error } = await supabase.auth.signOut()
    throw error
}