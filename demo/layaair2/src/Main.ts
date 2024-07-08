class Main {
  private lastButtonContainer: Laya.Sprite | null = null;

  constructor() {
    Laya.init(Laya.Browser.clientWidth, Laya.Browser.clientHeight);
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
    Laya.stage.bgColor = "#ffffff";

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

    this.createButton("加载视频广告", () => {
      window.SecSDK.displayVideoAd({
        onSuccess() {
          console.log("已成功获得视频广告激励");
        },
        onError() {
          console.log("视频广告播放失败");
        },
      });
    });

    this.createButton("加载插屏广告", () => {
      window.SecSDK.displayScreenAd({
        onSuccess() {
          console.log("插屏广告已被用户关闭");
        },
        onError() {
          console.log("插屏广告展示失败");
        },
      });
    });

    this.createButton("加载banner广告", () => {
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
    });
    this.createButton("隐藏banner广告", () => {
      window.SecSDK.hiddenBannerAd({ size: 'small' });
    });

    this.createButton("绑定微信", () => {
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
    });

    this.createButton("保存数据到APP本地", () => {
      const value = prompt("写入内容", "123");

      window.SecSDK.storeage.set("testdata", value);
    });

    this.createButton("读取写入数据", () => {
      const value = window.SecSDK.storeage.get("testdata");
      alert(value);
    });

    /**
     * 上报玩家关卡、等级
     */
    this.createButton("上报玩家关卡、等级", () => {
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
    });
  }

  private createButton(text: string, clickHandler: () => void) {
    const stageWidth = Laya.stage.width;

    const buttonContainer = new Laya.Sprite();
    const buttonWidth = stageWidth * 0.8;
    const buttonHeight = 40;
    buttonContainer.size(buttonWidth, buttonHeight);

    const label = new Laya.Label();
    label.text = text;
    label.font = "Arial";
    label.fontSize = 20;
    label.color = "#ffffff";
    label.centerX = label.centerY = 0;

    buttonContainer.graphics.drawRect(
      0,
      0,
      buttonWidth,
      buttonHeight,
      "#009688"
    );
    buttonContainer.on(Laya.Event.CLICK, this, clickHandler);

    buttonContainer.addChild(label);

    Laya.stage.addChild(buttonContainer);

    buttonContainer.pos((stageWidth - buttonWidth) / 2, 50);

    if (this.lastButtonContainer) {
      buttonContainer.y =
        this.lastButtonContainer.y + this.lastButtonContainer.height + 10;
    } else {
      buttonContainer.y = 50;
    }
    this.lastButtonContainer = buttonContainer;
  }
}
//激活启动类
new Main();
