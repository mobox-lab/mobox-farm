<template>
  <div class="pet_item por">
    <div ref="container" class="swiper-container dib" :id="data.item.tx">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide por"
          v-for="item in getShowList"
          :key="item.id"
        >
          <div class="pet_img">
            <img
              :src="require(`@/assets/market/${item.imgName}.png`)"
              alt=""
              height="80%"
            />
          </div>

          <h2 style="position: absolute; top: 15px; right: 20px" class="bold2">
            x{{ item.num }}
          </h2>
          <h2 class="pet-lv bold2" v-if="Number(item.imgName) > 100">
            Lv. {{ item.level }}
          </h2>

          <div
            style="position: absolute; top: 15px; left: 20px"
            v-if="item.erc1155_ != 1 && item.currency == 3"
          >
            <div class="vertical-children pet_num small bold2">
              <span
                >{{ $t("Market_39") }}:
                {{ numFloor(item.price / item.num / 1e9, 1e6) }}
                <span class="opa-6">{{
                  getCurrencyName(item.currency)
                }}</span></span
              >
            </div>
          </div>
        </div>
      </div>
      <div ref="pagination" class="swiper-pagination"></div>
      <div class="slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { CommonMethod } from "@/mixin";

export default {
  mixins: [CommonMethod],
  props: ["data"],
  data() {
    return {
      nowIndex: 0,
      mySwiper: null,
    };
  },
  computed: {
    getShowList() {
      let { ids, amounts, price, currency, erc1155_ } = this.data.item;
      let arr = [];
      ids.map((id, index) => {
        let obj = {};
        obj.num = amounts[index];
        obj.level = Number(id) % 100;
        //
        obj.imgName = erc1155_ == 4 ? erc1155_ : id;
        obj.chain = "bnb";
        obj.price = price;
        obj.currency = currency;
        obj.erc1155_ = erc1155_;
        arr.push(obj);
      });

      arr.sort((a, b) => {
        return b.level - a.level;
      });
      return arr;
    },
    showCoin() {
      return this.marketTypePos == 4 ? "BUSD" : "MBOX";
    },
  },
  async mounted() {
    let that = this;
    if (this.data.item.ids.length == 1) return;
    let direction =
      document.body.clientWidth < 1000 ? "horizontal" : "vertical";
    this.mySwiper = new window.Swiper(this.$refs.container, {
      direction: direction,
      slidesPerView: 1,
      loop: false,
      // autoplay: {
      // 	delay: 3000,
      // 	stopOnLastSlide: false,
      // 	disableOnInteraction: false,
      // },
      passiveListeners: false,
      resistanceRatio: 0,
      pagination: {
        el: this.$refs.pagination,
        type: "bullets",
        clickable: true,
      },
      on: {
        slideChangeTransitionEnd: function () {
          that.nowIndex = this.activeIndex;
        },
      },
    });
  },
};
</script>

<style scoped>
@media (max-width: 1000px) {
  .swiper-pagination {
    bottom: auto !important;
    top: 0px !important;
  }
}
.swiper-pagination {
  zoom: 1.5;
}
.swiper-container {
  --swiper-pagination-color: #95be9d; //
}
.swiper-slide {
  border-radius: 20px;
  padding: 5px;
}
.swiper-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
}
.slot {
  position: absolute;
  bottom: 15px;
  z-index: 9999;
  text-align: center;
  width: 100%;
  height: 25px;
  left: 0px;
  padding: 0px 10px;
}
.slot .mgt-10 {
  margin-top: 0px;
}
.market .animation {
  animation: none !important;
}
.market .pet-power {
  position: absolute;
  right: 15px;
  top: 15px;
  margin-top: 0px;
  zoom: 0.9;
  text-align: right;
}
.pet_item .pet-power {
  line-height: 14px;
  font-size: 14px;
  right: 15px;
  top: 15px;
}
.pet_item .pet-lv {
  left: 20px;
  top: 15px;
  position: absolute;
  font-size: 16px;
}
.pet-bottom .pet-name {
  display: inline-block;
  border-radius: 50px;
  padding: 5px 15px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
}

.pet_item .pet-bottom {
  width: 100%;
  text-align: center;
  margin-top: -20px;
}
.pet_item {
  width: 350px;
  border-radius: 20px;
  text-align: center;
  position: relative;
  display: inline-block;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
  padding: 5px;
  user-select: none;
  color: #c9c9c9;
  height: 250px;
  transition: all 0.3s linear;
  background: #1c222c;
  border-radius: 16px;
}

.pet_item .pet_img {
  vertical-align: middle;
  user-select: none;
  position: relative;
  height: 190px;
  background: #00000031;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.gka {
  width: 51px;
  height: 47px;
  display: inline-block;
  background-image: url("../assets/anime/chuizi.png");
  zoom: 0.8;
}

.animation {
  width: 51px;
  height: 47px;
  background-image: url("../assets/anime/chuizi.png");
  background-size: 714px 47px;
  background-repeat: no-repeat;
  animation-name: keyframes-chuizi;
  animation-duration: 3s;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-timing-function: steps(1);
}

@keyframes keyframes-chuizi {
  0% {
    width: 51px;
    height: 47px;
    background-image: url("../assets/anime/chuizi.png");
    background-size: 714px 47px;
  }

  1% {
    background-position: -51px 0px;
  }

  2% {
    background-position: -102px 0px;
  }

  3% {
    background-position: -153px 0px;
  }

  4% {
    background-position: -204px 0px;
  }

  5% {
    background-position: -255px 0px;
  }

  6% {
    background-position: -306px 0px;
  }

  7% {
    background-position: -357px 0px;
  }

  8% {
    background-position: -408px 0px;
  }

  9% {
    background-position: -459px 0px;
  }

  10% {
    background-position: -510px 0px;
  }

  11% {
    background-position: -561px 0px;
  }

  12% {
    background-position: -612px 0px;
  }

  13%,
  100% {
    background-position: -663px 0px;
  }
}
</style>
