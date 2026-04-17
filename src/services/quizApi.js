import axios from "axios";

export const fetchQuizQuestions = async ({
    amount = 10,
    category = 18,
    difficulty = "medium",
}) => {
    const res = await axios.get("https://opentdb.com/api.php", {
        params: {
            amount,
            category,
            difficulty,
            type: "multiple",
        },
    });

    return res.data.results;
};