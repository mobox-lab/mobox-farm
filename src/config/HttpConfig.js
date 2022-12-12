export default class HttpConfig {
	static SN = {
		// Activity: "http://192.168.5.190:9093", // 测试
		Activity: "https://eventapi.mobox.io", 
		// 周年活动
		Anniversary: "https://eventapi.mobox.io", 
		// Anniversary: "http://192.168.5.98:9093/",
	}

	static Halloween = {
		Exchange: this.SN.Activity +"/event/exchange",
		Sell: this.SN.Activity +"/event/sell",
		OpenBox: this.SN.Activity +"/event/openBox",
		Trank: this.SN.Activity +"/event/trank",
		Drank: this.SN.Activity +"/event/drank",
		Logs: this.SN.Activity +"/event/logs",
		Bags: this.SN.Activity + "/event/bags",
		Claim: this.SN.Activity +"/event/claim",
		Ovdata: this.SN.Activity +"/event/ovdata",
	}

	static Christmas = {
		Bags: this.SN.Activity + "/event/bags",
		Logs: this.SN.Activity + "/event/logs",
		OpenBox: this.SN.Activity + "/event/openBox",
		luckyGuys: this.SN.Activity + "/event/lucky/guys",
		Ovdata: this.SN.Activity +"/event/ovdata",
		Notify: this.SN.Activity +"/event/notify",
		Claim: this.SN.Activity +"/event/claim",
	}
}