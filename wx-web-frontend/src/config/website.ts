export default {
  // 静态资源
  staticPrefix: "https://prod-0g2cv6iu02170a3a-1314867305.tcloudbaseapp.com", // TencentCloud
  // staticPrefix: 'https://gitlab.com/BernardAlpha/static-resource/-/raw/main/',  // GitLab
  // staticPrefix: 'https://gitee.com/BernardAlpha/static-resouce/raw/master',  // Gitee

  apiPrefix: 'https://express-go4t-81877-6-1314867305.sh.run.tcloudbase.com',  // 微信服务外网调用地址
  // apiPrefix: 'localhost:1003',

  wxService: 'express-go4t',  // 微信服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）,微信内部调用服务
  wxCloudrunID: 'prod-0g2cv6iu02170a3a'  // 微信云托管的环境ID
}
