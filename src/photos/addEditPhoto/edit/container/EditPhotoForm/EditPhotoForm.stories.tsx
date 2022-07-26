import { useState } from "react";
import EditPhotoForm from ".";
import { addedPhoto } from "../../../../loadPhotos/fake-data/fake.data";

export default {
  component: EditPhotoForm,
  title: "Photos/Forms/EditPhotoForm",
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
      <EditPhotoForm
        onSubmit={onSubmit}
        onClose={() => console.log("CLOSE")}
        uploadLoading={loading}
        photoData={addedPhoto}
      />
    </div>
  );
};
