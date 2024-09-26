<style src="./style.css"></style>
<template>
      <div class="tac">
            <section class="top" style="overflow: hidden;">
                  <img  src="@/assets/christmas/lu.gif" alt="" width="10%" id="gui">
                  <svg width="2500" height="600"  id="path" >
                        <path d="M4 175 C341 156 1396 148 2513 2" id="svg_1"></path>
                  </svg>
                  <div class="snow-container">
                        <div class="snow foreground"></div>
                        <div class="snow foreground layered"></div>
                        <div class="snow middleground"></div>
                        <div class="snow middleground layered"></div>
                        <div class="snow background"></div>
                        <div class="snow background layered"></div>
                  </div>
                  <div class="por" style="z-index:10">
                        <img src="@/assets/christmas/top_title.png" alt="" class="title-img" width="30%">
                        <div class="vertical-children"> 
                               <p id="title-des" class="stroke2 bold  dib" :data-text="$t('Festival_48')">
                                    {{$t("Festival_48")}}
                              </p>
                              <img  class="mgl-10 cur-point help" @click="getRootRefs().ruleDialog.show('Festival_40','Festival_41')" src="@/assets/icon/help.png" alt="" height="50">
                        </div>
                        <p class=" c-time vertical-children mgt-50 bold" v-if="endTs > nowTs">
                              <span >{{getLeftTime2(endTs - nowTs).split(":")[0]}}</span> 
                              <span class="mgl-20">{{getLeftTime2(endTs - nowTs).split(":")[1]}}</span> :
                              <span>{{getLeftTime2(endTs - nowTs).split(":")[2]}}</span> :
                              <span>{{getLeftTime2(endTs - nowTs).split(":")[3]}}</span> 
                        </p>
                        <h2 v-else class="mgt-50 stroke2 bold" style="height: 80px">{{$t("Festival_54")}}</h2>
                        <div class="por">
                              <img class="shou"  v-if="nowTs % 10 < 2" src="@/assets/christmas/shou.gif" alt="" width="30%">
                              <img style="display:block" src="@/assets/christmas/center_t.png" alt="" width="100%">
                        </div>
                  </div>
            </section>
            <section class="center por" style="z-index: 11;" >
                  <img class="hide-xs" style="position:absolute;top:260px; left:150px" src="@/assets/christmas/wz.png" alt="" width="80">
                  <img class="hide-xs" style="position:absolute;top:100px; right:100px" src="@/assets/christmas/qq.png" alt="" width="200">

                  <div class="data-view">
                        <div class="aveage-box" >
                              <div class="data-view-item">
                                    <p>{{$t("Festival_42")}}</p>
                                    <h1 class="stroke3 mgt-10" :data-text="numFloor(ovData[0].amount, 100)">{{numFloor(ovData[0].amount, 100)}}</h1>
                              </div>
                              <div class="data-view-item">
                                    <p>{{$t("Festival_43")}}</p>
                                    <h1 class="stroke3 mgt-10" :data-text="numFloor(ovData[1].amount, 100)">{{numFloor(ovData[1].amount, 100)}}</h1>
                              </div>
                        </div>

                        <div class="aveage-box" >
                              <div class="data-view-item">
                                    <p>{{$t("Festival_44")}}</p>
                                    <h1 class="stroke3 mgt-10" :data-text="numFloor(ovData[2].amount, 100)">{{numFloor(ovData[2].amount, 100)}}</h1>
                              </div>
                              <div class="data-view-item">
                                    <p>{{$t("Festival_45")}}</p>
                                    <h1 class="stroke3 mgt-10" :data-text="numFloor(ovData[3].amount, 100)">{{numFloor(ovData[3].amount, 100)}}</h1>
                              </div>
                        </div>

                        <div class="aveage-box">
                              <div class="data-view-item">
                                    <p>{{$t("Festival_46")}}</p>
                                    <h1 class="stroke3 mgt-10" :data-text="ovData[4].amount" style="color:#FED004">{{ovData[4].amount}}</h1>
                              </div>
                              <div class="data-view-item">
                                    <p>{{$t("Festival_47")}}</p>
                                    <div class="vertical-children mgt-10">
                                          <img src="@/assets/christmas/box_r.png" alt="" height="40">
                                          <h1 class="stroke3 dib mgl-5" :data-text="ovData[5].amount" style="color:#FED004">{{ovData[5].amount}}</h1>
                                    </div>
                              </div>
                        </div>
                        <div class="vertical-children mgt-5">
                              <img src="@/assets/christmas/notice.png" alt="" height="20">
                              <span class="mgl-10" style="color: #F3B893;">{{$t("Festival_55")}}</span>
                        </div>
                        <section class="aveage-box mgt-10" id="my-res">
                              <div class="vertical-children">
                                    <img src="@/assets/christmas/mbox.png" alt="" height="40">
                                    <h1 class="stroke3 dib mgl-10" :data-text="christmasData.balances.mbox" >{{christmasData.balances.mbox}}</h1>
                              </div>
                              <div class="vertical-children">
                                    <img src="@/assets/christmas/mec.png" alt="" height="40">
                                    <h1 class="stroke3 dib mgl-5 mgl-10" :data-text="christmasData.balances.mec" >{{christmasData.balances.mec}}</h1>
                              </div>
                              <div class="vertical-children">
                                    <img src="@/assets/christmas/box_v.png" alt="" height="40">
                                    <h1 class="stroke3 dib mgl-5 mgl-10" :data-text="christmasData.balances.box_v" >{{christmasData.balances.box_v}}</h1>
                              </div>
                              <div class="tac" id="my-res-get-btn">
						<div class="img-btn" style="width:130px" @click="claimMbox">
							<img src="@/assets/christmas/btn3.png" alt="" width="100%">
							<label style="margin-top:-3px">
								<span class="btn-stroke" :data-text="$t('Festival_17')" >{{$t('Festival_17')}}</span>
							</label>
						</div>
                              </div>
                        </section>
                  </div>
                  <!-- 转盘 -->
                  <section class="mgt-20">
                        <div class="por">
                              <div class="dib por">
                                    <img class="show-record" src="@/assets/christmas/record.png" alt="" height="60" @click="getLucky(); isShowRecord = true">
                                    <img ref="pz" class="pz" src="@/assets/christmas/pz_a.png" alt="" width="550" v-if="Number(christmasData.balances.box_r) > 0">
                                    <img ref="pz" class="pz" src="@/assets/christmas/pz.png" alt="" width="550" v-else>
                              </div>
                              <img class="jt" src="@/assets/christmas/jt.png" alt="" width="283">
                              <img class="get hide" src="@/assets/christmas/get.png" alt="" >
                        </div>
                        <h1 class="stroke3" style="font-size:30px;color:#FFEDD1" :data-text="`${$t('Festival_52')}: ${christmasData.box}`">{{$t('Festival_52')}}: {{christmasData.box}}</h1>
                        <div class="tac mgt-10" id="center-opr">
                              <div class="img-btn" style="width:300px" @click="openBox(1)">
                                    <img src="@/assets/christmas/btn1.png" alt="" width="100%">
                                    <label style="margin-top:-3px;" class="vertical-children">
                                          <img src="@/assets/christmas/pz_icon.png" alt="" height="50%">
                                          <span class="btn-stroke mgl-10" :data-text="$t('Festival_51').replace('#0#', 1)" style="font-size:38px">{{$t('Festival_51').replace('#0#', 1)}}</span>
                                    </label>
                              </div>
                              <div class="img-btn mgl-20" style="width:300px" @click="openBox(10)">
                                    <img src="@/assets/christmas/btn2.png" alt="" width="100%">
                                    <label style="margin-top:-3px;" class="vertical-children">
                                          <img src="@/assets/christmas/pz_icon.png" alt="" height="50%">
                                          <span class="btn-stroke mgl-10" :data-text="$t('Festival_51').replace('#0#', 10)" style="font-size:38px;">{{$t('Festival_51').replace('#0#', 10)}}</span>
                                    </label>
                              </div>
                        </div>
                  </section>
                  <img class="center-b" src="@/assets/christmas/center_b.png" alt="" width="100%">
                  <img class="shu" src="@/assets/christmas/shu.gif" alt="" width="30%">
                  <img class="ren" src="@/assets/christmas/ren.gif" alt="" width="20%">
            </section>
            <!-- 底部记录 -->
            <section class="bottom">
                  <div class="bottom-panel">
                        <table id="christmas-table" class="tal" >
                              <thead>
                                    <tr style="background:none">
                                          <th >{{$t("Air-drop_47")}}</th>
                                          <th>{{$t("Festival_57")}}</th>
                                          <th class="hide-xs">{{$t("Festival_27")}}</th>
                                          <th class="tar">Tx</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr v-for="item in logs" :key="item.tx">
                                          <td>
                                                <p>{{ dateFtt("yyyy-MM-dd" , new Date(item.ts * 1000)) }}</p>
                                                <p>{{ dateFtt("hh:mm:ss" , new Date(item.ts * 1000)) }}</p>
                                          </td>
                                          <td v-if="item.types == 4">{{$t("Festival_51").replace("#0#", item.num)}}</td>
                                          <td v-if="item.types == 5">{{$t("Festival_17")}}</td>
                                          <td class="vertical-children hide-xs"  v-if="item.types == 4">
                                                <div style="width: 30px; height:30px;" class="dib tac">
                                                      <img :src="require(`@/assets/christmas/${reward[item.detail[0].gid].coin}.png`)" alt="" height="30">
                                                </div>
                                                <span class="mgl-10">x{{reward[item.detail[0].gid].amount}}</span>
                                          </td>
                                          <td v-if="item.types == 5"  class="vertical-children hide-xs">
                                                <div style="width: 30px; height:30px;" class="dib tac">
                                                      <img :src="require(`@/assets/christmas/${item.detail[0].coin}.png`)" alt="" height="30">
                                                </div>
                                                <span class="mgl-10">x{{item.detail[0].amount}}</span>
                                          </td>
                                          <td class="tar">
                                                <img v-if="item.types == 4"  @click="showResult(item.detail)" height="25" src="@/assets/icon/view.png" alt="" class="cur-point" />
                                                <a :href="getTxUrl(item.tx)" target="_blank" v-if="item.tx != null">
									<img src="@/assets/icon/viewTx.png" alt="" height="25" class="cur-point" />
								</a>
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                  </div>
            </section>
            <section class="result" v-if="isShowResult">
                  <div class="result-body animate__bounceIn animate__animated">
                        <img src="@/assets/christmas/close.png" class="result-close" alt="" height="50" @click="isShowResult = false">
                        <img src="@/assets/christmas/resultbg.png" class="result-bg" alt="" >
                        <div class="result-cont" v-if="showReward.length == 1">
                              <!-- <p class="stroke4 bold2" style="font-size: 30px;color: #FBECDF" data-text="Congratulation">Congratulation</p> -->
                              <img class="mgt-30"  :src="require(`@/assets/christmas/${reward[showReward[0].gid].coin}.png`)" alt="" height="180">
                              <p class="stroke4 bold2" :data-text="`x ${reward[showReward[0].gid].amount}`" style="font-size: 50px;color: #FBECDF">x {{reward[showReward[0].gid].amount}}</p>
                        </div>
                         <div class="result-cont" v-else style="bottom:30px" >
                              <div class="result-item ts" :class="{active: reward[showReward[0].gid].needActive}">
                                    <img  :src="require(`@/assets/christmas/${reward[showReward[0].gid].coin}.png`)" alt="" >
                                    <p class="stroke4 bold2" :data-text="`x ${reward[showReward[0].gid].amount}`" style="color: #FBECDF">x {{reward[showReward[0].gid].amount}}</p>
                              </div>

                              <div class="result-item" v-for="(item, pos) in showReward.slice(1,10)" :key="pos" :class="{active: reward[item.gid].needActive}">
                                    <img  :src="require(`@/assets/christmas/${reward[item.gid].coin}.png`)" alt="" >
                                    <p class="stroke4 bold2" :data-text="`x ${reward[item.gid].amount}`" style="color: #FBECDF">x {{reward[item.gid].amount}}</p>
                              </div>
                         </div>
                  </div>
            </section>
            <section class="result" v-if="isShowRecord">
                   <div class="result-body animate__zoomIn animate__faster animate__animated">
                        <img src="@/assets/christmas/close.png" class="result-close" alt="" height="50" @click="isShowRecord = false">
                        <img class="top-box" src="@/assets/christmas/box_r.png" alt="">
                        <p class=" bold2 tac " style="font-size: 30px;line-height:100%;color:#FBECDF;margin-top:80px" >{{$t('Festival_58')}}</p>
                        <div class="mgt-20 record-content" >
                              <table id="list-table" class="tal">
                                     <thead>
                                          <tr style="background:none">
                                                <th>{{$t("Air-drop_47")}}</th>
                                                <th class="tar">{{$t('Festival_59')}}</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          <tr v-for="item in luckys" :key="item.addr">
                                                <td>{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.ts * 1000)) }}</td>
                                                <td class="tar">{{getShortAddr(item.addr)}}</td>
                                          </tr>
                                    </tbody>
                              </table>
                        </div>
                   </div>
            </section>
      </div>
