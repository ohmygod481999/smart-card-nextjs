import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import SessionContext from "../../context/session-context";
import * as Styles from "../cv/CvStyles";
import { Account } from "../../types/global";
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

            {!account?.agency && (
                <Link href={"/account/agency-register"}>
                    <button className="full-width-btn">
                        Kích hoạt làm đại lý
                    </button>
                </Link>
            )}
            
        </div>
    );
}

export default SettingTab;
