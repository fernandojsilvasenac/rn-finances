import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { 
    Container,
    Header,
    Title,
    TitleWrapper,
    SignInTitle,
    Footer,
    FooterWrapper,
    Load
} from './styles';

import { RFPercentage } from "react-native-responsive-fontsize";

// import { useAuth } from '../../hooks/auth';

//https://github.com/kristerkari/react-native-svg-transformer
//https://github.com/react-native-svg/react-native-svg#installation

// 1 tipar os arquivos .svg
// criar pasta @types/svg
// 2 criar o component /components/SignInSocialButton
import Logo from '../../assets/svg/logo.svg';
import Google from '../../assets/svg/google.svg';
import Apple from '../../assets/svg/apple.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';

export function SignIn(){
    // const [isLoading, setIsLoading] = useState(false);
    // const { signInWithGoogle, signInWithApple } = useAuth();

    // const hanleSignInWithGoogle = useCallback(async () => {
    //     setIsLoading(true);
    //     try {
    //         await signInWithGoogle();
    //     } catch (error) {
    //         console.log(error);
    //     }    
    // }, [setIsLoading]);  

    return (
        <Container>
            <Header>    
                <TitleWrapper>                            
                <Logo width={RFPercentage(20)}/>

                <Title>
                    Controle suas {'\n'}
                    finanças de forma {'\n'}
                    muito simples
                </Title>  
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>                           
            </Header>

            <Footer>
                <FooterWrapper>                  
                    <SignInSocialButton 
                        title="Entrar com Google" 
                        svg={Google}
                        onPress={() => { }}
                    />  

                    {
                        Platform.OS === 'ios' &&
                        <SignInSocialButton 
                            title="Entrar com Apple" 
                            svg={Apple}
                            onPress={() => { }}
                        />                
                    }
                </FooterWrapper>

               {/* { isLoading && <Load/> } */}
            </Footer>          
        </Container>
    )
}