</template>

<script>
import CommonMethod from '@/mixin/CommonMethod';
import { mapState } from "vuex";
import { Wallet, Common } from '@/utils';
import axios from 'axios';
import { HttpConfig } from "@/config";
const $  = window.$;
let timer = null;

export default {
	mixins: [CommonMethod],
      data(){
            return{
                  endTs: 1641441600,
                  myAddr: "",
                  ovData: [
                        { amount: "-"},  { amount: "-"},  { amount: "-"},  { amount: "-"},  { amount: "-"},  { amount: "-"},
                  ],
                  isRotate: false,
                  reward: {
                        "1": {angle:[180, 216], coin: 'mbox', amount: 200, needActive: true},
                        "2": {angle:[144, 180], coin: 'mec', amount: 15, needActive: false},
                        "3": {angle: [108, 144], coin: 'mbox', amount: 20, needActive: false},
                        "4": {angle: [72, 108], coin: 'mec', amount: 200, needActive: false},
                        "5": {angle: [36, 72], coin: 'mbox', amount: 1, needActive: false},
                        "6": {angle: [0 ,36], coin: 'box_r', amount: 1, needActive: true},
                        "7": {angle:[324, 360], coin: 'mbox', amount: 3, needActive: false},
                        "8": {angle:[288, 324], coin: 'mec', amount: 2000, needActive: true},
                        "9": {angle:[252, 288], coin: 'box_v', amount: 1, needActive: true},
                        "10": {angle:[216, 252], coin: 'mec', amount: 30, needActive: false},
                  },
                  preAngle: 361,
                  logs: [],
                  luckys: [], //幸运玩家
                  isShowResult: false,
                  isShowRecord: false, // 是否显示记录
                  showReward: [],
            }
      },
      computed: {
		...mapState({
			nowTs: (state) => state.globalState.data.nowTs,
			christmasData: (state) => state.userState.data.christmasData,
		}),
            isCanCliam(){
                  let {mbox, mec, box_v} = this.christmasData.balances;
                  return Number(mbox) > 0 ||  Number(mec) > 0 || Number(box_v) > 0;
            }
      },
      async mounted(){
            this.moveSvg();
		this.myAddr = await Wallet.ETH.getAccount();
            this.$root.$children[0].getActivityData();
            this.getOvData();
            this.getLogs();
            this.getLucky();
      },
      beforeDestroy(){
		clearInterval(timer);
	},
      methods:{
            moveSvg(){
			let STEP = 200;
			let curStep = 0;
			let path = $('#svg_1')[0];
			let $gui = $('#gui');
			let totalLength = path.getTotalLength();
			let initPosition = path.getPointAtLength(0);
			let curPosition = initPosition;
			$gui.css({
				left: initPosition.x,
				top:initPosition.y,
			}).show()
			timer = setInterval(() => {
				if (curStep != STEP) {
					curStep++;
					curPosition = path.getPointAtLength(totalLength/STEP * curStep);
					$gui.css({
						left: curPosition.x,
						top:curPosition.y,
					}).show();
				}else{
					clearInterval(timer);
				}
			}, 100)

		},
            async getSign(){
			let now = Math.floor(Date.now() / 3600000);
			let str = "momo_event_" + now;
			let signStr =  await Wallet.ETH.signStr(str);
			return signStr
		},
            async openBox(openNum){
                  // console.log(openNum);
                  // this.showZp([{gid: 1}]);
                  if(this.isRotate) return;
                  if(openNum > Number(this.christmasData.box)){
				this.showNotify(this.$t("Festival_50"), "error")
                        return;
                  }
                  let myAddr = await Wallet.ETH.getAccount();
			let sign = await this.getSign();
			let sendData = {
				addr: myAddr,
				sign,
				num: openNum
			}
                  this.isRotate = true;
			let {data, status} = await axios.post(HttpConfig.Christmas.OpenBox, sendData);
                  if(status == 200){
                        this.showZp(data.data);
                  }
            },
            showZp(list){
                  let gid = list[0]["gid"];
                  let data = this.reward[gid];
                  let [start, end] = data.angle;
                  let angle = Common.getRandomNum(start -18 + 3, end -18  - 3) + (Math.ceil(this.preAngle/ 360) +1) * 360;
       
                  $(this.$refs.pz).animate({deg: angle},  {
                        duration: 5000,  
                        easing: 'easeOutQuint',
                        step: function(now) {
                              $(this).css({ transform: 'rotate(' + now + 'deg)' });
                        },
                        complete: ()=>{
                              this.isRotate = false;
                              this.showResult(list);
                              this.$root.$children[0].getActivityData();
                              this.getLogs();
                        }
                  });
                  this.preAngle = angle;
            },
            showResult(list){
                  this.isShowResult = true
                  this.showReward = list;
            },
            async getLucky(){
                  let {data, status} = await axios.post(HttpConfig.Christmas.luckyGuys, {addr: this.myAddr});
                  if(status == 200){
                        this.luckys = data.data;
                  }
            },
            async getLogs(){
			let {data, status} = await axios.post(HttpConfig.Christmas.Logs, {addr: this.myAddr});
                  if(status == 200){
                        this.logs = data.data;
                  }
            },
            async getOvData(){
			let {data, status} = await axios.post(HttpConfig.Christmas.Ovdata, {addr: this.myAddr});
                  if(status == 200){
                        this.ovData = data.data;
                        this.ovData[4].amount = 500 - this.ovData[4].amount + "/"+ 500;
                        this.ovData[5].amount = this.ovData[5].amount + "/" + 25;
                  }
            },
            async claimMbox(){
			if(!this.isCanCliam) return;

                  let {mbox, mec, box_v} = this.christmasData.balances;
                  let canCliam = (this.endTs < this.nowTs) || (this.endTs > this.nowTs && (Number(mbox) >= 3 || Number(mec) >= 500 || Number(box_v) >= 1));
                  if(!canCliam){
				this.getConfirmDialog().show(this.$t("Festival_56"), null, true);
				return;
			}

			let sign = await this.getSign();
			let data = {
				addr: this.myAddr,
				sign,
				amount: 0
			}
			let res = await axios.post(HttpConfig.Christmas.Claim, data);
			if(res.data.code == 200){
				this.getConfirmDialog().show(this.$t("Festival_53"), null, true);
                        this.$root.$children[0].getActivityData();
                        this.getLogs();
			}
		},
      }
}
</script>


