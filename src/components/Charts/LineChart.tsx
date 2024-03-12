import {
  CategoryScale, Chart, LinearScale, PointElement, LineElement
} from 'chart.js';
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
import { Line } from 'react-chartjs-2';

type Props = {
  dataInput: {
    sum: number;
    month: number;
  }[]
};

export const LineChart = ({ dataInput }: Props) => {
  console.log('dataInput: ', dataInput);
  const nameMonth = [
    'Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь',
    'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  const data = {
    labels: dataInput.map(elem => nameMonth[elem.month]),
    datasets: [
      {
        label: 'My First Dataset',
        data: dataInput.map(elem => elem.sum),
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

