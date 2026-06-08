import { useState } from "react";
import {sendCertificateEmail} from "../utils/sendFinalEmail";

const fakeWorks = [
    {
        id: 1,
        title: "Symphony of Light",
        artist: "Ahmed Benali",
        profession: "Musicien",
        date: "20/05/2026",
        status: "pending",
        file: "https://example.com/music.mp3"
    },

    {
        id: 2,
        title: "Future City",
        artist: "Sarah",
        profession: "Designer",
        date: "18/05/2026",
        status: "approved",
        file: "https://picsum.photos/1000"
    },

    {
        id: 3,
        title: "Hidden Soul",
        artist: "Karim",
        profession: "Photographe",
        date: "21/05/2026",
        status: "pending",
        file: "https://example.com/document.pdf"
    }
];


export default function AdminDashboard() {


    const [page, setPage] = useState("overview");

    return (

        <div style={styles.page}>


            <div style={styles.sidebar}>

                <h2 style={styles.logo}>
                    ✦ Admin
                </h2>


                <button
                    style={{
                        ...styles.link,
                        ...(page === "overview"
                            ? styles.activeLink : {})
                    }}
                    onClick={() => setPage("overview")}
                >
                    Dashboard
                </button>


                <button
                    style={{
                        ...styles.link,
                        ...(page === "works"
                            ? styles.activeLink : {})
                    }}
                    onClick={() => setPage("works")}
                >
                    Submitted Works
                </button>

            </div>



            <div style={styles.content}>

                {
                    page === "overview"
                        ?
                        <Overview />
                        :
                        <Works />
                }

            </div>


        </div>

    )

}




function Overview() {

    return (

        <div>

            <h1 style={styles.title}>
                Dashboard Overview
            </h1>


            <div style={styles.cards}>


                <Card
                    title="Pending"
                    value="14"
                />

                <Card
                    title="Approved"
                    value="42"
                />


                <Card
                    title="Rejected"
                    value="7"
                />


                <Card
                    title="Total"
                    value="63"
                />


            </div>

        </div>

    )

}



function Card({ title, value }) {

    return (

        <div style={styles.card}>

            <p style={styles.cardLabel}>
                {title}
            </p>


            <h2 style={styles.cardValue}>
                {value}
            </h2>

        </div>

    )

}



function Works() {

        const storedData = JSON.parse(localStorage.getItem("registrationData"));


    const [works, setWorks] =
        useState(fakeWorks);


    function updateStatus(
        id,
        status
    ) {

        setWorks(prev =>

            prev.map(work =>

                work.id === id
                    ?
                    {
                        ...work,
                        status
                    }
                    :
                    work

            )

        );
        console.log("Data from localStorage:", storedData);
        sendCertificateEmail(storedData);
    }



    return (

        <div>

            <h1 style={styles.title}>
                Validate Art Works
            </h1>



            <div style={styles.tableContainer}>


                <table style={styles.table}>

                    <thead>

                        <tr>

                            <th style={styles.th}>
                                Artist
                            </th>


                            <th style={styles.th}>
                                Work
                            </th>


                            <th style={styles.th}>
                                Profession
                            </th>


                            <th style={styles.th}>
                                Date
                            </th>


                            <th style={styles.th}>
                                File
                            </th>


                            <th style={styles.th}>
                                Status
                            </th>


                            <th style={styles.th}>
                                Action
                            </th>

                        </tr>

                    </thead>



                    <tbody>


                        {

                            works.map(work => (

                                <tr
                                    key={work.id}
                                    style={styles.tr}
                                >


                                    <td style={styles.td}>
                                        {work.artist}
                                    </td>



                                    <td style={styles.td}>
                                        {work.title}
                                    </td>



                                    <td style={styles.td}>
                                        {work.profession}
                                    </td>



                                    <td style={styles.td}>
                                        {work.date}
                                    </td>



                                    <td style={styles.td}>


                                        <a

                                            href={work.file}

                                            target="_blank"

                                            rel="noopener noreferrer"

                                            style={styles.fileLink}

                                        >

                                            View File ↗

                                        </a>


                                    </td>



                                    <td style={styles.td}>

                                        <span

                                            style={{

                                                ...styles.status,

                                                background:

                                                    work.status === "approved"

                                                        ?
                                                        "rgba(80,180,100,.15)"

                                                        :

                                                        work.status === "rejected"

                                                            ?
                                                            "rgba(220,80,80,.15)"

                                                            :

                                                            "rgba(201,168,76,.12)"



                                            }}

                                        >

                                            {work.status}

                                        </span>


                                    </td>




                                    <td style={styles.td}>


                                        {
                                            work.status === "pending"

                                                ?

                                                <div
                                                    style={styles.actions}
                                                >

                                                    <button

                                                        style={styles.approveBtn}

                                                        onClick={() => updateStatus(
                                                            work.id,
                                                            "approved"
                                                        )}

                                                    >

                                                        ✔

                                                    </button>



                                                    <button

                                                        style={styles.rejectBtn}

                                                        onClick={() => updateStatus(
                                                            work.id,
                                                            "rejected"
                                                        )}

                                                    >

                                                        ✖

                                                    </button>


                                                </div>

                                                :

                                                "-"

                                        }


                                    </td>


                                </tr>

                            ))

                        }



                    </tbody>

                </table>

            </div>

        </div>

    )

}




