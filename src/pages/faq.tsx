import * as React from "react";
//import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//import { Link } from "../component/Link";
import SEO from "../component/SEO";

type FaqPair = {
  question: string;
  answer: string | string[];
};

const faqs: FaqPair[] = [
  {
    question: "Какие фотографии я могу добавить?",
    answer: [
      "фотографии размером не больше 20 мегабайт",
      "фотографии с расширением - .jpeg, .jpg, .png, .webp",
    ],
  },
];

const getAnswerElements = (answer: string | string[], index: number) => {
  if (Array.isArray(answer) === false) {
    return (
      <Box typography="body2" component="p">
        - {answer}
      </Box>
    );
  }

  return (answer as string[]).map((ans, i) => {
    return (
      <Box key={`answer_el_${i}_${index}`} typography="body2" component="p">
        - {ans}
      </Box>
    );
  });
};

const getFaqElements = (faqs: FaqPair[]) => {
  return faqs.map((faq, i) => {
    const answerEl = getAnswerElements(faq.answer, i);

    return (
      <div className="p-4" key={`faq_el_${i}`}>
        <Box typography="h6" component="h5">
          {faq.question}
        </Box>
        {answerEl}
      </div>
    );
  });
};

const Faq = () => {
  const faqElements = getFaqElements(faqs);

  return (
    <>
      <SEO title="Ответы на вопросы..." />

      <div className="my-4">
        <Box typography="h4" textAlign="center" component="h1">
          FAQ по работе сайта
        </Box>

        {faqElements}
      </div>
    </>
  );
};

export default Faq;
