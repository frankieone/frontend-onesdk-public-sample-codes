import SwiftUI

struct CredentialsView: View {
    enum Environment: String, CaseIterable {
        case uat = "UAT"
        case production = "Production"

        var baseURL: String {
            switch self {
            case .uat:
                return "https://api.uat.frankie.one"
            case .production:
                return "https://api.frankie.one"
            }
        }
    }

    @AppStorage("selectedEnvironment") private var selectedEnvironment: String = Environment.uat.rawValue
    @AppStorage("apiKey") private var apiKey: String = ""
    @AppStorage("customerId") private var customerId: String = ""
    @AppStorage("customerChildId") private var customerChildId: String = ""
    @AppStorage("flowId") private var flowId: String = "idv"
    @AppStorage("customerRef") private var customerRef: String = ""
    @AppStorage("entityId") private var entityId: String = ""

    @State private var navigateToWebView = false

    private var environment: Environment {
        Environment(rawValue: selectedEnvironment) ?? .uat
    }

    var body: some View {
        Form {
            Section(header: Text("Environment")) {
                Picker("Environment", selection: $selectedEnvironment) {
                    ForEach(Environment.allCases, id: \.rawValue) { env in
                        Text(env.rawValue).tag(env.rawValue)
                    }
                }
                .pickerStyle(.segmented)
            }

            Section(header: Text("Credentials")) {
                SecureField("API Key", text: $apiKey)
                    .textContentType(.password)
                    .autocapitalization(.none)
                    .disableAutocorrection(true)

                TextField("Customer ID", text: $customerId)
                    .autocapitalization(.none)
                    .disableAutocorrection(true)

                TextField("Customer Child ID (optional)", text: $customerChildId)
                    .autocapitalization(.none)
                    .disableAutocorrection(true)
            }

            Section(header: Text("Flow")) {
                TextField("Flow ID", text: $flowId)
                    .autocapitalization(.none)
                    .disableAutocorrection(true)
            }

            Section(header: Text("Session (fill one or leave both empty)")) {
                TextField("Customer Reference (optional)", text: $customerRef)
                    .autocapitalization(.none)
                    .disableAutocorrection(true)

                TextField("Entity ID (optional)", text: $entityId)
                    .autocapitalization(.none)
                    .disableAutocorrection(true)
            }

            Section {
                NavigationLink(
                    destination: WebViewScreen(
                        baseURL: environment.baseURL,
                        apiKey: apiKey,
                        customerId: customerId,
                        customerChildId: customerChildId,
                        flowId: flowId,
                        customerRef: customerRef,
                        entityId: entityId
                    ),
                    isActive: $navigateToWebView
                ) {
                    EmptyView()
                }
                .hidden()

                Button(action: {
                    navigateToWebView = true
                }) {
                    HStack {
                        Spacer()
                        Text("Start Verification")
                            .fontWeight(.semibold)
                        Spacer()
                    }
                }
                .disabled(apiKey.isEmpty || customerId.isEmpty || flowId.isEmpty)
            }
        }
        .navigationTitle("FrankieOne OneSDK")
    }
}