const styles = {


    page: {

        display: "flex",

        minHeight: "100vh",

        background: "#0d0d1a",

        fontFamily:
            "sans-serif"

    },



    sidebar: {

        width: "260px",

        background:
            "linear-gradient(180deg,#141428,#0f1f18)",

        borderRight:
            "1px solid rgba(201,168,76,.15)",

        padding: "40px 24px"

    },



    logo: {

        color: "#C9A84C",

        marginBottom: "60px"

    },



    link: {

        display: "block",

        width: "100%",

        padding: "16px",

        marginBottom: "12px",

        background: "transparent",

        border:
            "1px solid transparent",

        color: "#b0a898",

        cursor: "pointer",

        borderRadius: "12px",

        textAlign: "left"

    },



    activeLink: {

        background:
            "rgba(201,168,76,.08)",

        border:
            "1px solid rgba(201,168,76,.25)",

        color: "#C9A84C"

    },



    content: {

        flex: 1,

        padding: "50px"

    },



    title: {

        color: "#e8d9b0",

        marginBottom: "30px"

    },



    cards: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",

        gap: "20px"

    },

    tableContainer: {

        overflowX: "auto",

        background:
            "linear-gradient(160deg,#141428,#0f1f18)",

        borderRadius: "20px",

        border:
            "1px solid rgba(201,168,76,.15)",

        padding: "20px"

    },


    table: {

        width: "100%",

        borderCollapse: "collapse"

    },


    th: {

        textAlign: "left",

        padding: "18px",

        color: "#C9A84C",

        fontWeight: "600",

        borderBottom:
            "1px solid rgba(201,168,76,.15)"

    },


    td: {

        padding: "18px",

        color: "#d0c7b0",

        borderBottom:
            "1px solid rgba(255,255,255,.05)"

    },


    tr: {

        transition: ".2s"

    },


    fileLink: {

        color: "#C9A84C",

        textDecoration: "none",

        fontWeight: "500"

    },



    card: {

        background:
            "linear-gradient(160deg,#141428,#0f1f18)",

        padding: "30px",

        borderRadius: "20px",

        border:
            "1px solid rgba(201,168,76,.15)"

    },



    cardLabel: {

        color: "#a09070"

    },



    cardValue: {

        color: "#C9A84C",

        fontSize: "38px"

    },



    worksList: {

        display: "flex",

        flexDirection: "column",

        gap: "20px"

    },



    workCard: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "24px",

        background:
            "linear-gradient(160deg,#141428,#0f1f18)",

        border:
            "1px solid rgba(201,168,76,.12)",

        borderRadius: "16px"

    },



    workTitle: {

        color: "#e8d9b0",

        margin: 0

    },



    artist: {

        color: "#C9A84C"

    },



    meta: {

        color: "#777"

    },



    status: {

        padding: "8px 16px",

        borderRadius: "20px",

        color: "#fff",

        fontSize: "12px"

    },



    actions: {

        display: "flex",

        gap: "10px",

        marginTop: "12px"

    },



    approveBtn: {

        width: "40px",

        height: "40px",

        borderRadius: "50%",

        border: "none",

        background:
            "rgba(80,180,100,.15)",

        color: "#4caf50",

        cursor: "pointer"

    },



    rejectBtn: {

        width: "40px",

        height: "40px",

        borderRadius: "50%",

        border: "none",

        background:
            "rgba(220,80,80,.15)",

        color: "#e07070",

        cursor: "pointer"

    }


};