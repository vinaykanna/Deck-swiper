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
  const offsetBoundary = 50;
  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const drivenX = useTransform(x, inputX, outputX);
  const drivenY = useTransform(x, inputX, outputY);
  const drivenRotation = useTransform(x, inputX, outputRotate);

  return (
    <>
      <motion.div
        className=""
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
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <p>{affirmation}</p>
      </motion.div>
      <motion.div
        drag="x"
        dragSnapToOrigin
        dragElastic={0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragEnd={(_, info) => {
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
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
