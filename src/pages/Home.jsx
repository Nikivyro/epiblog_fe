import React from 'react'
import LatestPosts from '../components/Posts/LatestPosts'
import MainLayout from '../layouts/MainLayout'
import { Col, Container, Row } from 'react-bootstrap'

export default function Home() {
  return (
    <MainLayout>
      <LatestPosts/>
    </MainLayout>
  )
}
