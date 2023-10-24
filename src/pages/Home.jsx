import React from 'react'
import LatestPosts from '../components/Posts/LatestPosts'
import MainLayout from '../layouts/MainLayout'
import { Col, Container, Row } from 'react-bootstrap'

export default function Home() {
  return (
    <MainLayout>
        <Container fluid>
          <Row>
            <Col xs={12} lg={3} className='bg-primary'></Col>
            <Col xs={12} lg={6}><LatestPosts/></Col>
            <Col  xs={12} lg={3} className='bg-secondary'></Col>
          </Row>
        </Container>
    </MainLayout>
  )
}
