import { SelfServiceRegistrationFlow } from "@ory/client";
import axios from "axios";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutAuthed from "../components/LayoutAuthed";
import SessionContext from "../context/session-context";
import { ory } from "../pkg";
import { handleFlowError } from "../pkg/errors";

const invisibleInputs = [
    "traits.card_id",
    "method",
    "password",
    "traits.referer_id",
];

function Register() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { card_id } = router.query;

    const { updateSession } = useContext(SessionContext);
    const [messages, setMessages] = useState<any[]>([]);

    // The "flow" represents a registration process and contains
    // information about the form we need to render (e.g. username + password)
    const [flow, setFlow] = useState<SelfServiceRegistrationFlow>();

    // Get ?flow=... from the URL
    const { flow: flowId, return_to: returnTo } = router.query;

    // In this effect we either initiate a new registration flow, or we fetch an existing registration flow.
    useEffect(() => {
        // If the router is not ready yet, or we already have a flow, do nothing.
        if (!router.isReady || flow) {
            return;
        }

        // If ?flow=.. was in the URL, we fetch it
        if (flowId) {
            ory.getSelfServiceRegistrationFlow(String(flowId))
                .then(({ data }) => {
                    // We received the flow - let's use its data and render the form!
                    setFlow(data);
                })
                .catch(handleFlowError(router, "registration", setFlow));
            return;
        }

        // Otherwise we initialize it
        ory.initializeSelfServiceRegistrationFlowForBrowsers(
            returnTo ? String(returnTo) : undefined
        )
            .then(({ data }) => {
                console.log(data);
                setFlow(data);
            })
            .catch(handleFlowError(router, "registration", setFlow));
    }, [flowId, router, router.isReady, returnTo, flow]);

    const onSubmit = async (data: any) => {
        router.query.flow = flow?.id;
        router.push(router);

        await router
            // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
            // his data when she/he reloads the page.
            .push(router);
        setMessages([]);
        const { myData, password } = data;
        const { confirmPassword } = myData;

        if (password !== confirmPassword) {
            setMessages([
                {
                    id: 0,
                    text: "Mật khẩu xác nhận không trùng khớp",
                },
            ]);
            return;
        }

        if (card_id) {
            myData["cardId"] = card_id;
        }

        delete data["myData"];
        const body = {
            flowId: flow?.id,
            myData,
            data,
        };

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/registration` || "",
                // "https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-a916d45e-b515-4ffa-8656-7131ef8f4d20/smartcard/registration",
                body,
                {
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                const { identity, session } = res.data;

                return router
                    .push(flow?.return_to || `/login?login_success=true`)
                    .then(() => {});
            } else {
                setMessages([
                    {
                        id: 0,
                        text: res.data.message
                            ? res.data.message
                            : "Có lỗi xảy ra. Mã Lỗi 001",
                    },
                ]);
            }
        } catch (error: any) {
            const _messages: any[] = [];
            // setMessage()
            _.get(error, "response.data.data.ui.nodes")?.forEach(
                (node: any) => {
                    node.messages.forEach((msg: any) => {
                        _messages.push(msg);
                    });
                }
            );
            _.get(error, "response.data.data.ui.messages")?.forEach(
                (msg: any) => {
                    _messages.push(msg);
                }
            );
            if (_messages.length === 0) {
                _messages.push({
                    id: 0,
                    text: error.message,
                });
            }
            setMessages(_messages);
        }
    };

    return (
        <LayoutAuthed>
            <section id="blog" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__fadeInDown">
                    <div className="container">
                        {/* Blog-Section Title */}
                        <div className="blog-section text-center">
                            <div className="row ">
                                <div className="col-12">
                                    <div className="section-title animate__animated animate__bounceInDown animate__delay-1s">
                                        <h1 className="common-title">
                                            Hệ thống đang bảo trì
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="blog-section animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="row justify-content-center">
                                <p className="text-center">
                                    Xin lỗi quý khách vì sự bất tiện này, hệ
                                    thống đang trong quá trình nâng cấp và chỉnh
                                    sửa
                                </p>
                                <p className="text-center">
                                    Chúng tôi đang khắc phục và cố gắng phục vụ
                                    lại quý khách trong vòng vài ngày tới
                                </p>
                                <img src="/images/maintainance.png" style={{
                                    width : "200px"
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAuthed>
    );
}

export default Register;
