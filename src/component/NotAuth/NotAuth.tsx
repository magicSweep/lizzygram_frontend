import React, { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface NotAuthProps {
  //isAuth: boolean;
  loading: boolean;
}

const NotAuth: FC<NotAuthProps> = ({ loading }) => {
  if (loading === true)
    return (
      <div className="m-auto pt-8 flex justify-center items-center">
        <CircularProgress size={20} thickness={2.4} />
        <Typography component="p" variant="body2">
          ...Подождите, идет проверка аккаунта.
        </Typography>
      </div>
    );

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
        Вам нужно лишь войти на сайт через свой google аккаунт, дабы перед вами
        открылся дивный мир жизни и творчества Елизаветы Кирилловны.
      </Typography>
    </div>
  );
};

export default NotAuth;
