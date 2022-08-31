import styles from "./DefaultLayout.module.scss";
import { Layout, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import SideMenu from './SideMenu'

import icons from '../../themes/svg'
import { getWeb3Instance } from "../../utils/web3";
import { useWeb3React } from "@web3-react/core";

const { Text } = Typography
const START_COUNT = 6
const SUFFIX_COUNT = 4

const EllipsisMiddle = (props: any) => {
    const { deactivate } = useWeb3React()
    const { account, isShowButtonDisconnect } = props
    const start = account[0]?.slice(0, START_COUNT).trim()
    const end = account[0]?.slice(-SUFFIX_COUNT).trim()
    console.log('isShowButtonDisconnect', isShowButtonDisconnect)
    return (
        <div className={styles.TopDefaultLayout__AddressToken}>
            <Text>
                {start}...{end}
            </Text>
            <div className={`${styles.ButtonDisconnect} ${isShowButtonDisconnect ? styles.EnableElement : styles.DisableElement}  `} >
                Disconnect
            </div>
        </div>
    )
}

const DefaultLayout: FC<RouteComponentProps> = ({ children, history }) => {
    const { Content, Header } = Layout;
    const instanceWeb3 = getWeb3Instance()
    const [isShowButtonDisconnect, setIsShowButtonDisconnect] = useState<boolean>(false)
    const [account, setAccount] = useState<string[]>([])

    const getAcc = async () => {
        let accounts = await instanceWeb3?.eth.getAccounts()
        accounts && setAccount(accounts)
    }

    useEffect(() => {
        getAcc()
    }, [])

    return (
        <Layout style={{ height: '100vh' }}>
            <Header className={styles.TopDefaultLayout} style={{ position: 'sticky', zIndex: 1001, width: '100%', top: 0 }}>
                <div className={styles.TopDefaultLayout__BrandIdentity}>
                    <img className="logo" src={icons.LogoApp} alt="logo" />
                    <p className={styles.TopDefaultLayout__Title}>LaunchGarden Admin</p>
                </div>
                <div
                    className={styles.TopDefaultLayout__WrapperLogout}
                    onClick={() => {
                        console.log('first')
                        setIsShowButtonDisconnect(!isShowButtonDisconnect)
                    }
                    }>
                    <EllipsisMiddle
                        account={account}
                        isShowButtonDisconnect={isShowButtonDisconnect}
                    />
                </div>


            </Header>
            <Layout className={styles.Mid}>
                <SideMenu>

                </SideMenu>
                <Layout>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default withRouter(DefaultLayout)