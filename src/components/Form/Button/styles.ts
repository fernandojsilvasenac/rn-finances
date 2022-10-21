import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity).attrs(({theme}) => ({
    placeholderTextColor: theme.colors.text,
  }))`
    width:100%;
    padding: 18px;
    border-radius:5px;
    background-color: ${({theme})=> theme.colors.orange};

    align-items:center;

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.shape};

`
