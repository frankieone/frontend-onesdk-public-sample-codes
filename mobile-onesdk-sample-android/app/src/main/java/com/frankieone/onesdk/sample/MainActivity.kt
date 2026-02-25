package com.frankieone.onesdk.sample

import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.frankieone.onesdk.sample.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var prefs: SharedPreferences

    companion object {
        private const val PREFS_KEY = "onesdk_prefs"
        private const val KEY_ENVIRONMENT = "environment"
        private const val KEY_API_KEY = "api_key"
        private const val KEY_CUSTOMER_ID = "customer_id"
        private const val KEY_CUSTOMER_CHILD_ID = "customer_child_id"
        private const val KEY_FLOW_ID = "flow_id"
        private const val KEY_CUSTOMER_REF = "customer_ref"
        private const val KEY_ENTITY_ID = "entity_id"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        prefs = getSharedPreferences(PREFS_KEY, MODE_PRIVATE)

        setupEnvironmentSpinner()
        loadPreferences()

        binding.btnStartVerification.setOnClickListener {
            startVerification()
        }
    }

    private fun setupEnvironmentSpinner() {
        val environments = arrayOf("UAT", "Production")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, environments)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.spinnerEnvironment.adapter = adapter
    }

    private fun loadPreferences() {
        binding.spinnerEnvironment.setSelection(prefs.getInt(KEY_ENVIRONMENT, 0))
        binding.etApiKey.setText(prefs.getString(KEY_API_KEY, ""))
        binding.etCustomerId.setText(prefs.getString(KEY_CUSTOMER_ID, ""))
        binding.etCustomerChildId.setText(prefs.getString(KEY_CUSTOMER_CHILD_ID, ""))
        binding.etFlowId.setText(prefs.getString(KEY_FLOW_ID, "idv"))
        binding.etCustomerRef.setText(prefs.getString(KEY_CUSTOMER_REF, ""))
        binding.etEntityId.setText(prefs.getString(KEY_ENTITY_ID, ""))
    }

    private fun savePreferences() {
        prefs.edit()
            .putInt(KEY_ENVIRONMENT, binding.spinnerEnvironment.selectedItemPosition)
            .putString(KEY_API_KEY, binding.etApiKey.text.toString())
            .putString(KEY_CUSTOMER_ID, binding.etCustomerId.text.toString())
            .putString(KEY_CUSTOMER_CHILD_ID, binding.etCustomerChildId.text.toString())
            .putString(KEY_FLOW_ID, binding.etFlowId.text.toString())
            .putString(KEY_CUSTOMER_REF, binding.etCustomerRef.text.toString())
            .putString(KEY_ENTITY_ID, binding.etEntityId.text.toString())
            .apply()
    }

    private fun startVerification() {
        val apiKey = binding.etApiKey.text.toString().trim()
        val customerId = binding.etCustomerId.text.toString().trim()
        val flowId = binding.etFlowId.text.toString().trim()

        if (apiKey.isEmpty()) {
            Toast.makeText(this, "API Key is required", Toast.LENGTH_SHORT).show()
            return
        }
        if (customerId.isEmpty()) {
            Toast.makeText(this, "Customer ID is required", Toast.LENGTH_SHORT).show()
            return
        }
        if (flowId.isEmpty()) {
            Toast.makeText(this, "Flow ID is required", Toast.LENGTH_SHORT).show()
            return
        }

        savePreferences()

        val isUat = binding.spinnerEnvironment.selectedItemPosition == 0
        val baseUrl = if (isUat) "https://api.uat.frankie.one" else "https://api.frankie.one"

        val intent = Intent(this, WebViewActivity::class.java).apply {
            putExtra("base_url", baseUrl)
            putExtra("api_key", apiKey)
            putExtra("customer_id", customerId)
            putExtra("customer_child_id", binding.etCustomerChildId.text.toString().trim())
            putExtra("flow_id", flowId)
            putExtra("customer_ref", binding.etCustomerRef.text.toString().trim())
            putExtra("entity_id", binding.etEntityId.text.toString().trim())
        }
        startActivity(intent)
    }
}
