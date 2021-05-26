import React from 'react'
import { ProjectListScreen } from './screens/project-list'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { useAuth } from './context/auth-content'
import { Row } from './components/lib'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft gap={true}>
          <h2>logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
          <h2>anther</h2>
        </HeaderLeft>
        <Button type={'primary'} onClick={logout}>
          登出
        </Button>
      </Header>
      {/*<Nav>nav</Nav>*/}
      <Main>
        <ProjectListScreen />
      </Main>
      {/*<Aside>aside</Aside>*/}
      {/*<Footer>footer</Footer>*/}
    </Container>
  )
}

// const PageHeader = styled.header`
//   height: 6rem;
//   background-color: aliceblue;
// `
//
// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `

const Container = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  height: 100vh;
`
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled(Row)``
const Main = styled.main`
  grid-area: main;
`
const Nav = styled.nav`
  grid-area: nav;
`
const Aside = styled.aside`
  grid-area: aside;
`
const Footer = styled.footer`
  grid-area: footer;
`
const HeaderItem = styled.h3`
  margin-right: 3rem;
`
