<template>
    <div class="adv-panel-content por" style="padding: 5px" :class="type">
        <div class="chart-box">
            <div class="title">
                <span>{{$t(type == "buyback" ? "Air-drop_257" : "Market_45")}}</span>
                <img src="@/assets/icon/more-icon.png" />
                <div class="data-card">
                    <div class="data-box">
                        <ul>
                            <li>
                                <div class="head">
                                    <img src="@/assets/coin/USDT.png" alt="">
                                    <span>USDT</span>
                                    <span class="amount">${{busdBuybackPool}}</span>
                                </div>
                                <!-- <p>Contract Addr：<a target="_blank" href="https://bscscan.com/address/0x1846c0ab8D09007154066Cbb114315e11D94D4E8">0x1846c0ab8D09007154066Cbb114315e11D94D4E8</a></p> -->
                            </li>
                            <li>
                                <div class="head">
                                    <img src="@/assets/coin/MBOX.png" alt="">
                                    <span>MBOX</span>
                                    <span class="amount">${{mboxBuybackPool}}</span>
                                </div>
                                <!-- <p>Contract Addr：<a target="_blank" href="https://bscscan.com/address/0x9f876C13c228B69AD6B4829fdD2b9d29188A4C5A">0x9f876C13c228B69AD6B4829fdD2b9d29188A4C5A</a></p> -->
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div ref="myChart"  id="buy-back-chart" @mouseout="showLast"></div>
        </div>
        <div class="dot"></div>
    </div>
</template>

<script>
import { Http } from '@/utils';
import CommonMethod from "@/mixin/CommonMethod";

const echarts = window.echarts;
const $ = window.$;

export default {
    mixins: [CommonMethod],
    props: ["type"],
    data(){
        return{
            myChart: null,
            yData: [],
            totalLength: 0,
            mboxBuybackPool: 0,
            busdBuybackPool: 0,
        }
    },
    async mounted(){
        this.myChart = echarts.init(this.$refs.myChart);
        let data = await Http.getChartData();
        let windowWidth = $(window).width();

        this.busdBuybackPool = data.otherOfPool.toLocaleString();// list[0].buybackPool1.toLocaleString();
        this.mboxBuybackPool = data.mboxOfPool.toLocaleString();// list[0].buybackPool2.toLocaleString();

        let xData = [], yData = [];
        data.list.map((item, pos)=>{
            if(windowWidth < 1200 && pos > 30){
                return
            }
            xData.push(this.dateFtt("yyyy/MM/dd", new Date(item.daily * 1000)));

            if(this.type == "buyback"){
                yData.push(item.buybackPool);
            }else{
                yData.push(item.nftTradeVolume);
            }
        });
        this.totalLength = yData.length;

        let gridPadding = windowWidth < 1200 ? 10:30;
        let linePandding = windowWidth < 1200 ? 0.02:0.1;

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
                    return `
                           <h2 style='color: #12dae7;font-size:30px;line-height: 40px;text-shadow: 0px 2px 5px #0038f5;margin-top: 20px;'>$${item.value.toLocaleString()}</h2>
                            <p>${item.axisValue}</p>
                        `;
                    },
                extraCssText:windowWidth < 1200?'zoom: 0.8':''
            },
            grid: {
                x: gridPadding,
                y: gridPadding,
                x2: gridPadding,
                y2: windowWidth < 1200 ?gridPadding *2.5: gridPadding
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
                scale: windowWidth < 1200?false:true,
                max: function (value) {
                    return value.max + value.max * linePandding;
                },
                min: function (value) {
                    return value.min - value.min * linePandding;
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

<style lang="less" scoped>
#buy-back-chart{
    height: 400px;
    border-radius: 20px;
    position: relative;
}

.adv-panel-content {
    position: relative;
}

.title {
    position: absolute;
    left: 20px;
    top: 20px;
    color: #666;
    z-index: 99999999;
    cursor: pointer;

    span, img {
        display: inline-block;
        vertical-align: middle;
    }

    img {
        height: 20px;
    }

    &:hover {

        img {
            opacity: 0.5;
        }

        .data-card {
            display: block;
        }
    }
}

.data-card {
    padding-top: 30px;
    display: none;
    top: 0;
    left: 0;
    position: absolute;

    .data-box {
        background: rgba(22, 28, 35, 0.9);
        border-radius: 16px;
        box-shadow: 0px 6px 18px 0px rgba(0,0,0,0.60);
        padding: 20px;
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;

        li:last-child {
            margin-left: 12px;
        }
    }

    .head {
        font-size: 18px;
        color: #848484;
        font-weight: bold;

        & > * {
            vertical-align: middle;
        }

        img {
            width: 25px;
            height: auto;
            margin-right: 5px;
        }

        .amount {
            color: #12dae7;
            margin-left: 10px;
        }
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        white-space:nowrap;
    }

    a {
        color: #848484 !important;
        text-decoration: underline;
    }
}

.dot{
    background: url('../../assets/statistics/zz.png');
    background-size: contain;
    height: 20px;
    left: 35px;
    right: 35px;
    bottom: 35px;
    position: absolute;
    z-index: 9999;
}
.buyback .dot{
    background-position: 100px;
}
@media (max-width: 768px) {
    .dot{
        left: 15px;
        right: 15px;
        bottom: 25px;
    }
    #buy-back-chart{
        height: 300px;
    }
}
</style>