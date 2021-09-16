import Common from "../utils/Common";
import {WalletConfig, ConstantConfig, } from "@/config";
import {Wallet} from '@/utils'
import axios from 'axios';

const $ = window.$;

const CommonMethod = {
	data() {
		return ({
			category_img: {
				1: "bird",
				2: "beast",
				3: "fish",
				4: "monster",
				5: "people",
				6: "people",
			},
			hackReload: "page_"+new Date().valueOf()
		})
	},
	methods: {
		async setAction(actionId){
			let sendData = {
				actionId: actionId.toString(),
				platform:"web",
				version:"1.0",
				fd: Wallet.ETH.myAddr
			}
			axios.post("https://accountapi.bitsplus.cn/app/action", sendData);
		},
		getConfirmDialog(){
			return this.$root.$children[0].$refs.confirmDialog;
		},
		getMomoShopCar(){
			return this.$root.$children[0].$refs.momoShopCar;
		},
		showSwapBox(){
			this.$root.$children[0].$refs.pancake.setOprData({coinKey: 'MBOX-BNB-V2', pancakeVType: 2}).show('swap');
		},
		getCurrencyName(currency){
			return ConstantConfig.CurrencyTypeName[currency]
		},
		showDrop(e) {
			if(e.target.className != "dropdown-group-value por") return;
			e.stopPropagation();
			let $nextDom = $(e.target).next();
			let display = $nextDom.css("display");
			if (display == "none") {
				$nextDom.show();
			} else {
				$nextDom.hide();
			}
		},
		getTxUrl(tx) {
			return WalletConfig.ETH.view_tx_url + tx;
		},
		getBlockUrl(block){
			return WalletConfig.ETH.view_block_url + block;
		},
		hackReloadMethod(){
			this.hackReload =  "page_"+new Date().valueOf();
		},
		getShortAddr(addr) {
			if (typeof addr != "string") return "";
			return addr.substr(0, 6) + "..." + addr.substr(addr.length - 4, addr.length);
		},
		numFloor(num, decimals = 100) {
			return Number(Math.floor(num * decimals + 0.0000002) / decimals);
		},
		//根据算力得到显示文字的颜色
		getHashrateColor(item) {
			let {
				quality,
			} = item;
			quality = Number(quality);
			if (quality < 4) {
				return "c-lv1";
			}
			return "c-lv" + (quality - 1);
		},
		async oprDialog(domId, type) {
			let dom = document.getElementById(domId);
			if (type == "none") {
				dom.classList.add("yf-dialog-remove");
				await Common.sleep(200);
			}
			dom.classList.remove("yf-dialog-remove");
			dom.style.display = type;
		},
		lockBtnMethod(type) {
			this.$store.commit("globalState/lockBtn",type);
		},
		unLockBtn(type) {
			this.$store.commit("globalState/unLockBtn",type);
		},
		showNotify(msg, type) {
			this.$store.commit("globalState/addNotify", {msg,type,});
		},
		showNotifyTrans(msg, hash,  type) {
			this.$store.commit("globalState/addNotifyTrans", {msg, hash, type});
		},
		showWalletOprStatus(){
			this.$store.commit("globalState/setwalletStatus", {status:1});
			this.oprDialog("wallet-opr-dialog", "block")
		},
		shorAddress(address) {
			if (!address) return ""
			return address.substring(0, 4).concat("...").concat(address.substring(address.length - 4, address.length));
		},
		shortHash(hash) {
			if (!hash) return ""
			return hash.substring(0, 6).concat("...").concat(hash.substring(hash.length - 6, hash.length));
		},
		shortStr(name) {
			if (!name) return ""

			let strLen = name.length;
			let realLen = this.getStringLength(name);
			if (realLen > 10) {
				if (strLen * 2 <= realLen) {
					return name.substring(0, 7).concat("...");
				} else {
					return name.substring(0, 10).concat("...");
					// return name.substring(0, strLen - 3 > 4 ? strLen - 3 : 4).concat("...");
				}
			}
			return name;
		},
		getStringLength(str) {
			var slength = 0;
			for (let i = 0; i < str.length; i++) {
				if ((str.charCodeAt(i) >= 0) && (str.charCodeAt(i) <= 255))
					slength = slength + 1;
				else
					slength = slength + 2;
			}
			return slength;
		},
		dateFtt(fmt, date) {
			var o = {
				"M+": date.getMonth() + 1,
				"d+": date.getDate(),
				"h+": date.getHours(),
				"m+": date.getMinutes(),
				"s+": date.getSeconds(),
				"q+": Math.floor((date.getMonth() + 3) / 3),
				"S": date.getMilliseconds()
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		},
		getLeftTime(times) {
			let day = 0,
				hour = 0,
				minute = 0,
				second = 0;
			if (times > 0) {
				hour = Math.floor(times / (60 * 60));
				minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			return this.patchTimeLength(hour) + ":" + this.patchTimeLength(minute) + ":" + this.patchTimeLength(second)
		},

		// 时间长度补位
		patchTimeLength(time) {
			const timeString = time.toString();
			return timeString.length === 1 ? '0' + timeString : timeString;
		},
	},

}

export default CommonMethod;