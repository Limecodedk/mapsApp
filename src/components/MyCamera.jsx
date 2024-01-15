import {
  Camera,
  //CameraResultTyp,
  CameraResultType,
  CameraSource,
  //Photo,
} from "@capacitor/camera";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add, camera, close, image } from "ionicons/icons";
import { defineCustomElements } from "@ionic/pwa-elements/loader"
import { useEffect } from "react";

const MyCamera = ({ position }) => {

  useEffect(() => {
    defineCustomElements(window);
  }, [])

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 50,
    }).catch((e) => {
      throw new Error();
    });
  }

  return (
    <>
      <IonFab
        color="primary"
        vertical="bottom"
        horizontal="center"
        slot="fixed"
      >
        <IonFabButton color="primary" onClick={takePhoto} >
          <IonIcon icon={camera} />
        </IonFabButton>
      </IonFab>
    </>
  )
};

export default MyCamera