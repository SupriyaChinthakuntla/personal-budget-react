import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Pie} from "react-chartjs-2";
import D3ChartPage from '../D3ChartPage/D3ChartPage';

const HomePage = () => {
  const [chartData, setChartData] = useState({});
  const [data, setData] = useState({});

  const chart = () => {
    let budgetTitle = [];
    let budgetValue = [];
    axios.get('http://localhost:3000/budget')
    .then(res => {
      for (var i = 0; i< res.data.myBudget.length; i++) {
       budgetTitle.push(res.data.myBudget[i].title);
       budgetValue.push(res.data.myBudget[i].budget);
  
      }
      setData(res.data.myBudget);
    setChartData({
      labels: budgetTitle,
      datasets: [
        {
          label: "Pie chart for expenses",
          data: budgetValue,
          backgroundColor : ['rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 0, 0.8)',
          'rgba(0, 255, 230, 0.2)',
          'rgba(22, 256, 192, 0.7)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(0, 159, 64, 0.2)',
          'rgba(33, 159, 64, 0.3)',
          'rgba(55, 99, 255, 0.2)',
          'rgba(244, 244, 0, 0.7)',
          ],
          borderWidth: 3
        }
      ]
    })
  }).catch(()=> {

  })
}

  useEffect(() => {
    chart();
  }, [!data]);
  return (
    <div className="container center">

    <div className="page-area">

            <article>
            <h1>Stay on track</h1>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </article>

        <article aria-label="alert"> 
            <h1>Alerts</h1>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>
    </article>

    <article aria-label="result"> 
            <h1>Results</h1>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear... 
                because they know it is all good and accounted for.
            </p>
        </article>

        <article> 
            <h1>Chart</h1>
            <div style={{height:"375px",width:"700px"}}>
                <Pie data = {chartData} />
            </div>
    </article >
    <article> 
    <h1>DonutChart</h1>
    <D3ChartPage>
          data={data}
      </D3ChartPage>
    </article> 
    </div>
</div>
  )
  }

export default HomePage;