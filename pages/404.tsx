import Link from "next/link";

export default function FourOhFour() {
    return (
        <section id="about" className="section active">
            <div className="homecolor-box" />
            <div className="common_bg animate__animated animate__fadeInDown">
                <div className="container">
                    <div className="about-content">
                        {/* About Title Start*/}
                        <div className="eror-404">
                            <div>404 Not Found</div>
                            <p>
                                <Link href="/">
                                    <a>Go back</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
