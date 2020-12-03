import React from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'

const About = () => (
  <div>
    <Grid>
      <h2>About anecdote app</h2>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <div>
            <p>According to Wikipedia:</p>

            <em>An anecdote is a brief, revealing account of an individual person or an incident.
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

            <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
          </div>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <div>
            <Image src='https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg' alt='Alan Turing' width='176' height='240' />
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
)

export default About