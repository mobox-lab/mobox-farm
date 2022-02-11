<template>
    <div class="adv-panel-content" style="padding:5px">
        <div ref="myChart"  id="buy-back-chart" @mouseout="showLast"></div>
    </div>
</template>

<script>
import { Http } from '@/utils';
import CommonMethod from "@/mixin/CommonMethod";

const echarts = window.echarts;

export default {
    mixins: [CommonMethod],
    data(){
        return{
            myChart: null,
            yData: [],
            totalLength: 0,
        }
    },
    async mounted(){
        this.myChart = echarts.init(this.$refs.myChart);
        let data = await Http.getChartData();
      
        let xData = [], yData = [];
        data.list.map(item=>{
            xData.push(this.dateFtt("yyyy/MM/dd", new Date(item.daily * 1000)));
            yData.push(item.buybackPool);
        });
        this.totalLength = yData.length;

        let option = {
            backgroundColor: "#090909",
            tooltip: {
                trigger: "axis",
                alwaysShowContent: true,
                position: [10, 10],
                 backgroundColor: "#090909",
                 borderColor: "#090909",
                 formatter(params) {
                    const item = params[0];
                    console.log(item);
                    return `
                            <p>Buyback Pool</p>
                           <h2 style='color: #12dae7;font-size:30px;line-height: 40px;text-shadow: 0px 2px 5px #0038f5'>$${item.value.toLocaleString()}</h2>
                        `;
                    },
            },
            grid: {
                x: 30,
                y: 30,
                x2: 30,
                y2: 30
              },
            xAxis: {
                data: xData.reverse(),
                type: 'category',
                boundaryGap: false,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        fontSize:'13',
                        fontWeight: "bolder",
                        color: 'rgba(92,98,105,1)',
                    },
                    formatter: function (params) {
                        return params.split("/")[2];
                    }
                },
               
            },
            yAxis: {
                show: false,
                splitLine: {
                    show: false
                },
            },
            axisPointer: {
                lineStyle: {
                    color: "#1751f6"
                }
            },
            series: [
                {
                    name: 'BUSD',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    color: "rgba(23,81,246,1)",
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(23,81,246,0.2)'
                        },
                        {
                            offset: 0.8,
                            color: '#090909'
                        }
                        ])
                    },
                    data: yData.reverse()
                }
            ]
      };
      this.myChart.setOption(option);
      this.$nextTick(()=>{
        this.showLast();
      })
    },
    methods: {
        showLast(){
            this.myChart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: this.totalLength-1,
          })
        }
    }
}
</script>

<style scoped>
#buy-back-chart{
    height: 400px;
    border-radius: 20px;
}
</style>