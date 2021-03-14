import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieChartData: any;

  lineChartData: any
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.configuringPieChart();
    this.configuringLineChart();
  }

  configuringLineChart() {
    this.dashboardService.bookEntryByDay()
      .then(response => {
        const dayByMonth = this.configuringDayMonth();

        const totaisReceitas = this.totalByEachDayMonth(
          response.filter(dado => dado.type === 'RECEITA'), dayByMonth);

        const totaisDespesas = this.totalByEachDayMonth(
          response.filter(dado => dado.type === 'DESPESA'), dayByMonth);

        this.lineChartData = {
          labels: dayByMonth,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        }
      });
  }
  totalByEachDayMonth(response, dayOfMonth) {
    const totals: number[] = [];
    for (const day of dayOfMonth) {
      let total = 0;

      for (const data of response) {
        if (data.day.getDate() === day) {
          total = data.total;

          break;
        }
      }

      totals.push(total);
    }
    return totals;

  }


  configuringDayMonth() {
    const monthReference = new Date();
    monthReference.setMonth(monthReference.getMonth() + 1);
    monthReference.setDate(0);

    const quantityDay = monthReference.getDate();

    const days: number[] = [];

    for (let i = 1; i <= quantityDay; i++) {
      days.push(i);
    }
    return days;
  }

  configuringPieChart() {
    this.dashboardService.bookEntryByCategory()
      .then(response => {
        this.pieChartData = {
          labels: response.map(data => data.category.name),
          datasets: [{
            data: response.map(data => data.total),
            backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC']

          }]
        }
      })
  }

}
