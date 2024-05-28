import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function MyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태 변수
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  useEffect(() => {
    // 여기서는 간단한 예시로 로그인 상태를 로컬 스토리지에서 확인합니다.
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  useEffect(() => {
    // 로그인되어 있으면 바로 MyPage로 이동
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      // 로그인되어 있지 않으면 로그인 페이지로 이동
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return null; // 이 컴포넌트는 렌더링하지 않습니다.
}
