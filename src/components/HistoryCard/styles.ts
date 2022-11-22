import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width:100%;
    background-color: ${ ( {theme}) => theme.colors.shape}
    flex-direction: row;
    justify-content: space-between
    padding: 13px 24px;
    border-radius: 5px;
    border-left-width:4px;

    border-left-color: ${( {theme}) => theme.colors.blue }

`;

export const Title = styled.Text`
    font-family: ${({ theme}) => theme.fonts.regular };
    font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
    font-family: ${({ theme}) => theme.fonts.bold };
    font-size: ${RFValue(15)}px;
`;
