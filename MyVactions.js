import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function MyVactions() {
  const { value, setValue } = useContext(UserContext);
  const [loading, setLoading] = useState(false);//dont work
  const [products, setProducts] = useState([]);
  const [render, setrender] = useState(true);//work
  const [theId , settheId] = useState(0);  

const remove = async (e)=>{
    e.stopPropagation();
    if(loading === true){
        return console.log('hahahaah');
      }
    const id = e.target.id;
    console.log(id);
    settheId(id)
   setLoading(true)
}
useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.delete(
          `http://localhost:8080/followes/${theId}?withRelations=true`
        );
        setrender(true)
        return setLoading(false);
        
      } catch (error) {
        console.error(error);
        setrender(true)
        return setLoading(false);
      }
    };
    fetchData();
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/followes/${value}?withRelations=true`
        );
        setProducts(res.data);
        setrender(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [render]);


  return (
    <div>
        <div>
            <h1>My vacations</h1>
        </div>
    <div>
    
      <Row xs={1} md={2} className="g-4">
      {products.map(product => (
          <Card style={{ width: "18rem", marginRight: "30px" }}>
            <Card.Img variant="top" src={product.Products[0].img}/>
            <Card.Body>
              <Card.Title>{product.Products[0].Card_Title}</Card.Title>
              <Card.Text>{product.Products[0].text}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>time: {product.Products[0].time}</ListGroup.Item>
              <ListGroup.Item>money:{product.Products[0].money}</ListGroup.Item>
              <ListGroup.Item>return time:{product.Products[0].returntime}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button
                variant="primary"
                type="submit"
                onClick={remove}
                id={product.id}
              >
               remove
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
     
    </div>
    </div>
  );
}

export default MyVactions;
