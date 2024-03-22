/* eslint-disable no-unused-vars */
import {
  CategoryScale, Chart, LinearScale, PointElement, LineElement
} from 'chart.js';
import moment from 'moment';
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
import { Line } from 'react-chartjs-2';
// Chart.defaults.color = '#c6b6d7';

type Props = {
  balance: number;
  dataInput: {
    sum: number;
    month: number;
  }[]
};

export const LineChart = ({ dataInput, balance }: Props) => {
  const nameMonth = [
    'Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь',
    'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  const data = {
    labels: [...dataInput.map(elem => nameMonth[elem.month]),
      moment().format('DD.MM')],
    datasets: [
      {
        label: '',
        data: [...dataInput.map(elem => elem.sum), balance],
        borderColor: '#b865d6',
        backgroundColor: '#fff',
        pointRadius: 4,
        borderWidth: 5,
        pointBorderWidth: 1,
        // backgroundColor: '#b865d6',
        // fill: false,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          padding: 5,
          color: '#c6b6d7'
        }
      },
      y: {
        grid: {
          color: '#210b36',
        },
        ticks: {
          padding: 5,
          color: '#c6b6d7',
          callback: (value: any) => (`${value} ₽`),
          // stepSize: 1000,
        },
        title: {
          padding: 100,
          text: ['asdasd', 'asdasdasd']
        }
      },
    }
    // scales: {
    //   'y-axis': {
    //     // grid: {
    //     //   color: '#fff',
    //     //   tickColor: '#fff',
    //     //   borderColor: '#fff'
    //     // }
    //   },
    //   'x-axis': {
    //     // display: false,
    //     grid: {
    //       color: 'transparent',
    //       tickColor: '#fff',
    //       borderColor: '#fff'
    //     }
    //   }
    // }

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
      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

