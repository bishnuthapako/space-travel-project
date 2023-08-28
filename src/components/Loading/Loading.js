import {useState, useEffect} from "react";

import styles from "./Loading.module.css";

function Loading ()
{
  const [dots, setDots] = useState([]);

  console.log(dots, 'dots')
  useEffect(() =>
            {
              setTimeout(() =>
                         {
                           if (dots.length < 5)
                           {
                             setDots(prevDots => [...prevDots, "."]);
                           }
                         },
                         200
              );
            },
            [dots]
  );

  return (
    <div className={styles["loading"]}>
      <span>Loading</span>
      {dots.map((dot, index) => <span key={index}>{dot}</span>)}
    </div>
  );
}

export default Loading;
