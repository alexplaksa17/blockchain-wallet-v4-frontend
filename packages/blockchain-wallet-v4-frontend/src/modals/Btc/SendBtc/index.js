import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import { actions, model, selectors } from 'data'
import FirstStep from './FirstStep'
import modalEnhancer from 'providers/ModalEnhancer'
import SecondStep from './SecondStep'
import SendBtc from './template'

class SendBtcContainer extends React.PureComponent {
  componentDidMount () {
    const { from, to, description, amount, lockboxIndex, payPro } = this.props
    this.props.actions.initialized({
      from,
      to,
      description,
      amount,
      lockboxIndex,
      payPro
    })
  }

  componentWillUnmount () {
    this.props.actions.destroyed()
  }

  render () {
    const {
      to,
      step,
      total,
      amount,
      position,
      closeAll,
      description,
      excludeHDWallets,
      payPro
    } = this.props

    return (
      <SendBtc position={position} total={total} closeAll={closeAll}>
        {step === 1 && (
          <FirstStep
            to={to}
            amount={amount}
            description={description}
            excludeHDWallets={excludeHDWallets}
            payPro={payPro}
          />
        )}
        {step === 2 && <SecondStep payPro={payPro} />}
      </SendBtc>
    )
  }
}

SendBtcContainer.propTypes = {
  step: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  closeAll: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  step: selectors.components.sendBtc.getStep(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.sendBtc, dispatch)
})

const enhance = compose(
  modalEnhancer(model.components.sendBtc.MODAL),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(SendBtcContainer)
