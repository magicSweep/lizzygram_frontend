import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "../component/Link";
import { Copyright } from "../component/Copyright";

const About = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gatsby v5 example
        </Typography>
        <Link to="/">Go to the main page</Link>
        <Copyright />
      </Box>
    </Container>
  );
};

export default About;
