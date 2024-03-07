import {
  CategoryScale, Chart, LinearScale, PointElement, LineElement
} from 'chart.js';
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
import { Line } from 'react-chartjs-2';

export const Chart1 = () => {
  const data = {
    labels: [
      'Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь',
      'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
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
    responsive: true,
  };
  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true
  //     }
  //   }
  // };
  return (
    <div>
      <Line data={data} options={options}/>
      {/* <Line data={data} options={options} /> */}
    </div>
  );
};

