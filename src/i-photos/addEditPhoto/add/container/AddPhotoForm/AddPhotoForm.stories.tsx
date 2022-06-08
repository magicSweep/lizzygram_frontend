import Box from "@mui/material/Box";
import { useState } from "react";
import AddPhotoForm from ".";

export default {
  component: AddPhotoForm,
  title: "Photos/Forms/AddPhotoForm",
};

export const Default = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    console.log("[SUBMIT]", data);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="m-auto pt-8">
      <AddPhotoForm
        onSubmit={onSubmit}
        onClose={() => console.log("CLOSE")}
        uploadLoading={loading}
      />
    </div>
  );
};

export const Test = () => {
  return (
    <Box sx={{ position: "relative", bgcolor: "warning.main", pt: "100px" }}>
      <Box
        sx={{
          position: "relative",
          width: "400px",
          height: "500px",
          mt: "100px",
          bgcolor: "primary.main",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "300px",
            height: "200px",
            bgcolor: "secondary.main",
            //mt: "-100px",
            zIndex: 10,
          }}
        ></Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "200px",
            bgcolor: "info.main",
            mt: "-100px",
          }}
        >
          <p>Hello, my friend</p>
        </Box>
      </Box>
    </Box>
  );
};
