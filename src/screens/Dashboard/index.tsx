import React, {useState, useEffect, useCallback } from 'react'
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { 
  Container, 
  Header,
  UserInfo,
  Photo,
  User,
  UserGreething,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,

} from './styles';

export interface DataListProps extends TransactionCardProps{
  id: string;
}

interface HighlightProps{
  amount: string;
}

interface HighlightData{
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

    async function loadTransaction(){
      const dataKey = "@gofinances:transactions";
      const response = await AsyncStorage.getItem(dataKey);

      const transactions = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let expensiveTotal = 0;

      const transactionsFormatted: DataListProps[] = transactions
      .map( (item:DataListProps) => {
        
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }
        
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      })

      setTransactions(transactionsFormatted)
      console.log(transactionsFormatted)
      const total = entriesTotal - expensiveTotal;

      setHighlightData({
        entries:{
          amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        }, 
        expensives:{
          amount: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })

        },
        total:{
          amount: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })

        }
      })
      setIsLoading(false);
    }

    useEffect(() => {
      loadTransaction();
      //limpar a lista
      // const dataKey = "@gofinances:transactions";
      // AsyncStorage.removeItem(dataKey);
    },[])

    useFocusEffect(
      useCallback(() => {
        loadTransaction();
      }, [])
    )

    return (
      <Container>
        {
          isLoading ?
            <LoadContainer>
              <LoadingAnimation />
            </LoadContainer>
            :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo 
                    source={ {uri:'https://avatars.githubusercontent.com/u/37640000?v=4'} }
                  />
                  <User>
                    <UserGreething>Olá,</UserGreething>
                    <UserName>Fernando</UserName>
                  </User>
                </UserInfo>

                <Icon name="power" />

              </UserWrapper>
            </Header>
            <HighlightCards>
              <HighlightCard 
                type="up"
                title='Entradas'
                amount={highlightData?.entries?.amount}
                lastTransaction='Última entrada dia 13 de abril'
              />
              <HighlightCard 
                type="down"
                title='Saidas'
                amount={highlightData?.expensives?.amount}
                lastTransaction='Última saída dia 03 de abril'
              />
              <HighlightCard 
                type="total"
                title='Total'
                amount={highlightData?.total?.amount}
                lastTransaction='01 à 16 de abril'
              />
            </HighlightCards>
            <Transactions>
              <Title>Listagem</Title>
              <TransactionList 
                data={transactions}
                keyExtractor={ item => item.id}
                renderItem={
                  ( { item }) => 
                  <TransactionCard data={item} />
                }
                
              />
            </Transactions>
          </>
        }
      </Container>
    )
}