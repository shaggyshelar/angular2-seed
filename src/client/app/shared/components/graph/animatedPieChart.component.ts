import { Component, Input, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'animated-pie-chart',
  templateUrl: 'animatedPieChart.component.html',
})

export class AnimatedPieComponent implements OnInit {
  @Input() chartData: any;
  public data: any;
  ngOnInit() {
    var data1 = this.chartData;
    var chart: any;
    var currentYear = 1995;
    chart = AmCharts.makeChart('chartdiv', {
      'type': 'pie',
      'theme': 'none',
      'dataProvider': this.chartData,
      'valueField': 'size',
      'titleField': 'sector',
      'startDuration': 1.5,
      'innerRadius': 40,
      'pullOutRadius': -50,
      'marginTop': 30,
      'titles': [{
        'text': 'This chart is In-progress'
      }],
      'allLabels': [{
        'y': '54%',
        'align': 'center',
        'size': 25,
        'bold': true,
        'text': '1995',
        'color': '#555'
      }, {
          'y': '49%',
          'align': 'center',
          'size': 15,
          'text': 'Year',
          'color': '#555'
        }],
      'listeners': [{
        'event': 'init',
        'method': function (e: any) {
          var chart = e.chart;

          function getCurrentData(data1: any) {
            var data = data1[currentYear];
            currentYear++;
            if (currentYear > 2014)
              currentYear = 1995;
            return data;
          }

           function loop() {
            chart.allLabels[0].text = currentYear;
            var data = getCurrentData(data1);
            chart.animateData(data, {
              duration: 1000,
              complete: function () {
                setTimeout(loop, 3000);
              }
            });
          }

           loop();
        }
      }],
      'export': {
        'enabled': true
      }
    });

  }
}
