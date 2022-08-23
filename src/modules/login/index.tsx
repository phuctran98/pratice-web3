import React, { Component } from 'react';
import styles from "./loginStyle.module.scss";
import { Button, Input } from 'antd'
import { BUTTON_NAME } from '../../common/Constant';
import icons from '../../themes/svg';
const style = {
    width: "50%",
    height: "100%",
    display: "flex",
}
export default class Login extends Component {
    renderForm = (): JSX.Element => {
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
                        <Input disabled placeholder="hi" />
                    </div>
                    <div className={styles.login__button}>
                        <Button
                            type="primary"
                            block
                        // onClick={this.handleClick}
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
                {this.renderForm()}
            </div>
        )
    }
}
