import React from "react";
import { IonButton, IonApp, IonContent, IonHeader, IonList, IonItem, IonLabel, IonInput, IonTitle, IonIcon, IonPage, useIonToast, IonToast } from "@ionic/react";
import style from './style.module.scss';
import { arrowBack, settings, shareSocial } from "ionicons/icons";
import { RouteComponentProps, withRouter } from "react-router";
import Chart from "chart.js";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import axios from 'axios';
import { AndroidPermissions } from '@ionic-native/android-permissions';



import { DeviceMotionAccelerationData } from '@ionic-native/device-motion';

import { FallDetector } from "../../fall-detector";
import { Settings } from "../settings";
class Main extends React.Component<RouteComponentProps, { toast: boolean }> {
    chart: Chart | null = null;
    fallDetector: FallDetector;
    position: Geoposition | null = null;
    constructor(props: any) {
        super(props);
        this.fallDetector = new FallDetector();
        this.fallDetector.subscribeAcceleration(this.onAcceleration.bind(this));
        this.fallDetector.subscribeFall(this.onFall.bind(this));
        Geolocation.getCurrentPosition().then((geo: Geoposition) => {
            this.position = geo;
        });
        this.state = {
            toast: false
        }
    }
    public calcMagnitude = ({ x, y, z }: { x: number, y: number, z: number }) => Math.sqrt(x * x + y * y + z * z);

    async sendData() {
        this.position = await Geolocation.getCurrentPosition();
        console.log(this.position);
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

        var body = {
            position: { lat: this.position.coords.latitude, lon: this.position.coords.longitude },
            time: (new Date()).getTime(),
            user: '17zrami@gmail.com',
            notify: contacts

        };
        axios.post('http://10.188.220.158:3030/', body).catch((e) => {
            console.log(e);
        });

    }
    onFall() {
        console.log('fall');

        this.setState({ toast: true });
        this.sendData();


    }
    onAcceleration(event: DeviceMotionAccelerationData) {

        if (this.chart) {
            //@ts-ignore
            if (this.chart.data.datasets[0].data?.length > 30) {
                //@ts-ignore
                this.chart.data.labels?.shift();
                //@ts-ignore
                this.chart.data.datasets[0].data?.shift();

            }
            //@ts-ignore
            this.chart.data.datasets[0].data?.push(this.calcMagnitude(event));
            this.chart.data.labels?.push((new Date()).getTime());
            this.chart.update();
        }

    }

    componentDidMount() {
        this.initChart();
        this.fallDetector.start();
        
        AndroidPermissions.requestPermissions(['ACCESS_NETWORK_STATE' , 'INTERNET']); 
    }
    initChart() {
        // @ts-ignore

        var color = Chart.helpers.color;
        var config: Chart.ChartConfiguration = {
            type: 'line',

            data: {
                datasets: [{
                    label: 'Movement acceleration magnitude',
                    backgroundColor: color("#5BBCB3").alpha(0.5).rgbString(),
                    borderColor: "#5BBCB3",
                    fill: false,
                    data: [

                    ],

                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: true,
                        ticks:
                        {
                            min: 0,
                            max: 50
                        }
                    }]

                }
            }
        };
        //@ts-ignore
        var ctx = document.getElementById('chart').getContext('2d');
        //@ts-ignore
        this.chart = new Chart(ctx, config);

    }

    render() {


        return <IonPage>
            <IonToast
                isOpen={this.state.toast}
                onDidDismiss={() => this.setState({ toast: false })}
                message="A fall has been detected"
                duration={3000}
            />
            <IonHeader >
                {/* <IonTitle className={style["title"]}>
                    <a onClick={e => {
                        e.preventDefault();
                        this.props.history.push('/settings');
                    }}><IonIcon icon={settings} size="large" color="primary"></IonIcon> </a>
                </IonTitle> */}
            </IonHeader>
            <IonContent>
                <div className={style["chart-wrapper"]}>
                    <div className={style["chart-container"]} >
                        <canvas id="chart"></canvas>
                    </div>

                </div>

                {/* <IonButton expand="block"  > Share &nbsp; <IonIcon icon={shareSocial} ></IonIcon> </IonButton> */}
                <Settings></Settings>
            </IonContent>
        </IonPage >
    }
}

export default withRouter(Main);