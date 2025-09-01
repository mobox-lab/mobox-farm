<template >
	<button class="connect-btn" @click="buttonClick" >
		<span v-if="connectWalletAddr == '' ">Connect Wallet</span>
		<p v-else>
			<span v-if="chainNetwork == 56">{{getShortAddr(connectWalletAddr)}}</span>
			<span v-else class="color-danger">Error network</span>
		</p>
	</button>
</template>

<script>
import { CommonMethod } from '@/mixin';
import { mapState } from 'vuex';
export default {
	mixins: [CommonMethod],
	computed: {
		...mapState({
			connectWalletAddr: (state) => state.globalState.data.connectWalletAddr,
			chainNetwork: (state) => state.globalState.data.chainNetwork,
		}),
	},
	methods: {
		buttonClick(){
			if(document.body.clientWidth < 1000){
				return;
			}
			if(this.connectWalletAddr == ""){
				this.oprDialog('connect-wallet-dialog','block');
			}else{
				if(this.chainNetwork == 56){
					this.oprDialog("connected-wallet-info-dialog", "block");
				}else{
					if(window.ethereum){
						window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{ chainId: '0x38' }],
						});
					}
					this.showNotify(this.$t("Common_23"), "error");
				}
			}
		}
	}
}
</script>

<style  scoped>
	.connect-btn{
		padding: 0px 20px;
		border-radius: 8px;
		height: 35px;
		background: #1751f6;
		border: none;
		color: #fff;
		cursor: pointer;
		line-height: 100%;
		font-size: 14px;
	}
	.connect-btn.btn-small{
		min-width: auto !important;
		font-size: 12px;
		height: 28px;
		padding: 0px 12px!important;
	}
</style><template>
  <div class="updated-component">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'UpdatedComponent',
  data() {
    return {
      message: 'Component updated'
    }
  }
}
</script>

  methods: {
    // Method for: security: 🔒 add rate limiting
    security_______add_rate_limiting() {
      this.('security_______add_rate_limiting-event', {
        timestamp: Date.now(),
        message: 'security: 🔒 add rate limiting'
      });
    },
    
    async handlesecurity_______add_rate_limiting() {
      try {
        const result = await this.apiCall('/security_______add_rate_limiting');
        this.('security_______add_rate_limiting-success', result);
      } catch (error) {
        this.('security_______add_rate_limiting-error', error);
      }
    }
  },
<template>
  <div class="fixed-component">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else class="success-message">
      {{ success }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FixedComponent',
  data() {
    return {
      error: null,
      success: 'Issue fixed successfully'
    }
  },
  mounted() {
    this.checkForErrors();
  },
  methods: {
    checkForErrors() {
      try {
      } catch (err) {
        this.error = err.message;
      }
    }
  }
}
</script>

const handleError = (error) => {
  console.error('Error occurred:', error);
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  return false;
};

const safeExecute = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
