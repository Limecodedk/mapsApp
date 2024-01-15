import React from 'react'
import { IonGrid, IonRow, IonCol, IonInput, IonLabel, IonButton, IonIcon, IonTextarea } from '@ionic/react'
import { close } from 'ionicons/icons'

const FormData = () => {

  const closeLocation = () => {
    document.querySelector("#myFormContainer").style.display = "none"
    document.querySelector("cameraimage").style.display = "none"
  }

  return (
    <>
      <div id='myFormContainer'>
        <IonGrid>
          <form>
            <IonRow>
              <IonCol>
                <IonIcon icon={close} size='large' style={{ float: "right" }} onClick={closeLocation} />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>Location</IonLabel>
                <IonInput type='text' />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>Comment</IonLabel>
                <IonTextarea />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton>Submit</IonButton>
              </IonCol>
            </IonRow>

          </form>
        </IonGrid>
      </div>
    </>
  )
}

export default FormData