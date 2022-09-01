import Head from "next/head";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import LayoutAuthed from "../../components/LayoutAuthed";
import * as Styles from "../../components/cv/CvStyles";
import SessionContext from "../../context/session-context";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Viewer, { Worker } from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";
import _ from "lodash";
import { useLazyQuery } from "@apollo/client";
import { GET_RESUME } from "../../utils/apollo/queries/resume.queries";
import { getDataGraphqlResult } from "../../utils";

type SelectedFile = {
    name: string;
    type: string;
    size: string;
};

function Cv() {
    const { session } = useContext(SessionContext);
    const [file, setFile] = useState<File | null>(null);
    const [msg, setMsg] = useState("");

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        setFile(acceptedFiles ? acceptedFiles[0] : null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [],
        },
    });

    // const [cv, setCV] = useState<any>("");

    const [selectedFile, setSelectedFile] = useState<any>({
        name: "",
        type: "",
        size: "",
    });

    const [showCV, setShowCV] = useState<boolean>(false);

    const [getResume, {data, loading, refetch}] = useLazyQuery(GET_RESUME)

    useEffect(() => {
      if (session) {
          getResume({
              variables: {
                account_id: session.user.id
              }
          })
      }
    }, [session])
    


    const [isSelected, setIsSelected] = useState(false);
    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        if (file) {
            const formData = new FormData();
            // console.log(selectedFile);
            formData.append("file", file);
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/resume/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    setMsg("Thành công");
                    refetch();
                })
                .catch((err) => {
                    setMsg(
                        `Có lỗi xảy ra: ${_.get(err, "response.data.message")}`
                    );
                });
        } else {
            alert("Vui lòng chọn CV");
        }
    };

    const resume = useMemo(() => {
        if (data) {
            const resumes = getDataGraphqlResult(data)
            if (resumes.length > 0) {
                return resumes[0].path
            }
            return ""
        }
        return ""
    }, [data])
    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - quản trị CV</title>
            </Head>
            <section id="contact" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__zoomIn">
                    <div className="container">
                        {/* Contact-page Start */}
                        <div className="contact-section">
                            {/* Contact-Section Title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                        <h1 className="left-title">
                                            Quản trị <span>cv</span>
                                        </h1>
                                        <div className="animated-bar left" />
                                    </div>
                                    <div style={{ padding: "0px 0px" }}>
                                        {/* {!cv && ( */}
                                        <Styles.Container>
                                            <Styles.UploadWrapper>
                                                <div
                                                    {...getRootProps()}
                                                    className="mb-3"
                                                >
                                                    <input
                                                        {...getInputProps()}
                                                    />
                                                    {isDragActive ? (
                                                        <p>drag active ...</p>
                                                    ) : (
                                                        <p>
                                                            Kéo thả file pdf
                                                            hoặc ấn vào đây để
                                                            chọn cv
                                                        </p>
                                                    )}
                                                </div>
                                                <p>
                                                    {file &&
                                                        `Đã chọn: ${file.name}`}
                                                </p>
                                                {/* <Styles.UploadButton>
                                                        Tải lên
                                                    </Styles.UploadButton> */}
                                            </Styles.UploadWrapper>

                                            {msg && (
                                                <p className="text-center">
                                                    {msg}
                                                </p>
                                            )}

                                            <button
                                                className="full-width-btn"
                                                onClick={handleSubmission}
                                            >
                                                Lưu
                                            </button>
                                        </Styles.Container>
                                        {/* )} */}

                                        {resume && (
                                            // @ts-ignore
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                                                <div
                                                    style={{
                                                        height: "500px",
                                                        width: "100%",
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    <Viewer fileUrl={resume} />
                                                </div>
                                            </Worker>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAuthed>
    );
}

export default Cv;
