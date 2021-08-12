<template>
	<div id="aridorp" class="tac">
		<div class="mgt-10"></div>
		<section  v-if="needMigrate || $route.query.old == 1">
			<div class="tac mgt-10"  id="airdorp-top-menu">
				<div @click="$store.commit('bnbState/setData', {pledgeType: 'v2'})"  :class="pledgeType == 'v2'?'active':''"  class="tab-menu"   >{{$t("Air-drop_135")}}</div>
				<div @click="$store.commit('bnbState/setData', {pledgeType: 'v1'});"  :class="pledgeType == 'v1'?'active':''" class="tab-menu por" >
					{{$t("Air-drop_134")}}
					<span class="notice" v-if="needMigrate"></span>
					<button class="pop-notice animate__animated  animate__headShake animate__infinite hide" ></button>
				</div>
			</div>
		</section>

		<section id="airdrop-info" class="por ">
			<img src="@/assets/icon/bnb_icon.png" alt="" height="68" id="airdrop-bnb-icon">
			<div class="panel" >
				
				<div class="aveage-box tal" id="airdrop-cont-info">
					<div class="dib" id="total-stake" style="padding:0px 10px">
						<h3 class="opa-6 mgt-10 small">{{ $t("Air-drop_02") }}</h3>
						<h3 class="mgt-5">${{getTotalSupplyUSDT.toLocaleString() }}</h3>
					</div>
					<div class="dib por tac" id="oneday-key" style="padding:0px 10px">
						<h3 class="opa-6 mgt-10 small ">{{ $t("Air-drop_21") }}</h3>
						<h3 class="mgt-5 vertical-children">
							<span>
								{{(pledgeType == 'v1' && !(airdropCountDown > 0))?"-": totalAirdropKey}} MBOX
							</span>
							<span class="mgl-5 cur-point dib" style="height:25px" @click="oprDialog('mbox-drop-des-dialog','block')">
								<svg width="20" height="25" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path style="fill:none" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
							</span>
						</h3>
					</div>
					
					<div class="dib tac" id="my-key" style="padding:0px 10px">
						<h3 class="opa-6 mgt-10 small">{{ $t("Air-drop_05") }}</h3>
						<div class="mgt-5">
							<button class="btn-success btn-small por"  @click="$refs.keyopr.showAll()">
								{{getTotalKey}} MBOX
							</button>
						</div>
					</div>

					<div class="tar">
						<a id="recheck" href="https://www.certik.org/projects/mobox"  target="_blank">
							<img src="../../assets/icon/check-icon.png" alt="" height="50" />
						</a>
					</div>
				</div>
			</div>
		</section>
			
		<section id="airdrop-cont" class="mgt-20 por">
			<div id="only-show-my" style="position:absolute;left:10px;top:10px" class="vertical-children">
				<div class="ly-checkbox"  @click="$store.commit('bnbState/setData', {onlyShowPledge:!onlyShowPledge})" :class="onlyShowPledge?'active':'' ">
					<svg class="hide"  viewBox="0 0 1024 1024" width="20" height="20"><path fill="#A1FA40" d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z" ></path></svg>
				</div> &nbsp;
				<span class="opa-6">{{$t("Air-drop_130")}}</span>
			</div>

			<div>
				<h3>{{getLeftTime(getDiffTs)}}</h3>
				<p class="vertical-children ">
					<span class="small opa-6">{{$t("Air-drop_194")}}</span> 
					<span class="mgl-5 cur-point dib" style="height:20px" @click="oprDialog('veMbox-des-dialog','block')">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path style="fill:none" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
					</span>
				</p>
			</div>

			<div class="row" style="padding:4px">
				<div class="col-md-4 col-xs-12 col-sm-6 mgt-10" style="margin-bottom:10px" v-for="item in getPledgeList" :key="item.coinName + item.addr" >
						<div class="airdrop-item tal " :class="`pledgeType-${pledgeType} `+ (item.coinName=='MBOX-BNB'?'active':'') " >
							<div class="test"></div>
							<div style="padding:20px" class="por">
								<div class="over" v-if="pledgeType=='v1' && (item.coinKey != 'MBOX-BNB' || (item.coinKey == 'MBOX-BNB' && airdropCountDown <= 0)) ">{{$t("Air-drop_134")}}</div>

								<div class="close point-block" @click="toggleClass($event, {isLP: true})">
									<div class="vertical-children" style="padding-left: 56px" >
										<div class="dib airdorp-item-coin-icon tac " :class="item.isLP?'double-img':'' ">
											<img v-for="(name, key) in item.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="50" alt="" />
										</div>
										<div style="margin-left: 15px">
											<h3 class="color-w tal">{{ item.coinName }} {{item.isLP?"LP":"POOL"}} <sub v-if="item.isLP">({{item.pancakeVType==1?"V1":"V2"}})</sub></h3>
											<div class="vertical-children mgt-5" v-if="item.pancakeVType != 1">
												<p class="tac vertical-children  cur-point" style="display:inline-block;height:25px;line-height:25px;padding:0px 10px;border-radius:50px;background:#323841;color:#fff;font-size:14px;" >
													<span>{{item.allocPoint}}X + </span>
													<span  :class="{'notice-color': item.addAllocPoint > 0}" >{{item.addAllocPoint}}X</span>
													<svg  viewBox="0 0 24 24" class="rotate-arrow"  height="20px" ><path fill="#fff" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
												</p>
												
											</div>
										</div>
									</div>

									<div  class="mgt-10 small toggle-item" style="background:#13181F;padding:5px;border-radius:10px">
											<div class="aveage-box vertical-children por" style="padding:2px"  >
												<p class="dib">{{$t("Air-drop_199")}}</p>
												<p class="dib tar" >
													{{numFloor(item.veMoboxSupply/1e18, 1).toLocaleString()}}
												</p>
											</div>
											
											<div class="aveage-box vertical-children por" style="padding:2px"  >
												<p class="dib">{{$t("Air-drop_200")}}</p>
												<p class="dib tar" >
													{{numFloor(item.veMoboxSupply / item.veMboxTotal * 100, 100)}}%
												</p>
											</div>
											
											<div class="aveage-box vertical-children por" style="padding:2px"  >
												<p class="dib">{{$t("Air-drop_201")}}</p>
												<p class="dib tar" >
													<span>{{item.allocPoint}}X</span>
												</p>
											</div>

											<div class="aveage-box vertical-children por" style="padding:2px"  >
												<p class="dib">{{$t("Air-drop_202")}}</p>
												<p class="dib tar" >
													<span>{{getNextVeMboxMul(item)}}</span>
												</p>
											</div>
									</div>
								</div>
								

								<template v-if="pledgeType == 'v1'">
									<p  class="tac small mgt-10" style="color:#49c773" v-if="airdropCountDown > 0 && item.coinKey == 'MBOX-BNB'">
										({{$t("Air-drop_149").replace("#0#",getLeftTime(airdropCountDown))}})
									</p>
								</template>
								<template v-else>
									<p  class="tac small mgt-10" style="color:#49c773" v-if="airdropCountDown > 0 && item.coinKey == 'MBOX-BNB-V2' ">
										({{$t("Air-drop_150").replace("#0#",getLeftTime(airdropCountDown))}})
									</p>
								</template>

								<div class=" point-block mgt-20 close" @click="getApyObj(item);toggleClass($event, {isLP: true})">
									<div class="aveage-box">
										<div><span class="opa-6 " >{{$t("Air-drop_205")}}</span></div>
										<div class="tar "  style="flex:2">
											<span class="vertical-children" :class="item.isLP?'show-point-block':''">
												<span>{{ item.apy }}</span>
												<svg  viewBox="0 0 24 24" class="rotate-arrow"  height="20px" ><path fill="#fff" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
											</span>
										</div>
									</div>

									<div  class="mgt-10 small toggle-item" style="background:#13181F;padding:5px;border-radius:10px">
										<div class="aveage-box vertical-children por" style="padding:2px"  >
											<p class="dib">MBOX</p>
											<p class="dib tar" >
												<span v-if="item.myApy.key != '-'" class="vertical-children">
													<span v-if="item.wantAmount > 0 ">
														{{numFloor(item.myApy.key*100, 100)}}%
													</span>
													<span v-else>
														{{numFloor(item.allKeyApy*100, 100)}}%
													</span>
												</span>
												<Loading v-else />
											</p>
										</div>
										<div v-if="item.isLP" class="aveage-box vertical-children por" style="padding:2px"  >
											<p class="dib">CAKE</p>
											<p class="dib tar" >
												<span v-if="item.myApy.cake != '-'">{{numFloor(item.myApy.cake*100, 100)}}%</span>
												<Loading v-else />
											</p>
										</div>
										<div v-else class="aveage-box vertical-children por" style="padding:2px"  >
											<p class="dib">XVS</p>
											<p class="dib tar" >
												<span v-if="item.myApy.xvs != '-'">{{numFloor(item.myApy.xvs*100, 100)}}%</span>
												<Loading v-else />
											</p>
										</div>
										<div class="aveage-box" style="padding:2px" v-if="item.wantAmount > 0">
											<p class="dib">{{$t("Air-drop_206")}}</p>
											<p class="dib tar" >
												<span v-if="item.myApy.key != '-'">
													{{numFloor((Number(item.myApy.key)+Number(item.myApy.cake))*100, 100)}}%
												</span>
												<Loading v-else />
											</p>
										</div>
										<div v-if="item.wantAmount > 0 && item.maxApyNeedVeMobox != '-' " class="tac mgt-10">
											<p v-if="item.veMbox.mul < 300">
												<span v-html="$t('Air-drop_203').replace('#0#', `<span class='color-sell'>${numFloor(item.maxApyNeedVeMobox, 1e2)}</span>` )"></span>&nbsp;
												<span v-if="item.wantAmount > 0 " class="color-sell">
													{{numFloor((Number(item.maxKeyApy)+Number(item.myApy.cake))*100, 100)}}%
												</span>
												<span v-else>
													{{numFloor((Number(item.allKeyApy) + Number(item.myApy.cake)) * 100, 100)}}%
												</span>
											</p>
											<p v-else>
												{{$t("Air-drop_204")}}
											</p>
										</div>

									</div>
								</div>

								<div class="tal mgt-20">
									<p class="por mgt-10">
										<span class="opa-6 ">{{ $t("Air-drop_02") }}</span>
										<span class="suffix">${{ numFloor(item.totalSupply, 1).toLocaleString() }}</span>
									</p>
								</div>

								<div class="tal mgt-20">
									<p class="por mgt-10">
										<span class="opa-6 ">{{$t("Air-drop_112")}}</span>
										<span class="suffix" >{{ numFloor(coinArr[item.coinKey].balance, 1e6) || "0" }}</span>
									</p>
								</div>

								<div class=" point-block mgt-20 close" @click="getLPPrice(item);toggleClass($event, item)">
									<div class="aveage-box">
										<div><span class="opa-6 " >{{ $t("Air-drop_03") }}</span></div>
										<div class="tar "  style="flex:2">
											<span v-if=" item.wantAmount > 0"  class="vertical-children notice-color" :class="item.isLP?'show-point-block':''">
												<span>{{ item.wantAmount }}</span>
												<svg v-if="item.isLP" viewBox="0 0 24 24" class="rotate-arrow"  height="20px" ><path fill="#fff" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
											</span>
											<span v-else style="padding: 5px;display:inline-block">-</span>
										</div>
									</div>


									<div v-if="item.isLP" class="mgt-10 small toggle-item" style="background:#13181F;padding:5px;border-radius:10px">
										<div class="aveage-box vertical-children por" style="padding:2px"  v-for="(name, key) in item.coinName.split('-')" :key="item.coinName+key">
										<div class="dib">
											<span> {{name}}</span>
										</div>
										
										<p class="dib tar" >
											<span class="mgl-10" v-if="item.lpPrice[key] != '-' ">{{item.lpPrice[key]}}</span>
											<Loading v-else />
											<img class="mgl-5"  :src=" require(`../../assets/coin/${name}.png`) " height="20" alt="" />
										</p>
										</div>
									</div>

								</div>

								<div class="tal mgt-20">
									<p class="por mgt-10">
										<span class="opa-6 ">{{$t("Air-drop_152")}}</span>
										<span class="suffix" >
											{{ numFloor( 
												(
												Number(coinArr[item.coinKey].veMbox.orderIndexs[0].veMboxNum)
												+ Number(coinArr[item.coinKey].veMbox.orderIndexs[1].veMboxNum)
												+ Number(coinArr[item.coinKey].veMbox.orderIndexs[2].veMboxNum)
												) /1e18, 1e4) || "0" }}
											<span class="notice-color" v-if="coinArr[item.coinKey].veMbox.mul > 100">({{numFloor(coinArr[item.coinKey].veMbox.mul/100, 100)}}x)</span>
										</span>
									</p>
								</div>

								<div class="tal mgt-20 ">
									<p class="por mgt-10">
										<span class="opa-6">{{ $t("Air-drop_05") }}</span>
										<span class="suffix">
											<button class="btn-success btn-small por"  :class="lockBtn.getKeyLock > 0 ||  item.earnedKey == 0?'disable-btn':''" @click="$refs.keyopr.setCheckCoin(item.coinKey).show()">
												<Loading class="btn-loading" v-if="lockBtn.getKeyLock > 0" />
												{{ item.earnedKey }} MBOX
											</button>
										</span>
									</p>
								</div>
								<!-- 存款提现操作 -->
								<div class="tac mgt-30"> 
									<template v-if="pledgeType=='v2'">
										<div class="dib por tac" style="width:50px" @click="needSetItem = item;oprDialog('deposit-notice-dialog','block')"  v-if="needShowNotice">
											<img class="cur-point " width="40" src="../../assets/icon/deposit_icon.png" alt=""   >
											<span style="width:100%;position:absolute;bottom:-5px;left:0px;font-size:12px;color:#fff;zoom:0.8" class=" opa-6">{{$t("Air-drop_07")}}</span>
										</div>
										<div class="dib por tac" style="width:50px" @click="$refs.deposit.setOprData(item).show();" v-else>
											<img class="cur-point " width="40" src="../../assets/icon/deposit_icon.png" alt=""   >
											<span style="width:100%;position:absolute;bottom:-5px;left:0px;font-size:12px;zoom:0.8" class="bold opa-6">{{$t("Air-drop_07")}}</span>
										</div>
										
										<div class="dib por" style="margin-left:50px;width:50px" @click="$refs.withdraw.setOprData(item).show();" >
											<img class="cur-point "  width="40" src="../../assets/icon/withdraw_icon.png" alt="" >
											<span style="width:100%;position:absolute;bottom:-5px;left:0px;font-size:12px;color:#fff;zoom:0.8" class=" opa-6">{{$t("Air-drop_08")}}</span>
										</div>
										<div class="dib por cur-point" style="margin-left:50px;width:50px" @click="$parent.$refs.vmbox.setOprData(item).show();">
											<span class="notice" v-if="coinArr[item.coinKey].veMbox.notice"></span>
											<img   src="@/assets/icon/vembox-icon.png" alt="" height="40" />
											<span style="width:150%;position:absolute;bottom:-5px;left:-25%;font-size:12px;color:#fff;zoom:0.8;" class="opa-6">{{$t("Air-drop_188")}}</span>
										</div>
									</template>
									<template v-else>
										<button class="btn-primary" style="width: 60%"  @click="migrateCoinKey = item.coinKey;oprDialog('migrate-dialog','block')" >
											{{$t("Air-drop_136")}}
										</button>
									</template>
								</div>

							</div>

							<template  v-if="item.isLP && pledgeType == 'v2' ">
								<div class="tab-split"></div>
								<div style="padding:20px">
									<div class="tac"  > 
										<button :class="item.coinName=='MBOX-BNB'?'btn-primary':'btn-line' "  style="width: 40%"  @click="$root.$children[0].$refs.pancake.setOprData(item).show('swap')" >
											{{$t("Air-drop_29")}}
										</button> &nbsp;
										<button :class="item.coinName=='MBOX-BNB'?'btn-primary':'btn-line' " class="mgl-5"  style="width: 40%"  @click="$root.$children[0].$refs.pancake.setOprData(item).show('liquidity')" >
											{{$t("Air-drop_30")}}
										</button> &nbsp;
									</div>
								</div>
							</template>

						</div>
				</div>
			</div>
	
		</section>

		<section id="buy-back" class="mgt-20 por">
			<div class="info">
				<span class="cur-point por dib" v-popMsg  >
					<svg class="opa-6" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path style="fill:none" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
					<span class="popMsg left" v-html="$t('Air-drop_193')"></span>
				</span>
			</div>
			<div class="aveage-box" style="background:#1C222C;border-radius:10px">
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_189")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="numFloor(totalStakeMbox, 1).toLocaleString()+'('+numFloor(totalStakeMbox/buyBack.circulating * 100, 100)+'%)'" />
				</div>
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_190")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="numFloor(veMboxTotal/1e18, 1)" />
				</div>
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_191")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="avglockdays"  />
				</div>
				<div style="padding:10px" class="por">
					<p class="small opa-6 tac" >{{$t("Air-drop_192")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="getMyTotalVeMbox" />
					<span class="dib por cur-point" style="width:30px;position:absolute;right:20px;bottom:10px" @click="$root.$children[0].$refs.vmbox.setOprData(coinArr['GOV']).show()">
						<span class="notice" style="zoom:0.7" v-if="coinArr['GOV'].veMbox.notice "></span>
						<img   src="@/assets/icon/vembox-icon.png" alt="" height="30" />
						<span class="tac opa-6" style="width:120%;position:absolute;bottom:-5px;left:-10%;font-size:12px;color:#fff;zoom:0.7;" >veMBOX</span>
					</span>
				</div>
			</div>
		</section>

		<section id="buy-back" class="mgt-20 por">
			<div class="info">
				<span class="cur-point por dib" v-popMsg  >
					<svg class="opa-6" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path style="fill:none" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
					<span class="popMsg left">{{$t("Air-drop_91")}}</span>
				</span>
			</div>
			<div class="aveage-box" style="background:#1C222C;border-radius:10px">
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_78")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="'$'+buyBack.amount.toLocaleString()" />
				</div>
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_79")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="'$'+buyBack.avgPrice" />
				</div>
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_80")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="buyBack.moboxBurn.toLocaleString()"  />
				</div>
				<div style="padding:10px" >
					<p class="small opa-6 tac" >{{$t("Air-drop_187")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="buyBack.circulating.toLocaleString()" />
				</div>
			</div>
			<table class=" table-his tac small mgt-20" style="width:100%" border="0" frame="void" rules="none">
				<tr>
					<th style="width:25%;">{{ $t("BOX_12") }}</th>
					<th style="width:25%;" class="no-dropdown-bg">
						<Dropdown class="small" style="margin-top:0px" :list="burnTypeList" :defaultSelectPos="buyBackType" :onChange="onBurnTypeChange" />
					</th>
					<th>{{ $t("Air-drop_51") }}</th>
					<th>{{ $t("Air-drop_50") }}</th>
					<th>TX</th>
				</tr>
				<tr v-for="item in buyBack.logs" :key="item.txId">
					<td >{{ dateFtt("yyyy-MM-dd hh:mm:ss", new Date(item.ts* 1000)) }}</td>
					<td v-if="item.type == 1">{{$t("Air-drop_132")}}</td>
					<td v-else>{{$t("Air-drop_133")}}</td>
					<td>${{numFloor(item.price, 1e2)}}</td>
					<td>{{numFloor(item.amount, 1e2)}}</td>
					<td>
						<a :href="getTxUrl(item.txId)" target="_blank">
							<img src="../../assets/icon/viewTx.png" height="25" alt="" class="cur-point" />
						</a>
					</td>
				</tr>
				<tr>
					<td colspan="6">
						<a href="https://bscscan.com/address/0x9907fa65f3b0a9b9254a2c29a213c4d3501bf84f" target="_blank">{{$t("Air-drop_148")}}</a>
					</td>
				</tr>
			</table>
		</section>
		<!-- 迁移弹窗 -->
		<Dialog id="migrate-dialog" :top="100" :width="500">
			<template v-if="migrateCoinKey != '' ">
				<h3>{{$t("Air-drop_137").replace("#0#", getMigrateItem.coinName)}}</h3>
				<div class="tab-panel  mgt-20">
					<h3 class="tal">1, {{$t("Air-drop_08")}}</h3>
					<div class="mgt-20">
						<p class="small">{{$t("Air-drop_138")}}: {{getMigrateItem.wantAmount}} {{ getMigrateItem.coinName }} LP V1</p>
						<StatuButton class="mgt-10" style="min-width:150px" :isDisable="getMigrateItem.wantAmount <= 0" :onClick="()=>$refs.withdraw.setOprData(getMigrateItem).show()">
							{{$t("Air-drop_08")}}
						</StatuButton>
					</div>
				</div>
				<svg viewBox="0 0 24 24" width="18px"  class="mgt-10"><path fill="#838689" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
				<div class="tab-panel  mgt-10">
					<h3 class="tal">2, {{$t("Air-drop_141")}}</h3>
					<div class="mgt-20">
						<p class="small">{{$t("Air-drop_139")}}: {{ numFloor(getMigrateItem.balance, 1e6) || "0" }} {{ getMigrateItem.coinName }} LP V1</p>
						<StatuButton class="mgt-10" :isDisable="getMigrateItem.balance <= 0"  :onClick="()=>$root.$children[0].$refs.pancake.setOprData(getMigrateItem).show('liquidity').showRemoveLiquidityPanel()">
							{{$t("Air-drop_95")}}
						</StatuButton>
					</div>
				</div>
				<svg viewBox="0 0 24 24" width="18px" class="mgt-10"><path fill="#838689" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
				<div class="tab-panel  mgt-10">
					<h3 class="tal">3, {{$t("Air-drop_142")}}</h3>
					<div class="mgt-20">
						<button class="btn-primary por" style="min-width:150px"  @click="$root.$children[0].$refs.pancake.setOprData({coinKey: migrateCoinKey+'-V2', pancakeVType: 2}).show('liquidity').showAddLiquidityPanel()">{{$t("Air-drop_57")}}</button>
					</div>
				</div>
				<svg viewBox="0 0 24 24" width="18px"  class="mgt-10"><path fill="#838689" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
				<div class="tab-panel  mgt-10">
					<h3 class="tal">4, {{$t("Air-drop_07")}}</h3>
					<div class="mgt-20">
						<p class="small">{{$t("Air-drop_112")}}: {{getMigrateTargetItem.balance}} {{ getMigrateItem.coinName }} LP V2</p>
						<StatuButton class="mgt-10" style="min-width:150px" :isDisable="getMigrateTargetItem.balance <= 0"  :onClick="()=>$refs.deposit.setOprData(getMigrateTargetItem).show()">
							{{$t("Air-drop_07")}}
						</StatuButton>
					</div>
				</div>
			</template>
		</Dialog>
		<!-- 充值提示 -->
		<Dialog id="deposit-notice-dialog" :top="100" :width="400">
			<h2>{{$t("Air-drop_23")}}</h2>
			<div class="tab-body tal mgt-10 small" v-html="$t('Air-drop_24')" style=" padding:15px;"></div>
			<div class="tab-body tal mgt-10" style="padding:15px">
				<div class="vertical-children " style="display:flex">
					<div class="ly-checkbox" :class="hasAgreeNotice?'active':''" @click="hasAgreeNotice = !hasAgreeNotice">
						<div style="width:20px">
							<svg class="hide"  viewBox="0 0 1024 1024" width="20" height="20"><path fill="#92FFDA" d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z" ></path></svg>
						</div>
					</div> &nbsp;
					<span class="small mgl-10" style="flex:auto">{{$t("Air-drop_25")}}</span>
				</div>
				<div class="vertical-children mgt-10"  style="display:flex;justify-content:flex-start">
					<div class="ly-checkbox " :class="hasSelectNotShow?'active':''" @click="hasSelectNotShow = !hasSelectNotShow">
						<div style="width:20px">
							<svg class="hide"  viewBox="0 0 1024 1024" width="20" height="20"><path fill="#92FFDA" d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z" ></path></svg>
						</div>
					</div> &nbsp;
					<span class="small mgl-10" style="flex:1 auto"> {{$t("Air-drop_26")}} </span>
				</div>

				<div class="mgt-20 aveage-box">
					<div class="tac">
						<button class="btn-primary" style="width:80%" @click="oprDialog('deposit-notice-dialog', 'none')">{{$t("Air-drop_27")}}</button>
					</div>
					<div class="tac">
						<button class="btn-primary" style="width:80%" :class="hasAgreeNotice?'':'disable-btn'" @click="agreeNotice">{{$t("Air-drop_28")}}</button>
					</div>
				</div>
			</div>
		</Dialog>

		<Dialog id="veMbox-des-dialog" :top="100" :width="400">
			<h3>{{$t("Air-drop_195")}}</h3>
			<div class="ly-input-content mgt-20">
				<div class="aveage-box small opa-6">
					<p class="tac">{{$t("Air-drop_196")}}</p>
					<p class="tac">{{$t("Air-drop_197")}}</p>
				</div>
				<div class="aveage-box"  style="border-bottom:1px solid #333;padding:5px" v-for="(item, pos) in veMboxConfig" :key="pos">
					<p class="tac">
						≤ {{item.max * 100}}%
					</p>
					<p class="tac">
						x{{item.mul}}
					</p>
				</div>
			</div>
			<div class="mgt-10 tal small opa-6">
				{{$t("Air-drop_198")}}
			</div>
		</Dialog>
		<Dialog id="mbox-drop-des-dialog" :top="100" :width="420">
			<h3>{{$t("Air-drop_211")}}</h3>
			<div class="ly-input-content mgt-20">
				<div class="aveage-box small opa-6">
					<p class="tac">{{$t("Air-drop_212")}}</p>
					<p class="tac">{{$t("Air-drop_21")}}(MBOX)</p>
				</div>
				<div class="aveage-box"  style="border-bottom:1px solid #333;padding:5px" v-for="(item, pos) in mboxDropConfig" :key="pos">
					<p class="tac">
						<span v-if="item.max != -1">≤ {{item.max }}</span>
						<span v-else>> {{item.min }}</span>
					</p>
					<p class="tac">
						{{item.num}}
					</p>
				</div>
			</div>
			<div class="small opa-6 mgt-10 tal">{{$t("Air-drop_213")}}</div>
		</Dialog>

		<KeyOpr ref="keyopr" />
		<Withdraw ref="withdraw" />
		<Deposit ref="deposit" />
	</div>
</template>
<script>
import CommonMethod from "@/mixin/CommonMethod";
import {  Common } from '@/utils';
import { mapState } from "vuex";
import { PancakeConfig } from "@/config";
import KeyOpr from "./KeyOpr";
import Withdraw from './Withdraw';
import Deposit from './Deposit';
import { Dialog, Loading, StatuButton, Dropdown } from '@/components';

export default {
	mixins: [CommonMethod],
	components: { KeyOpr, Withdraw, Deposit, Dialog, Loading, StatuButton, Dropdown},
	data(){
		return({
			hasAgreeNotice: false,
			hasSelectNotShow: false,
			needShowNotice: true,
			needSetItem: {},
			migrateCoinKey: "",//需要迁移的名称
			veMboxConfig:[
				{min: 0, max:0.005, mul: 1},
				{min: 0.005, max:0.01, mul: 1.5},
				{min: 0.01, max:0.015, mul: 2},
				{min: 0.015, max:0.02, mul: 2.5},
				{min: 0.02, max:0.025, mul: 3},
				{min: 0.025, max:0.03, mul: 3.5},
				{min: 0.03, max:0.05, mul: 4},
				{min: 0.05, max:0.08, mul: 4.5},
				{min: 0.08, max:0.12, mul: 5},
				{min: 0.12, max:0.2, mul: 5.5},
				{min: 0.2, max:0.4, mul: 6},
				{min: 0.4, max:0.75, mul: 7},
				{min: 0.75, max:1, mul: 8},
			],
			mboxDropConfig: [
				{min: 0, max: 0.5, num: 5e4},
				{min: 0.5, max: 1, num: 10e4},
				{min: 1, max: 1.5, num: 15e4},
				{min: 1.5, max: 2, num: 20e4},
				{min: 2, max: 3, num: 25e4},
				{min: 3, max: 4, num: 30e4},
				{min: 4, max: 6, num: 40e4},
				{min: 6, max: -1, num: 50e4},
			],
			burnTypeList: [this.$t('Air-drop_49'), this.$t('Air-drop_132'), this.$t('Air-drop_133')]
		});
	},
	computed: {
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			coinArr: (state) => state.bnbState.data.coinArr,
			totalAirdropKey: (state) => state.bnbState.data.totalAirdropKey,
			rewardStoreKey: (state) => state.bnbState.data.rewardStoreKey,
			buyBack: (state) => state.bnbState.data.buyBack,
			airdropCountDown: (state) => state.globalState.data.airdropCountDown,
			onlyShowPledge: (state) => state.bnbState.data.onlyShowPledge,
			pledgeType: (state) => state.bnbState.data.pledgeType,
			avglockdays: (state) => state.bnbState.data.avglockdays,
			totalStakeMbox: (state) => state.bnbState.data.totalStakeMbox,
			veMboxTotal: (state) => state.bnbState.data.veMboxTotal,
			nowTs: (state) => state.globalState.data.nowTs,
			buyBackType: (state) => state.globalState.data.buyBackType,
		}),
		//获取总质押USDT
		getTotalSupplyUSDT() {
			let num = 0;
			Object.keys(PancakeConfig.StakeLP).map(coinKey=>{
				num += Number(this.coinArr[coinKey].totalSupply);
			});
			return this.numFloor(num, 1);
		},

		getPledgeList(){
			let arr = [];
			let stakeLP = PancakeConfig.StakeLP;
			let coinArr =  this.coinArr;
			for (let key in stakeLP) {
				let {pIndex, isFinish} = stakeLP[key];
				if(pIndex != -1 && (this.coinArr[key].wantAmount > 0 || !this.onlyShowPledge)){
					if(this.pledgeType == "v1" && isFinish){
						arr.push({coinKey: key, ...stakeLP[key], ...coinArr[key]});
					}
					if(this.pledgeType == "v2" && !isFinish){
						arr.push({coinKey: key, ...stakeLP[key], ...coinArr[key]});
					}
				}
			}
			return arr;
		},
		needMigrate(){
			let needMigrate = false;
			let oldCoinArr = ["MBOX-BNB", "BTCB-BNB", "ETH-BNB", "BUSD-BNB", "USDT-BNB", "USDT-BUSD", "DAI-BUSD","USDC-BUSD"];
			oldCoinArr.map(coinKey=>{
				if(this.coinArr[coinKey].wantAmount > 0) needMigrate = true;
			})
			return needMigrate;
		},
		//获取迁移的目标对象
		getMigrateTargetItem(){
			let retItem = {};
			let targetCoinKey = this.migrateCoinKey + "-V2";
			retItem = {coinKey: targetCoinKey, ...PancakeConfig.StakeLP[targetCoinKey], ...this.coinArr[targetCoinKey]};
			return retItem;
		},
		getMigrateItem(){
			let retItem = {};
			let coinKey = this.migrateCoinKey;
			retItem = {coinKey, ...PancakeConfig.StakeLP[coinKey], ...this.coinArr[coinKey]};
			return retItem;
		},
		getTotalKey(){
			let allKey = 0;
			this.getPledgeList.map(item=>{
				allKey += item.earnedKey;
			});
			allKey += this.rewardStoreKey;
			return this.numFloor(allKey, 1e4);
		},
		getMyTotalVeMbox(){
			let veMbox = 0;
			for (let key in this.coinArr) {
				if(key != "ts"){
					let coinObj = this.coinArr[key];
					veMbox += 	Number(coinObj.veMbox.orderIndexs[0].veMboxNum)
					veMbox += 	Number(coinObj.veMbox.orderIndexs[1].veMboxNum)
					veMbox += 	Number(coinObj.veMbox.orderIndexs[2].veMboxNum)
				}
			}
			return this.numFloor(veMbox/1e18, 1e6);
		},
		getDiffTs(){
			let ts = 86400 - (this.nowTs + 72000)  % 86400;
			return ts;
		}
	},
	async created(){
		let hasSelectNotShowNotice =  Common.getStorageItem("hasSelectNotShowNotice");
		if(hasSelectNotShowNotice == 1){
			this.needShowNotice = false;
		}
	},
	methods: {
		onBurnTypeChange(pos){
			if(pos == this.buyBackType) return;
			this.$store.commit("globalState/setData", {buyBackType: pos});
			this.$nextTick(()=>{
				Common.app.getBuyBack();
			})
		},
		getNextVeMboxMul(coinObj){
			let coinKey = coinObj.coinKey;
			let baseMul = PancakeConfig.StakeLP[coinKey].allocPoint;
			let persent = coinObj.veMoboxSupply / coinObj.veMboxTotal;
			let addMul = 1;
			this.veMboxConfig.map(item=>{
				if(persent > item.min && persent <= item.max){
					addMul = item.mul;
				}
			});
			return baseMul * addMul + "X";
		},
		test(){

		},
		toggleClass(e, item){
			if(item.isLP){
				e.currentTarget.classList.toggle("close");
			}
		},

		getLPPrice(item){
			Common.app.getLPCoinValue(item);
		},

		getApyObj(item){
			Common.app.getApyObj(item);
		},

		agreeNotice(){
			if(!this.hasAgreeNotice) return;
			if(this.hasSelectNotShow){
				Common.setStorageItem("hasSelectNotShowNotice", 1);
				this.needShowNotice = false;
			}
			this.oprDialog("deposit-notice-dialog","none");
			this.$refs.deposit.setOprData(this.needSetItem).show();
		},
		
		showWithdraw(item){
			this.$refs.withdraw.setOprData(item).show();
		}
	},
};
</script>

<style scoped>
#airdrop-bnb-icon{
	position: absolute;
	left: 0px;
	z-index: 100;
	top: 50%;
	transform: translateY(-50%);
}
#airdrop-info .panel{
	padding-left: 60px;
}
.pop-notice{
	position: absolute;
	font-size: 12px;
	background: rgb(255, 0, 0);
	top: -10px;
	right: 0px;
	padding: 0px 3px;
	height: 20px;
	color: #fff;
	border-radius: 5px;
	border: none;
	zoom: 0.8;
}

