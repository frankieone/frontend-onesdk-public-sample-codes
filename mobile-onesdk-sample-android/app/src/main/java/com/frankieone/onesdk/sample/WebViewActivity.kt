package com.frankieone.onesdk.sample

import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.frankieone.onesdk.sample.databinding.ActivityWebviewBinding
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.util.UUID
import java.util.concurrent.TimeUnit

class WebViewActivity : AppCompatActivity() {

    private lateinit var binding: ActivityWebviewBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWebviewBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Verification"

        val baseUrl = intent.getStringExtra("base_url") ?: ""
        val apiKey = intent.getStringExtra("api_key") ?: ""
        val customerId = intent.getStringExtra("customer_id") ?: ""
        val customerChildId = intent.getStringExtra("customer_child_id") ?: ""
        val flowId = intent.getStringExtra("flow_id") ?: ""

        setupWebView()
        fetchOnboardingUrl(baseUrl, apiKey, customerId, customerChildId, flowId)
    }

    private fun setupWebView() {
        binding.webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            mediaPlaybackRequiresUserGesture = false
        }
        binding.webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                return false
            }
        }
        binding.webView.webChromeClient = WebChromeClient()
    }

    private fun fetchOnboardingUrl(
        baseUrl: String,
        apiKey: String,
        customerId: String,
        customerChildId: String,
        flowId: String
    ) {
        binding.progressBar.visibility = View.VISIBLE
        binding.webView.visibility = View.GONE

        CoroutineScope(Dispatchers.Main).launch {
            try {
                val url = withContext(Dispatchers.IO) {
                    val client = OkHttpClient.Builder()
                        .connectTimeout(30, TimeUnit.SECONDS)
                        .readTimeout(30, TimeUnit.SECONDS)
                        .build()

                    val body = JSONObject().apply {
                        put("customerRef", UUID.randomUUID().toString())
                        put("consent", true)
                        put("flowId", flowId)
                    }

                    val requestBuilder = Request.Builder()
                        .url("$baseUrl/idv/v2/idvalidate/onboarding-url")
                        .post(body.toString().toRequestBody("application/json".toMediaType()))
                        .addHeader("api_key", apiKey)
                        .addHeader("X-Frankie-CustomerID", customerId)

                    if (customerChildId.isNotEmpty()) {
                        requestBuilder.addHeader("X-Frankie-CustomerChildID", customerChildId)
                    }

                    val response = client.newCall(requestBuilder.build()).execute()
                    val responseBody = response.body?.string()
                        ?: throw Exception("Empty response body")

                    if (!response.isSuccessful) {
                        throw Exception("API error ${response.code}: $responseBody")
                    }

                    val json = JSONObject(responseBody)
                    json.getString("url")
                }

                binding.progressBar.visibility = View.GONE
                binding.webView.visibility = View.VISIBLE
                binding.webView.loadUrl(url)
            } catch (e: Exception) {
                Toast.makeText(
                    this@WebViewActivity,
                    "Error: ${e.message}",
                    Toast.LENGTH_LONG
                ).show()
                finish()
            }
        }
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            onBackPressedDispatcher.onBackPressed()
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    @Deprecated("Use onBackPressedDispatcher instead")
    override fun onBackPressed() {
        if (binding.webView.canGoBack()) {
            binding.webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
