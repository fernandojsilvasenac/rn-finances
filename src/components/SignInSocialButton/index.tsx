import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Button, Text, ImageContainer } from './styles';

interface Props extends TouchableOpacityProps{
    title: string;
    svg: React.FC<SvgProps>;
}

// Ver com Diego esse problema de Tipagem.
export function SignInSocialButton({ title, svg: Svg, ...rest }: Props) {
    return (
        <Button {...rest}> 
            <ImageContainer>
                <Svg />
            </ImageContainer>
            
            <Text>{title}</Text>
        </Button>
    )
}