import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PROFESSIONS = [
  { value: "", label: "Choisir votre profession" },
  { value: "comedian", label: "Acteur / Comédien" },
  { value: "musicien", label: "Musicien" },
  { value: "senarist", label: "Scénariste" },
  { value: "photographe", label: "Photographe" },
  { value: "costume", label: "Costume Designer" },
  { value: "designer", label: "Designer" },
  { value: "realisateur", label: "Réalisateur" },
];

const CV_TYPES = [
  "application/pdf"
];

const PORTFOLIO_TYPES = [
  "audio/mpeg",
  "video/mp4",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf"
];

function validateFile(file, profession) {
  if (!file) return false;

  if (profession === "comedian") {
    return CV_TYPES.includes(file.type);
  }

  if (
    ["musicien", "senarist", "photographe", "costume"]
      .includes(profession)
  ) {
    return PORTFOLIO_TYPES.includes(file.type);
  }

  return true;
}

const ArtistPage = () => {
  const navigate = useNavigate();

  const fileRef = useRef();

  const [dragOver, setDragOver] =
    useState(false);

  const [fileError, setFileError] =
    useState("");

  const [form, setForm] =
    useState({

      name: "",
      email: "",
      phone: "",
      profession: "",
      experience: "",
      portfolio: "",
      bio: "",
      file: null

    });



  const handleChange =
    (e) => {

      setForm(prev => ({

        ...prev,

        [e.target.name]:
          e.target.value

      }));

    };



  const handleFile =
    (file) => {

      if (
        !validateFile(
          file,
          form.profession
        )
      ) {

        setFileError(

          form.profession ===
            "comedian"

            ?

            "Veuillez uploader uniquement un CV PDF"

            :

            "Formats autorisés: MP3, MP4, Image ou PDF"

        );

        return;

      }


      setFileError("");


      setForm(prev => ({

        ...prev,

        file

      }));

    };



  function submit() {

    navigate("/Pricing");

  }



  return (

    <div style={styles.page}>


      <div style={styles.blob1} />
      <div style={styles.blob2} />


      <div style={styles.header}>

        <div style={styles.headerLine} />

        <span style={styles.headerText}>
          ARTIST PROFILE
        </span>

        <div style={styles.headerLine} />

      </div>


      <p style={styles.subtitle}>
        Créer votre profil artistique
      </p>




      <div style={styles.formCard}>


        <div style={styles.row}>


          <div style={styles.fieldGroup}>

            <label style={styles.label}>
              Nom complet
            </label>


            <input

              name="name"

              placeholder="Votre nom"

              style={styles.input}

              onChange={
                handleChange
              }

            />

          </div>



          <div style={styles.fieldGroup}>


            <label style={styles.label}>
              Email
            </label>


            <input

              name="email"

              placeholder="example@email.com"

              style={styles.input}

              onChange={
                handleChange
              }

            />

          </div>

        </div>




        <div style={styles.row}>


          <div style={styles.fieldGroup}>


            <label style={styles.label}>
              Téléphone
            </label>


            <input

              name="phone"

              style={styles.input}

              onChange={
                handleChange
              }

            />


          </div>



          <div style={styles.fieldGroup}>


            <label style={styles.label}>
              Profession
            </label>



            <select

              name="profession"

              style={{

                ...styles.input,

                ...styles.select

              }}

              onChange={
                handleChange
              }

            >

              {

                PROFESSIONS.map(

                  p => (

                    <option

                      key={p.value}

                      value={p.value}

                    >

                      {p.label}

                    </option>

                  )

                )

              }

            </select>

          </div>


        </div>





        <div style={styles.row}>


          <div style={styles.fieldGroup}>


            <label style={styles.label}>
              Années expérience
            </label>


            <input

              name="experience"

              placeholder="5"

              style={styles.input}

              onChange={
                handleChange
              }

            />


          </div>




          <div style={styles.fieldGroup}>


            <label style={styles.label}>
              Portfolio URL
            </label>



            <input

              name="portfolio"

              placeholder="https://..."

              style={styles.input}

              onChange={
                handleChange
              }

            />


          </div>

        </div>






        <div style={styles.fieldGroupFull}>


          <label style={styles.label}>
            Biographie
          </label>


          <textarea

            name="bio"

            rows={5}

            placeholder="Parlez de vous..."

            style={{
              ...styles.input,
              resize: "none"
            }}

            onChange={
              handleChange
            }

          />


        </div>







        <div style={styles.fieldGroupFull}>


          <label style={styles.label}>


            {

              form.profession ===
                "comedian"

                ?

                "CV (PDF)"

                :

                [

                  "musicien",

                  "senarist",

                  "photographe",

                  "costume"

                ]

                  .includes(
                    form.profession
                  )

                  ?

                  "Portfolio / Travail"

                  :

                  "Document"

            }

          </label>






          <div

            style={{

              ...styles.dropzone,

              ...(dragOver

                ?

                styles.dropzoneActive

                :

                {})

            }}

            onDragOver={

              e => {

                e.preventDefault();

                setDragOver(
                  true
                );

              }

            }


            onDragLeave={

              () =>

                setDragOver(
                  false
                )

            }


            onDrop={

              e => {

                e.preventDefault();

                handleFile(

                  e.dataTransfer.files[0]

                );

              }

            }


            onClick={
              () =>
                fileRef.current.click()
            }

          >



            <input

              ref={fileRef}

              type="file"


              accept={

                form.profession ===
                  "comedian"

                  ?

                  ".pdf"

                  :

                  [

                    "musicien",

                    "senarist",

                    "photographe",

                    "costume"

                  ]

                    .includes(
                      form.profession
                    )

                    ?

                    ".mp3,.mp4,.jpg,.jpeg,.png,.webp,.pdf"

                    :

                    "*"

              }


              style={{
                display:
                  "none"
              }}


              onChange={

                e =>

                  handleFile(

                    e.target.files[0]

                  )

              }

            />




            {

              form.file

                ?

                <p style={styles.fileName}>

                  {form.file.name}

                </p>

                :

                <div>


                  <p style={styles.dropText}>


                    {

                      form.profession ===
                        "comedian"

                        ?

                        "Upload CV"

                        :

                        "Upload Portfolio"

                    }


                  </p>


                  <p style={styles.dropHint}>


                    {

                      form.profession ===
                        "comedian"

                        ?

                        "PDF seulement"

                        :

                        "MP3 · MP4 · Image · PDF"

                    }

                  </p>


                </div>

            }

          </div>




          {

            fileError &&

            <p style={styles.error}>

              {fileError}

            </p>

          }


        </div>






        <div style={styles.divider} />




        <button

          style={styles.submitBtn}

          onClick={
            submit
          }

        >

          Continuer ✦

        </button>


      </div>

    </div>

  );

};



