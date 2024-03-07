// import { Chart as ChartJS } from 'chart.js/auto';
// import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement } from 'chart.js';
Chart.register(BarElement);

export const ChartStatic = () => {
  console.log();
  const data = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        label: 'RRRR',
        data: [200, 300, 400],
        borderColor: '#3333ff',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
      },
    ]
  };

  return (
    <>
      <Bar data={data} />
    </>
  );
};
