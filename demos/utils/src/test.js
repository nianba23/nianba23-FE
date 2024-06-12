// 旭阳科技  商户号 ：M1708004135
// appsecret:dx710mdcgwlsm8tcxp5cy550lrlll4naz8hs6obbw1rvfp319iufu8c3ukiat2lhzd5wb0hpb5231g6s370pnhfovsp8umoonqfa2fzkpzzt0krij57hvlf0ye42q3ak
// appid : 65ce1327e4b0894cd7e24660

// 骏峰商贸 商户号 ：M1708004275
// appsecret: uolfworxcuc655j9gyfuuhp5ulkjwnfmj06wkmmk45e78rs8jt05yxyxqitw3t0aafhj38f108r21re2h69ko8fag4wtly05jj39lgeqajxu90k6pj1l54apfhfsu086
// appid : 65ce13b3e4b0894cd7e24661

// http://47.111.71.232:9216/api/pay/unifiedOrder

// https://www.jingyun7000.top/Pay_XuyangPay_notifyurl.html?
const data = {
  mchNo: 'M1708004135',
  appId: '65ce1327e4b0894cd7e24660',
  mchOrderNo: '20240229223112241823443',
  wayCode: 'ALI_WAP',
  amount: 200,
  currency: 'cny',
  subject: 'xingqiu',
  body: 'xingqiu',
  reqTime: 1709039529000,
  version: '1.0',
  signType: 'MD5',
};
const StringA = Object.keys(data).sort();
const stringSignTemp = StringA.map(key => `${key}=${data[key]}`).join('&');
const key = 'dx710mdcgwlsm8tcxp5cy550lrlll4naz8hs6obbw1rvfp319iufu8c3ukiat2lhzd5wb0hpb5231g6s370pnhfovsp8umoonqfa2fzkpzzt0krij57hvlf0ye42q3ak'
console.log(stringSignTemp + '&key=' + key);
const json = {
  'mchNo': 'M1708004135',
  'appId': '65ce1327e4b0894cd7e24660',
  'mchOrderNo': '20240229223112241823443',
  'wayCode': 'ALI_WAP',
  'amount': 200,
  'currency': 'cny',
  'subject': 'xingqiu',
  'body': 'xingqiu',
  'reqTime': 1709039529000,
  'version': '1.0',
  'signType': 'MD5',
  'sign': '911354722BA6B7B0FECF585A5CF9CDE8'
};
