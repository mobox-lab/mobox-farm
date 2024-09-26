<template>
    <div class="bg">
        <div class="be-content">
            <div style="max-width:1000px;margin:0px auto;">
                <div class="vertical-children tac mgt-20">
                    <img src="@/assets/blindbox/box_icon.png" alt="" class="box-icon">
                    <div class="dib mgl-10 ">
                        <p class="stroke bold2" style="color:#E4F8FF" data-text="MBOX">MBOX</p>
                        <p class="stroke bold2" style="color:#F1BC16" data-text="BLIND BOX">BLIND BOX</p>
                    </div>
                </div>
                <div class="por mgt-20 dib">
                    <div class="bb-input-label" >
                        <img src="@/assets/blindbox/input_icon.png" alt="" height="100%">
                    </div>
                    <input class="bb-input bold2" :placeholder="$t('BlindBOX_2')" type="text" v-model="check_no">
                </div>
                <div class="mgt-50" >
                    <div class="img-btn serch-btn" style="width:260px" @click="getMoMoType">
                        <img src="@/assets/blindbox/btn2.png" alt="" width="100%">
                        <label style="margin-top:-5px">
                            <span v-if="!loading" class="bold2" style="font-size: 36px;color:#592c05" >{{$t('BlindBOX_3')}}</span>
                            <Loading v-else :width="30" :height="30" />
                        </label>
                    </div>
                </div>
                <div class="faq-panel por" >
                    <div class="faq-title-cont">
                        <img src="@/assets/blindbox/faq_t.png" alt="">
                        <p class="faq-title bold2" >- FAQ -</p>
                    </div>
                    <div class="faq-item tal mgt-20" >
                        <h2 class="bold2 vertical-children">
                            <img src="@/assets/blindbox/faq.png" alt="">
                            <span class="mgl-10">{{$t("BlindBOX_4")}}</span>
                        </h2>
                        <p class="mgt-10" style="white-space: pre-line;">
                            {{$t("BlindBOX_5")}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="result-bb-bg" v-if="isShowResult">
            <div class="result-bb-body animate__zoomIn animate__animated animate__faster">
                <img src="@/assets/blindbox/close.png" class="result-bb-close" alt="" height="40" @click="isShowResult = false">
                <template v-if="momoData.proto_id != 0 && momoData.status == 0">
                    <div>
                        <img v-if="momoData.proto_id != 0" class="result-bb-momo" :src="require(`@/assets/pet/${momoData.proto_id}.png`)" alt="" width="250px">
                    </div>
                    <p class="result-bb-name bold2" v-if="momoData.proto_id != 0">{{$t(getName)}}</p>
                    <div class="mgt-30">
                        <div class="img-btn" style="width:190px" @click="cliam">
                            <img src="@/assets/blindbox/btn2.png" alt="" width="100%">
                            <label style="margin-top:-5px">
                                <span v-if="!loading" class="bold2" style="font-size: 20px;color:#592c05"  >{{$t('Festival_17')}}</span>
                                <Loading v-else :width="30" :height="30" />
                            </label>
                        </div>
                    </div>
                </template>
                <template v-else>
                        <h1 class="bold2" style="color:#3C75E8">{{$t("BlindBOX_6")}}</h1>
                        <p class="opa-6">{{$t("BlindBOX_7")}}</p>
                        <div class="mgt-50">
                            <img src="@/assets/blindbox/no.png" alt="" width="120">
                        </div>
                         <div class="mgt-50">
                            <div class="img-btn" style="width:190px" @click="isShowResult = false">
                                <img src="@/assets/blindbox/btn2.png" alt="" width="100%">
                                <label style="margin-top:-5px">
                                    <span  class="bold2" style="font-size: 20px;color:#592c05"  >Back</span>
                                </label>
                            </div>
                        </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import CommonMethod from '@/mixin/CommonMethod';
import { Common, Wallet } from "@/utils";
import axios from 'axios';
import { Loading } from '@/components';
import { BaseConfig } from '@/config';

export default {
	mixins: [CommonMethod],
    components: {Loading},
    data(){
        return{
            momoData: {
                proto_id: 0,
                status: -1
            },
            check_no: "",
            serveUrl: "https://accountapi.mobox.io",
            isShowResult: false,
            loading: false,
            sn: "",
        }
    },
    computed: {
        getName(){
            return BaseConfig.NftCfg[this.momoData.proto_id].tokenName;
        }
    },
    methods: {
        async getSign(){
			let now = Math.floor(Date.now() / 60000);
			let str = "MOBOX_CLAIM_MOMO_" + now;
			let signStr =  await Wallet.ETH.signStr(str);
			return signStr
		},

        async cliam(){
            let myAddr = await Wallet.ETH.getAccount();
            let sign = await this.getSign();
            console.log({sn: this.sn, check_no: this.check_no,addr: myAddr, sign});
            this.loading = true;
            let {data} = await axios.post(this.serveUrl + "/momo/claim", {sn: this.sn, check_no: this.check_no,addr: myAddr, sign});
            this.loading = false
            console.log(data);
            if(data.code == 200){
                this.isShowResult = false;
				this.getConfirmDialog().show(this.$t("BlindBOX_8"), null, true);
            }else{
                this.showNotify(this.$t("BlindBOX_9"), "error");
            }
        },
        async getMoMoType(){
            if(this.loading) return;
            let sn = Common.getUrlParms("sn") || this.$route.query.sn;
            if(sn == null) return;
            if(this.check_no == "") return;
            this.loading = true
            let {data} = await axios.post(this.serveUrl + "/momo/query", {sn});
            this.loading = false;
            console.log(data);
            if(data.code == 200){
                this.momoData = data.data;
                this.sn = sn;
                this.isShowResult = true;
            }else{
				this.getConfirmDialog().show(this.$t("BlindBOX_10"), null, true);
            }
        }
    }
}

</script>

<style scoped>
    @media (max-width: 768px) {
        .result-bb-bg{
            padding-left: 0px !important ;
        }
        .result-bb-body{
            width: 90% !important;
        }
        .bg{
            padding-left: 0px !important;
        }
        .bb-input{
            width: 100% !important;
            min-width: 330px !important;
            height: 60px !important;
            border: 4px solid #0d3c98 !important;
            border-radius: 10px !important;
            font-size: 16px !important;
            padding-left: 80px !important;
            /* margin-top: 30px !important; */
        }
        .faq-panel{
            width: 95% !important;
            margin: 0px auto;
        }
        .stroke{
            font-size: 45px !important;
            line-height: 50px !important;
            text-align: center !important;
        }
        .box-icon{
            width: 60% !important;
        }
        .serch-btn{
            width: 200px !important;
        }
        .serch-btn span{
            font-size: 20px !important;
        }
        .bb-input-label{
            left: 20px !important;
            padding-right: 20px !important;
            top: 15px !important;
            bottom: 15px !important;
        }
    }
    .result-bb-name{
        padding: 5px 20px;
        background: #011c49;
        border-radius: 26px;
        color: #a58eff;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
    }
    .result-bb-close{
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
    .result-bb-body{
        margin: 0px auto;
        margin-top: 100px;
        position: relative;
        padding: 50px 0px;
        width: 470px;
        background: #020711;
        border: 2px solid rgba(14,61,151,0.43);
        border-radius: 36px;
        box-shadow: 0px 10px 0px 3px #011b49;
    }
    .result-bb-bg{
        position: fixed;
        top: 0px;left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 99999;
        padding-left: 250px;
    }
    .faq-item p{
        color: #8f8f8e;
        font-size: 15px;
    }
    .faq-item h2{
        font-size: 24px;
        color: #3c75e8;
    }
    .faq-item{
        padding-bottom: 30px;
    }
    .faq-title-cont{
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .faq-title{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%; height: 100%;display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: #3c75e8;
        text-shadow: 0px 5px 0px 5px #011b49; 
    }
    .faq-panel{
        width: 1000px;
        background: #020711;
        border: 2px solid rgba(14,61,151,0.43);
        border-radius: 10px;
        box-shadow: 0px 10px 0px 3px #011b49;
        padding: 40px;
        margin-top: 100px;
    }
    .bb-input-label{
        position: absolute;
        left: 50px;
        top: 30px;
        bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 4px solid #0c398f;
        padding-right: 40px;
    }
    .bb-input{
        border: 10px;
        width: 788px;
        height: 100px;
        background: #020711;
        border: 10px solid #0d3c98;
        border-radius: 15px;
        box-shadow: 0px 1px 24px 0px rgba(13,61,153,0.68) inset; 
        font-size: 30px;
        color: #7EDBFE;
        padding-left: 150px;
    }
    .bb-input::placeholder{
        color: #4f8599;
    }
    .stroke{
        font-size: 80px;
        line-height: 90px;
        position: relative;
        z-index: 1;
        text-align: left;
        font-style: italic;
    }
    .stroke::before {
        content: attr(data-text);
        position: absolute;
        -webkit-text-stroke: 15px #0D3C98;
        z-index: -1;
    }
    .bg{
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0px;
        top: 0px;
        padding-left: 260px;
        padding-top: 50px;
        text-align: center;
    }
    .be-content{
        display: flex;
        position: relative;
        flex: 1;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('../../../assets/blindbox/bg.jpg');
        overflow: auto;
        padding-bottom: 100px;
        background-position: center;
    }
</style>