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

  console.log(dataInput.map(elem => elem.sum));
  const data = {
    labels: dataInput.map(elem => nameMonth[elem.month]),
    datasets: [
      {
        label: 'Динамика',
        data: dataInput.map(elem => elem.sum),
        borderColor: '#b865d6',
        backgroundColor: '#fff',
        // backgroundColor: '#b865d6',
        fill: false,
        // tension: 0.1
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
  console.log('data: ', data);
  return (
    <div>
      <Line data={data} options={options}/>
      {/* <Line data={data} options={options} /> */}
    </div>
  );
};

