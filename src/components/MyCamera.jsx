import {
  Camera,
  //CameraResultTyp,
  CameraResultType,
  CameraSource,
  //Photo,
} from "@capacitor/camera";
import { IonButton, IonFab, IonFabButton, IonIcon, IonImg } from "@ionic/react";
import { add, camera, close, image } from "ionicons/icons";
import { defineCustomElements } from "@ionic/pwa-elements/loader"
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import FormData from "./FormData";

const MyCamera = ({ position }) => {
  const [photos, setPhotos] = useState("");

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

    const imageUrl = photo.path || photo.webPath;
    const newPath = Capacitor.convertFileSrc(imageUrl);
    setPhotos(newPath);

    gsap.to("#cameraimage", {
      duration: 1,
      rotation: 2,
      ease: "elastic.out"
    })

  }

  const closePhoto = () => {
    setPhotos("")
  }

  const uploadImage = (path) => {
    document.querySelector("#myFormContainer").style.display = "grid";
  }


  return (
    <>
      <FormData />

      {photos ? (
        <div id="cameraimage">
          <div id="closephoto">
            <IonIcon icon={close} onClick={closePhoto} />
          </div>
          <IonImg src={photos} />
          <div id="saveImgContainer">
            <IonButton color="tertiary" onClick={uploadImage(photos)} >Gem billede</IonButton>
          </div>
        </div >
      ) : (
        <></>
      )}
      < IonFab
        color="primary"
        vertical="bottom"
        horizontal="center"
        slot="fixed"
      >
        <IonFabButton color="primary" onClick={takePhoto} >
          <IonIcon icon={camera} />
        </IonFabButton>
      </IonFab >

    </>
  );
}

export default MyCamera