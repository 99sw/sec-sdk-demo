mergeInto(LibraryManager.library, {
  /**
   * 通知APP游戏加载完成
   */
  launch: function () {
    return window.SecSDK.launch();
  },

  /**
   * 展示视频广告
   */
  displayVideoAd: function () {
    window.SecSDK.displayVideoAd({
      onSuccess() {
        console.log("已成功获得视频广告激励");

        Module.SendMessage("Canvas", "onDisplayVideoAdSuccess");
      },
      onError() {
        console.log("视频广告播放失败");

        Module.SendMessage("Canvas", "onDisplayVideoAdError");
      },
    });
  },

  /**
   * 展示插屏广告
   */
  displayScreenAd: function () {
    window.SecSDK.displayScreenAd({
      onSuccess() {
        console.log("插屏广告已被用户关闭");

        Module.SendMessage("Canvas", "onDisplayScreenAdSuccess");
      },
      onError() {
        console.log("插屏广告展示失败");

        Module.SendMessage("Canvas", "onDisplayScreenAdError");
      },
    });
  },

  /**
   * 展示banner广告
   */
  displayBannerAd: function (size, bottom) {
    window.SecSDK.displayBannerAd({
      size: size,
      bottom: bottom,
      onSuccess() {
        console.log("广告展示成功回调");

        Module.SendMessage("Canvas", "onDisplayBannerAdSuccess");
      },
      onError() {
        console.log("广告展示失败回调");

        Module.SendMessage("Canvas", "onDisplayBannerAdError");
      },
    });
  },

  /**
   * 隐藏banner广告
   */
  hiddenBannerAd: function (size) {
    window.SecSDK.hiddenBannerAd({ size: size });
  },

  /**
   * 绑定微信
   */
  authorizeWithWechat: function () {
    window.SecSDK.authorizeWithWechat({
      onSuccess(result) {
        // 授权成功回调
        console.log("微信授权成功", result);

        const bufferSize = lengthBytesUTF8(result) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(result, buffer, bufferSize);

        Module.SendMessage("Canvas", "onAuthorizeWithWechatSuccess", buffer);
      },
      onError() {
        // 授权失败回调
        console.log("微信授权失败");

        Module.SendMessage("Canvas", "onAuthorizeWithWechatError");
      },
    });
  },

  /**
   * 获取数据
   */
  getStorageData: function (_key) {
    // C# 字符串参数
    const key = UTF8ToString(_key);
    const value = window.SecSDK.storage.get(key);

    if (typeof value !== 'string') return;

    // 字符串传到 C#
    const bufferSize = lengthBytesUTF8(value) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(value, buffer, bufferSize);
    return buffer;
  },

  /**
   * 设置数据
   */
  setStorageData: function (_key, _value) {
    const key = UTF8ToString(_key);
    const value = UTF8ToString(_value);

    window.SecSDK.storage.set(key, value);
  },

  /**
   * 删除数据
   */
  removeStorageData: function (_key) {
    const key = UTF8ToString(_key);

    window.SecSDK.storage.remove(key);
  },

  /**
   * 清除全部数据
   */
  clearStorageData: function () {
    window.SecSDK.storage.clear();
  },

  /**
   * 上报数据
   */
  syncData: function (_jsonDataString) {
    const jsonDataString = UTF8ToString(_jsonDataString);
    const data = JSON.parse(jsonDataString);

    console.log("上报数据", data);

    window.SecSDK.syncData({
      data: data,
      onSuccess() {
        // TODO 上报成功
        console.log("上报成功", data);
      },
      onError() {
        // TODO 上报失败
        console.log("上报失败");
      },
    });
  },

  /**
   * 游戏容器 hook
   */
  registerHook: function () {

    // 游戏所在容器被挂起，可在此暂停游戏
    window.SecSDK.on("inactive", () => {
      // TODO 需要在这里将游戏暂停
      console.log("游戏所在容器被挂起，可在此暂停游戏");
    });

    // 游戏所在容器已恢复，可在此恢复游戏
    window.SecSDK.on("active", () => {
      // TODO 需要在这里将游戏恢复
      console.log("游戏所在容器已恢复，可在此恢复游戏");
    });
  },
});
