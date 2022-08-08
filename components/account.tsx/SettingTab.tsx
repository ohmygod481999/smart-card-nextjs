import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import SessionContext from "../../context/session-context";
import * as Styles from "./SettingtabStyles";
import { Account } from "../../types/global";
import axios from "axios"
import Viewer, { Worker } from '@phuocng/react-pdf-viewer'
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

interface Props {
    account: Account | undefined;
}

type SelectedFile = {
    name: string
    type: string
    size: string
}

function SettingTab(props: Props) {
    const { account } = props;
    const { session } = useContext(SessionContext)
    const [cv, setCV] = useState<any>("")

    console.log(session.user.id);
    const [selectedFile, setSelectedFile] = useState<any>({
        name: '',
        type: '',
        size: ''
    })

    const [showCV, setShowCV] = useState<boolean>(false)
    useEffect(()=> {
        axios.get(`http://localhost:3003/cv/get?account=${session.user.id}`)
        .then(res => { setCV(res.data.path) })
        .catch(err => { console.log(err) })
    }, [])

    const [isSelected, setIsSelected] = useState(false)
    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0])
        setIsSelected(true)
    }

    const handleSubmission = () => {
        const formData = new FormData();
        console.log(selectedFile)
        formData.append('file', selectedFile)
        axios.post(`http://localhost:3003/cv/upload`, formData, { headers: {account_id:session.user.id}}).then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div
            className="row single-section animate__animated animate__fadeInDown animate__delay-0-5s"
            style={{
                marginTop: "40px",
            }}
        >

            {!account?.is_agency && (
                <Link href={"/account/agency-register"}>
                    <button className="full-width-btn">
                        Kích hoạt làm đại lý
                    </button>
                </Link>
            )}
            <div style={{ padding: "0px 0px" }}>
                <Styles.Container>
                    <Styles.Title>Hồ sơ</Styles.Title>
                    <p>CV của bạn hiện đang trống</p>
                    <Styles.UploadWrapper>
                        <input onChange={changeHandler} type="file" placeholder="Nhấn vào đây để tải lên" />
                        <Styles.UploadButton>Tải lên</Styles.UploadButton>
                    </Styles.UploadWrapper>

                    <Styles.SubmitButton onClick={handleSubmission}>Submit</Styles.SubmitButton>
                </Styles.Container>


                {cv && <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                    <div style={{ height: '500px', width: '100%', marginTop: "20px" }}>
                        <Viewer fileUrl={cv} />
                    </div>
                </Worker>}

                <Styles.CvBox>
                
                    <Styles.AddCV>
                        <Styles.UploadWrapper>
                            <input onChange={changeHandler} type="file" accept="application/pdf,application/vnd.ms-excel" placeholder="Nhấn vào đây để tải lên" />
                            <Styles.UploadButton>+</Styles.UploadButton>
                        </Styles.UploadWrapper>
                        <label>{cv ? "Thay đổi CV":"Thêm CV mới"}</label>
                        <Styles.SubmitButton onClick={handleSubmission}>Hoàn thành</Styles.SubmitButton>
                    </Styles.AddCV>
                </Styles.CvBox>

            </div>
        </div>
    );
}

export default SettingTab;
