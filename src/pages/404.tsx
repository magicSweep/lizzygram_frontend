import React, { CSSProperties } from "react";
import { Link } from "gatsby";
import Box from "@mui/material/Box";
import SEO from "../component/SEO";

// markup
const NotFoundPage = () => {
  return (
    <main className="p-12">
      <SEO title="Не найдена..." />
      <Box
        typography="h5"
        component="h5"
        sx={{
          textAlign: "center",
          paddingBottom: "20px",
        }}
      >
        Страница не найдена.
      </Box>
      <Box
        component="p"
        typography="body1"
        sx={{ maxWidth: "600px", margin: "auto", textIndent: "15px" }}
      >
        К сожалению{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        страницы с таким именем не существует...
        <Link to="/"> Вернуться на главную страницу.</Link>.
      </Box>
      <Box
        component="p"
        typography="body1"
        sx={{
          maxWidth: "600px",
          margin: "auto",
          textAlign: "center",
          paddingTop: "15px",
        }}
      >
        <Link to="/">Вернуться на главную страницу.</Link>.
      </Box>
    </main>
  );
};

/*  <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br /> */

export default NotFoundPage;
