import React from "react";
import { IonPage, IonImg, IonButton, IonApp, IonContent, IonHeader, IonList, IonItem, IonLabel, IonInput, IonTitle, IonIcon } from "@ionic/react";
import logo from "../../assets/logo.png";
import style from './style.module.scss';

import { arrowBack } from "ionicons/icons";
export default class Signup extends React.Component {


    render() {
        return <IonPage className={style["wrapper"]}>
            <IonHeader >
                <IonTitle>
                    <IonIcon icon={arrowBack}></IonIcon>
                     Back
                </IonTitle>
            </IonHeader>
            <IonContent>
                <IonList>

                    <IonItem className={style["logo-item"]}>
                        <div className={style["small-logo-wrapper"]}>
                            <img src={logo} />
                        </div>
                    </IonItem>
                    <IonItem className={style["content-item"]}>
                        <div className={style["content-wrapper"]}>
                            <h2>Welcome !</h2>
                            <h6>Please, Signup to continue</h6>
                        </div>
                    </IonItem>
                    <IonItem className={style["input-item"]}>
                        <IonLabel position="floating">Email address</IonLabel>
                        <IonInput ></IonInput>
                    </IonItem>
                    <IonItem className={style["input-item"]}>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password"></IonInput>
                    </IonItem>
                    <IonItem className={style["input-item"]}>
                        <IonLabel position="floating">Confirmation</IonLabel>
                        <IonInput type="password"></IonInput>
                    </IonItem>
                    <IonItem className={style["button-item"]}>
                        <IonButton routerLink="/main" expand="block"  >Signup</IonButton>
                    </IonItem>

                </IonList>

            </IonContent>
        </IonPage>
    }
}