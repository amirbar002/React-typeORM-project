import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ChangeCard() {
  const { register, handleSubmit } = useForm();
  const [cards, setCards] = useState([]);
  const [newcard, setnewcard] = useState([]);
  const [bol, setbol] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { idChange, setidChange } = useContext(UserContext);
  const {vacations, setvacations} = useContext(UserContext);
  const {changecard, setchangecard} = useContext(UserContext);

  const onSubmit = (data) => {
    console.log("submit");
    console.log(data,'dataaaaaaa');
      data.time = new Date().toISOString().slice(0, 10);
      data.returntime = new Date().toISOString().slice(0, 10);
    setnewcard(data);
    setbol(true)
  };

    useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(newcard,'newcard');
        const res = await axios.patch(
          `http://localhost:8080/products/${idChange}`, newcard);
        console.log(res, ' iii');
        setvacations(true)
        setchangecard(false)

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [bol]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/products/${idChange}`
        );
        console.log(res.data, "asasas");
        setCards([res.data]);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(cards, "hhhhhh");
      setIsVisible(true);
    }, 3000);
  }, []);



  return (
    <div>
      <Card style={{ width: "18rem" }}>
        {isVisible && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {cards.map((card) => (
                <div key={card.id}>
                  <Card.Img  variant="top" src={card.img}  />
                  <Card.Body>
                    <label>
                      image link
                      <input
                         defaultValue={card.img}
                        type="text"
                        placeholder={card.img}
                        {...register("img")}
                       />
                    </label>
                    <br />
                    <label>
                      When does the vacation start?
                      <input
                       defaultValue={card.time}
                        type="date"
                        placeholder={card.time}
                        value= {card.time}
                        {...register("time")}
                      />
                    </label>
                    <br />
                    <label>
                      Card Title
                      <input
                       defaultValue={card.Card_Title}
                        type="text"
                        placeholder={card.Card_Title}
                        {...register("Card_Title")}
                      />
                    </label>
                    <br />
                    <label>
                      vacation information
                      <textarea defaultValue={card.text} placeholder={card.text} {...register("text")} />
                    </label>
                    <br />
                    <label>
                      how much is cost
                      <input
                      defaultValue={card.money}
                        type="number"
                        placeholder={card.money}
                        {...register("money")}
                      />
                    </label>
                    <br />
                    <label>
                      When does the vacation end?
                      <input
                      defaultValue={card.returntime}
                        type="date"
                        placeholder={card.returntime}
                        {...register("returntime")}
                      />
                    </label>
                    <br />
                    <input type="submit" />
                  </Card.Body>
                </div>
              ))}
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

export default ChangeCard;
