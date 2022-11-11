import React from 'react';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category:string;
  date: string;
}

export interface Category{
  name: string;
  icon: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  return (
      <Container>
          <Title>{data.name}</Title>
          <Amount type={data.type}>
            { data.type === 'negative' && '- '}
            {data.amount}
          </Amount>
          <Footer>
            <Category>
              <Icon name={data.category.icon}></Icon>
              <CategoryName>{data.category.name}</CategoryName>
            </Category>
            <Date>{data.date}</Date>
          </Footer>
      </Container>
  )
}

