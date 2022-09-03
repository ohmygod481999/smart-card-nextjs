import {
    SelfServiceRecoveryFlow,
    SubmitSelfServiceRecoveryFlowBody,
} from "@ory/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutAuthed from "../components/LayoutAuthed";
import SectionLayout from "../components/SectionLayout";
import { ory } from "../pkg";
import { handleFlowError, handleGetFlowError } from "../pkg/errors";
import _ from "lodash";
import axios, { AxiosError } from "axios";
import Layout from "../components/Layout";

const invisibleInputs = ["method"];

function RecoveryPage() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const [messages, setMessages] = useState<any[]>([]);

    const {
        return_to: returnTo,
        flow: flowId,
        // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
        // of a user.
        refresh,
        // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
        // to perform two-factor authentication/verification.
        aal,
    } = router.query;
    const [flow, setFlow] = useState<SelfServiceRecoveryFlow>();

    console.log(flow);
    useEffect(() => {
        // If the router is not ready yet, or we already have a flow, do nothing.
        if (!router.isReady || flow) {
            return;
        }

        // If ?flow=.. was in the URL, we fetch it
        if (flowId) {
            ory.getSelfServiceRecoveryFlow(String(flowId))
                .then(({ data }) => {
                    setFlow(data);
                })
                .catch(handleFlowError(router, "recovery", setFlow));
            return;
        }

        // Otherwise we initialize it
        ory.initializeSelfServiceRecoveryFlowWithoutBrowser()
            .then(({ data }) => {
                setFlow(data);
            })
            .catch(handleFlowError(router, "recovery", setFlow))
            .catch((err: AxiosError) => {
                // If the previous handler did not catch the error it's most likely a form validation error
                if (err.response?.status === 400) {
                    // Yup, it is!
                    setFlow(_.get(err, "response.data"));
                    return;
                }

                return Promise.reject(err);
            });
    }, [flowId, router, router.isReady, returnTo, flow]);

    const onSubmit = async (data: any) => {
        router.query.flow = flow?.id;
        router.push(router);

        await router
            // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
            // his data when she/he reloads the page.
            .push(router);
        setMessages([]);

        const { csrf_token, email, method } = data;
        const values: SubmitSelfServiceRecoveryFlowBody = {
            email,
            method,
        };

        // const body = {
        //     flowId: flow?.id,
        //     data: values,
        //     token: csrf_token,
        // };

        // const res = await axios.post(
        //     `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/recovery` || "",
        //     // "https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-a916d45e-b515-4ffa-8656-7131ef8f4d20/smartcard/registration",
        //     body,
        //     {
        //         withCredentials: true,
        //     }
        // );

        // console.log(res.data);
        ory.submitSelfServiceRecoveryFlow(String(flow?.id), values, csrf_token)
            .then(({ data }) => {
                // Form submission was successful, show the message to the user!
                // setFlow(data);
                console.log(data);
            })
            .catch(handleFlowError(router, "recovery", setFlow))
            .catch((err: AxiosError) => {
                switch (err.response?.status) {
                    case 400:
                        // Status code 400 implies the form validation had an error
                        setFlow(_.get(err, "response.data"));
                        return;
                }

                throw err;
            });
    };

    return (
        <Layout>
            <SectionLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                            <h1 className="left-title">
                                Khôi phục <span>tài khoản</span>
                            </h1>
                            <div className="animated-bar left" />
                        </div>
                        <div className="blog-section animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="row justify-content-center">
                                <form
                                    className="register-form row"
                                    onSubmit={handleSubmit(onSubmit)}
                                    autoComplete="off"
                                >
                                    {flow?.ui?.nodes
                                        .filter((node) => {
                                            if (
                                                invisibleInputs.includes(
                                                    _.get(
                                                        node,
                                                        "attributes.name"
                                                    )
                                                )
                                            )
                                                return false;
                                            return true;
                                        })
                                        .map((node, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="form-group mb-3"
                                                >
                                                    <label>
                                                        {node.meta.label?.text}
                                                    </label>
                                                    <input
                                                        {...register(
                                                            _.get(
                                                                node,
                                                                "attributes.name"
                                                            )
                                                        )}
                                                        autoComplete="off"
                                                        className="form-control"
                                                        placeholder={
                                                            node.meta.label
                                                                ?.text
                                                        }
                                                        defaultValue={_.get(
                                                            node,
                                                            "attributes.value"
                                                        )}
                                                        type={_.get(
                                                            node,
                                                            "attributes.type"
                                                        )}
                                                    />
                                                </div>
                                            );
                                        })}
                                    {messages.map((msg) => (
                                        <div className="error-msg" key={msg.id}>
                                            {msg.text}
                                        </div>
                                    ))}
                                    <div className="form-submit">
                                        <button
                                            {...register("method")}
                                            value={"link"}
                                            className="clickbtn"
                                        >
                                            Lấy lại mật khẩu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </Layout>
    );
}

export default RecoveryPage;