.pledgeType-v1{
	overflow: hidden;
}
.over{
	transform: rotate(-315deg);
	transform-origin: right top;
	font-family: AvenirNext-Bold;
	font-size: 14px;
	color: #c7c7c7;
	background: #646c74;
	position: absolute;
	right: -25px;
	top: 80px;
	height: 33px;
	line-height: 33px;
	width: 150px;
	text-align: center;
}
.table-his tr:nth-of-type(odd) {
	background: #1C222C;
}

.airdorp-item-coin-icon {
	position: absolute;
	left: 20px;
}

.airdrop-item-icon {
	position: absolute;
	top: -70px;
	text-align: center;
	width: 100%;
	left: 0px;
}

.airdrop-item {
	background: #1C222C;
	border-radius: 20px;
	position: relative;
	box-sizing: border-box;
	z-index: 1;
}
.airdrop-item.active:before{
	content: "";
	position: absolute;
	/* background: linear-gradient(145deg,#e3672a 0%, #000 100%); */
	/* background: linear-gradient(145deg,#C320FF  0%, #30BAFD  100%); */
	background: linear-gradient(145deg,#30BAFD  0%, #C320FF  100%);
	left: -3px;
	top: -3px;
	bottom: -5px;
	right: -3px;
	z-index: -1;
	border-radius: 20px;
}
.test{
	position: absolute;
	top: -1px;
	right: -1px;
	bottom: -3px;
	left: -1px;
	z-index: -1;
	background: #1C222C;
	border-radius: 20px;
}
#buy-back .info{
	position: absolute;
	right: -10px;
	top: -20px;
}
#buy-back .ly-input{
	width: 100%;
}
#buy-back > div{
	padding: 10px;
}
#buy-back {
	padding: 20px 30px;
	width: 80%;
	max-width: 1300px;
	background: #13181F;
	border-radius: 20px;
	margin: 0px auto;
	margin-top: 20px;
}
#airdrop-cont {
	padding-top: 0px;
	max-width: 1300px;
	display: inline-block;
	background: #13181F;
	width: 80%;
	padding: 10px 30px;
	border-radius: 20px;
}

