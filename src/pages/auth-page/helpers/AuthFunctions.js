import { supabase } from '../../../lib/QueryClient'

export const handleGoogleSignin = async ()=>{
    try {
        const {user,session,error} = await supabase.auth.signInWithOAuth(
            {
                provider:'google',
            }
        );
        if (error) {
            console.error('Error signing in with Google: ',error.message)
        }else{
            console.log('User: ',user),
            console.log('Session: ',session)
            return {user,session}
        }
    } catch (error) {
console.error('Unexpeced error occured signing in Google: ',error);     
return null;   
    }
}