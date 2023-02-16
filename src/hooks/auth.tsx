import React, { 
    createContext, 
    useContext,
    ReactNode,
    useState
 } from 'react';

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode;
} 

interface User {
    id: string,
    name: string,
    email: string,
    photo?: string,
}

interface IAuthContentData{
    user: User;
    signInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse{
    params:{
        access_token: string;
    }
    type: string;
}

const AuthContext = createContext({} as IAuthContentData);

function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<User>({} as User);

    async function signInWithGoogle(){
        try{
            const CLIENT_ID ='1098531278733-8c3lobkbkvhbhdsva2rcoskj7kfv9r2m.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@fernandojsilvasenac/rnfinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const response = await AuthSession.startAsync({ authUrl });

            console.log(response);
            // const {type, params } = await AuthSession
            // .startAsync({ authUrl}) as AuthorizationResponse;
            console.log(response.type)
            console.log(response.params.access_token);
            // if(response.type === 'success'){
            //     const result = await fetch(`https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.params.access_token}`);
            //     const userInfo = await result.json();
            //     console.log(userInfo);
            //     setUser({
            //         id: userInfo.id,
            //         email: userInfo.email,
            //         name: userInfo.name,
            //         photo: userInfo.picture
            //     })
            // }

        } catch (error) {
            throw new Error(error);
        }
    }

    return(
        <AuthContext.Provider value={{ 
            user, 
            signInWithGoogle
        }}>
          { children }
        </AuthContext.Provider>         
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}


export { AuthProvider, useAuth }