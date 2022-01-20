import React, { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { BuildFor } from "lizzygram-common-data/dist/types";

interface NotAuthProps {
  //isAuth: boolean;
  loading: boolean;
  buildFor: BuildFor;
}

const lText =
  "Вам нужно лишь войти на сайт через свой google аккаунт, дабы перед вами открылся дивный мир жизни и творчества Елизаветы Кирилловны.";

const pText =
  "Вам нужно лишь войти на сайт через свой google аккаунт, дабы перед вами открылся дивный мир фотографии.";

const NotAuth: FC<NotAuthProps> = ({ loading, buildFor }) => {
  if (loading === true)
    return (
      <div className="m-auto pt-8 flex justify-center items-center">
        <CircularProgress size={20} thickness={2.4} />
        <Typography component="p" variant="body2">
          ...Подождите, идет проверка аккаунта.
        </Typography>
      </div>
    );

  const text = buildFor === "lizzygram" ? lText : pText;

  return (
    <div className="max-w-700 m-auto pt-6">
      <Typography
        align="center"
        component="h4"
        variant="body1"
        sx={{
          fontSize: "18px",
        }}
      >
        Добро пожаловать, леди и джентельмены.
      </Typography>
      <Typography
        className={"p-4"}
        component="p"
        variant="body2"
        sx={{
          textIndent: "16px",
          fontSize: "16px",
          textAlign: "justify",
        }}
      >
        {text}
      </Typography>
    </div>
  );
};

export default NotAuth;
