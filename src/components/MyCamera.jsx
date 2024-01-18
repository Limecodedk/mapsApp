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
import { uploadFile } from "./GetData";

const MyCamera = ({ position }) => {
  const [photos, setPhotos] = useState("");
  const [pos, setPos] = useState([]);
  const [filenameDB, setFilenameDB] = useState("")

  useEffect(() => {
    defineCustomElements(window);
    setPos(position)
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
    });

  }

  const closePhoto = () => {
    setPhotos("")
  }

  const uploadImage = async (path) => {
    uploadFile(path, "image-myPlaceApp")
      .then(response => setFilenameDB(response))
    document.querySelector("#myFormContainer").style.display = "grid";
  }

  return (
    <>
      <FormData position={pos} img={filenameDB} />

      {photos ? (
        <div id="cameraimage">
          <div id="closephoto">
            <IonIcon icon={close} onClick={closePhoto} />
          </div>
          <IonImg src={photos} />
          <div id="saveImgContainer">
            <IonButton color="tertiary" onClick={async () => { await uploadImage(photos); }} >Gem billed</IonButton>
          </div>
          <div id="saved"><span>Gemmer Billede</span></div>
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