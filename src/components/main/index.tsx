import React from "react";
import { IonButton, IonApp, IonContent, IonHeader, IonList, IonItem, IonLabel, IonInput, IonTitle, IonIcon, IonPage } from "@ionic/react";
import style from './style.module.scss';
import { arrowBack, settings, shareSocial } from "ionicons/icons";
import { RouteComponentProps, withRouter } from "react-router";
import Chart from "chart.js";
import moment from "moment";
class Main extends React.Component<RouteComponentProps> {

    constructor(props: any) {
        super(props);

    }

    componentDidMount() {
        this.initChart();
    }
    initChart() {
        // @ts-ignore
        var ctx = document.getElementById('chart').getContext('2d');
        function newDate(days: number) {
            return moment().add(days, 'd').toDate();
        }

        function newDateString(days: number) {
            return moment().add(days, 'd').format();
        }
        function randomScalingFactor() {
            return Math.round(-100 + Math.random() * 200);
        };

        var color = Chart.helpers.color;
        var config = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Dataset with string point data',
                    backgroundColor: color("red").alpha(0.5).rgbString(),
                    borderColor: "red",
                    fill: false,
                    data: [{
                        x: newDateString(0),
                        y: randomScalingFactor()
                    }, {
                        x: newDateString(2),
                        y: randomScalingFactor()
                    }, {
                        x: newDateString(4),
                        y: randomScalingFactor()
                    }, {
                        x: newDateString(5),
                        y: randomScalingFactor()
                    }],
                }, {
                    label: 'Dataset with date object point data',
                    backgroundColor: color("blue").alpha(0.5).rgbString(),
                    borderColor: "blue",
                    fill: false,
                    data: [{
                        x: newDate(0),
                        y: randomScalingFactor()
                    }, {
                        x: newDate(2),
                        y: randomScalingFactor()
                    }, {
                        x: newDate(4),
                        y: randomScalingFactor()
                    }, {
                        x: newDate(5),
                        y: randomScalingFactor()
                    }]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        },
                        ticks: {
                            major: {
                                enabled: true
                            },
                            font: function (context:any) {
                                if (context.tick && context.tick.major) {
                                    return {
                                        style: 'bold',
                                        color: '#FF0000'
                                    };
                                }

                            }
                        }
                    },
                    y: {
                        display: false,
                        title: {
                            display: false,
                            text: 'value'
                        }
                    }
                }
            }
        };
        //@ts-ignore
        var ctx = document.getElementById('chart').getContext('2d');
        //@ts-ignore
		new Chart(ctx, config);

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