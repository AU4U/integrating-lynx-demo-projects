package com.lynx.kotlinemptyproject

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder
import com.lynx.xelement.XElementBehaviors
import com.lynx.react.bridge.JavaOnlyArray
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.log

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val lynxView: LynxView = buildLynxView()
        setContentView(lynxView)

        // val uri = "main.lynx.bundle";

        val uri = "http://192.168.0.204:3000/main.lynx.bundle";
        lynxView.renderTemplateUrl(uri, "")
        val arg = JavaOnlyArray()
        arg.pushString("hello")
        arg.pushString("world")
        arg.pushInt(99)
        arg.pushDouble(1.0)
        arg.pushDouble(3.14)
        arg.pushBoolean(false)
        lynxView.sendGlobalEvent("n2j", arg)
        // open switch page
//        startActivity(Intent(this, SwitchActivity::class.java));
    }

    private fun buildLynxView(): LynxView {
        val viewBuilder: LynxViewBuilder = LynxViewBuilder()
        viewBuilder.addBehaviors(XElementBehaviors().create())
        viewBuilder.setTemplateProvider(DemoTemplateProvider(this))
        return viewBuilder.build(this)
    }
}