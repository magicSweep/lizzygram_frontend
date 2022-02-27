import Box from "@mui/system/Box";
import { Story } from "@storybook/react";
import { defaultTags } from "../../../tags/mock/data";
import { DescTooltipedIconProps, DescTooltipedIcon_ } from ".";

const DescTooltipedIcon = DescTooltipedIcon_("portfolio");

export default {
  component: DescTooltipedIcon,
  title: "Photos/Component/DescTooltipedIcon",
};

const Template: Story<DescTooltipedIconProps> = (args) => {
  return (
    <Box
      width="350px"
      height="400px"
      m="auto"
      boxShadow={2}
      className="flex justify-center items-center bg-black"
    >
      <DescTooltipedIcon {...args} />
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  date: new Date("2020-09-05"),
  desc: "Мы гуляли по проспекту... Посмотрели налево, затем направо - там заяц лижет абрикос, напевая конституцию РФ.",
  photoTags: defaultTags,
};

export const NoDesc = Template.bind({});

NoDesc.args = {
  date: new Date("2020-09-05"),
  desc: "",
  photoTags: defaultTags,
};

export const HugeDesc = Template.bind({});

HugeDesc.args = {
  date: new Date("2020-09-05"),
  desc: `
    Мы гуляли по проспекту... Посмотрели налево, затем
    направо - там заяц лижет абрикос, напевая конституцию РФ. Мы
    гуляли по проспекту... Посмотрели налево, затем направо - там
    заяц лижет абрикос, напевая конституцию РФ. Мы гуляли по
    проспекту... Посмотрели налево, затем направо - там заяц лижет
    абрикос, напевая конституцию РФ. Мы гуляли по проспекту...
    Посмотрели налево, затем направо - там заяц лижет абрикос,
    напевая конституцию РФ. Мы гуляли по проспекту... Посмотрели
    налево, затем направо - там заяц лижет абрикос, напевая
    конституцию РФ.
    `,
  photoTags: defaultTags,
};

/* Мы гуляли по проспекту... Посмотрели налево, затем
                направо - там заяц лижет абрикос, напевая конституцию РФ. Мы
                гуляли по проспекту... Посмотрели налево, затем направо - там
                заяц лижет абрикос, напевая конституцию РФ. Мы гуляли по
                проспекту... Посмотрели налево, затем направо - там заяц лижет
                абрикос, напевая конституцию РФ. Мы гуляли по проспекту...
                Посмотрели налево, затем направо - там заяц лижет абрикос,
                напевая конституцию РФ. Мы гуляли по проспекту... Посмотрели
                налево, затем направо - там заяц лижет абрикос, напевая
                конституцию РФ. */
