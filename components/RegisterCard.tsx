import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import SessionContext from "../context/session-context";
import { useLogoutHandler } from "../pkg";

interface Props {
  id: string | string[] | undefined;
}

function RegisterCard(props: Props) {
  const { session } = useContext(SessionContext);
  const router = useRouter();
  const { id } = props;

  const logout = useLogoutHandler();
  const [active, setActive] = useState<number>(1);
  const onRegister = async () => {
    if (session) {
      await logout();
    }
    router.push(`/register?card_id=${id}`);
  };

  return (
    <section className="section active">
      <div className="homecolor-box" />
      <div className="common_bg animate__animated animate__zoomIn">
        <div className="container m-auto">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="home-content text-center">
                <div className="onboarding-container">
                  <div
                    className="steps"
                    style={{
                      transform: `translateX(${-(100 / 3) * (active - 1)}%)`,
                    }}
                  >
                    <div className="step">
                      <div className="image-container">
                        <img
                          className="step-image"
                          src="/images/onboarding/image1.png"
                          alt=""
                        />
                      </div>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Labore, reiciendis doloremque pariatur aperiam autem
                      laboriosam tempora, quam sint consequatur veritatis
                      incidunt! Ipsa et hic sit aspernatur temporibus architecto
                      fuga corporis.
                    </div>
                    <div className="step">
                      <div className="image-container">
                        <img
                          className="step-image"
                          src="/images/onboarding/image2.png"
                          alt=""
                        />
                      </div>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Labore, reiciendis doloremque pariatur aperiam autem
                      laboriosam tempora, quam sint consequatur veritatis
                      incidunt! Ipsa et hic sit aspernatur temporibus architecto
                      fuga corporis.
                    </div>
                    <div className="step">
                      <div className="image-container">
                        <img
                          className="step-image"
                          src="/images/onboarding/image3.png"
                          alt=""
                        />
                      </div>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Labore, reiciendis doloremque pariatur aperiam autem
                      laboriosam tempora, quam sint consequatur veritatis
                      incidunt! Ipsa et hic sit aspernatur temporibus architecto
                      fuga corporis.
                    </div>
                  </div>
                  <div className="btn-container ">
                    <div
                      className={`skip-btn ${active === 3 ? "btn-hiden" : ""}`}
                      onClick={() => {
                        setActive(3);
                      }}
                    >
                      Skip
                    </div>
                    <div className="dots">
                      <div
                        className={`dot ${active === 1 ? "active" : ""}`}
                      ></div>
                      <div
                        className={`dot ${active === 2 ? "active" : ""}`}
                      ></div>
                      <div
                        className={`dot ${active === 3 ? "active" : ""}`}
                      ></div>
                    </div>
                    <div
                      className={`next-btn ${active === 3 ? "btn-hiden" : ""}`}
                      onClick={() => {
                        setActive((prep) => prep + 1);
                      }}
                    >
                      Next
                    </div>
                  </div>
                  <button
                    className={`btn btn-link ${
                      active === 3 ? "" : "btn-hiden"
                    }`}
                    onClick={onRegister}
                  >
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterCard;
