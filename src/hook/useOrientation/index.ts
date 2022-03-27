import { useDispatch } from "react-redux";
import { showAlertAC } from "../../alert";

export const doesOrientationSupport = () => {
  try {
    screen.orientation.unlock();
    //alert("Support");
    return true;
  } catch (err) {
    alert(err.message);
    return false;
  }
};

//let isSupport = doesOrientationSupport();

const useOrientation = () => {
  //const dispatch = useDispatch();

  // We can change orientation only if we in fullscreen mode
  const change = () => {
    // screen.orientation.type
    const oppositeOrientation = screen.orientation.type.startsWith("portrait")
      ? "landscape"
      : "portrait";
    // "portrait-primary", "portrait-secondary", "landscape-primary",  "landscape-secondary".

    screen.orientation
      .lock(oppositeOrientation)
      .then(() => {
        //log.textContent = `Locked to ${oppositeOrientation}\n`;
      })
      .catch((error) => {
        /* dispatch(
          showAlertAC(
            "Ваше устройство не поддерживает смену ориентации экрана.",
            "error"
          ) 
        );*/
        //log.textContent += `${error}\n`;
      });
  };

  return {
    change,
  };
};

export default useOrientation;
