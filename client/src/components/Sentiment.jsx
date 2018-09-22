import React from 'react';
import {Bar} from 'react-chartjs-2';
import {data} from '../dummyData';

const Sentiment = (props) => {
  const {tones} = props.tone.document_tone;
  const data = tones.map(tone => tone.score);
  const labels = tones.map(tone => tone.tone_name);

  return (
    <div className="polar-chart">
      <Bar
        data={{
          datasets: [{
            data: data,
            backgroundColor: ["#0984e3", "#ff7675", "#55efc4", "#6c5ce7", "#b2bec3"]
          }],
          labels: labels,
        }}
        height={250}
        width={800}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            fontSize: 30,
            text: 'Overall Tone'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 1
              }    
            }]
          }
        }}
      />
    </div>
  )
}

export default Sentiment;