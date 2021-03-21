import React from "react";
import { IonPage, IonImg, IonButton, IonApp, IonContent, IonHeader, IonList, IonItem, IonLabel, IonInput, IonTitle, IonIcon, IonSelect, IonItemOption, IonSelectOption, IonItemDivider } from "@ionic/react";
import logo from "../../assets/logo.png";
import style from './style.module.scss';

import { arrowBack } from "ionicons/icons";
import { RouteComponentProps, withRouter } from "react-router";
export class Settings extends React.Component<RouteComponentProps> {


    render() {
        return <IonPage className={style["wrapper"]}>
            <IonHeader >
                <IonTitle >
                    <a onClick={e => {
                        e.preventDefault();
                        this.props.history.push('/main');
                    }}>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </a>
                </IonTitle>
            </IonHeader>
            <IonContent>
                <IonList>

                    <IonItem className={style["content-item"]}>
                        <div className={style["content-wrapper"]}>
                            <h5>Connect tracking device</h5>
                        </div>

                    </IonItem>
                    

                    <IonItem className={style["input-item"]}>
                        <IonLabel position="floating">Device</IonLabel>
                        <IonSelect value="0">
                            <IonSelectOption value="0">Wiki (00:ff:00:11:00:ff:22) </IonSelectOption>
                            <IonSelectOption value="1">Wiki2 (01:ff:00:11:00:ff:22) </IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem className={style["button-item"]}>
                        <IonButton expand="block"  >Connect</IonButton>
                    </IonItem>
                    <IonItem className={style["content-item"]}>
                        <div className={style["content-wrapper"]}>
                            <h5>+ Add contact to notify</h5>
                        </div>
                    </IonItem>
                    <IonItem className={style["input-item"]}>
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput ></IonInput>
                    </IonItem>
                    <IonItem className={style["input-item"]}>
                        <IonLabel position="floating">Mobile</IonLabel>
                        <IonInput ></IonInput>
                    </IonItem>
                    <IonItem className={style["button-item"]}>
                        <IonButton expand="block"  >Add</IonButton>
                    </IonItem>
                    <IonItem className={style["content-item"]}>
                        <div className={style["content-wrapper"]}>
                            <h5>- Delete contact </h5>
                        </div>
                    </IonItem>
                    <IonItem className={style["no-border"]}>
                        <IonList className={style["contact-list"]}>
                            <IonItem button> 
                                Dad (0609782126)
                            </IonItem>
                            <IonItem button> 
                                Samar (0609782126)
                            </IonItem>
                        </IonList>
                    </IonItem>

                </IonList>

            </IonContent>
        </IonPage>
    }
}

export default withRouter(Settings);