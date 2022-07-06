import React, { useState, useEffect, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import { useSpring, animated as a } from "react-spring";
import { CitiesContext } from "../../contextReducers";
import { useParams } from "react-router-dom";
//TODO move this component
export function CarouselItem({ children }) {
  return (
    <div className="carousel-item">
      {children}
    </div>

  );
}

function Carousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);


  const { cities,
    setSelectedCity,
    selectedCity } = useContext(CitiesContext);
  const { city } = useParams()

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  useEffect(() => {
    setSelectedCity(cities[activeIndex]);
  }, [activeIndex]);

  //TODO binding is both ways right now. I need to think about selectedCity state and where it changes
  // How it flows down, and how this component decides to switch to the selected city
  useEffect(() => {
    if (typeof city === "string") {
      const activeCityIndex = cities.findIndex(o => o.name.toLowerCase() === city.toLowerCase());
      if (activeCityIndex !== undefined && activeCityIndex !== activeIndex) {
        updateIndex(activeCityIndex)
      }
    }

  }, [selectedCity])

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  }


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
      </div>
    </>
  );
}

export default Carousel;