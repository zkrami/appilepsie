import React from "react";
import { IonButton, IonApp, IonContent, IonHeader, IonList, IonItem, IonLabel, IonInput, IonTitle, IonIcon, IonPage } from "@ionic/react";
import style from './style.module.scss';
import { arrowBack, settings, shareSocial } from "ionicons/icons";
import { RouteComponentProps, withRouter } from "react-router";
import Chart from "chart.js";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';


import { DeviceMotionAccelerationData } from '@ionic-native/device-motion';

import { FallDetector } from "../../fall-detector";
class Main extends React.Component<RouteComponentProps> {
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
    }
    public calcMagnitude = ({ x, y, z }: { x: number, y: number, z: number }) => Math.sqrt(x * x + y * y + z * z);

    onFall() {
        console.log('fall');

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
            <IonHeader >
                <IonTitle className={style["title"]}>
                    <a onClick={e => {
                        e.preventDefault();
                        this.props.history.push('/settings');
                    }}><IonIcon icon={settings} size="large" color="primary"></IonIcon> </a>
                </IonTitle>
            </IonHeader>
            <IonContent>
                <div className={style["chart-wrapper"]}>
                    <div className={style["chart-container"]} >
                        <canvas id="chart"></canvas>
                    </div>

                </div>

                <IonButton expand="block"  > Share &nbsp; <IonIcon icon={shareSocial} ></IonIcon> </IonButton>
            </IonContent>
        </IonPage >
    }
}

export default withRouter(Main);