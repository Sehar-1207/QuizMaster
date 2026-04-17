import axios from "axios";

export const fetchQuizQuestions = async (amount = 10) => {
  const res = await axios.get("https://opentdb.com/api.php", {
    params: {
      amount,
      type: "multiple",
    },
  });

  return res.data.results;
};