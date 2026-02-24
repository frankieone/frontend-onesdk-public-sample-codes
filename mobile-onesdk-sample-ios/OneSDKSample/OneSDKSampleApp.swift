import SwiftUI

@main
struct OneSDKSampleApp: App {
    var body: some Scene {
        WindowGroup {
            NavigationView {
                CredentialsView()
            }
            .navigationViewStyle(.stack)
        }
    }
}
