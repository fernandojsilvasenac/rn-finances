import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { DataListProps } from '.';
import { TouchableOpacity } from 'react-native';

// npm i react-native-iphone-x-helper --save
// import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
    flex:1;
    background-color: ${( {theme} ) => theme.colors.background};

`;

export const Header = styled.View`
    width:100%;
    background-color: ${( {theme} ) => theme.colors.blue};
    height: ${RFPercentage(42)}px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;

`;

export const UserGreething = styled.Text`
    color: ${( { theme } ) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${( { theme } ) => theme.fonts.regular};
`;

export const UserName = styled.Text`
    color: ${( { theme } ) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${( { theme } ) => theme.fonts.bold};

`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: ${RFValue(58)}px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
    /* iphone */
    /* margin-top: $(getStatusBarHeight) + ${RFValue(28)}px; */ 

export const Icon = styled(Feather)`
    color: ${( { theme } ) => theme.colors.orange};
    font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal:true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle:{paddingLeft:24}
})`
    flex-direction:row;
    width:100%;

    position:absolute;
    margin-top: ${RFPercentage(24)}px;
`;

export const Transactions = styled.View`
    flex:1;
    padding: 0 24px;

    margin-top: ${RFPercentage(18)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${( { theme } ) => theme.fonts.regular};

    margin-bottom: 16px;
`;

// export const TransactionList = styled.FlatList.attrs({
//     showsVerticalScrollIndicator:false,
// })``;

export const TransactionList = styled(
    FlatList as new () => FlatList<DataListProps>
    ).attrs({
    showsVerticalScrollIndicator:false,
})``;

export const LoadContainer = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
`;

export const LogoutButton = styled.TouchableOpacity``;