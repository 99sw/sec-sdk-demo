const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "点击开屏";

  start() {
    /**
     * 通知APP游戏加载完成，来关闭 APP 覆盖在游戏上方的 loading 界面
     */
    window.SecSDK.launch();


    /**
     * 游戏所在容器被挂起，可在此暂停游戏
     */
    window.SecSDK.on("inactive", () => {
      // TODO
      console.log("游戏所在容器被挂起，可在此暂停游戏");
    });

    /**
     * 游戏所在容器已恢复，可在此恢复游戏
     */
    window.SecSDK.on("active", () => {
      // TODO
      console.log("游戏所在容器已恢复，可在此恢复游戏");
    });

  }
  /**
   * 加载插屏、视频广告
   */
  onVideoClick() {

    window.SecSDK.displayVideoAd({
      onSuccess() {
        console.log("已成功获得视频广告激励");
      },
      onError() {
        console.log("视频广告播放失败");
      },
    });
  }

  /**
   * 加载信息流，banner广告
   */
  bannerClick() {
    window.SecSDK.displayBannerAd({
      size: 'small',
      bottom: true,
      onSuccess() {
        // 广告展示成功回调
      },
      onError() {
        // 广告展示失败回调
      },
    });
  }
  /**
   * 隐藏信息流，banner广告
   */
  bannerHideClick() {
    window.SecSDK.hiddenBannerAd({size: 'small',});
  }
  /**
   * 绑定微信
   */
  bindWeixinClick() {
    window.SecSDK.authorizeWithWechat({
      onSuccess(result) {
        // 授权成功回调
        console.log(result);
      },
      onError() {
        // 授权失败回调
        console.log("微信授权失败");
      },
    });
  }

  /**
   * 保存数据到APP本地
   */
  saveDataClick() {
    const value = prompt("写入内容", "123");

    window.SecSDK.storage.set("testdata", value);
  }
  /**
   * 读取写入数据
   */
  getDataClick() {
    const value = window.SecSDK.storage.get("testdata");
    alert(value);
  }

  /**
   * 上报玩家关卡、等级
   */
  uploadGameLevel() {
    window.SecSDK.syncData({
      data: {
        taskValue: 1,
      },
      onSuccess() {
        // 上报成功
        console.log("上报成功，玩家通过第 1 关");
      },
      onError() {
        // 上报失败
        console.log("上报失败");
      },
    });
  }
}
