"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const beams = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: 100, translateX: 100, duration: 7, repeatDelay: 7, className: "h-6" },
    { initialX: 400, translateX: 400, duration: 5, repeatDelay: 14, delay: 4 },
    { initialX: 800, translateX: 800, duration: 11, repeatDelay: 2, className: "h-20" },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-[40vh] sm:h-[80vh] md:h-[80vh] lg:h-[90vh] w-full rounded-xl mt-4 p-5 bg-white dark:from-neutral-950 dark:to-neutral-800 relative flex flex-col items-center justify-center overflow-hidden shadow-amber-100 shadow-2xl",
        className
      )}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full z-10">{children}</div>}
    </div>
  );
};

const CollisionMechanism = React.forwardRef(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef(null);
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (<>
    <motion.div
      key={beamKey}
      ref={beamRef}
      animate="animate"
      initial={{
        translateY: beamOptions.initialY || "-200px",
        translateX: beamOptions.initialX || "0px",
        rotate: beamOptions.rotate || 0,
      }}
      variants={{
        animate: {
          translateY: beamOptions.translateY || "1800px",
          translateX: beamOptions.translateX || "0px",
          rotate: beamOptions.rotate || 0,
        },
      }}
      transition={{
        duration: beamOptions.duration || 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: beamOptions.delay || 0,
        repeatDelay: beamOptions.repeatDelay || 0,
      }}
      className={cn(
        "absolute left-0 top-20 m-auto h-14 w-px p-2 rounded-full bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent",
        beamOptions.className
      )} />
      <motion.div
  key={beamKey + "-duplicate"} 
      ref={beamRef}
      animate="animate"
      initial={{
        translateY: beamOptions.initialY || "-200px",
        translateX: beamOptions.initialX || "0px",
        rotate: beamOptions.rotate || 0,
      }}
      variants={{
        animate: {
          translateY: beamOptions.translateY || "1800px",
          translateX: beamOptions.translateX || "0px",
          rotate: beamOptions.rotate || 0,
        },
      }}
      transition={{
        duration: beamOptions.duration || 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: beamOptions.delay || 0,
        repeatDelay: beamOptions.repeatDelay || 0,
      }}
      className={cn(
        "absolute left-0 top-20 m-auto h-14 w-px p-2 rounded-full bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent",
        beamOptions.className
      )} />
    <AnimatePresence>
      {collision.detected && collision.coordinates && (
        <Explosion
          key={`${collision.coordinates.x}-${collision.coordinates.y}`}
          className=""
          style={{
            left: `${collision.coordinates.x}px`,
            top: `${collision.coordinates.y}px`,
            transform: "translate(-50%, -50%)",
          }} />
      )}
    </AnimatePresence>
  </>);
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({
  ...props
}) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    (<div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-orange-500 to-yellow-500" />
      ))}
    </div>)
  );
};
