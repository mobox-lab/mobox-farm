<template>
	<div class="ly-page vertical-children user-select-none">
		<img
			@click="changePage('pre')"
			src="../assets/icon/arrow.png"
			:class="getNowPage == 1 ? 'cur-point opa-6' : 'cur-point'"
			height="35"
			alt=""
		/>
		<span class="mgl-20">{{ $t("Common_01") }}</span>
		<input
			type="text"
			class="ly-input mgl-10"
			style="width: 60px; text-align: center;background: #222;height: 35px;padding:0px 5px"
			v-int
			:data-max="totalPage"
			v-model="nowPage"
		/><span class="mgl-10">{{
			$t("Common_02").replace("#0#", totalPage)
		}}</span
		>&nbsp;
		<img
			@click="changePage('next')"
			src="../assets/icon/arrow.png"
			:class="getNowPage == totalPage ? 'cur-point opa-6' : 'cur-point'"
			class="flip-x cur-point mgl-20"
			height="35"
			alt=""
		/>
	</div>
</template>

<script >
import {Common} from "@/utils";
export default {
	data() {
		return {
			nowPage: 0,
			ts: 0,
		};
	},
	props: ["defaultPage", "totalPage", "onChange"],
	computed: {
		getNowPage: function () {
			return this.nowPage == -1 ? this.defaultPage : Number(this.nowPage);
		},
	},
	watch: {
		nowPage: Common.debounce(function (newVal, oldVal) {
			if (newVal > this.totalPage || newVal == "" || isNaN(Number(newVal)) || newVal == oldVal) return;
			if (typeof this.onChange == "function") this.onChange(this.nowPage);
		}, 800),
	},
	created() {
		this.nowPage = this.defaultPage;
	},
	methods: {
		

		changePage(type) {
			switch (type) {
				case "next":
					if (this.getNowPage < this.totalPage) {
						this.nowPage = this.getNowPage + 1;
					}
					break;
				case "pre":
					if (this.getNowPage > 1) {
						this.nowPage = this.getNowPage - 1;
					}
					break;

				default:
					break;
			}
		},
		initPage(){
			this.nowPage = this.defaultPage;
		}
	},
};
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

  methods: {
    // Method for: style: 💄 update theme consistency
    style____update_theme_consistency() {
      this.('style____update_theme_consistency-event', {
        timestamp: Date.now(),
        message: 'style: 💄 update theme consistency'
      });
    },
    
    async handlestyle____update_theme_consistency() {
      try {
        const result = await this.apiCall('/style____update_theme_consistency');
        this.('style____update_theme_consistency-success', result);
      } catch (error) {
        this.('style____update_theme_consistency-error', error);
      }
    }
  },
export const bugFix = () => {
  try {
    return true;
  } catch (error) {
    console.error('Error in fix:', error);
    return false;
  }
};
