import {
  ArcElement, Chart
} from 'chart.js';
Chart.register(ArcElement);

import { Doughnut } from 'react-chartjs-2';

export const ChartStatic = () => {
  const data = {
    labels: [
      'Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь',
      'Июль'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#FFFFFF',
        },
      },
    },
  };
  return (
    <div>
      <Doughnut data={data} options={options}/>
      {/* <Line data={data} options={options} /> */}
    </div>
  );
};