#airdrop-info{
	padding-top: 0px;
	width: 80%;
	max-width: 1300px;
	border-radius: 20px;
	padding-left: 34px;
	margin: 0px auto;
}

#aridorp .menu-btn {
	user-select: none;
	width: 180px;
	display: inline-block;
	border-top-left-radius: 220px;
	border-top-right-radius:220px;
	border-bottom: none;
	padding: 20px;
	cursor: pointer;
	margin: 10px;
	border: 1px solid red;
}
#aridorp .menu-btn.active {
	border-bottom: none;
	box-shadow: none;
	background: #1d2b50;
}

#aridorp .col-md-4{
	padding: 5px 15px;
}

@media (max-width: 768px) {
	#airdorp-top-menu{
		text-align: center;
	}
	#airdorp-top-menu .tab-menu{
		font-size: 14px !important;
	}
	#airdrop-cont,#airdrop-info {
		width: 100%;
	}
	#airdrop-info #recheck{
		zoom: 0.65;
		position: absolute;
		right: 20px;
		top: 20px;
	}
	#buy-back{
		padding: 10px !important;
	}
	#airdrop-info{
		padding-left: 0px;
		margin-top:30px
	}
	#airdrop-info .panel{
		padding-left: 0px;
		padding: 15px;
		padding-top: 30px;
	}
	#airdrop-bnb-icon{
		top: 0px;
		left: 10px;
	}

	#total-stake{
		display: block;
		font-size: 18px;
	}
	#oneday-key, #my-key{
		width: 50%;text-align: left;
	}
	#my-key{
		text-align: center;
	}
  }
@media (max-width: 1600px) {
	#airdrop-cont,#airdrop-info,#buy-back {
		width: 100%;
	}
}
</style>
