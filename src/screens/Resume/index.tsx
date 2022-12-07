import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme} from 'styled-components';

import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { categories } from '../../Utils/categories';

import { 
    Container, 
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,

 } from './styles';

 export interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category:string;
    date: string;
}

export interface CategoryData{
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalsByCategory, setTotalsByCategory] = useState<CategoryData[]>([]);

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev'){
        if(action === 'next'){
            setSelectedDate(addMonths(selectedDate,1));
        } else {
            setSelectedDate(subMonths(selectedDate,1));
        }
    }

    async function loadData(){
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
  
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
        .filter( (expensive: TransactionData) => 
            expensive.type === 'negative' &&
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        )

        const totalByCategory: CategoryData[] =[];
        
        const expensivesTotal = expensives
        .reduce((acumulator:number, expensive:TransactionData) =>{
            return acumulator + Number(expensive.amount);
        }, 0)
        // console.log(expensivesTotal)

        categories.forEach(category =>{
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) =>{
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount)
                }
            })

            if (categorySum >0){
                const totalFormatted = categorySum
                .toLocaleString('pt-BR', {
                    style:'currency',
                    currency: 'BRL'
                })
                
                const percent = `${(categorySum / expensivesTotal*100).toFixed(0)}%`

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                    
                })
            }

        })
        // console.log(totalByCategory);

        setTotalsByCategory(totalByCategory)
    }    

    useEffect( () => {
        loadData();
    },[selectedDate])

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [selectedDate])
      )    

    return (
        <Container>
            <Header>
                <Title>Resumo por Categorias</Title>
            </Header>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: useBottomTabBarHeight()
                }}
            >

                <MonthSelect>
                    <MonthSelectButton onPress={() => handleDateChange('prev')}>
                        <MonthSelectIcon name="chevron-left" />
                    </MonthSelectButton>
                    <Month>
                        { format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
                    </Month>
                    <MonthSelectButton onPress={() => handleDateChange('next')}>
                        <MonthSelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>    


                <ChartContainer>
                    <VictoryPie 
                        data={totalsByCategory}
                        colorScale={totalsByCategory.map(category =>category.color)}
                        style={{
                            labels:{
                                fontSize:RFValue(17),
                                fontWeight:'bold',
                                fill: theme.colors.shape
                            }
                        }}
                        labelRadius={65}
                        x="percent"
                        y="total"
                    />
                </ChartContainer>
                { totalsByCategory.map(item =>(
                    <HistoryCard
                        key= {item.key}
                        title= {item.name}
                        amount= {item.totalFormatted}
                        color={item.color}
                    />
                    ))
                }
            </Content>
        </Container>    
    )
}

