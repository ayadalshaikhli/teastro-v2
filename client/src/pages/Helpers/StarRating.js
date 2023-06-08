import React from "react";

const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5]; // Number of stars

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={star <= value ? "star-filled" : "star-empty"}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