const styles = {

  page: {

    minHeight:
      "100vh",

    background:
      "#0d0d1a",

    padding:
      "60px 24px",

    display:
      "flex",

    flexDirection:
      "column",

    alignItems:
      "center",

    position:
      "relative"

  },



  blob1: {

    position:
      "fixed",

    width:
      400,

    height:
      400,

    top:
      -100,

    left:
      -100,

    borderRadius:
      "50%",

    background:
      "radial-gradient(circle, rgba(201,168,76,.1), transparent)"

  },



  blob2: {

    position:
      "fixed",

    width:
      350,

    height:
      350,

    bottom:
      -100,

    right:
      -100,

    borderRadius:
      "50%",

    background:
      "radial-gradient(circle, rgba(42,74,58,.2), transparent)"

  },



  header: {

    display:
      "flex",

    gap:
      "16px",

    alignItems:
      "center"

  },



  headerLine: {

    width:
      "60px",

    height:
      "1px",

    background:
      "#C9A84C"

  },



  headerText: {

    color:
      "#C9A84C",

    letterSpacing:
      "4px"

  },



  subtitle: {

    color:
      "#a09070",

    marginBottom:
      "40px"

  },



  formCard: {

    width:
      "100%",

    maxWidth:
      "760px",

    padding:
      "48px",

    background:
      "linear-gradient(160deg,#141428,#0f1f18)",

    border:
      "1px solid rgba(201,168,76,.15)",

    borderRadius:
      "20px"

  },



  row: {

    display:
      "flex",

    gap:
      "20px",

    marginBottom:
      "20px",

    flexWrap:
      "wrap"

  },



  fieldGroup: {

    flex:
      1,

    minWidth:
      "200px",

    display:
      "flex",

    flexDirection:
      "column",

    gap:
      "8px"

  },



  fieldGroupFull: {

    marginBottom:
      "20px"

  },



  label: {

    color:
      "#e8d9b0"

  },



  input: {

    background:
      "rgba(255,255,255,.03)",

    border:
      "1px solid rgba(201,168,76,.15)",

    padding:
      "14px",

    borderRadius:
      "10px",

    color:
      "#fff",

    width:
      "100%",

    boxSizing:
      "border-box"

  },



  select: {

    cursor:
      "pointer"

  },



  dropzone: {

    border:
      "2px dashed rgba(201,168,76,.2)",

    padding:
      "40px",

    textAlign:
      "center",

    borderRadius:
      "14px",

    cursor:
      "pointer"

  },



  dropzoneActive: {

    borderColor:
      "#C9A84C"

  },



  dropText: {

    color:
      "#e8d9b0"

  },



  dropHint: {

    color:
      "#777"

  },



  fileName: {

    color:
      "#C9A84C"

  },



  divider: {

    height:
      1,

    background:
      "linear-gradient(90deg,transparent,#C9A84C,transparent)",

    margin:
      "25px 0"

  },



  error: {

    color:
      "#e07070",

    marginTop:
      "10px"

  },



  submitBtn: {

    width:
      "100%",

    padding:
      "18px",

    background:
      "linear-gradient(135deg, rgba(201,168,76,.18), rgba(201,168,76,.08))",

    border:
      "1px solid rgba(201,168,76,.4)",

    borderRadius:
      "12px",

    color:
      "#fff",

    cursor:
      "pointer",

    fontSize:
      "16px"

  }

};

export default ArtistPage;