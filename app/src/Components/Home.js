import React, { Component } from "react";
import { drizzleConnect } from 'drizzle-react';
import { Icon } from 'antd';
import { ReactComponent as Logo } from '../images/graph.svg';


class Home extends Component {
    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#003368', height: '70vh', minHeight: '520px', textAlign:'center' }}>
                    <h1 className={'homeTitle'}>The First Decentralized Bank.</h1>
                    {/* <img src={require('../images/GRAPHIC.png')}/> */}
                    <Logo className={'homeImage'}/>
                    {/* <Icon style={{color:'#ececec', fontSize:'8em', margin: '30px'}} type="bank"/> */}
                </div>
                <div>
                    <div className={'menuButton'} style={{ pointer: 'click', width: '80%', marginTop: '-20px', backgroundColor: 'white' }} onClick={() => { this.props.goto('2'); }}>Get Started</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        networkId: state.web3.networkId,
        current: state.menu.current,
        account: state.accounts[0],
        balance: state.accountBalances[state.accounts[0]],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goto: value => dispatch({ type: 'GOTO', value: value }),
    };
}

export default drizzleConnect(Home, mapStateToProps, mapDispatchToProps);
