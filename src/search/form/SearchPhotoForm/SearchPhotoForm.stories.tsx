import { useState } from "react";
import SearchPhotoForm from "./SearchPhotoForm";

export default {
  component: SearchPhotoForm,
  title: "Search/Forms/SearchPhotoForm",
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
      <SearchPhotoForm
        searchTerms={{
          age: -1,
          tags: undefined,
          mine: false,
          favorites: false,
        }}
        onSubmit={onSubmit}
        onClose={() => console.log("CLOSE")}
        isNeedAge={true}
      />
    </div>
  );
};

export const WithoutAgeSelect = () => {
  //const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    console.log("[SUBMIT]", data);

    /* setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000); */
  };

  return (
    <div className="m-auto pt-8">
      <SearchPhotoForm
        searchTerms={{
          age: 2,
          tags: undefined,
          mine: true,
          favorites: true,
        }}
        onSubmit={onSubmit}
        onClose={() => console.log("CLOSE")}
        isNeedAge={false}
      />
    </div>
  );
};
