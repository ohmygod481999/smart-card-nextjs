import axios from "axios";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Account } from "../types/global";
import { apolloClient } from "../utils/apollo";
import { UPDATE_AVATAR_ACCOUNT } from "../utils/apollo/mutations/account.mutation";
import { uploadFileS3 } from "../utils/spaces";

interface Props {
    account?: Account;
}

const defaultImg =
    "https://long-space.sgp1.digitaloceanspaces.com/smartcard/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpeg";

function AvatarDrop(props: Props) {
    const { account } = props;
    const [file, setFile] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState(defaultImg);
    const [msg, setMsg] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (account?.account_info?.avatar) {
            setImgUrl(account?.account_info?.avatar);
        }
    }, [account]);

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        setFile(acceptedFiles ? acceptedFiles[0] : null);
        console.log(acceptedFiles);
        var reader = new FileReader();

        reader.addEventListener(
            "load",
            function () {
                if (reader.result) {
                    setImgUrl(String(reader.result));
                }
            },
            false
        );

        reader.readAsDataURL(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });

    const onSave = async () => {
        if (file && account) {
            setMsg("");
            setSubmitLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            try {

                const response = await axios.post(
                    // "http://localhost:3003/storage/upload",
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/storage/upload-avatar` ||
                        "",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "x-path": "/smartcard",
                        },
                        withCredentials: true,
                    }
                );
                setMsg("Cập nhật thành công");
    
                // if (_.get(response, "data.success")) {
                //     const imgUrl = _.get(response, "data.data.location");
                //     console.log(imgUrl);
    
                //     await apolloClient.mutate({
                //         mutation: UPDATE_AVATAR_ACCOUNT,
                //         variables: {
                //             id: account.id,
                //             avatar: imgUrl,
                //         },
                //     });
                //     setMsg("Cập nhật thành công");
                // }
            }
            catch(err) {
                if (_.get(err,"response.data")) {
                    setMsg(_.get(err,"response.data.message"));
                }
                else {
                    setMsg("Có lỗi xảy ra");

                }
            }
            setSubmitLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "680px",
                margin: "auto",
                padding: "20px",
            }}
        >
            <h3>Ảnh đại diện</h3>
            <div {...getRootProps()} className="mb-3">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Kéo thả ảnh hoặc ấn vào đây để chọn ảnh</p>
                )}
                <img src={imgUrl} alt="avatar" />
            </div>

            {msg && <div className="form-msg mb-3">{msg}</div>}

            <div className="form-submit">
                <button
                    className="clickbtn"
                    onClick={onSave}
                    disabled={submitLoading}
                >
                    Lưu
                </button>
            </div>
        </div>
    );
}

export default AvatarDrop;
