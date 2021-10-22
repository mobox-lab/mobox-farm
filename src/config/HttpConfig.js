export default class HttpConfig {
	static ServeNode = {
		Activity: "http://192.168.5.190:9093", // 测试
	}

	static Halloween = {
		Exchange: this.ServeNode.Activity +"/event/exchange",
		Sell: this.ServeNode.Activity +"/event/sell",
		OpenBox: this.ServeNode.Activity +"/event/openBox",
		Trank: this.ServeNode.Activity +"/event/trank",
		Drank: this.ServeNode.Activity +"/event/drank",
		Logs: this.ServeNode.Activity +"/event/logs",
		Bags: this.ServeNode.Activity +"/event/bags",
		Claim: this.ServeNode.Activity +"/event/claim",
		Ovdata: this.ServeNode.Activity +"/event/ovdata",
	}
}