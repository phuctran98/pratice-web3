import React from "react";
import { Modal } from "antd";

import images from "../../themes/images";
import styles from "./loginStyle.module.scss"
import { NETWORK } from "../../common/Constant";

interface ConnectNetworkProps {
  isNetworkPopUp: boolean;
  handleCancel?: (e: any) => void;
  handleSignature : () => void;
}
const ModalChangNetwork: React.FC<ConnectNetworkProps> = ({
  isNetworkPopUp,
  handleCancel,
  handleSignature
}) => {
  const changeNetwork = async () => {
    const windowObj = window as any;
    const { ethereum } = windowObj;

    try {
      await ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORK.CHAIN_ID_HEX }],
      });
      handleSignature()
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await ethereum?.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: NETWORK.CHAIN_ID_HEX,
                rpcUrls: [NETWORK.RPC_URLS],
                chainName: NETWORK.CHAIN_NAME,
                blockExplorerUrls: [NETWORK.BLOCK_EXPLORER_URLS],
                nativeCurrency: {
                  name: NETWORK.NATIVE_CURRENCY.NAME,
                  symbol: NETWORK.NATIVE_CURRENCY.SYMBOL,
                  decimals: NETWORK.NATIVE_CURRENCY.DECIMAL,
                },
              },
            ],
          });
        } catch (addError) {
        }
      }
    }
  };

  return (
    <Modal
      title=""
      visible={isNetworkPopUp}
      footer={null}
      className="ModalCustom"
      onCancel={handleCancel}
    >
      <div className={styles.Modal}>
        <div className={styles.Modal__Title}>
          <div className={styles.Modal__Title__Text}>Select network</div>
        </div>
        <div className={styles.Modal__Network} onClick={changeNetwork}>
          <img src={images.icons.Logo} alt={NETWORK.CHAIN_NAME} />
          <div className={styles.Modal__Network__Name}>
            {NETWORK.CHAIN_NAME}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChangNetwork;
