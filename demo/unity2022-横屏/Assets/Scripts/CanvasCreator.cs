#nullable enable
using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;


public class CanvasCreator : MonoBehaviour
{

    [DllImport("__Internal")]
    private static extern void launch();

    [DllImport("__Internal")]
    private static extern void displayVideoAd();

    [DllImport("__Internal")]
    private static extern void displayScreenAd();

    [DllImport("__Internal")]
    private static extern void displayBannerAd(string size, bool bottom);

    [DllImport("__Internal")]
    private static extern void hiddenBannerAd();

    [DllImport("__Internal")]
    private static extern void authorizeWithWechat();

    [DllImport("__Internal")]
    private static extern string? getStorageData(string key);

    [DllImport("__Internal")]
    private static extern void setStorageData(string key, string value);

    [DllImport("__Internal")]
    private static extern void removeStorageData(string key);

    [DllImport("__Internal")]
    private static extern void syncData(string jsonDataString);

    [DllImport("__Internal")]
    private static extern void registerHook();


    private int buttonCount = 0;

    void Start()
    {
        // 创建背景
        CreateBackground();


        if (Application.platform == RuntimePlatform.WebGLPlayer)
        {
            // 游戏资源加载完成
            launch();

            // 游戏容器 hook
            registerHook();
        }

        CreateButton("展示视频广告", () =>
        {
            displayVideoAd();
        });

        CreateButton("展示插屏广告", () =>
        {
            displayScreenAd();
        });

        CreateButton("展示banner广告", () =>
        {
            displayBannerAd("small", true);
        });

        CreateButton("隐藏banner广告", () =>
        {
            hiddenBannerAd();
        });

        CreateButton("绑定微信", () =>
        {
            authorizeWithWechat();
        });

        CreateButton("写入数据", () =>
        {
            setStorageData("testdatakey", "testdatavalue");
        });

        CreateButton("读取数据", () =>
        {
            string? value = getStorageData("testdatakey");

            Debug.Log(value);
        });

        CreateButton("删除数据", () =>
        {
            removeStorageData("testdatakey");
        });

        CreateButton("上报关卡", () =>
        {
            syncData("{\"taskValue\": 1}");
        });
    }

    // 激励视频广告成功回调
    void onDisplayVideoAdSuccess()
    {
        Debug.Log("onDisplayVideoAdSuccess");
    }

    // 激励视频广告失败回调
    void onDisplayVideoAdError()
    {
        Debug.Log("onDisplayVideoAdError");
    }

    // 插屏广告成功回调
    void onDisplayScreenAdSuccess()
    {
        Debug.Log("onDisplayScreenAdSuccess");
    }

    // 插屏广告失败回调
    void onDisplayScreenAdError()
    {
        Debug.Log("onDisplayScreenAdError");
    }

    // banner广告成功回调
    void onDisplayBannerAdSuccess()
    {
        Debug.Log("onDisplayBannerAdSuccess");
    }

    // banner广告失败回调
    void onDisplayBannerAdError()
    {
        Debug.Log("onDisplayBannerAdError");
    }


    // 微信授权回调响应字段 https://nqcq9c7h9mm.feishu.cn/wiki/SDPWw3kmAii6xxktYAPcwaNMnrg#JQj7dzwsxoD516xetbhcCLX2n9f
    void onAuthorizeWithWechatSuccess(string result)
    {
        Debug.Log(result);
    }

    // 微信授权失败回调
    void onAuthorizeWithWechatError()
    {
        
    }

    

    void CreateBackground()
    {
        GameObject backgroundGameObject = new GameObject("Background");
        backgroundGameObject.transform.SetParent(this.transform);

        Image backgroundImage = backgroundGameObject.AddComponent<Image>();
        backgroundImage.color = Color.white;

        RectTransform backgroundRectTransform = backgroundGameObject.GetComponent<RectTransform>();
        backgroundRectTransform.anchorMin = Vector2.zero;
        backgroundRectTransform.anchorMax = Vector2.one;
        backgroundRectTransform.pivot = Vector2.zero;
        backgroundRectTransform.sizeDelta = Vector2.zero;
        backgroundRectTransform.offsetMin = Vector2.zero;
        backgroundRectTransform.offsetMax = Vector2.zero;

    }

    void CreateButton(string buttonText, UnityEngine.Events.UnityAction buttonOnClick)
    {

        float buttonHeight = Screen.height * 0.05f;
        int fontSize = Mathf.RoundToInt(buttonHeight * 0.5f);
        int verticalSpacing = Mathf.RoundToInt(buttonHeight * 0.3f);

        GameObject buttonContainer = new GameObject("Button");
        buttonContainer.transform.SetParent(this.transform);

        RectTransform buttonRectTransform = buttonContainer.AddComponent<RectTransform>();
        // 计算按钮位置
        float yPos = -buttonCount * (buttonRectTransform.sizeDelta.y + verticalSpacing) - buttonHeight;

        buttonRectTransform.anchoredPosition = new Vector2(0f, yPos);

        buttonRectTransform.anchorMin = new Vector2(0.5f, 1);
        buttonRectTransform.anchorMax = new Vector2(0.5f, 1);

        buttonRectTransform.sizeDelta = new Vector2(Screen.width * 0.8f, buttonHeight);


        Button buttonComponent = buttonContainer.AddComponent<Button>();

        GameObject buttonBackgroundGameObject = new GameObject("ButtonBackground");
        buttonBackgroundGameObject.transform.SetParent(buttonContainer.transform);

        Image buttonBackgroundImage = buttonBackgroundGameObject.AddComponent<Image>();
        buttonBackgroundImage.color = new Color(0, 150f / 255f, 136f / 255f); // #009688

        RectTransform buttonBackgroundRectTransform = buttonBackgroundGameObject.GetComponent<RectTransform>();
        buttonBackgroundRectTransform.anchorMin = Vector2.zero;
        buttonBackgroundRectTransform.anchorMax = Vector2.one;
        buttonBackgroundRectTransform.sizeDelta = Vector2.zero;
        buttonBackgroundRectTransform.offsetMin = Vector2.zero;
        buttonBackgroundRectTransform.offsetMax = Vector2.zero;

        GameObject buttonTextGameObject = new GameObject("ButtonText");
        buttonTextGameObject.transform.SetParent(buttonContainer.transform);

        Text buttonTextComponent = buttonTextGameObject.AddComponent<Text>();
        buttonTextComponent.rectTransform.anchoredPosition = Vector2.zero;
        buttonTextComponent.rectTransform.sizeDelta = buttonRectTransform.sizeDelta;
        buttonTextComponent.text = buttonText;
        buttonTextComponent.fontSize = fontSize;

        Font customFont = Resources.Load<Font>("Fonts/Alibaba-PuHuiTi-Regular");

        if (!customFont)
        {
            buttonTextComponent.font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
        }
        else
        {
            buttonTextComponent.font = customFont;
        }

        buttonTextComponent.alignment = TextAnchor.MiddleCenter;
        buttonTextComponent.color = Color.white;

        buttonComponent.onClick.AddListener(buttonOnClick);

        buttonCount++;
    }
}
