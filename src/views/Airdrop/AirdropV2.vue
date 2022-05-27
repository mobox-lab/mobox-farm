<template>
	<div class="tac por" style="padding-bottom: 50px">
		<div id="bg1"></div>
		<div id="aridorp">
				<section class=" por airdrop-cont" style="z-index: 10">
				<!-- <div class="swiper-container hide" ref="swiper_container" style="padding: 0px 10px;padding-bottom: 15px;"> -->
				<div class="swiper-container hide" ref="swiper_container" style="padding: 0px;padding-bottom: 15px;">
					<div class="swiper-wrapper tac">
						<!-- <div id="halloween-entry" class="swiper-slide tac" style="width: 60%;margin:0 auto">
							<router-link to="/anniversary">
								<img src="@/assets/anniversary/anniEntry.png" alt="" width="100%" />
							</router-link>
						</div> -->
						<!-- <div id="halloween-entry" class="swiper-slide tac" style="width: 60%;margin:0 auto">
							<router-link to="/binanceNFT">
								<img src="@/assets/binaceActivity.png" alt="" width="100%" />
							</router-link>
						</div> -->
						<div id="halloween-entry"  class="swiper-slide tac" style="width: 100%;margin:0 auto">
							<img src="@/assets/transMoMo.png" @click="oprDialog('transfer-dialog', 'block')" alt="" width="60%" />
						</div>
					</div>
					<div ref="pagination" class="swiper-pagination"></div>
				</div>
				<div class=" tal vertical-children tac-xs">
					<img class="mgt-30 hide-xs" src="@/assets/airdrop_icon.png" width="200" alt="">
					<div class="dib mgl-10 block-xs">
						<h1 style="font-size:40px">{{$t("Menu_01")}}</h1>
						<p class="small-xs">{{$t("Air-drop_224")}}</p>
					</div>
				</div>
				<div class="row  ovh mgt-10" style="padding:4px">
					<div class="aveage-box vertical-children" style="align-items: flex-end;">
						<p class="tal">
							<router-link to="/old">{{$t("Air-drop_258")}} >></router-link>
						</p>
						<p class="tar">
							<a id="recheck" href="https://www.certik.org/projects/mobox"  target="_blank">
								<img src="../../assets/icon/check-icon.png" alt="" height="50" />
							</a>
						</p>
					</div>
					<div class="col-md-12  mgt-20" style="margin-bottom:10px" v-for="item in getPledgeList" :key="item.coinName + item.addr" >
							<div class="airdrop-item tal " :class="`pledgeType-${pledgeType} `+ (item.coinName=='MBOX-BNB'?'active':'') " >
								<div class="test"></div>
								<div style="padding:20px" class="por ovh" id="mbox-panel">

									<div class="col-md-5 aveage-box" style="align-items: start;">
										<div class="vertical-children " style="padding-left: 56px" id="apy-div">
											<div class="dib airdorp-item-coin-icon tac por" :class="item.isLP?'double-img':'' " style="left:0px">
												<img v-for="(name, key) in item.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="50" alt="" />
											</div>
											<div class="tal " style="margin-left: 15px">
												<p class="opa-6 small vertical-children" >
													<span style="vertical-align:top">{{ $t("Air-drop_02") }}</span>
													<span class="mgl-5 cur-point dib" style="margin-top:-5px" @click="oprDialog('mbox-drop-des-dialog','block')">
														<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path style="fill:none" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
													</span>
												</p>
												<h3 class="mgt-5 new-text">${{ numFloor(item.totalSupply, 1).toLocaleString() }}</h3>
											</div>

											
										</div>

										<div >
												<p class="color-w tal small opa-6">{{$t("Air-drop_205")}}</p>
												<div  class=" point-block  close"  @click="getApyObj(item);toggleClass($event, {isLP: true})">
													<div class="tal "  >
														<h4 class="vertical-children new-text" :class="item.isLP?'show-point-block':''" style="right:10px;">
															<span>{{ item.apy }}</span>
															<svg  viewBox="0 0 24 24" class="rotate-arrow"  height="20px" ><path fill="#fff" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
														</h4>
													</div>

													<div  class="mgt-10 small  toggle-item" style="background:#13181F;padding:5px;border-radius:10px">
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
														<div  class="aveage-box vertical-children por" style="padding:2px"  >
															<p class="dib">CAKE</p>
															<p class="dib tar" >
																<span v-if="item.myApy.cake != '-'">{{numFloor(item.myApy.cake*100, 100)}}%</span>
																<Loading v-else />
															</p>
														</div>

														<div  class="aveage-box vertical-children por" style="padding:2px"  >
															<p class="dib">LP Fee</p>
															<p class="dib tar" >
																<span v-if="item.myApy.lpFee != '-'">{{numFloor(item.myApy.lpFee*100, 100)}}%</span>
																<Loading v-else />
															</p>
														</div>
														
														<div class="aveage-box" style="padding:2px" v-if="item.wantAmount > 0">
															<p class="dib">{{$t("Air-drop_206")}}</p>
															<p class="dib tar" >
																<span v-if="item.myApy.key != '-'">
																	{{numFloor((Number(item.myApy.key)+Number(item.myApy.cake) + Number(item.myApy.lpFee))*100, 100)}}%
																</span>
																<Loading v-else />
															</p>
														</div>
														<div v-if="item.wantAmount > 0 && item.maxApyNeedVeMobox != '-' " class="tac mgt-10">
															<p v-if="item.veMbox.mul < 300">
																<span v-html="$t('Air-drop_203').replace('#0#', `<span class='color-sell'>${numFloor(item.maxApyNeedVeMobox, 1e2)}</span>` )"></span>&nbsp;
																<span v-if="item.wantAmount > 0 " class="color-sell">
																	{{numFloor((Number(item.maxKeyApy)+Number(item.myApy.cake) + Number(item.myApy.lpFee))*100, 100)}}%
																</span>
																<span v-else>
																	{{numFloor((Number(item.allKeyApy) + Number(item.myApy.cake)+ Number(item.myApy.lpFee) ) * 100, 100)}}%
																</span>
															</p>
															<p v-else>
																{{$t("Air-drop_204")}}
															</p>
														</div>

													</div>
												</div>

											</div>
									</div>

									<div class="col-md-7 aveage-box" style="align-items: start;">

										<div class=" point-block  close" @click="getLPPrice(item);toggleClass($event, item)">
											<div >
												<div><span class="opa-6 small " >{{ $t("Air-drop_03") }}</span></div>
												<div class="tal "  style="flex:2" v-if="item.wantAmount != '-' ">
													<h3 v-if=" item.wantAmount > 0"  class="vertical-children notice-color new-text" :class="item.isLP?'show-point-block':''">
														<span>{{ numFloor(item.wantAmount, 1e2) }}</span>
														<svg v-if="item.isLP" viewBox="0 0 24 24" class="rotate-arrow"  height="20px" ><path fill="#fff" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
													</h3>
													<h3 v-else style="padding: 5px;display:inline-block">0</h3>
												</div>
												<Loading class="mgt-10" v-else />
											</div>

											<div  class="mgt-10 small toggle-item" style="background:#13181F;padding:5px;border-radius:10px">
												<div class="aveage-box vertical-children por" style="padding:2px"  v-for="(name, key) in item.coinName.split('-')" :key="item.coinName+key">
												<div class="dib">
													<span> {{name}}</span>
												</div>
												
												<p class="dib tar" >
													<span class="mgl-10" v-if="item.lpPrice[key] != '-' ">{{item.lpPrice[key]}}</span>
													<Loading v-else />
													<img class="mgl-5 hide-xs"  :src=" require(`../../assets/coin/${name}.png`) " height="20" alt="" />
												</p>
												</div>
											</div>

										</div>

										<div class="tal ">
											<p class="opa-6 small vertical-children" >
												<span style="vertical-align:top">{{ $t("Air-drop_152") }}</span>
												<span class="mgl-5 cur-point dib" style="margin-top:-5px" @click="oprDialog('mbox-take-des-dialog','block')">
													<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path style="fill:none" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
												</span>
											</p>
											<h3 style="margin-top:7px" class="new-text" v-if="coinArr[item.coinKey].veMbox.orderIndexs[0].veMboxNum != '-' ">
												{{ numFloor( 
													(
													Number(coinArr[item.coinKey].veMbox.orderIndexs[0].veMboxNum)
													+ Number(coinArr[item.coinKey].veMbox.orderIndexs[1].veMboxNum)
													+ Number(coinArr[item.coinKey].veMbox.orderIndexs[2].veMboxNum)
													) /1e18, 1e4) || "0" }}
												<span class="notice-color" v-if="coinArr[item.coinKey].veMbox.mul > 100">({{numFloor(coinArr[item.coinKey].veMbox.mul/100, 100)}}x)</span>
											</h3>
											<Loading class="mgt-10" v-else />
										</div>

										<div class="tal  ">
											<p class="opa-6 small">{{ $t("Air-drop_05") }}(MBOX)</p>
											<p class="mgt-5">
												<button class="btn-success btn-small por new-text"  @click="$refs.keyopr.showAll()">
													{{getTotalKey}}
												</button>
											</p>
										</div>

									</div>

									<div class="aveage-box col-md-12 mgt-20" style="background:#070d14;border-radius: 10px;padding:10px 0px">
										<div class="dib por tac" @click="setAction(21001);$root.$children[0].$refs.pancake.setOprData(item).show('swap')" >
											<img class="cur-point "  width="40" src="../../assets/icon/liquidity_icon.png" alt="" >
											<span style="width:100%;position:absolute;bottom:-5px;left:0px;font-size:12px;color:#fff;zoom:0.8" >{{$t("Air-drop_29")}}</span>
										</div>
										<div class="dib por tac hide-xs"  @click="setAction(21002);$root.$children[0].$refs.pancake.setOprData(item).show('liquidity')">
											<img class="cur-point "  width="40" src="../../assets/icon/exchange_icon.png" alt="" >
											<span style="width:100%;position:absolute;bottom:-5px;left:0px;font-size:12px;color:#fff;zoom:0.8" >{{$t("Air-drop_30")}}</span>
										</div>
										<template>
											<div class="dib por tac"  @click="setAction(21003);needSetItem = item;oprDialog('deposit-notice-dialog','block')"  v-if="needShowNotice">
												<img class="cur-point " width="40" src="../../assets/icon/deposit_icon.png" alt=""   >
												<span style="width:100%;position:absolute;bottom:-5px;left:0px;font-size:12px;color:#fff;zoom:0.8" >{{$t("Air-drop_07")}}</span>
											</div>
											<div class="dib por tac"  @click="setAction(21003);$refs.deposit.setOprData(item).show();" v-else>
												<img class="cur-point " width="40" src="../../assets/icon/deposit_icon.png" alt=""   >
												<span style="width:100%;position:absolute;bottom:-5px;left:0px;font-size:12px;zoom:0.8" class="bold ">{{$t("Air-drop_07")}}</span>
											</div>
										</template>
										<div class="dib por tac" @click="setAction(21004);$refs.withdraw.setOprData(item).show();" >
											<img class="cur-point "  width="40" src="../../assets/icon/withdraw_icon.png" alt="" >
											<span style="width:100%;position:absolute;bottom:-5px;left:0px;font-size:12px;color:#fff;zoom:0.8" >{{$t("Air-drop_08")}}</span>
										</div>
										<div class="dib tac por cur-point"  @click="setAction(21005);$parent.$refs.vmbox.setOprData(item).show();">
											<span class="por dib" style="height:100%;">
												<span class="notice" v-if="coinArr[item.coinKey].veMbox.notice"></span>
												<img   src="@/assets/icon/vembox-icon.png" alt="" height="40" />
											</span>
											<span style="width:150%;position:absolute;bottom:-5px;left:-25%;font-size:12px;color:#fff;zoom:0.8;" >{{$t("Air-drop_188")}}</span>
										</div>
									</div>

								</div>

							</div>
					</div>
				</div>
			</section>
		</div>

		<div id="activity" class="mgt-10">
			<section class=" por airdrop-cont">
				<div class="tal ">
					<div class="vertical-children">
						<h2 class="dib">{{$t("Auction_01")}}</h2>
					</div>
					<div class="aveage-box block-xs">
						<p class="small-xs mgt-10 hide-xs opa-6">{{$t("Air-drop_234")}}</p>
						<div class="tar mgt-10 tal-xs">
							<button class="btn-liling" @click="howToPlayPos =  0;oprDialog('how-to-play-dialog', 'block')">{{$t("Air-drop_226")}}</button>
							<button class="btn-liling mgl-5" @click="howToPlayPos =  1;oprDialog('how-to-play-dialog', 'block')">{{$t("Air-drop_227")}}</button>
						</div>
					</div>
				</div>
				<div class="ovh mgt-10">
					<Activity />
				</div>

				<div class="mgt-30 tal">
					<div class="vertical-children">
						<h2 class="dib">{{$t("Menu_04")}}</h2>
					</div>
					<div class="mgt-10">
						<Collection />
					</div>
				</div>
				<div class="mgt-10 tal visiable-xs">
					<!-- <div class="vertical-children">
						<img src="@/assets/icon/periocn.png" alt="" height="20">
						<h2 class="dib mgl-10">Total MOMO Staked</h2>
					</div> -->
					<div class="mgt-10 adv-panel tac" style="padding:20px">
							<div class="aveage-box ">
							<div >
								<p class="small opa-6">{{ $t("Mine_02") }}</p>
								<p class=" bold2 vertical-children" style="margin-top:5px">
									<img src="@/assets/icon/airdrop.png" alt="" height="20">
									<span class="mgl-5" style="font-size: 16px" v-if="eth_totalHashrate != '-' ">{{eth_totalHashrate.toLocaleString()}}</span>
									<Loading class="mgl-5 " v-else  />
								</p>
							</div>
							<div>
								<p class="small opa-6">{{ $t("Mine_01") }}</p>
								<p class=" bold2 vertical-children" style="margin-top:5px">
									<img src="@/assets/coin/MBOX.png" alt="" height="20">
									<span class="mgl-5" style="font-size: 16px">{{totalAirdropMbox.toLocaleString()}}</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				<template v-if="!isMoboxWallet">
					<div class="tal mgt-30" >
						<div class="vertical-children">
							<h2 class="dib">{{$t("Air-drop_245")}}</h2>
						</div>
						<div class="aveage-box block-xs">
							<p class="small-xs opa-6">{{$t("Air-drop_246")}}</p>
						</div>
					</div>
					<div class="mgt-20 sexy" style="overflow: auto">
						<GamesView />
					</div>
				</template>

				<!-- 统计分析 先隐藏 -->
				<section class="hide">
					<div class="tal mgt-30">
						<div class="vertical-children">
							<h2 class="dib">veMBOX</h2>
						</div>
						<div class="aveage-box block-xs">
							<p class="small-xs opa-6">{{$t("Air-drop_256")}}</p>
						</div>
					</div>

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

					<div class="tal mgt-30">
						<div class="vertical-children">
							<h2 class="dib">{{$t("Air-drop_257")}}</h2>
						</div>
						<div class="aveage-box block-xs">
							<p class="small-xs opa-6">{{$t("Air-drop_91")}}</p>
						</div>
					</div>

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
									<a href="https://bscscan.com/address/0x1846c0ab8D09007154066Cbb114315e11D94D4E8" target="_blank">{{$t("Air-drop_148")}}</a>
								</td>
							</tr>
						</table>
					</section>
				</section>
			</section>
		</div>

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

		<Dialog id="mbox-drop-des-dialog" :top="100" :width="420">
			<h3>{{$t("Air-drop_211")}}</h3>
			<div class=" mgt-10 vertical-children">
				<span >{{ $t("Air-drop_21") }}: </span>
				<span class="notice-color">{{totalAirdropKey}} MBOX</span>
			</div>
			<div class="ly-input-content mgt-10">
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

		<Dialog id="mbox-take-des-dialog" :top="180" :width="420">
			<h3 >veMBOX</h3>
			<p class="dib tal mgt-10" >
				{{$t("Air-drop_199")}}: <span class="notice-color">{{numFloor(getPledgeList[0].veMoboxSupply/1e18, 1).toLocaleString()}}</span>
			</p>
			<p class="mgt-10 tab-body tal"  style=" padding:15px;">{{$t("Air-drop_225")}}</p>
		</Dialog>

		<Dialog id="how-to-play-dialog" :top="100" :width="350">
			<!-- <div class="tal mgt-10" style="zoom: 0.8">
				<div @click="howToPlayPos =  0"  :class="howToPlayPos == 0?'active':''" class="tab-menu " >{{$t("Air-drop_226")}}</div>
				<div @click="howToPlayPos =  1"  :class="howToPlayPos == 1?'active':''"  class="tab-menu">{{$t("Air-drop_227")}}</div>
			</div> -->
			<h3 v-if="howToPlayPos ==  0" class="ngt-10">{{$t("Air-drop_226")}}</h3>
			<h3 v-if="howToPlayPos ==  1" class="mgt-10">{{$t("Air-drop_227")}}</h3>
			<div class="mgt-10"></div>
			<template v-if="howToPlayPos ==  0">
				<div  class="tab-body tal  " v-html="$t('Air-drop_228')" style=" padding:15px;max-height:450px;overflow-y:auto"></div>
				<div class="mgt-10">
					<button class="btn-primary" style="padding:0px 10px" @click="$root.$children[0].$refs.vmbox.setOprData(coinArr['GOV']).show()">{{$t("Air-drop_229")}}</button>
				</div>
			</template>
			<template v-if="howToPlayPos ==  1">
				<div  class="tab-body tal  " v-html="$t('Air-drop_230')" style=" padding:15px;max-height:450px;overflow-y:auto"></div>
				<div class="mgt-10">
					<router-link to="/market?tab=4">
						<button class="btn-primary" >{{$t("Air-drop_232")}}</button>
					</router-link>
					<router-link to="/market?tab=0" class="mgl-10">
						<button class="btn-line" >{{$t("Air-drop_233")}}</button>
					</router-link>
				</div>
			</template>
		</Dialog>

		<KeyOpr ref="keyopr" />
		<Withdraw ref="withdraw" />
		<Deposit ref="deposit" />
	</div>
