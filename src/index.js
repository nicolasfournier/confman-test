import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)
import '@aws-amplify/ui-react/styles.css'
import { AmplifyProvider } from '@aws-amplify/ui-react'
ReactDOM.render(
    <AmplifyProvider>
      <App />
    </AmplifyProvider>,
    document.getElementById('root')
  )

  import { withAuthenticator } from '@aws-amplify/ui-react'
  export default withAuthenticator(App)