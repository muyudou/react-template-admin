import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './databar.css';

const DataBar = () => {
  const xAxisData = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24'
  ];
  const yData1 = [9, 12, 15, 18, 15, 12, 9, 12, 15, 18, 15, 12];
  const yData2 = [-9, -12, -15, -18, -15, -12, -9, -12, -15, -18, -15, -12];

  useEffect(() => {
    getEchart();
  }, []);

  const getEchart = () => {
    const myChart = echarts.init(document.getElementById('chart_bar'));
    const barWidth = '8px';

    const option = {
      legend: {
        itemWidth: 7,
        itemHeight: 7,
        right: 24,
        data: [
          {
            icon: 'roundRect',
            name: '申购',
            textStyle: {
              color: '#fff'
            }
          },
          {
            icon: 'roundRect',
            name: '赎回',
            textStyle: {
              color: '#fff'
            }
          },
          {
            name: '净增值',
            textStyle: {
              color: '#fff'
            }
          }
        ],
      },
      xAxis: {
        data: xAxisData,
        axisLabel: {
          color: '#999',
          formatter: '{value}:00'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.40)',
          }
        }
      },
      yAxis: {
        name: 'Precipitation',
        axisLabel: {
          color: '#999'
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.15)'
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(40, 103, 168, 0.3)'
          }
        },
      },
      grid: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true
      },
      series: [
        {
          name: '申购',
          type: 'bar',
          stack: 'one',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: 'rgba(78, 146, 255, 1)'
                },
                {
                  offset: 0,
                  color: 'rgba(68, 113, 255, 0.60)'
                }
              ]),
              barBorderRadius: [4, 4, 0, 0]
            },
          },
          barWidth,
          data: yData1
        },
        {
          name: '赎回',
          type: 'bar',
          stack: 'one',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(41, 186, 255, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(132, 255, 225, 0.6)'
                }
              ]),
              barBorderRadius: [0, 0, 4, 4]
            }
          },
          barWidth,
          data: yData2
        },
        {
          name: '净增值',
          type: 'line',
          data: [-5, -12, -5, 1, 5, 10, 14, 2, 3, -1, -2, 4, 5, -3],
          symbolSize: 1,
          symbol: 'circle',
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(255, 248, 13, 1)'
              },
              {
                offset: 1,
                color: 'rgba(255, 157, 7, 1)'
              }
            ]),
            shadowColor: 'rgba(185, 194, 255, 1)',
            shadowBlur: 5
          }
        }
      ]
    };

    myChart.setOption(option, true);

    window.addEventListener('resize', () => {
      myChart.resize();
    });
  };

  return (
    <div className="wrap-container sn-container">
      <div className="sn-content">
        <div className="sn-body">
          <div className="wrap-container">
            <div className="chartsdom" id="chart_bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBar;
