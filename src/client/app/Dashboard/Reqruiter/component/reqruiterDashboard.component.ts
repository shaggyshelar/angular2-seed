import {Component} from '@angular/core';
import {OnActivate, ROUTER_DIRECTIVES} from '@angular/router';
import { GraphComponent } from '../../../shared/components/graph/graph.component';
import { PiechartComponent } from '../../../shared/components/graph/piechart.component';
import { GaugeChartComponent } from '../../../shared/components/graph/gaugeChart.component';
import { AnimatedPieComponent } from '../../../shared/components/graph/AnimatedPieChart.component';

@Component({
    moduleId: module.id,
    selector: 'reqruiterdashboard-component',
    templateUrl: 'recruiterDashboard.component.html',
    directives: [ROUTER_DIRECTIVES, GraphComponent, PiechartComponent, GaugeChartComponent, AnimatedPieComponent],
})

export class ReqruiterDashboardComponent implements OnActivate {
    public chartDataForColumnChart: any[];
    public chartDataForPie: any = [];
    public chartDataForAnimatedPie: any = [];
    routerOnActivate() {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
        //Data send for Column chart
        this.chartDataForColumnChart = [
            {
                'year': 2005,
                'income': 23.5,
                'expenses': 18.1
            },
            {
                'year': 2006,
                'income': 26.2,
                'expenses': 22.8
            },
            {
                'year': 2007,
                'income': 30.1,
                'expenses': 23.9
            },
            {
                'year': 2008,
                'income': 29.5,
                'expenses': 25.1
            },
            {
                'year': 2009,
                'income': 24.6,
                'expenses': 25
            }
        ];

        //Data send for Pie chart
        this.chartDataForPie = [{
            'country': 'Lithuania',
            'litres': 501.9
        }, {
                'country': 'Czech Republic',
                'litres': 301.9
            }, {
                'country': 'Ireland',
                'litres': 201.1
            }, {
                'country': 'Germany',
                'litres': 165.8
            }, {
                'country': 'Australia',
                'litres': 139.9
            }, {
                'country': 'Austria',
                'litres': 128.3
            }, {
                'country': 'UK',
                'litres': 99
            }, {
                'country': 'Belgium',
                'litres': 60
            }, {
                'country': 'The Netherlands',
                'litres': 50
            }];
        // Data for Animated Pie chart
        this.chartDataForAnimatedPie = {
            '1995': [
                { 'sector': 'Agriculture', 'size': 6.6 },
                { 'sector': 'Mining and Quarrying', 'size': 0.6 },
                { 'sector': 'Manufacturing', 'size': 23.2 },
                { 'sector': 'Electricity and Water', 'size': 2.2 },
                { 'sector': 'Construction', 'size': 4.5 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.6 },
                { 'sector': 'Transport and Communication', 'size': 9.3 },
                { 'sector': 'Finance, real estate and business services', 'size': 22.5 }],
            '1996': [
                { 'sector': 'Agriculture', 'size': 6.4 },
                { 'sector': 'Mining and Quarrying', 'size': 0.5 },
                { 'sector': 'Manufacturing', 'size': 22.4 },
                { 'sector': 'Electricity and Water', 'size': 2 },
                { 'sector': 'Construction', 'size': 4.2 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.8 },
                { 'sector': 'Transport and Communication', 'size': 9.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 22 }],
            '1997': [
                { 'sector': 'Agriculture', 'size': 6.1 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 20.9 },
                { 'sector': 'Electricity and Water', 'size': 1.8 },
                { 'sector': 'Construction', 'size': 4.2 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 13.7 },
                { 'sector': 'Transport and Communication', 'size': 9.4 },
                { 'sector': 'Finance, real estate and business services', 'size': 22.1 }],
            '1998': [
                { 'sector': 'Agriculture', 'size': 6.2 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 21.4 },
                { 'sector': 'Electricity and Water', 'size': 1.9 },
                { 'sector': 'Construction', 'size': 4.2 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.5 },
                { 'sector': 'Transport and Communication', 'size': 10.6 },
                { 'sector': 'Finance, real estate and business services', 'size': 23 }],
            '1999': [
                { 'sector': 'Agriculture', 'size': 5.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 20 },
                { 'sector': 'Electricity and Water', 'size': 1.8 },
                { 'sector': 'Construction', 'size': 4.4 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.2 },
                { 'sector': 'Transport and Communication', 'size': 10.5 },
                { 'sector': 'Finance, real estate and business services', 'size': 24.7 }],
            '2000': [
                { 'sector': 'Agriculture', 'size': 5.1 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 20.4 },
                { 'sector': 'Electricity and Water', 'size': 1.7 },
                { 'sector': 'Construction', 'size': 4 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.3 },
                { 'sector': 'Transport and Communication', 'size': 10.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 24.6 }],
            '2001': [
                { 'sector': 'Agriculture', 'size': 5.5 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 20.3 },
                { 'sector': 'Electricity and Water', 'size': 1.6 },
                { 'sector': 'Construction', 'size': 3.1 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.3 },
                { 'sector': 'Transport and Communication', 'size': 10.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 25.8 }],
            '2002': [
                { 'sector': 'Agriculture', 'size': 5.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 20.5 },
                { 'sector': 'Electricity and Water', 'size': 1.6 },
                { 'sector': 'Construction', 'size': 3.6 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.1 },
                { 'sector': 'Transport and Communication', 'size': 10.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 26 }],
            '2003': [
                { 'sector': 'Agriculture', 'size': 4.9 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 19.4 },
                { 'sector': 'Electricity and Water', 'size': 1.5 },
                { 'sector': 'Construction', 'size': 3.3 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.2 },
                { 'sector': 'Transport and Communication', 'size': 11 },
                { 'sector': 'Finance, real estate and business services', 'size': 27.5 }],
            '2004': [
                { 'sector': 'Agriculture', 'size': 4.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 18.4 },
                { 'sector': 'Electricity and Water', 'size': 1.4 },
                { 'sector': 'Construction', 'size': 3.3 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.9 },
                { 'sector': 'Transport and Communication', 'size': 10.6 },
                { 'sector': 'Finance, real estate and business services', 'size': 28.1 }],
            '2005': [
                { 'sector': 'Agriculture', 'size': 4.3 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 18.1 },
                { 'sector': 'Electricity and Water', 'size': 1.4 },
                { 'sector': 'Construction', 'size': 3.9 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.7 },
                { 'sector': 'Transport and Communication', 'size': 10.6 },
                { 'sector': 'Finance, real estate and business services', 'size': 29.1 }],
            '2006': [
                { 'sector': 'Agriculture', 'size': 4 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 16.5 },
                { 'sector': 'Electricity and Water', 'size': 1.3 },
                { 'sector': 'Construction', 'size': 3.7 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.2 },
                { 'sector': 'Transport and Communication', 'size': 12.1 },
                { 'sector': 'Finance, real estate and business services', 'size': 29.1 }],
            '2007': [
                { 'sector': 'Agriculture', 'size': 4.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 16.2 },
                { 'sector': 'Electricity and Water', 'size': 1.2 },
                { 'sector': 'Construction', 'size': 4.1 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.6 },
                { 'sector': 'Transport and Communication', 'size': 11.2 },
                { 'sector': 'Finance, real estate and business services', 'size': 30.4 }],
            '2008': [
                { 'sector': 'Agriculture', 'size': 4.9 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 17.2 },
                { 'sector': 'Electricity and Water', 'size': 1.4 },
                { 'sector': 'Construction', 'size': 5.1 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.4 },
                { 'sector': 'Transport and Communication', 'size': 11.1 },
                { 'sector': 'Finance, real estate and business services', 'size': 28.4 }],
            '2009': [
                { 'sector': 'Agriculture', 'size': 4.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 16.4 },
                { 'sector': 'Electricity and Water', 'size': 1.9 },
                { 'sector': 'Construction', 'size': 4.9 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.5 },
                { 'sector': 'Transport and Communication', 'size': 10.9 },
                { 'sector': 'Finance, real estate and business services', 'size': 27.9 }],
            '2010': [
                { 'sector': 'Agriculture', 'size': 4.2 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 16.2 },
                { 'sector': 'Electricity and Water', 'size': 2.2 },
                { 'sector': 'Construction', 'size': 4.3 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.7 },
                { 'sector': 'Transport and Communication', 'size': 10.2 },
                { 'sector': 'Finance, real estate and business services', 'size': 28.8 }],
            '2011': [
                { 'sector': 'Agriculture', 'size': 4.1 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 14.9 },
                { 'sector': 'Electricity and Water', 'size': 2.3 },
                { 'sector': 'Construction', 'size': 5 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 17.3 },
                { 'sector': 'Transport and Communication', 'size': 10.2 },
                { 'sector': 'Finance, real estate and business services', 'size': 27.2 }],
            '2012': [
                { 'sector': 'Agriculture', 'size': 3.8 },
                { 'sector': 'Mining and Quarrying', 'size': 0.3 },
                { 'sector': 'Manufacturing', 'size': 14.9 },
                { 'sector': 'Electricity and Water', 'size': 2.6 },
                { 'sector': 'Construction', 'size': 5.1 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.8 },
                { 'sector': 'Transport and Communication', 'size': 10.7 },
                { 'sector': 'Finance, real estate and business services', 'size': 28 }],
            '2013': [
                { 'sector': 'Agriculture', 'size': 3.7 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 14.9 },
                { 'sector': 'Electricity and Water', 'size': 2.7 },
                { 'sector': 'Construction', 'size': 5.7 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.5 },
                { 'sector': 'Transport and Communication', 'size': 10.5 },
                { 'sector': 'Finance, real estate and business services', 'size': 26.6 }],
            '2014': [
                { 'sector': 'Agriculture', 'size': 3.9 },
                { 'sector': 'Mining and Quarrying', 'size': 0.2 },
                { 'sector': 'Manufacturing', 'size': 14.5 },
                { 'sector': 'Electricity and Water', 'size': 2.7 },
                { 'sector': 'Construction', 'size': 5.6 },
                { 'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.6 },
                { 'sector': 'Transport and Communication', 'size': 10.5 },
                { 'sector': 'Finance, real estate and business services', 'size': 26.5 }]
        };
    }
}
