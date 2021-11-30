import React, { Fragment } from "react";
//import PhotoCardWithDesc from "./PhotoCardWithDesc";
import PhotoCard, { PhotoCardProps } from ".";
import { Story } from "@storybook/react";
import { photos } from "../../mock/fake.data";
import WallOfPhotosImg from "../../../component/images/WallOfPhotosImg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";

export default {
  component: PhotoCard,
  title: "Photos/Component/PhotoCard",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<PhotoCardProps> = (args) => {
  return (
    <Box
      width="600px"
      height="400px"
      m="auto"
      className="flex justify-center items-center"
    >
      <PhotoCard {...args} />
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  photo: photos[1],
  isEditable: true,
  index: 32,
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  onImageClick: () => console.log("ON IMAGE CLICK"),
  /*  observerIndex: 23,
  observerId: "id233",
  isRender: true, */
};

export const NotEditable = Template.bind({});

NotEditable.args = {
  photo: photos[0],
  isEditable: false,
  index: 32,
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  onImageClick: () => console.log("ON IMAGE CLICK"),
  /*  observerIndex: 23,
  observerId: "id233",
  isRender: true, */
};

/* export const NotRendered = Template.bind({});

NotRendered.args = {
  photo: photos[0],
  isEditable: true,
  index: 32,
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  onImageClick: () => console.log("ON IMAGE CLICK"),
  observerIndex: 23,
  observerId: "id233",
  isRender: false,
}; */

/* const AnotherCard = () => {
  return (
    <div className="relative w-345 bg-black h-194 flex items-center justify-center rounded-sm shadow-md">
      <WallOfPhotosImg
        base64={photos[1].base64}
        src={photos[1].iconSrc}
        srcSet={""}
        data-index={2}
        photoAspectRatio={photos[1].aspectRatio}
        onClick={() => console.log("Image click")}
      />
      <div className="absolute left-0 right-0 bottom-0 bg-black opacity-50 flex items-center h-12">
        <Tooltip title="Редактировать">
          <IconButton
            onClick={() => console.log("Hello")}
            aria-label="edit photo"
            sx={{ ml: "14px" }}
          >
            <EditIcon sx={{ fill: "white" }} fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Скачать оригинальный файл">
          <IconButton
            aria-label="скачать фото"
            sx={{ ml: "6px" }}
            href={"https://google.com"}
          >
            <CloudDownloadIcon sx={{ fill: "white" }} fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip
          placement="top-end"
          arrow
          title={
            <Fragment>
              <p className="pb-1">Boзраст: 3 года.</p>
              <p className="block w-full max-h-20 overflow-hidden mb-2">
                Комментарий: Мы гуляли по проспекту... Посмотрели налево, затем
                направо - там заяц лижет абрикос, напевая конституцию РФ. Мы
                гуляли по проспекту... Посмотрели налево, затем направо - там
                заяц лижет абрикос, напевая конституцию РФ. Мы гуляли по
                проспекту... Посмотрели налево, затем направо - там заяц лижет
                абрикос, напевая конституцию РФ. Мы гуляли по проспекту...
                Посмотрели налево, затем направо - там заяц лижет абрикос,
                напевая конституцию РФ. Мы гуляли по проспекту... Посмотрели
                налево, затем направо - там заяц лижет абрикос, напевая
                конституцию РФ.
              </p>
              <p>
                Тэги: <span className="bg-secondary">#с бабушкой</span>{" "}
                <span className="bg-secondary">#с дядей</span>{" "}
                <span className="bg-warning">#на улице</span>{" "}
                <span className="bg-warning">#на даче</span>{" "}
                <span className="bg-info">#улыбка</span>.
              </p>
            </Fragment>
          }
        >
          <InfoIcon sx={{ fill: "white", ml: "210px" }} fontSize="small" />
        </Tooltip>
      </div>
    </div>
  );
};

export const Another = () => <AnotherCard />; */
