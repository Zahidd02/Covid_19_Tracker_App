import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NumeralPipe } from 'ngx-numeral';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {
  xData: string[] = [];
  yData: number[] = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getLineChartData().then(() => { //'.then' makes sure that the chart will be created only after data (xData & yData) has been rendered. Else the chart will be blank.
      const myChart = new Chart('myChart', {
        type: 'line', //this denotes tha type of chart 
        data: {
          labels: this.xData, //labels = X-Axis Data
          datasets: [
            {
              data: this.yData, //data = Y-Axis Data
              borderColor: '#CC1034',
              borderWidth: 2,
              fill: true,
              backgroundColor: [
                'rgba(204, 16, 52, 0.5)'
              ],
              pointRadius: 0,
              borderJoinStyle: 'round'
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            xAxes: {
              type: 'time',
              time: {
                displayFormats: {
                  'day': 'MM/DD/YY'
                },
                tooltipFormat : "ll"
              }
            },
            yAxes: {
              grid: {
                display: false
              },
              ticks: {
                callback: function (value) {
                  const numeral = new NumeralPipe(value);
                  return numeral.format("0a");
                }
              }
            }
          },
          aspectRatio: 1.5
        }
      });
    }).catch(() => { //This will only trigger in case of API's server down
      console.log("Some error occured while fetching chart data..");
    });
  }


  getLineChartData = async () => { //Gets the data for the line chart
    await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
      .then((response) => {
        return response.json();
      })
      .then((data, key = 'cases') => { //here 'key' can be 'cases', 'recovered' or 'deaths'
        let lastDataPoint;
        for (var item in data[key]) { //'data[key]' is exactly same as 'data.cases', just in case any other value is passed in place of 'key', it will take its position instead.
          if (lastDataPoint != undefined) {
            this.xData.push(item);
            this.yData.push(data[key][item] - lastDataPoint);
          }
          lastDataPoint = data[key][item];
        }
      });
  }
}
