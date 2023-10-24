import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

export default function PostDetail() {
    const postId = useParams()

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Link to='/'>Torna alla home</Link>
                </Col>
                <Col xs={12}>
                    <div>PostDetail of {postId.postId}</div>
                </Col>
            </Row>
        </Container>
    )
}
