import React, { useState } from 'react'
import { IonGrid, IonRow, IonCol, IonInput, IonLabel, IonButton, IonIcon, IonTextarea, IonAlert } from '@ionic/react'
import { close } from 'ionicons/icons'
import supabase from './Supabase-client'

const FormData = ({ position, img }) => {

  const [location, setLocation] = useState('')
  const [comment, setComment] = useState('')
  const [locationError, setLocationError] = useState('');
  const [commentError, setCommentError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const addLocation = async (e) => {
    if (location.length < 2) {
      setLocationError('Skal være mindst 2 bogstaver');
      return;
    } else if (!/^[a-zA-Z]+$/.test(location)) {
      setLocationError('Må kun indeholde bogstaver');
      return;
    } else {
      setLocationError('');
    }

    if (comment.length > 50) {
      setCommentError('Må ikke være mere end 50 tegn');
      return;
    } else {
      setCommentError('');
    }

    e.preventDefault();
    let { data, error } = await supabase
      .from('mapmyplace')
      .insert({
        location: location,
        comment: comment,
        latitude: position[0],
        longitude: position[1],
        image: img,
      })

    if (error) {
      alert(error?.message);
    } else {

      const hideForm = setTimeout(() => {
        console.log('done settimeout')
        document.querySelector("#myFormContainer").style.display = "none"
        document.querySelector("#cameraimage").style.display = "none"

        console.log("Din position er gemt")
        setShowAlert(true);
      }, 500);

    }
  }


  const closeLocation = () => {
    document.querySelector("#myFormContainer").style.display = "none"
    document.querySelector("#cameraimage").style.display = "none"
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
                <IonInput
                  type='text'
                  placeholder='Where are you?'
                  value={location}
                  onIonChange={(event) => {
                    setLocation(event.target.value)
                  }}
                />
                <p style={{ color: 'red' }}>{locationError}</p>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>Comment</IonLabel>
                <IonTextarea
                  placeholder='Write a comment!'
                  value={comment}
                  onIonChange={(event) => {
                    setComment(event.target.value)
                  }}
                />
                <p style={{ color: 'red' }}>{commentError}</p>
              </IonCol>
            </IonRow>

            <IonRow text-right>
              <IonCol>
                <IonButton onClick={addLocation}>Submit</IonButton>
              </IonCol>
            </IonRow>

          </form>
        </IonGrid>
      </div>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass='my-custom-class'
        header={location}
        message={'Din position er gemt.'}
        buttons={['ok']}
      />
    </>
  )
}

export default FormData