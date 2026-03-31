package com.lynx.kotlinemptyproject

import android.content.Context
import com.lynx.tasm.provider.AbsTemplateProvider
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.ByteArrayOutputStream
import java.io.IOException

class DemoTemplateProvider(context: Context) : AbsTemplateProvider() {

    private var mContext: Context = context.applicationContext
    private val httpClient = OkHttpClient()

    override fun loadTemplate(uri: String, callback: Callback) {
        Thread {
            try {
                val data = if (uri.startsWith("http://") || uri.startsWith("https://")) {
                    loadFromHttp(uri)
                } else {
                    loadFromAssets(uri)
                }
                callback.onSuccess(data)
            } catch (e: Exception) {
                callback.onFailed(e.message)
            }
        }.start()
    }

    private fun loadFromHttp(url: String): ByteArray {
        val request = Request.Builder().url(url).build()
        val response = httpClient.newCall(request).execute()
        if (!response.isSuccessful) {
            throw IOException("HTTP error: ${response.code}")
        }
        return response.body?.bytes() ?: throw IOException("Empty response body")
    }

    private fun loadFromAssets(uri: String): ByteArray {
        return mContext.assets.open(uri).use { inputStream ->
            ByteArrayOutputStream().use { byteArrayOutputStream ->
                val buffer = ByteArray(1024)
                var length: Int
                while ((inputStream.read(buffer).also { length = it }) != -1) {
                    byteArrayOutputStream.write(buffer, 0, length)
                }
                byteArrayOutputStream.toByteArray()
            }
        }
    }
}
