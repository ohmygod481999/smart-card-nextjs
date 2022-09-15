import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import SessionContext from "../../context/session-context";
import * as Styles from "../cv/CvStyles";
import { Account, AgencyType } from "../../types/global";
import axios from "axios"

interface Props {
    account: Account | undefined;
}

function SettingTab(props: Props) {
    const { account } = props;

    return (
        <div
            className="row single-section animate__animated animate__fadeInDown animate__delay-0-5s"
            style={{
                marginTop: "40px",
            }}
        >

            {(!account?.agency || account?.agency.type === AgencyType.COLABORATOR) && (
                <Link href={`/account/agency-register?type=${AgencyType.AGENCY}`}>
                    <button className="full-width-btn mb-3">
                        Kích hoạt làm đại lý
                    </button>
                </Link>
            )}
            {!account?.agency  && (
                <Link href={`/account/agency-register?type=${AgencyType.COLABORATOR}`}>
                    <button className="full-width-btn mb-3">
                        Kích hoạt làm cộng tác viên
                    </button>
                </Link>
            )}
            {!account?.erp_account && (
                <Link href={`/account/erp-register`}>
                    <button className="full-width-btn mb-3">
                        Đăng ký trở thành khách hàng doanh nghiệp
                    </button>
                </Link>
            )}
            
        </div>
    );
}

export default SettingTab;
