import SwiftUI
import WebKit

struct WebViewScreen: View {
    let baseURL: String
    let apiKey: String
    let customerId: String
    let customerChildId: String
    let flowId: String

    @State private var onboardingURL: URL?
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var showError = false

    var body: some View {
        ZStack {
            if let url = onboardingURL {
                WebView(url: url)
            }

            if isLoading {
                ProgressView("Loading...")
                    .progressViewStyle(CircularProgressViewStyle())
            }
        }
        .navigationTitle("Verification")
        .navigationBarTitleDisplayMode(.inline)
        .alert("Error", isPresented: $showError) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(errorMessage ?? "An unknown error occurred.")
        }
        .task {
            await fetchOnboardingURL()
        }
    }

    private func fetchOnboardingURL() async {
        let endpoint = "\(baseURL)/idv/v2/idvalidate/onboarding-url"

        guard let url = URL(string: endpoint) else {
            showError(message: "Invalid API endpoint URL.")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(apiKey, forHTTPHeaderField: "api_key")
        request.setValue(customerId, forHTTPHeaderField: "X-Frankie-CustomerID")

        if !customerChildId.isEmpty {
            request.setValue(customerChildId, forHTTPHeaderField: "X-Frankie-CustomerChildID")
        }

        let body: [String: Any] = [
            "customerRef": UUID().uuidString,
            "consent": true,
            "flowId": flowId
        ]

        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
        } catch {
            showError(message: "Failed to encode request body: \(error.localizedDescription)")
            return
        }

        do {
            let (data, response) = try await URLSession.shared.data(for: request)

            guard let httpResponse = response as? HTTPURLResponse else {
                showError(message: "Invalid server response.")
                return
            }

            guard (200...299).contains(httpResponse.statusCode) else {
                let responseBody = String(data: data, encoding: .utf8) ?? "No response body"
                showError(message: "Server returned status \(httpResponse.statusCode): \(responseBody)")
                return
            }

            guard let json = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let urlString = json["url"] as? String,
                  let onboardingURL = URL(string: urlString) else {
                showError(message: "Failed to parse onboarding URL from response.")
                return
            }

            self.onboardingURL = onboardingURL
            self.isLoading = false
        } catch {
            showError(message: "Network request failed: \(error.localizedDescription)")
        }
    }

    private func showError(message: String) {
        errorMessage = message
        isLoading = false
        showError = true
    }
}

struct WebView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.allowsBackForwardNavigationGestures = true
        webView.load(URLRequest(url: url))
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}
}
