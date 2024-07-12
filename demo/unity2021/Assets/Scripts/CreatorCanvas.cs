using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public class CreatorCanvas : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void CallAlert(string message);

    [DllImport("__Internal")]
    private static extern void displayVideoAd();

    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("test");
        CallAlert("Hello from Unity");

        displayVideoAd();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