</template>
<script>
import CommonMethod from "@/mixin/CommonMethod";
import { Common, Wallet } from '@/utils';
import { mapState } from "vuex";
import { PancakeConfig } from "@/config";
import KeyOpr from "./KeyOpr";
import Withdraw from './Withdraw';
import Deposit from './Deposit';
import { Dialog, Loading, Dropdown } from '@/components';
import Activity from "../Activity/Activity.vue"
import GamesView from "./GamesView.vue"
import Collection from "../Collection.vue"

export default {
	mixins: [CommonMethod],
	components: { KeyOpr, Withdraw, Deposit, Dialog, Loading, Dropdown, Activity, GamesView, Collection},
	data(){
		return({
			howToPlayPos: 0,
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
				{min: 0.5, max: 1, num: 7.5e4},
				{min: 1, max: 2, num: 10e4},
				{min: 2, max: -1, num: 12.5e4},
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
			refundData: (state) => state.globalState.data.refundData,
			halloweenBox: (state) => state.userState.data.halloweenBox,
			christmasData: (state) => state.userState.data.christmasData,
			eth_totalHashrate: (state) => state.ethState.data.totalHashrate,
			totalAirdropMbox: (state) => state.ethState.data.totalAirdropMbox,
		}),

		isMoboxWallet(){
			return window.SHOW_APP_BAR != undefined;
		},

		//获取总质押USDT
		getTotalSupplyUSDT() {
			let num = this.coinArr["MBOX-BNB-V2"].totalSupply;
			return this.numFloor(num, 1);
		},

		getPledgeList(){
			let arr = [];
			let stakeLP = PancakeConfig.StakeLP;
			let coinArr =  this.coinArr;

			for (let key in stakeLP) {
				let {pIndex, isFinish} = stakeLP[key];
				if(pIndex != -1 && (this.coinArr[key].wantAmount > 0 || !this.onlyShowPledge)){
					if(this.pledgeType == "v1" && isFinish && key == "MBOX-BNB"){
						arr.push({coinKey: key, ...stakeLP[key], ...coinArr[key]});
					}
					if(this.pledgeType == "v2" && !isFinish && key == "MBOX-BNB-V2"){
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
		},
		//获取补偿的veMbox
		getNeedTransferVeMbox(){
			let retArr = [0,0,0];
			this.getPledgeList.map(item=>{
				if(item.coinName != "MBOX-BNB"){
					let orderIndexs = item.veMbox.orderIndexs;
					retArr[0] += Number(orderIndexs[0].veMboxNum);
					retArr[1] += Number(orderIndexs[1].veMboxNum);
					retArr[2] += Number(orderIndexs[2].veMboxNum);
				}
			});
			return retArr;
		},
		getHasVeMboxPool(){
			let retItem = null;
			this.getPledgeList.map(item=>{
				if(item.coinName != "MBOX-BNB"){
					if((item.veMbox.orderIndexs[0] != 0 || item.veMbox.orderIndexs[0] != 0 || item.veMbox.orderIndexs[2] != 0) && retItem == null){
						retItem = item;
					}
				}
			});
			return retItem;
		},
		needShowRefund(){
			let totalVeMbox = this.numFloor(this.getNeedTransferVeMbox[0] / 1e18, 1e2) + this.numFloor(this.getNeedTransferVeMbox[1] / 1e18, 1e2) + this.numFloor(this.getNeedTransferVeMbox[2] / 1e18, 1e2);
			return (Number(this.numFloor(totalVeMbox, 1e2)) > 0 && Number(this.refundData.total) > 0) || (this.refundData.refunded == false && Number(this.refundData.total) > 0) ;
		}
	},
	async created(){
		let hasSelectNotShowNotice =  Common.getStorageItem("hasSelectNotShowNotice");
		if(hasSelectNotShowNotice == 1){
			this.needShowNotice = false;
		}
	},
	mounted(){
		let that = this;
		this.mySwiper = new window.Swiper(this.$refs.swiper_container, {
			direction: "horizontal",
			slidesPerView: "auto",
			loop: false,
			autoplay: {
				delay: 5000,
				stopOnLastSlide: false,
				disableOnInteraction: false,
			},
			passiveListeners : false,
			resistanceRatio: 0,
			spaceBetween: 30,
			pagination: {
				el: this.$refs.pagination,
				type: 'bullets',
				clickable: true
			},
			on: {
				slideChangeTransitionEnd: function(){
					that.nowIndex = this.activeIndex;
				},
			}
		});
	},
	methods: {
		//领取补偿
		async refundMbox(){
			let hash = await Wallet.ETH.refundMbox();
			if(hash){
				this.lockBtnMethod("refundMboxLock");
			}
		},
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
.new-text{
	font-size: 18px !important;
	font-family: 'Poppins Bold';
}

#aridorp, #activity{
	padding: 10px
}
#bg1{
	background-image: url("../../assets/bg11.jpg");
	background-repeat: no-repeat;
	background-size:100%;
	height: 800px;
	width: 100%;
	position: absolute;
}

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

.pledgeType-v1,.pledgeType-v2{
	overflow: hidden;
}
.pledgeType-v2.active{
	overflow: visible !important;
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
	z-index: 998;
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
	border-radius: 10px;
	position: relative;
	box-sizing: border-box;
	z-index: 1;
}
.airdrop-item.active:before{
	content: "";
	position: absolute;
	/* background: linear-gradient(145deg,#e3672a 0%, #000 100%); */
	/* background: linear-gradient(145deg,#C320FF  0%, #30BAFD  100%); */
	left: -3px;
	top: -3px;
	bottom: -5px;
	right: -3px;
	z-index: -1;
	border-radius: 10px;
}
.test{
	position: absolute;
	top: -1px;
	right: -1px;
	bottom: -3px;
	left: -1px;
	z-index: -1;
	background: #1C222C;
	border-radius: 10px;
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
	max-width: 1460px;
	background: #13181F;
	border-radius: 20px;
	margin: 0px auto;
	margin-top: 20px;
}
.airdrop-cont {
	padding-top: 0px;
	max-width: 1460px;
	border-radius: 20px;
	margin: 0 auto;
}

#airdrop-info{
	padding-top: 0px;
	max-width: 1460px;
	border-radius: 20px;
	padding-left: 34px;
	margin: 0px auto;
	border: 1px solid red;
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

.btn-success.btn-small{
	border-radius: 20px;
	min-width: 50px !important;
}

.point-block .show-point-block{
	right: 10px !important;
}


@media (max-width: 768px) {
	.new-text{
		font-size: 16px !important;
	}
	.swiper-container{
		display: block;
		--swiper-pagination-color: #fff;
	}
	.swiper-pagination{
		bottom: 0px
	}
	
	#halloween-entry{
		cursor: pointer;
		display: inline-block;
		position: relative;
	}
	#halloween-entry span{
		position: absolute;
		display: block;
		padding: 0px 5px;
		background: red;
		min-width:20px;
		border-radius: 20px;
		top: 10px;
		right: 0px;
	}


	#bg1,#bg2{
		background-size: cover;
		background-position: bottom;
		height: 300px;
	}
	#bg2{
		top: 20%;
	}
	#recheck{
		zoom: 0.65;
	}
	#activity{
		margin-top: 10px !important;
	}

	#airdorp-top-menu{
		text-align: center;
	}
	#airdorp-top-menu .tab-menu{
		font-size: 14px !important;
	}
	.airdrop-cont,#airdrop-info {
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
	h3{
		font-size: 12px;
	}
	h1{
		font-size: 20px !important;
	}
	.airdorp-item-coin-icon{
		zoom: 0.8;
	}
	#apy-div{
		padding-left: 40px !important;
	}
	#mbox-panel{
		padding: 10px !important
	}

	#mbox-panel .col-md-7{
		text-align: left !important;
		border-top: 1px solid #373D45;
		margin-top: 20px;
		padding: 20px 0px;
	}
	#mbox-panel .col-md-7 > div{
		padding: 0px 5px;
		font-size: 12px;
	}
	#mbox-panel .col-md-7 *{
		text-align: left !important;
	}
	#mbox-panel .col-md-12{
		margin-top: 0px !important;
	}

	.point-block .show-point-block{
		padding: 2px 5px !important;
		right: 5px !important;
		margin-top: 5px;
	}

	#mbox-panel .btn-small{
		border-radius: 20px;
		height: 25px;
		padding: 0px 10px !important;
		min-width: 80px;
	}

  }
@media (max-width: 1600px) {
	.airdrop-cont,#airdrop-info,#buy-back {
		width: 100%;
	}
}
</style>

<style>
	#aridorp .swiper-pagination-bullet-active{
		background: #fff !important;
		width: 20px;
	}
	#aridorp .swiper-pagination-bullet{
		background: #fff;
		height: 4px;
		border-radius: 10px;
	}
</style>
