import React, { useState, useEffect } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { categories } from '../../Utils/categories';

import { 
    Container, 
    Header,
    Title,
 } from './styles';

 export interface TransactionCard {
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
}

export function Resume(){
    const [totalsByCategory, setTotalsByCategory] = useState<CategoryData[]>([]);

    async function loadData(){
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
  
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
        .filter( (expensive: TransactionCard) => expensive.type === 'negative')

        const totalByCategory: CategoryData[] =[];

        categories.forEach(category =>{
            let categorySum = 0;

            expensives.forEach((expensive: TransactionCard) =>{
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
                
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted
                    
                })
            }

        })
        console.log(totalByCategory);

        setTotalsByCategory(totalByCategory)
    }    

    useEffect( () => {
        loadData();
    },[])

    return (
        <Container>
            <Header>
                <Title>Resumo por Categorias</Title>
            </Header>
            <HistoryCard
                title='Compras'
                amount='R$ 150,99'
                color='blue'
            />
        </Container>    
    )
}

