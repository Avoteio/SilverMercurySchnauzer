import React from 'react';
import axios from 'axios';
import {Polar, HorizontalBar} from 'react-chartjs-2';
import {data} from '../dummyData';

class Personality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.getPersonality();
  }

  getPersonality() {
    axios.get(`/api/users/${localStorage.getItem('userId')}/getUserPersonality`)
    .then(({data}) => {
      this.setState({
        data: data
      })
    })
    .catch(console.log);
  }

  render() {
    const {personality} = this.state.data || data;
    const labels = personality.map(val => val.name);
    const percentile = personality.map(val => val.percentile);

    return (
      <div className="polar-chart">
        <HorizontalBar
          data={{
            datasets: [{
              data: percentile,
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
              text: 'Social Personality'
            }
          }}
        />
      </div>
    )
  }
}

export default Personality;