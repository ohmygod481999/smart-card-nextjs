import { Wallet, WalletType } from "../types/global";

export const getValueFromGraphql = (input: any) => {
    if (!input) {
        return input;
    }
    return input[Object.keys(input)[0]];
};

export const getDataGraphqlResult = (data: any) => {
    const key = Object.keys(data).length > 0 ? Object.keys(data)[0] : null;
    if (key) return data[key];
    return null;
};

export const formatMoney = (amount: number) => {
    var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(amount);
};

export const formatDateTime = (date: string, isHaveTime: boolean = true) => {
    const d = new Date(date);
    return `${isHaveTime ? `${String(d.toLocaleTimeString())}, ` : ""}${String(
        d.toLocaleDateString("vi-VN")
    )}`;
};

export const transactionMapping = {
    0: "Doanh thu giới thiệu",
    1: "Thưởng người dùng mới",
    2: "Doanh thu giới thiệu đại lý",
};

export const paddingId = (id: number) => {
    return String(id).padStart(6, "0");
};

export const getWallet = (
    wallets: Wallet[],
    walletType: WalletType
): Wallet | null => {
    let result = null;
    wallets.forEach((wallet) => {
        if (wallet.type === walletType) {
            result = wallet;
        }
    });
    return result;
};

export const defaultImg =
    "https://long-space.sgp1.digitaloceanspaces.com/smartcard/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpeg";
