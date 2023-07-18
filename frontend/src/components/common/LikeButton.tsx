import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const LikeButton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onClick={() => setClicked((prev) => !prev)}
      style={{ cursor: "pointer" }}
    >
      {clicked ? <AiFillHeart /> : <AiOutlineHeart />}
    </div>
  );
};

export default LikeButton;
