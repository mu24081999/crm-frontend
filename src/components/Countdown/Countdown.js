import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = ({ startCount, onCountdownEnd }) => {
  const [countdown, setCountdown] = useState(startCount);
  const intervalRef = useRef(null);

  useEffect(() => {
    startCountdown();

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  const startCountdown = () => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setCountdown(startCount); // Reset the countdown to the initial value

    intervalRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          clearInterval(intervalRef.current);
          if (onCountdownEnd) {
            onCountdownEnd(); // Trigger the callback when countdown ends
          }
          return 0;
        }
      });
    }, 1000);
  };

  const resetCountdown = (newCount) => {
    setCountdown(newCount);
    startCountdown(); // Restart the countdown
  };

  return (
    <div>
      <p className="text-sm">Hold on {countdown} sec</p>
    </div>
  );
};

export default CountdownTimer;
