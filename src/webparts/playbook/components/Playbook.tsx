import * as React from 'react'
import { IPlaybookProps } from './IPlaybookProps'
import App from './App'
import { sp } from '@pnp/pnpjs'
import { Web } from '@pnp/sp/webs'
import '../../../ExternalRef/css/style.scss'

/*development URL */
const webURL = 'https://ggsaus.sharepoint.com/sites/Intranet_Test'
const masterAnnualPlan = 'Annual Plan Test'
const deliveryPlan = 'Delivery Plan Phase List'
const deliverPlanList = 'Delivery Plan'

/*Production URL */
// const webURL = 'https://ggsaus.sharepoint.com'
// const masterAnnualPlan = 'Annual Plan'
// const deliveryPlan = 'Delivery Plan Phase List'
// const deliverPlanList = 'Delivery Plan'
export default class Playbook extends React.Component<IPlaybookProps, {}> {
  constructor(prop: IPlaybookProps, state: {}) {
    super(prop)
    sp.setup({
      spfxContext: this.props.context,
    })
  }
  public render(): React.ReactElement<IPlaybookProps> {
    const _web = Web(webURL)

    return (
      <>
        <App
          context={this.props.context}
          sp={sp}
          URL={_web}
          masterAnnualPlan={masterAnnualPlan}
          deliveryPlan={deliveryPlan}
          deliveryPlanList={deliverPlanList}
        />
      </>
    )
  }
}
