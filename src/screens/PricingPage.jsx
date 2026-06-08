import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {



    const [selected, setSelected] =
        useState(null);


    const packs = [

        {
            id: 1,
            name: "Vision",
            price: "35 000 DA",

            features: [
                "3 acteurs",
                "1 compositeur musical",
                "Montage basique",
                "Livraison HD",
                "1 plan de tournage"
            ]
        },


        {
            id: 2,
            name: "Prestige",
            price: "90 000 DA",

            popular: true,

            features: [
                "6 acteurs",
                "2 compositeurs",
                "Montage professionnel",
                "Color grading",
                "3 plans de tournage"
            ]
        },



        {
            id: 3,
            name: "Cinéma",
            price: "250 000 DA",

            features: [
                "Acteurs illimités",
                "Musique illimitée",
                "Montage cinéma",
                "Promotion",
                "plans de tournage illimités"
            ]
        }


    ];

    const navigate = useNavigate();



    return (

        <div style={styles.page}>

            <div style={styles.blob1} />
            <div style={styles.blob2} />



            <div style={styles.header}>

                <div style={styles.line} />

                <span style={styles.headerText}>
                    PACKS RÉALISATEURS
                </span>

                <div style={styles.line} />

            </div>



            <h1 style={styles.title}>
                Choisissez votre production
            </h1>



            <div style={styles.grid}>


                {

                    packs.map(pack => (


                        <div

                            key={pack.id}
                            onClick={() => { navigate('/court-metrage/studio') }}

                            style={{

                                ...styles.card,

                                ...(pack.popular
                                    ?
                                    styles.popular
                                    :
                                    {})

                            }}

                        >


                            {
                                pack.popular &&

                                <div style={styles.badge}>
                                    MOST POPULAR
                                </div>
                            }



                            <h2 style={styles.packName}>
                                {pack.name}
                            </h2>



                            <div style={styles.price}>
                                {pack.price}
                            </div>



                            <div style={styles.divider} />



                            <div>

                                {

                                    pack.features.map(
                                        (feature, index) => (

                                            <div
                                                key={index}
                                                style={styles.feature}
                                            >

                                                <span>
                                                    ✦
                                                </span>


                                                <span>
                                                    {feature}
                                                </span>

                                            </div>

                                        )

                                    )

                                }

                            </div>



                            <button

                                style={{

                                    ...styles.btn,

                                    background:

                                        selected === pack.id

                                            ?

                                            "rgba(201,168,76,.2)"

                                            :

                                            "transparent"

                                }}

                                onClick={() =>
                                    setSelected(pack.id)
                                }

                            >

                                Choisir ce pack

                            </button>


                        </div>

                    ))

                }



            </div>


        </div>

    )

}




const styles = {


    page: {

        minHeight: "100vh",

        background: "#0d0d1a",

        padding: "80px 40px",

        overflow: "hidden"

    },



    blob1: {

        position: "fixed",

        width: 400,

        height: 400,

        top: -120,

        left: -120,

        borderRadius: "50%",

        background:
            "radial-gradient(circle, rgba(201,168,76,.1), transparent)"

    },


    blob2: {

        position: "fixed",

        width: 350,

        height: 350,

        bottom: -100,

        right: -100,

        borderRadius: "50%",

        background:
            "radial-gradient(circle, rgba(42,74,58,.2), transparent)"

    },



    header: {

        display: "flex",

        justifyContent: "center",

        gap: 15,

        alignItems: "center"

    },



    line: {

        width: 70,

        height: 1,

        background: "#C9A84C"

    },



    headerText: {

        color: "#C9A84C",

        letterSpacing: "4px"

    },



    title: {

        textAlign: "center",

        color: "#e8d9b0",

        marginBottom: "70px",

        fontSize: "42px"

    },



    grid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",

        gap: "30px"

    },



    card: {

        background:
            "linear-gradient(160deg,#141428,#0f1f18)",

        padding: "40px",

        borderRadius: "24px",

        border:
            "1px solid rgba(201,168,76,.15)",

        position: "relative",
        cursor: "pointer"

    },



    popular: {

        transform: "scale(1.04)",

        border:
            "1px solid rgba(201,168,76,.4)"

    },



    badge: {

        position: "absolute",

        top: 20,

        right: 20,

        padding: "8px 12px",

        background:
            "rgba(201,168,76,.15)",

        color: "#C9A84C",

        fontSize: "11px",

        borderRadius: "30px"

    },



    packName: {

        color: "#fff",

        fontSize: "30px"

    },



    price: {

        fontSize: "44px",

        color: "#C9A84C",

        margin: "25px 0"

    },



    divider: {

        height: 1,

        background:
            "linear-gradient(90deg,transparent,#C9A84C,transparent)",

        marginBottom: "30px"

    },



    feature: {

        display: "flex",

        gap: "14px",

        marginBottom: "16px",

        color: "#b0a898"

    },



    btn: {

        width: "100%",

        padding: "16px",

        marginTop: "30px",

        border:
            "1px solid rgba(201,168,76,.3)",

        borderRadius: "14px",

        background: "transparent",

        color: "#C9A84C",

        cursor: "pointer",

        fontSize: "15px"

    }


};