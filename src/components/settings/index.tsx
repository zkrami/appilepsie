import React from "react";
import { IonPage, IonImg, IonButton, IonApp, IonContent, IonHeader, IonList, IonItem, IonLabel, IonInput, IonTitle, IonIcon, IonSelect, IonItemOption, IonSelectOption, IonItemDivider } from "@ionic/react";
import logo from "../../assets/logo.png";
import style from './style.module.scss';

import { arrowBack, thumbsUpSharp } from "ionicons/icons";
import { RouteComponentProps, withRouter } from "react-router";

interface SettingState {
    contacts: any[],
    name: string,
    email: string,
}
export class Settings extends React.Component<{}, SettingState> {

    constructor(props:{}) {
        super(props);
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

        this.state = {
            name: '',
            email: '',
            contacts: contacts
        }
    }
    saveContacts() {
        let cont = JSON.stringify(this.state.contacts);
        localStorage.setItem('contacts', cont);
    }
    deleteContact(index: number) {
        this.state.contacts.splice(index, 1);
        this.setState(
            {
                contacts: this.state.contacts
            }
        )
        this.saveContacts();
    }
    addContact() {
        console.log(this.state);
        this.state.contacts.push({ name: this.state.name, email: this.state.email });
        this.setState({
            contacts: this.state.contacts,
            email: '',
            name: ''
        })
        this.saveContacts();
    }
    render() {
        return <IonContent>
            <IonList>


                <IonItem className={style["content-item"]}>
                    <div className={style["content-wrapper"]}>
                        <h5>+ Add contact to notify</h5>
                    </div>
                </IonItem>
                <IonItem className={style["input-item"]}>
                    <IonLabel position="floating">Name</IonLabel>
                    { /*@ts-ignore */}
                    <IonInput value={this.state.name} onKeyUp={(event) => this.setState({ name: event.target.value })} onChange={(event) => this.setState({ name: event.target.value })} ></IonInput>
                </IonItem>
                <IonItem className={style["input-item"]}>
                    <IonLabel position="floating">Email</IonLabel>
                    { /*@ts-ignore */}
                    <IonInput value={this.state.email} onKeyUp={(event) => this.setState({ email: event.target.value })} onChange={(event) => this.setState({ email: event.target.value })} ></IonInput>
                </IonItem>
                <IonItem className={style["button-item"]}>
                    <IonButton onClick={() => this.addContact()} expand="block"  >Add</IonButton>
                </IonItem>
                <IonItem className={style["content-item"]}>
                    <div className={style["content-wrapper"]}>
                        <h5>- Delete contact </h5>
                    </div>
                </IonItem>
                <IonItem className={style["no-border"]}>
                    <IonList className={style["contact-list"]}>
                        {
                            this.state.contacts.map((e, i) =>
                                <IonItem key={i} button onClick={() => this.deleteContact(i)}>
                                    {e.name} ({e.email})
                                  </IonItem>
                            )
                        }

                    </IonList>
                </IonItem>

            </IonList>

        </IonContent>

    }
}

export default Settings;