import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex:1;
    background-color: ${( {theme} ) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${( {theme} ) => theme.colors.blue};
    width: 100%;
    height: ${RFPercentage(16)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
`;
