// import TronWeb from 'tronweb'
export default class TRON {
  static init() {
    console.log("init tron");
  }
}
// const TronUtils = {
// 	// viewTransaction,
// 	// commitTransaction,
// 	test
// };

// function test() {
// 	console.log("sss");
// }

// function initTron(cb) {
// tmpTimer1 = setInterval(() => {
// 	if (!window.tronWeb) return;
// 	clearInterval(tmpTimer1);
// 	tronWeb = window.tronWeb;
// 	if (tmpTimer2) clearInterval(tmpTimer2);
//
// 	tmpTimer2 = setInterval(() => {
// 		if (tronWeb.defaultAddress.base58 == false) return
// 		clearInterval(tmpTimer2);
// 		walletAddress = tronWeb.defaultAddress.base58;
// 		window.myAddress = walletAddress;
// 		window.socket.emit("login", { addr: walletAddress });
// 		cb();
// 	}, 1000);
// }, 1000);
// }

//
// async function viewTransaction(contractAddr, functionSelector, callVal, pamarmArray, cb) {
// 	tronWeb.transactionBuilder.triggerSmartContract(contractAddr, functionSelector, 1000000, callVal, pamarmArray, async (err, transaction) => {
// 		if (err) {
// 			console.log(err, functionSelector);
// 			cb(err);
// 			return;
// 		}
// 		cb(null, transaction.constant_result);
// 	});
// }

//
// async function commitTransaction(contractAddr, functionSelector, callVal, pamarmArray, feeLimit, cb) {
// 	tronWeb.transactionBuilder.triggerSmartContract(contractAddr, functionSelector, feeLimit || 100000000, callVal, pamarmArray, async (err, transaction) => {
// 		if (err) {
// 			cb(err, "");
// 			return;
// 		}
// 		let signData = await tronWeb.trx.sign(transaction.transaction);
// 		let data = await tronWeb.trx.sendRawTransaction(signData);
// 		cb(err, data.transaction.txID);
// 	});
// }

// export default TronUtils;
