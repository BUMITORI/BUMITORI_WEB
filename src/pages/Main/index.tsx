import { useState, useEffect } from "react";
import useMedia from 'use-media'
import { Desktop } from "./desktop.tsx"
import { Mobile } from "./mobile.tsx"
import axios from "axios";

// API에서 받을 데이터 형태
interface StudentFromApi {
  name: string;
  roomPrefix: string;
  roomNumber: string;
  gender: string;
  enterStatus: string; // now string, e.g., "NON_ENTER
  enterTime: string | null; // can be null
}

const Main = () => {
  const [selectedFloor, setSelectedFloor] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [studentList, setStudentList] = useState<StudentFromApi[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoading(true);
        console.log("Making API request to:", "/api");
        console.log("Cookies before request:", document.cookie);
        
        const { data } = await axios.get("https://bumitori.duckdns.org:8080/", {
          withCredentials: true
        });
        
        // API 응답이 배열인지 확인하고 안전하게 설정
        const studentData = Array.isArray(data) ? data : [];
        setStudentList(studentData);
        console.log("API Response:", data);
        console.log("API Response Type:", typeof data);
        console.log("API Response is Array:", Array.isArray(data));
        console.log("Processed student data:", studentData);
        console.log("Current cookies:", document.cookie);
        console.log("First student data:", studentData[0]);
        setIsError(false);
      } catch (err) {
        console.error("API Error:", err);
        setIsError(true);
        setStudentList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchList();
  }, []);

  const isDesktop = useMedia({ minWidth: 900 })
  const isMobile = useMedia({ maxWidth: 900 })

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
            isLoading={isLoading}
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
            isLoading={isLoading}
          />
        }
      </>
  );
};

export default Main;
