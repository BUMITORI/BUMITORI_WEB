import { useState, useEffect } from "react";
import useMedia from 'use-media'
import { Desktop } from "./desktop.tsx"
import { Mobile } from "./mobile.tsx"
import axios from "axios";

const Main = () => {
  const [selectedFloor, setSelectedFloor] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [studentList, setStudentList] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + "/", {
          withCredentials: true
        });
        setStudentList(data);
        console.log(data);
        setIsError(false);
      } catch (err) {
        setIsError(true);
      }
    };
    fetchList();
  }, []);

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
            studentList={studentList}
            isError={isError}
          />
        }
        {isMobile && 
          <Mobile 
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            studentList={studentList}
            isError={isError}
          />
        }
      </>
  );
};

export default Main;
