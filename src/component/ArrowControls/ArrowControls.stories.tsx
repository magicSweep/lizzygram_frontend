import Box from "@mui/system/Box";
import ArrowControls from ".";

export default {
  component: Box,
  title: "Components/ArrowControls",
};

export const Default = () => {
  const next = () => console.log("next");
  const prev = () => console.log("prev");

  return (
    <Box width="700px" height="400px" className="relative m-auto bg-white">
      <ArrowControls next={next} prev={prev} />
    </Box>
  );
};
