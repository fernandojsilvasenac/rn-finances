import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
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

} from './styles';

export function Dashboard() {
    return (
      <Container>
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
          <HighlightCard />
          <HighlightCard />
          <HighlightCard />
        </HighlightCards>
      </Container>
    )
}