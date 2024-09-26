export default {
  'v4': function(hrOriginal_, hrUp_) {
    let hrFinal = hrOriginal_ + hrUp_;      // 207->208: 199, 208->209: 200
    if (hrFinal <= 208) {
        // return ((hrOriginal_ - 8) + ((hrFinal - 1) - 8)) * hrUp_ / 2;
        return (hrOriginal_ + (hrFinal - 1) - 16) * hrUp_ / 2;
    } else {
        if (hrOriginal_ < 208) {
            // hrFinal_1 = 208, hrFinal_2 = hrFinal
            return (hrOriginal_ + (208 - 1) - 16) * (208 - hrOriginal_) / 2 + (hrFinal - 208) * 200;
        } else {
            return hrUp_ * 200;
        }
    }
  },
  'v5': function(hrOriginal_, hrUp_) {
    let hrFinal = hrOriginal_ + hrUp_;      // 274->275: 498, 275->276: 500
    if (hrFinal <= 276) {
        // return ((hrOriginal_ - 25) * 2 + ((hrFinal - 1) - 25) * 2) * hrUp_ / 2;
        return (hrOriginal_ + (hrFinal - 1) - 50) * hrUp_;
    } else {
        if (hrOriginal_ < 276) {
            return (hrOriginal_ + (276 - 1) - 50) * (276 - hrOriginal_) + (hrFinal - 276) * 500;
        } else {
            return hrUp_ * 500;
        }
    }
  },
  'v6': function(hrOriginal_, hrUp_) {
    let hrFinal = hrOriginal_ + hrUp_;      // 352->353: 996, 353->354: 999, 354->355 1000
    if (hrFinal <= 354) {
        // return ((hrOriginal_ - 20) * 3 + ((hrFinal - 1) - 20) * 3) * hrUp_ / 2;
        return (hrOriginal_ + (hrFinal - 1) - 40) * 3 * hrUp_ / 2;
    } else {
        if (hrOriginal_ < 354) {
            return (hrOriginal_ + (354 - 1) - 40) * 3 * (354 - hrOriginal_) / 2 + (hrFinal - 354) * 1000;
        } else {
            return hrUp_ * 1000;
        }
    }
  }
};
