<template>
	<div class="tac center-box">
		<div class="clear mgt-10">
			<section class="col-md-7" style="padding:10px">
				<div class="adv-panel por box-section" style="padding-bottom:45px">
					<p class="opa-6 mgt-20">总共打开的箱子</p>
					<h1 class="dib mgt-10" style="font-size: 20px">
						{{ totalOpenBoxAmount.bnb }}
					</h1>
					<div class="por box "  style="margin:20px auto; ">
						<div class="box-show" >
							<img src="@/assets/box/mecbox_a.png" alt="" height="230">
						</div>
					</div>

					<div style="padding:10px 0px;position:absolute;bottom:0px;width:100%;left:0px;background:#1F232A;border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;" class="tal rate-show">
						<div class="col-md-1"></div>
						<div class="col-md-2 col-xs-4 vertical-children mgt-5" v-for="item in $parent.rateObj" :key="item.lv">
							<div style="height:20px;width:20px;border-radius:20px;padding:2px;" class="dib dot-bg">
								<div style="width:100%;height:100%;border-radius:20px;border:2px solid #1B1C21" :class="`bg-new${item.lv}`"></div>
							</div>
							<div class="dib mgl-5" style="line-height:15px">
								<p>{{item.rate}}</p>
								<p class="small opa-6">{{$t(item.lang)}}</p>
							</div>
						</div>
						<div class="col-md-1"></div>
					</div>
					<br />
				</div>
			</section>

			<section class="col-md-5" style="padding:10px">
				<div >
					<div  >
						<div class="ly-input-content dib" style="width:100%;padding:30px 20px">
							<p class="tal">{{$t("BOX_35")}}</p>
							<div class="por mgt-10">
								<div class="ly-input-pre-icon">
									<img  src="@/assets/box/mecbox.png" alt="" height="20" />
								</div>
								<input class="ly-input" type="number"
									style=" text-align: left; width: 100%; padding-left:65px"
									readonly="readonly"
									:value="mecBoxNum"
								/>
							</div>
							<p class="small opa-6 mgt-10 tal">{{$t("BOX_39")}}</p>
							<div class="aveage-box">
								<div class="tal">
									<button class="btn-primary mgt-20" style="width: 90%" @click="setAction(23001); oprDialog('unlock-mec-box-dialog', 'block'); unlockBoxNum = parseInt(mecBoxNum) || 0; ">
										{{$t("BOX_36")}}
									</button>
								</div>
								<div class="tar">
									<router-link to="/market?tab=4">
										<button class="mgt-20 btn-line" style="width:90%;" @click="setAction(23002); ">
											{{$t("BOX_37")}}
										</button>
									</router-link>
								</div>
							</div>
							
						</div>
					</div>

					<div class=" mgt-20" >
						<div class="ly-input-content dib" style="width:100%;padding:30px 20px">
							<p class="tal">{{$t("BOX_38")}}</p>
							<div class="por mgt-10">
								<div class="ly-input-pre-icon">
									<img src="@/assets/box/mecbox_a.png" alt="" height="20" />
								</div>
								<input class="ly-input" type="number"
									style="text-align: left; width: 100%; padding-left:65px"
									:value="canOpenBox"
									readonly="readonly"
								/>
							</div>
							<div class="aveage-box">
								<div class="tal">
									<StatuButton class="mgt-20" style="width: 90%" :isDisable="lockBtn.openBoxLock > 0" :isLoading="lockBtn.openBoxLock > 0" :onClick="showOpenBox.bind(this)">
										{{$t("BOX_34")}}
									</StatuButton>
								</div>
								<div></div>
							</div>
							
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- 记录 -->
		<div class="col-md-12" style="padding:10px">
			<section class="mgt-10" style="padding:10px 15px;background:#13181F;border-radius:20px">
				<table class="small  new-table" border="0" frame="void" rules="none" >
					<tr>
						<th width="30%" class="tal">{{ $t("BOX_12") }}</th>
						<th width="20%" class="tal">{{ $t("BOX_26") }}</th>
						<th width="10%">{{ $t("BOX_13") }}</th>
						<th width="20%">{{ $t("BOX_27") }}</th>
						<th width="40%" class="tar">TX</th>
					</tr>
					<tr v-for="item in getOpenBoxHistory" :key="item.tx">
						<td class="tal tac-xs">{{ getTimeFtt(item.crtime) }}</td>
						<td class="tal">{{ $t(eventToLang[item.event]) }}</td>
						<td>x{{ item.amount }}</td>
						<td class="vertical-children">
							<span v-if="item.state != 1 && item.state != -1">
								<Loading />
							</span>
							<span v-if="item.state == 1">{{ $t("Common_09") }}</span>
							<span v-if="item.state == -1">
								<svg  viewBox="0 0 1024 1024"  width="13" height="13"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF5B5C" p-id="3023"></path><path d="M328.988444 292.750222a17.066667 17.066667 0 0 1 24.120889 0L512 451.697778l158.890667-158.890667a17.066667 17.066667 0 0 1 24.120889 0l36.238222 36.238222a17.066667 17.066667 0 0 1 0 24.120889L572.302222 512l158.947556 158.833778a17.066667 17.066667 0 0 1 0 24.120889l-36.238222 36.238222a17.066667 17.066667 0 0 1-24.120889 0L512 572.302222l-158.833778 158.890667a17.066667 17.066667 0 0 1-24.120889 0l-36.238222-36.238222a17.066667 17.066667 0 0 1 0-24.120889L451.697778 512 292.750222 353.109333a17.066667 17.066667 0 0 1 0-24.120889l36.238222-36.238222z" fill="#FFFFFF"></path></svg>
								&nbsp;
								Fail
							</span>
						</td>
						<td class="tar">
							<img v-if="item.event == 'MintBox' && item.state == 1" @click="showHistoryDialog(item)" height="25" src="@/assets/icon/view.png" alt="" class="cur-point" />&nbsp;
							<a :href="getTxUrl(item.tx)" target="_blank">
								<img src="@/assets/icon/viewTx.png" alt="" class="cur-point" height="25" />
							</a>
						</td>
					</tr>
				</table>
			</section>
		</div>
	
		<Dialog id="unlock-mec-box-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{$t("BOX_36")}}</h2>
			<div class="ly-input-content mgt-20">
				<p class="small tal opa-6">{{$t("BOX_35")}}</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon">
						<img  src="@/assets/box/mecbox.png" alt="" />
					</div>
					<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
						v-int :data-max="parseInt(mecBoxNum) || 0"  v-model="unlockBoxNum" />
					<div class="dib" style="width: 30%">
						<button @click="unlockBoxNum = parseInt(mecBoxNum) || 0" class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
			</div>
			<div class="vertical-children tal mgt-10">
				<span class="small opa-6"> {{ $t("BOX_07") }}: {{ unlockBoxNum }} </span>
				<img src="@/assets/box/mecbox.png" height="20" alt="" />
			</div>
			<div class="mgt-20 tal">
				<p class="small opa-6" v-html="$t('BOX_08')"></p>
			</div>

			<div  :class="newBoxApproveToMinter == false ?'btn-group':''" class="mgt-20">
				<StatuButton :onClick="approve.bind(this)"  data-step="1" style="width: 80%" v-if="newBoxApproveToMinter == false" :isLoading="lockBtn.approveLock > 0" :isDisable="lockBtn.approveLock > 0">
					{{ $t("Air-drop_16") }} BOX
				</StatuButton>
				<button data-step="2" @click="addBox(unlockBoxNum)" class="btn-primary mgt-10 por" style="width: 80%; margin-bottom: 20px" :class="newBoxApproveToMinter == false?'disable-btn':''">
					{{ $t("BOX_41") }}
				</button>
			</div>
			
		</Dialog>
		<Dialog id="open-mec-box-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{$t("BOX_34")}}</h2>
			<div class="ly-input-content mgt-20">
				<p class="small tal opa-6">{{ $t("BOX_10") }}:</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon"> <img  src="@/assets/box/mecbox_a.png" alt="" /> </div>
					<input class="ly-input dib" type="text"
						style=" text-align: center; width: 70%; padding-left: 50px; "
						v-int :data-max="maxOpenOne" v-model="openBoxNum" />
					<div class="dib" style="width: 30%">
						<button @click=" openBoxNum = canOpenBox > maxOpenOne ? maxOpenOne : canOpenBox || 0 " class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
			</div>
			<button @click="open(openBoxNum, true)" class="btn-primary mgt-30" style="width: 70%;" >
				打开箱子
			</button>
		</Dialog>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { Dialog, StatuButton, Loading } from '@/components';
