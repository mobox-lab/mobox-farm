export default {
    // 每日积分奖励
    dayScoreRewards: [
        { score: 200,     box: 2 },
        { score: 500,     box: 3 },
        { score: 1000,    box: 5 },
        { score: 1600,    box: 6 },
        { score: 2500,    box: 9 },
    ],
    exchangeConf: {
        mec: { score: 100,  coinCount: 200 },
        box_v: { score: 500, coinCount: 1 },
    },
    // 每日任务奖励
    dayTaskes: [
        { val: 1, score: 10, title: 'Festival_64' },
        { val: 4, score: 20, title: 'Festival_65' },
        { val: 800, score: 20, title: 'Festival_66' },
        { val: 500, score: 10, title: 'Festival_67' },
        { val: 50, score: 40, title: 'Festival_68' },
        { val: 5, score: 44, title: 'Festival_69' },
        { val: 20, score: 88, title: 'Festival_70' },
        { val: 4000, score: 88, title: 'Festival_71' },
        { val: 2500, score: 44, title: 'Festival_72' },
        { val: 250, score: 176, title: 'Festival_73' },
        { val: 10, score: 60, title: 'Festival_74' },
        { val: 40, score: 120, title: 'Festival_75' },
        { val: 8000, score: 120, title: 'Festival_76' },
        { val: 5000, score: 60, title: 'Festival_77' },
        { val: 500, score: 240, title: 'Festival_78' },
        { val: 30, score: 260, title: 'Festival_79' },
        { val: 60, score: 390, title: 'Festival_80' },
        { val: 24000, score: 520, title: 'Festival_81' },
        { val: 15000, score: 260, title: 'Festival_82' },
        { val: 1000, score: 520, title: 'Festival_83' },
    ],
    // 周年活动箱子转盘
    // exchangeConf: {
    //     mec: { score: 50, coinCount: 100 },
    //     box_v: { score: 500, coinCount: 1 },
    // },
    // 积分兑换
    boxLuckyConf: [
        { coin: "mbox", amount: 3, weight: 50334 },
        { coin: "mbox", amount: 5, weight: 20000 },
        { coin: "mbox", amount: 20, weight: 5000 },
        { coin: "mbox", amount: 200, weight: 500 },
        { coin: "gem_r", amount: 1, weight: 6000 },
        { coin: "gem_g", amount: 1, weight: 6000 },
        { coin: "gem_b", amount: 1, weight: 6000 },
        { coin: "gem_y", amount: 1, weight: 6000 },
        { coin: "box_e", amount: 1, weight: 160 },
        { coin: "box_l", amount: 1, weight: 6 },
    ],
    ANNUAL_GOOD_ID: {
        mbox: 1,
        gem_r: 2,
        gem_g: 3,
        gem_b: 4,
        gem_y: 5,
        box_e: 6, //史诗盲盒
        box_l: 7, //传说盲盒
        mec: 8,
        box: 9, //农场的箱子(开momo的箱子)
    },
};
