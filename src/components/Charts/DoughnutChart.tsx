/* eslint-disable no-unused-vars */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


type Props = {
  balanceItems: number[];
};

export const DoughnutChart = ({ balanceItems }: Props) => {
  const [income, spending] = balanceItems;

  let title = '';
  if (!income && !spending) {
    title = 'НЕТ ДАННЫХ';
  }

  const options = {
    text: {
      display: true,
      text: '12312312312',
      color: '#ffffff'
    },
    radius: 100,
    cutout: '80%',
    animation: false,
    // maintainAspectRatio: false,
    // aspectRatio: 1.5,
    responsive: true,
    // maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          // boxWidth: 16,
          // boxHeight: 16,
          useBorderRadius: true,
          usePointStyle: true,
          borderRadius: 10,
          // pointStyleWidth: 16,
          // pointStyleHeight: 6,
          // radius: 5,
          color: '#c6b6d7',
          padding: 26,

          font: {
            size: 15,
            family: 'Nunito, Arial, sans-serif'
          }
        }
      },
      title: {
        display: true,
        text: `${title}`,
        color: '#c6b6d7',
        position: 'top' as const,
        font: {
          size: 40,
          family: 'Nunito, Arial, sans-serif'
        }
      },
    },
  };

  const data1 = {
    labels: ['Баланс', `Доходы`, `Расходы`],
    datasets: [
      {
        // label: '# of Votes',
        data: [1],
        backgroundColor: [
          'transparent',
        ],
        borderColor: [
          'rgba(193, 191, 196, 0.2)',
        ],

      },
    ],
  };
  const data = {
    labels: ['Баланс', `Доходы`, `Расходы`],
    // labels: [`Доходы ${plus}`, `Расходы ${minus}`],
    datasets: [
      {
        // label: '# of Votes',
        data: [0, income, spending],
        backgroundColor: [
          'transparent',
          '#4B00CA',
          '#b865d6',
        ],
        borderColor: [
          'transparent',
          '#4B00CA',
          '#b865d6',
        ],
        borderWidth: 1,
        borderRadius: 5,
        spacing: 3,

      },
    ],
  };

  return (
    <Doughnut
      data={!income && !spending ? data1 : data}
      options={options}
      height='220px'
      // width='220px'
    />
  );
};

