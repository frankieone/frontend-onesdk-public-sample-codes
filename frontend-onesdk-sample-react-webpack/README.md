# Initialize the project

WARNING react-script is not maintained thus, it does not satisfy typescript requirement for oneSDK.
if you still want to use react-script + oneSDK do <code>npm install --force</code>

react-script used typescript version is 4
oneSDK is on 5+

ts 5 introduces <code>satsifies</code> which is used in oneSDK package

# .ENV credential

create <code>.env</code> file in the root directory of the repo
and copy env.example content into the file
fill out the required credentials with the credentials acquired from frankie one

# Start the project


to start the project in dev mode
<code>npm start</code>

to start the production build
<code>npm install -g serve</code>
<code>serve -s build</code>