import CommonMethod from "@/mixin/CommonMethod";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: { Dialog, StatuButton, Loading },
	data() {
		return {
			openBoxNum: "",
			unlockBoxNum: "",
			eventToLang: {
				HashBox: "BOX_24",
				AddBox: "BOX_23",
				MintBox: "BOX_25",
			},
			maxOpenOne: 100,
			newBoxApproveToMinter: "-",
			getOpenBoxHistory: []
		};
	},
	computed: {
		...mapState({
			ethState: (state) => state.ethState.data,
			totalOpenBoxAmount: (state) => state.globalState.data.totalOpenBoxAmount,
			lockBtn: (state) => state.globalState.data.lockBtn,
			mecBoxNum: (state) => state.userState.data.mecBoxNum,
			hasLoadSpine: (state) => state.globalState.data.hasLoadSpine,
		}),
		canOpenBox(){
			return 0;
		}

	},

	mounted() {

	},
	beforeDestroy() {
		if (timer != null) clearInterval(timer);
	},
	
	methods: {
		showOpenBox(){
			this.setAction(23013);
			this.oprDialog('open-mec-box-dialog', 'block'); 
			this.openBoxNum = this.canOpenBox > this.maxOpenOne ? this.maxOpenOne : this.canOpenBox || 0;
		},
	},
};
</script>
