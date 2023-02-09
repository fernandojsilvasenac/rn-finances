import styled from 'styled-components/native';
import { RFPercentage } from "react-native-responsive-fontsize";

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
    background-color: ${({ theme }) => theme.colors.shape};
    height: ${RFPercentage(8)}px;
    border-radius: ${RFPercentage(1)}px;

    align-items: center;
    flex-direction: row;

    margin: ${RFPercentage(1)}px 0;
`;

export const Text = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFPercentage(1.8)}px;
`;

export const ImageContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;

    padding: ${RFPercentage(2)}px;
    border-color: ${({ theme }) => theme.colors.background};
    border-right-width: 1px;
`;