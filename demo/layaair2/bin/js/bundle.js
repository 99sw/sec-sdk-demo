(function () {
  'use strict';

  class Main {
      constructor() {
          this.lastButtonContainer = null;
          Laya.init(Laya.Browser.clientWidth, Laya.Browser.clientHeight);
          Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
          Laya.stage.bgColor = "#ffffff";
          if (!window.SecSDK) {
              alert("请在提供的测试APK中打开此页面");
          }
          window.SecSDK.launch();
          window.SecSDK.on("pause", () => {
              console.log("游戏所在容器被挂起，可在此暂停游戏");
          });
          window.SecSDK.on("resume", () => {
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
                  width: 750,
                  height: 100,
                  bottom: true,
                  center: true,
                  x: 0,
                  y: 0,
                  onSuccess() {
                  },
                  onError() {
                  },
              });
          });
          this.createButton("隐藏banner广告", () => {
              window.SecSDK.hiddenBannerAd();
          });
          this.createButton("绑定微信", () => {
              window.SecSDK.authorizeWithWechat({
                  onSuccess(result) {
                      console.log(result);
                  },
                  onError() {
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
          this.createButton("上报玩家关卡、等级", () => {
              window.SecSDK.syncData({
                  data: {
                      taskValue: 1,
                  },
                  onSuccess() {
                      console.log("上报成功，玩家通过第 1 关");
                  },
                  onError() {
                      console.log("上报失败");
                  },
              });
          });
      }
      createButton(text, clickHandler) {
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
          buttonContainer.graphics.drawRect(0, 0, buttonWidth, buttonHeight, "#009688");
          buttonContainer.on(Laya.Event.CLICK, this, clickHandler);
          buttonContainer.addChild(label);
          Laya.stage.addChild(buttonContainer);
          buttonContainer.pos((stageWidth - buttonWidth) / 2, 50);
          if (this.lastButtonContainer) {
              buttonContainer.y =
                  this.lastButtonContainer.y + this.lastButtonContainer.height + 10;
          }
          else {
              buttonContainer.y = 50;
          }
          this.lastButtonContainer = buttonContainer;
      }
  }
  new Main();

}());
