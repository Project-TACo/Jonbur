import React, { Component } from "react";

import { drizzleConnect } from "drizzle-react";
import AmountInput from "./AmountInput";
import DateInput from "./DateInput";
import Summary from "./Summary";
import { Steps, Result, Button, message } from 'antd';
const { Step } = Steps;

// const renderTitle = (current, visibleResult) => {
//     if (visibleResult) {
//         return `You're all set.`
//     }
//     switch (current) {
//         case 0:
//             return 'Keep your ethereum.'
//         case 1:
//             return 'Select the date.'
//         case 2:
//             return 'Review your transaction.'
//         default:
//             return 'Keep your ethereum'
//     }
// }

class Deposit extends Component {
    onChange = current => {
        console.log('onChange:', current);
        this.setState({ current });
    };

    onAmountChange = value => {
        this.setState({ inputValue: value })
    }

    renderResult = () => {
        const txHash = this.props.receipt.transactionHash;
        return (
            <Result
                status="success"
                title="Successfully jonbured your ether!"
                style={{ padding: "48px 0" }}
                subTitle={
                    <span>
                        <p>
                            Transaction hash: {txHash}<br />
                            Check with <a href={`https://ropsten.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">Etherscan.io</a>
                        </p>
                        <p>
                            Confirmation takes 1-5 minutes, please wait.
                        </p>
                    </span>
                }
                extra={[
                    <Button type="primary" key="console" onClick={() => this.props.gotoWithdraw()}>Withdraw</Button>,
                    <Button key="buy" onClick={() => this.props.reset()}>Jonbur Again</Button>,
                ]}
            />
        )
    }

    render() {
        const { current } = this.props;
        return (
            <div>
                <Steps type="navigation" size="small" current={current} onChange={this.props.onChange}>
                    <Step title="Amount" />
                    <Step title="Date" />
                    <Step title="Summary" />
                </Steps>
                <div className="steps-content">{steps[current]}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.onChange(current+1)}>
                            Next
            </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
            </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.onChange(current-1)}>
                            Previous
            </Button>
                    )}
                </div>
            </div>
        );
    }
}

const steps = [<AmountInput />, <DateInput />, <Summary />]

const mapStateToProps = state => {
    return {
        state: state,
        showConfirmScreen: state.deposit.showConfirmScreen,
        current: state.deposit.current,
        receipt: state.deposit.receipt,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch({ type: 'RESET_DEPOSIT' }),
        onChange: (current) => dispatch({ type: 'UPDATE_STEP', value: current }),
        gotoWithdraw: () => dispatch({ type: 'GOTO', value: '3' })
    };
}

export default drizzleConnect(Deposit, mapStateToProps, mapDispatchToProps);