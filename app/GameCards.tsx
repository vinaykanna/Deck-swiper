"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameCard from "./GameCard";

export const easeInExpo = [0.7, 0, 0.84, 0];
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeInOutExpo = [0.87, 0, 0.13, 1];

const initialCards = [
  {
    id: 1,
    affirmation: "More than 40% of car journeys are less than 3mi.",
  },
  {
    id: 2,
    affirmation:
      "On average, a French person produces more than 400kg of waste per year.",
  },
  {
    id: 3,
    affirmation:
      "A Paris-New York round trip emits more than 1.5 tons of CO2 per passenger.",
  },
  {
    id: 4,
    affirmation:
      "On average, a French person produces more than 400kg of waste per year.",
  },
  {
    id: 5,
    affirmation:
      "A Paris-New York round trip emits more than 1.5 tons of CO2 per passenger.",
  },
];

const GameCards = () => {
  const [cards, setCards] = useState(initialCards);
  const [direction, setDirection] = useState("");

  useEffect(() => {
    if (["left", "right"].includes(direction)) {
      const currentCard = cards[cards.length - 1];

      setCards(cards.slice(0, -1));

      setTimeout(() => {
        setCards((prevCards) => [currentCard, ...prevCards]);
      }, 700);
    }

    setDirection("");
  }, [direction]);

  const cardVariants = {
    first: {
      opacity: 1,
      y: 0,
      width: "100%",
      transition: { duration: 0.5, ease: easeOutExpo },
    },
    second: {
      opacity: 1,
      y: 15,
      width: "95%",
      transition: { duration: 0.5, ease: easeOutExpo, delay: 0 },
    },
    third: {
      opacity: 1,
      y: 30,
      width: "90%",
      transition: { duration: 0.5, ease: easeOutExpo, delay: 0 },
    },
    remainings: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? -1000 : 1000,
      rotate: direction === "left" ? -50 : 50,
      transition: { duration: 2, ease: easeOutExpo },
    },
  };

  const visibleCards = {
    [`${cards.length - 1}`]: "first",
    [`${cards.length - 2}`]: "second",
    [`${cards.length - 3}`]: "third",
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBlock: 100,
        paddingInline: 16,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "433px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AnimatePresence>
          {cards.map((card, i) => {
            return (
              <motion.div
                key={card.id}
                id={`card-${card.id}`}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  margin: "auto",
                }}
                variants={cardVariants}
                initial="remainings"
                animate={visibleCards[`${i}`]}
                exit="exit"
              >
                <GameCard data={card} setDirection={setDirection} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default GameCards;
