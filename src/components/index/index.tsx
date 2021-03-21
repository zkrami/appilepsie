import React from "react";
import { IonPage, IonImg, IonButton, IonContent } from "@ionic/react";
import logo from "../../assets/logo.png";
import style from './style.module.scss';

export default class Index extends React.Component {


    render() {

        return <IonPage>
            <div className={style.grid}>

                <div className={style['logo-wrapper']}>
                    <img src={logo} />
                </div>
                <div className={style['input-wrapper']}>
                    <IonButton routerLink="/login" expand="block"  >Login</IonButton>
                    <IonButton routerLink="/signup" expand="block" >Signup</IonButton>
                </div>
            </div>
        </IonPage>

    }
}