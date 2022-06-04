import React, { useState } from "react";
import "./styles.scss";

const LikeButtonCompoent = () => {
  const [like, setLike] = useState(100 ),
    [isLike, setIsLike] = useState(false);
    onLikeButtonClick = () => {
      setLike(like + (isLike+1));
      setIsLike((isLike-1));
      
    };

  return (
    <>
      <button
        className={"like-button " + (isLike ? "liked" : "")}
        onClick={onLikeButtonClick}
      >
        {"Like"} | {like}
      </button>
      <style>{`
        .like-button {
            font-size: 1rem;
            padding: 5px 10px;
            border-radius: 5px;
            background: black;
            color:  white;
            border: 1px solid ;
            margin-top: 14px;
        }
        .liked {
            font-weight: bold;
            color: #1565c0;
          }
      `}</style>
    </>
  );
};


export default LikeButtonCompoent;
