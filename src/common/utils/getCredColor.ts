export enum Rating {
  Excellent = "Excellent",
  VeryGood = "Very Good",
  Good = "Good",
  Fair = "Fair",
  Bad = "Bad",
  Poor = "Poor",
  Low = "Low",
}

const getCredColor = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return "excellent";
    case Rating.VeryGood:
      return "very-good";
    case Rating.Good:
      return "good";
    case Rating.Fair:
      return "fair";
    case Rating.Bad:
      return "low";
    case Rating.Poor:
      return "low";
    case Rating.Low:
      return "low";
    default:
      return "low";
  }
};

export default getCredColor;
