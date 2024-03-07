import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  balanceItems: number[];
};

export const DoughnutChart = ({ balanceItems }: Props) => {
  const [income, spending] = balanceItems;
  console.log('spending: ', spending);
  console.log('income: ', income);
  const options = {
    radius: 100,
    cutout: '75%',
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
        text: 'Баланс',
        color: '#c6b6d7',
        position: 'top' as const,
      },
    },
  };

  const data = {
    labels: ['Баланс', `Доходы`, `Расходы`],
    // labels: [`Доходы ${plus}`, `Расходы ${minus}`],
    datasets: [
      {
        // label: '# of Votes',
        data: [0, spending, income],
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
        borderRadius: 20,
        spacing: 2,

      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={options}
      height='220px'
      // width='220px'
    />
  );
};

