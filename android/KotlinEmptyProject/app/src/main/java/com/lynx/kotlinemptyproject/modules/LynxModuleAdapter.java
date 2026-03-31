package com.lynx.kotlinemptyproject.modules;

import android.content.Context;

import com.lynx.tasm.LynxEnv;

public class LynxModuleAdapter {


    public void Init(Context context) {
        // ......

        LynxEnv.inst().registerModule("NativeLocalStorageModule", NativeLocalStorageModule.class);

        // ......
    }
}
