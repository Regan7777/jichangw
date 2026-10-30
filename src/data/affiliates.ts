export interface Affiliate {
  id: string;
  name: string;
  targetUrl: string;
  coupon: string;
  description: string;
}

export const affiliates: Record<string, Affiliate> = {
  shenxing: {
    id: 'shenxing',
    name: '神行加速',
    targetUrl: 'https://wuhan01.shenxingaff.com/#/?code=WUQMrgI8',
    coupon: 'sx0077',
    description: '高速透传中转架构，主打住宅家宽落地与海外生产力',
  },
  dalaoyun: {
    id: 'dalaoyun',
    name: '大佬云',
    targetUrl: 'https://fugui0077.dalaoyunaff.com/#/?code=1o7gYhTL',
    coupon: 'dly888',
    description: '四网动态 BGP 中继，大带宽流量池与流媒体支持',
  },
  shandianshu: {
    id: 'shandianshu',
    name: '闪电鼠',
    targetUrl: 'https://fugui0077.shandianshuaff.com/#/?code=I2yK9PfK',
    coupon: 'sd88',
    description: '企业级纯专线隧道，VLESS 协议与 IP 纯净度防风控',
  },
  liulianyun: {
    id: 'liulianyun',
    name: '榴莲云',
    targetUrl: 'https://zyrrz.liulianyunaff.com/#/?code=Y6A1M1MN',
    coupon: 'll88',
    description: '多线 BGP 专线调度，针对移动与弱网环境定向抗 QoS 优化',
  },
  huanqiuti: {
    id: 'huanqiuti',
    name: '环球梯',
    targetUrl: 'https://fugui0077.huanqiutiaff.com/#/?code=rJyQn4xG',
    coupon: 'HQ66',
    description: '全球多地区冷门节点覆盖，支持不限时按量付费',
  },
  yunjiexian: {
    id: 'yunjiexian',
    name: '云界线',
    targetUrl: 'https://fugui0077.yunjiexianaff.com/#/?code=qA3LF6hW',
    coupon: '年付96元免券直降',
    description: '全节点 IPLC 专线，全系不限在线设备数与流媒体解锁',
  },
  flyv: {
    id: 'flyv',
    name: '飞V',
    targetUrl: 'https://fugui.flyvaff.com/#/?code=gxmUajhy',
    coupon: 'flyv999',
    description: '经济型中继隧道，12元起步低门槛查阅与备用容灾',
  },
  lingdongyun: {
    id: 'lingdongyun',
    name: '灵动云',
    targetUrl: 'https://fugui.lingdongaff.com/#/?code=lyfEXnqR',
    coupon: 'ldy88',
    description: 'BGP 专线与 Trojan/VLESS/Hysteria 2 多协议接入',
  },
};

