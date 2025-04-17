import { useState } from "react";
import useMedia from 'use-media'

import { Desktop } from "./desktop.tsx"
import { Mobile } from "./mobile.tsx"


const Main = () => {
  const [selectedFloor, setSelectedFloor] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const isDesktop = useMedia({ minWidth: 800 })
  const isMobile = useMedia({ maxWidth: 800 })

  return (
      <>
        {isDesktop && 
          <Desktop 
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        }

        {isMobile && 
          <Mobile 
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        }
      </>
  );
};

export default Main;
