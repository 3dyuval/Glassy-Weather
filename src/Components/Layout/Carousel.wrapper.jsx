import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useSpring, animated as a } from "react-spring";
import "../../SCSS/Carousel.scss";

export function CarouselItem({ children, width }) {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
}

function Carousel({ children, cityList, setCurrentCity }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setCurrentCity(cityList[activeIndex].name);
  }, [activeIndex]);

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  const contentProps = useSpring({
    translateX: `-${activeIndex * 100}%`,
  });
  return (
    <>
      <div {...handlers} className="carousel">
        <a.div
          className="inner"
          style={contentProps}
        >
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: "100%" });
          })}
        </a.div>
      </div>
      <div className="indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (children, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Carousel;
