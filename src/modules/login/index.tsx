import React, { Component } from 'react';
import styles from "./loginStyle.module.scss";
import { Button, Input, message } from 'antd'
import "antd/dist/antd.css";
import { BUTTON_NAME, LOGIN_STATUS, NETWORK, ROUTES } from '../../common/Constant';
import icons from '../../themes/svg';
import { RouteComponentProps } from 'react-router-dom';
import { getWeb3Instance, isLoginWithAcc, isMetaMaskInstalled, signMessage } from '../../utils/web3';
import { AuthServices } from '../../services/auth-service';
import _ from 'lodash';
import StorageUtils from '../../utils/storage';
import ModalChangeNetwork from './ModalChangeNetwork';
const style = {
    width: "50%",
    height: "100%",
    display: "flex",
}

interface LoginProps extends RouteComponentProps { }

interface LoginState {
    status: string;
    currentAccount: string;
    disable: boolean;
    isNetworkPopUp: boolean;
}
class Login extends Component<LoginProps, LoginState> {
    private authServices = new AuthServices()
    private instanceWeb3 = getWeb3Instance()
    private instanceObj = window as any;
    constructor(props: LoginProps) {
        const status = isMetaMaskInstalled() ? LOGIN_STATUS.NOT_LOGGED_IN : LOGIN_STATUS.METAMASK_UNAVAILABLE
        const disable = isMetaMaskInstalled() ? false : true;


        super(props);
        this.state = {
            status,
            currentAccount: "",
            disable,
            isNetworkPopUp: false,
        }

    }
    checkLogin = async () => {
        const currentAccount = await isLoginWithAcc()
        const valueIsString = currentAccount && typeof currentAccount === 'string'
        if (valueIsString) {
            this.setState({
                currentAccount,
                status: LOGIN_STATUS.LOGGED_IN
            })
        }
    }
    async componentDidMount() {
        console.log('componentDidMount')
        await this.checkLogin()
        this.onEventChange()
    }
    handleLogin = async (signature: any) => {
        const { history } = this.props
        const param = {
            wallet_address: this.state.currentAccount,
            signature,
        }
        const result = await this.authServices.login(param)
        const { data } = result
        const resultToken = _.get(data, "data.token", "")
        const user = _.get(data, "data.user", "")
        if (resultToken) {
            this.setState({ status: LOGIN_STATUS.SIGN })
        }
        const { token } = resultToken as any;
        StorageUtils.setUser(user);
        StorageUtils.setToken(token);
        StorageUtils.setSignature(signature);
        history.push(`${ROUTES.DASHBOARD}`);
    }
    handleSignature = async () => {
        try {
            debugger;
            const signature = await signMessage(process.env.REACT_APP_MESSAGE_SIGNATURE || "", this.state.currentAccount)
            const windowObj = window as any
            const { ethereum } = windowObj
            const network = ethereum?.networkVersion
            if (signature && network === NETWORK.CHAIN_ID_DECIMAL) {
                this.setState({ isNetworkPopUp: false })
                console.log('11111')
                await this.handleLogin(signature)
            }
            else if (signature && network !== NETWORK.CHAIN_ID_DECIMAL) {
                this.setState({ isNetworkPopUp: true })
            }
            else {
                this.setState({ isNetworkPopUp: false });
            }
        } catch (error: any) {
            message.error(error?.message, 2);
        }
    }

    handleClick = () => {
        const { status } = this.state
        if (status === LOGIN_STATUS.NOT_LOGGED_IN) {
            this.handleConnectAccount()
        } if (status === LOGIN_STATUS.LOGGED_IN || status === LOGIN_STATUS.NOT_ADMIN) {
            this.handleSignature()
        }
    }
    onEventChange = () => {
        try {
            this.instanceObj.ethereum.on(
                "accountChanged",
                (accounts: string[]) => {
                    const { status } = this.state
                    if (status === LOGIN_STATUS.LOGGED_IN) {
                        this.setState({
                            currentAccount: accounts[0]
                        })
                    }
                    else if (status === LOGIN_STATUS.NOT_ADMIN) {
                        this.setState({
                            currentAccount: accounts[0],
                            status: LOGIN_STATUS.NOT_LOGGED_IN,
                            disable: false,
                        });
                    }
                    else {
                        this.setState({
                            currentAccount: accounts[0],
                            status: LOGIN_STATUS.NOT_LOGGED_IN,
                        });
                    }
                }
            )
        } catch (err) {
            console.error(err)
        }
    }
    handleConnectAccount = () => {
        try {
            this.instanceWeb3?.eth.requestAccounts().then(this.onSuccess, this.onError)
        } catch (error: any) {
            message.error(error?.message || error, 3);
        }
    }
    onSuccess = (value: string[]) => {
        if (value.length > 0) {
            this.setState({
                currentAccount: value[0],
                disable: false,
                // buttonName: BUTTON_NAME.SIGN,
                status: LOGIN_STATUS.LOGGED_IN,
            });
        }
    };

    onError = (reason: any) => {
        // TH user close việc unlock xong lại truy cập lại => báo message user chưa unlock
        console.log('first')
        this.setState({
            status: LOGIN_STATUS.CLOSE_CONNECT_METAMASK,
            disable: true,
        });
    };
    // end area
    handleCancel = () => {
        this.setState({ isNetworkPopUp: false });
    };
    renderForm = (): JSX.Element => {
        const windowObj = window as any;
        const { ethereum, web3 } = windowObj;
        console.log('web3', web3)
        console.log('ethereum', ethereum)

        return (
            <div style={style}>
                <div className={styles.login__form}>
                    <div className={styles.login__form__appNameAndLogo}>
                        <img src={icons.LogoApp} alt="icon-app" />
                        <span>
                            LaunchGarden Admin
                        </span>
                    </div>
                    <div className={styles.login__textRobotoBold}>Connect wallet</div>
                    <div className={styles.login__textRobotoNormal}>Address</div>
                    <div className={styles.login__inputAddress}>
                        <Input disabled placeholder={this.state.currentAccount} />
                    </div>
                    <div className={styles.login__button}>
                        <Button
                            type="primary"
                            block
                            onClick={this.handleClick}
                        // disabled={disablle}
                        >
                            {BUTTON_NAME.CONNECT}
                        </Button>
                    </div>
                    {/* {this.renderWarning()} */}
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className={styles.login}>
                <ModalChangeNetwork
                    handleSignature={this.handleSignature}
                    handleCancel={this.handleCancel}
                    isNetworkPopUp={this.state.isNetworkPopUp}
                />
                {this.renderForm()}
            </div>
        )
    }
}
export default Login