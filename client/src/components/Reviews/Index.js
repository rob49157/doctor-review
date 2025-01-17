// import JSONDATA from './Doctordata.json'
import { Container, Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import Form from 'react-bootstrap/Form'
import React, { useState } from "react";
import { QUERY_SINGLEDOCTOR } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
// import { useState } from "react";
import Auth from "../../utils/auth";
import { ADD_THOUGHT } from "../../utils/mutations";
import './reviewstyle.css';

export default function Reviews() {
  const [addThought, { error }] = useMutation(ADD_THOUGHT);
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLEDOCTOR, {
    variables: { id },
  });
  let doctor;
  let doctorId;

  if (!loading) {
    doctor = data?.singledoctor;
    console.log(doctor);
    doctorId = doctor._id;
  }
  const [thoughtText, setThoughtText] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          doctorId,
          user: Auth.getProfile().data.email,
        },
      });

      setThoughtText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name) setThoughtText(value);
  };

  return loading ? (
    <div>loading</div>
  ) : (
    <Container>
      <Card className="review" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Header className="header" as="h5">{doctor.name}</Card.Header>

          <Card.Text>Practice: {doctor.practice}</Card.Text>
          <Card.Text>
            Years of experience: {doctor.yearsofexperience}years
          </Card.Text>
          <Card.Text>Location: {doctor.location}</Card.Text>
          
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="review">
              <Form.Control
                type="text"
                name="thoughtText"
                value={thoughtText}
                placeholder="Enter a Review"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {" "}
              Submit 💉{" "}
            </Button>
          </Form>
          
        </Card.Body>
        
      </Card>
      <h1>Reviews:</h1>
      {doctor.reviews.map((review) => (
      <Card className="reviewbox">
      <Card.Body>
        <Card.Header>{review.createat}</Card.Header>
        <Card.Text> {review.thoughtText}</Card.Text>
      </Card.Body>
    </Card>        
      ))}

    </Container>
  );
}
