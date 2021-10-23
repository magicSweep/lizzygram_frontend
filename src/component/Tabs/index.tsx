import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export interface TabsProps {
  children: React.ReactElement[];
  titles: string[];
}

export const Tabs: React.FC<TabsProps> = ({ titles, children }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const titleElements = titles.map((title, index) => {
    return (
      <Tab
        key={`Tab_${index}`}
        sx={{
          "&.MuiTab-textColorPrimary": {
            color: "text.secondary",
          },
        }}
        label={title}
        value={`${index}`}
      />
    );
  });

  const updatedChildren = React.Children.map(children, (child, i) => {
    /*  if (i === index) {
      return <div>{child}</div>;
    } */
    return (
      <TabPanel key={`TabPanel_${i}`} value={`${i}`}>
        {child}
      </TabPanel>
    );
  });

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {titleElements}
          </TabList>
        </Box>
        {updatedChildren}
      </TabContext>
    </Box>
  );
};
