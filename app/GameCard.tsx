"use client";

import { Dispatch, SetStateAction } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
  data: any;
  setDirection: Dispatch<SetStateAction<any>>;
};

const GameCard = ({ data, setDirection }: Props) => {
  const { affirmation } = data;
  const x = useMotionValue(0);
  const inputX = [50 * -1, 0, 50];
  const inputRotate = [150 * -1, 0, 150];
  const outputX = [-200, 0, 200];
  const outputRotate = [-40, 0, 40];
  const drivenX = useTransform(x, inputX, outputX);
  const drivenRotation = useTransform(x, inputRotate, outputRotate);

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          padding: 20,
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid red",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          rotate: drivenRotation,
          x: drivenX,
          transform: `translate3d()`,
        }}
      >
        <p>{affirmation}</p>
      </motion.div>
      <motion.div
        drag="x"
        dragSnapToOrigin
        dragElastic={0.2}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragEnd={(_, info) => {
          const boundary = 100;
          const isOffBoundary =
            info.offset.x > boundary || info.offset.x < -boundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            setDirection(direction);
          }
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          x,
          cursor: "grab",
        }}
      ></motion.div>
    </>
  );
};

export default GameCard;