<style scoped>
      .shou{
            position: absolute;
            width: 17%;
            left: 19.3%;
            top: -24%;
      }
      .shu{
            position: absolute;
            left: 0px;
            bottom: 0px;
            transform: translateY(7%);
      }
      .ren{
            position: absolute;
            right: 100px;
            bottom: 0px;
      }
      .top-box{
            position: absolute;
            top: -15%;
            left: 50%;
             transform: translateX(-50%);
      }
      .show-record{
            position: absolute;
            top: 0px;
            right: 0px;
            cursor: pointer;
      }
      .result-item.ts{
            position: absolute;
            top: -30%;
            left: 50%;
            transform: translateX(-50%);
            margin: 0px;
      }
      .result-item{
            height: 100px;
            width: 100px;
            background-image: url("../../../assets/christmas/itembg.png");
            background-size: cover;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin: 10px;
      }
      .result-item.active{
            background-image: url("../../../assets/christmas/itembga.png");
      }
      .result-item img{
             height: 80%;
       }
      .result-item p {
            position: absolute;
            bottom: -10px;
            font-size: 18px;
      }
      .result-cont{
            position: absolute;
            width: 100%;
            bottom: 100px;
            left: 0px;
      }
      .result-bg{
            position: absolute;
            width: 120%;
            left: 50%;
            bottom: 0px;
            transform: translateX(-50%);
      }
      .result-close{
            position: absolute;
            top: -10px;
            right: -10px;
            cursor: pointer;
      }
      .result-body{
            border-radius: 232px 232px 75px 75px;
            background: #583020;
            border: 15px solid #6C3A25;
            width: 400px;
            height: 550px;
            margin: 0px auto;
            margin-top: 100px;
            position: relative;
      }
      .result{
            position: fixed;
            top: 0px;left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 99999;
            padding-left: 250px;
      }
      #christmas-table{
            width: 100%;
            border-spacing: 0px;
      }
      #christmas-table tr{
            height: 50px;
            color: #7EDBFE;
      }
      #christmas-table td, #christmas-table th{
            padding: 0px 40px;
      }
      #christmas-table th{
            font-family: 'Poppins Bold' !important;
      }
      #christmas-table tr:nth-of-type(odd){
            background: #0A244C;
            border: none;
      }
      .bottom{
            background-image: url("../../../assets/christmas/bottombg.png");
            background-size: cover;
            background-position: bottom;
            background-repeat: no-repeat;
            padding-top: 60px;
            padding-bottom: 100px;
      }
      .bottom-panel{
            max-width: 1163px;
            background: rgba(18, 54, 115, 0.22);
            border: 14px solid rgba(31, 80, 148, 0.43);
            border-radius: 14px;
            margin: 0px auto;
      }
      .get{
            position: absolute;
            position: absolute;
            left: 50%; top: 20%;
            transform: translate(-50%, -50%);
            width: 90px;
      }
      .jt{
            position: absolute;
            left: 50%; top: 50%;
            transform: translate(-50%, -50%);
      }
	.btn-stroke{
		font-size: 20px;
		font-weight: 900;
		color: #FFEDD1;
		position: relative;
		z-index: 1;
            font-family: 'Poppins Bold' !important;
	}
	.btn-stroke::after{
		content: attr(data-text);
		position: absolute;
		left: 0px;
		-webkit-text-stroke: 7px #582B19;
		z-index: -1;
	}
      #my-res{
            background: #70402C;
            box-shadow: 0px 1px 32px 0px rgba(88, 48, 32, 0.34);
            border-radius: 0px 0px 14px 14px;
            padding: 10px 0px;
      }
      .data-view{
            width: 815px;
            background: rgba(121, 70, 48, 0.22);
            border: 14px solid rgba(96, 50, 31, 0.3);
            border-radius: 20px;
            margin: auto;
            padding: 2px;
            margin-top: -10%;
      }

      .data-view-item{
            background: #85513A;
            border: 5px solid rgba(169, 109, 85, 0.43);
            box-shadow: 0px 1px 32px 0px rgba(88, 48, 32, 0.34);
            border-radius: 8px;
            margin: 10px 20px;
            padding: 20px;
      }
      .data-view-item p{
            font-size: 14px;
            font-weight: bold;
            color: #F3B893;
      }
      .data-view-item h1, #my-res h1{
            font-size: 30px;
            font-weight: bold;
            color: #FFEDD1;
            position: relative;
            z-index: 1;
            font-family: 'Poppins Bold' !important;
            line-height: 100%;
      }
      .stroke3{
            position: relative;
            z-index: 1;
      }
      .stroke3::before {
            content: attr(data-text);
            position: absolute;
            -webkit-text-stroke: 5px #C79377;
            z-index: -1;
      }
      .stroke4{
            position: relative;
            z-index: 1;
      }
      .stroke4::before {
            content: attr(data-text);
            position: absolute;
            -webkit-text-stroke: 7px #572B19;
            z-index: -1;
      }
      .center{
            padding-top: 50px;
            background-image: url("../../../assets/christmas/centerbg.jpg");
            background-size: 100%;
            background-repeat: repeat-y;
            position: relative;
            padding-bottom: 150px;
      }
      .center-b{
            position: absolute;
            bottom: 0px;
            left: 0px;
      }
    
      .c-time{
            font-size: 38px;
            font-weight: bold;
            color: #7EDBFE;
            line-height: 69px;
            font-family: 'Poppins Bold' !important;
      }
      .c-time span{
            background-color: transparent;
            background-image: url("../../../assets/christmas/timebg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            width: 73px; height: 83px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
      }
      .stroke2::before {
            content: attr(data-text);
            position: absolute;
            -webkit-text-stroke: 7px #653521;
            z-index: -1;
      }
  
      #title-des{
            font-size: 35px;
            line-height: 50px;
            color: #FBECDF;
            position: relative;
            z-index: 1;
            font-family: 'Poppins Bold' !important;
            margin-top: 10px;
      }
      .top{
            background-image: url("../../../assets/christmas/topbg.jpg");
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: right;
            position: relative;
      }

</style>