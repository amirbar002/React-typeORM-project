import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { UserContext } from "./UserContext";
import BsTrashFill from "react-icons/fa";

function Vacatinos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cards, setCards] = useState([]);
  const [addcard, setaddcard] = useState(true);
  const [cardId, setCardId] = useState("");
  const [loading, setLoading] = useState(false);
  const { value, setValue } = useContext(UserContext);
  const [isVisible, setVisibility] = useState(true);
  const [removeItem, setRemoveItem] = useState(false);
  const { isAdmin, setisAdmin } = useContext(UserContext);
  const { changecard, setchangecard } = useContext(UserContext);
  const { idChange, setidChange } = useContext(UserContext);
  const {  vacations, setvacations } = useContext(UserContext);

  const onclickk = (e) => {
    e.stopPropagation();
    if (loading === true) {
      return console.log("hahahaah");
    }
    const id = e.target.id;
    console.log("onclickkkkkkkkkkk", id);
    setCardId(id);
    setLoading(true);
  };

  const remove = (e) => {
    e.stopPropagation();
    if (removeItem === true) {
      return console.log("lalal");
    }
    const id = e.target.id;
    console.log("remove", id);
    setCardId(id);
    setRemoveItem(true);
  };

  const change = (e) => {
    setvacations(false)
    setchangecard(true);
    setidChange(e.target.id);
    console.log("change", e.target.id);
  };

  useEffect(() => {
    if (isAdmin === true) {
      return setaddcard(false);
    }
    return console.log("noo");
  }, []);

  useEffect(() => {
    const id = cardId;
    console.log("id", id);
    const fetchData = async () => {
      try {
        const res = await axios.delete(`http://localhost:8080/products/${id}`);
        console.log(res);
        return setRemoveItem(false);
      } catch (error) {
        console.error(error);
        return setRemoveItem(false);
      }
    };
    fetchData();
  }, [removeItem]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/products/");
        setCards(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) return;
    console.log("add folowes");
    const obj = { personId: value, productId: cardId, products: cardId };
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:8080/followes/", obj);
        // setCards(res.data);
        console.log(res.data);
        return setLoading(false);
      } catch (error) {
        console.error(error);
        return setLoading(false);
      }
    };
    fetchData();
  }, [loading]);

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {cards.map((card) => (
          <Card style={{ width: "18rem", marginRight: "30px" }}>
            <Card.Img variant="top" src={card.img} />
            <Card.Body>
              <Card.Title> {card.card_Title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>time: {card.time}</ListGroup.Item>
              <ListGroup.Item>money: {card.money}</ListGroup.Item>
              <ListGroup.Item>return time: {card.returntime}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              {addcard && (
                <Button
                  variant="primary"
                  type="submit"
                  onClick={onclickk}
                  id={card.id}
                >
                  ADD THIS Vacatinos
                </Button>
              )}
              <br></br>
              {isAdmin && (
                <Button className="Tochange" onClick={change} id={card.id}>
                  To change
                </Button>
              )}
            </Card.Body>
            {/* </form> */}
            {isAdmin && (
              <Button
                className="delete"
                variant="primary"
                type="submit"
                onClick={remove}
                id={card.id}
              >
                delete
              </Button>
            )}
          </Card>
        ))}
      </Row>
    </div>
  );
}

export default Vacatinos;
