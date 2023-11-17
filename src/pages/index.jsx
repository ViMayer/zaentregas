// File: pages/index.js
import { useState, useEffect } from 'react';
import { api } from "@/services/api"
import Head from 'next/head';
async function confirmarAcao({ funcao, valor, msg, tipo }) {
  msg = msg ? msg : "Tem certeza?"
  let confirmado = confirm(msg);
  if (confirmado == true) {
    if (tipo == "multiValue") {
      funcao(valor[0], valor[1])
    } else {
      funcao(valor)
    }
  } 
}

export default function Home() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ nome: '', codigo: '' });
  const [loaded, setLoaded] = useState(false);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e, value) => {
    setLoaded(false)
    e.preventDefault();
    const res = await api.post(`/registros/criar`, {
      value
    });


    let addRecord = {
      refFauna: res.data.ref['@ref'].id,
      ...value,
    }
    let newRecords = records
    newRecords.push(addRecord)

    setRecords(newRecords)
    setFormData({nome:"",codigo:""})
    setLoaded(true)

  };
  const excluirDado = async (value) => {
    const res = await api.post(`/registros/deletar`, {
      ref: value
    });
    let newRecords = records.filter(record => record.refFauna != value)
    setRecords(newRecords)
  };
  useEffect(() => {
    loadRecords();
  }, []);
  const [editando, setEditando] = useState(false)

  const loadRecords = async () => {
    const res = await api.post(`/registros/ler`);
    let { dadosLidos } = res.data
    setRecords(dadosLidos);
    setLoaded(true)
  };
  return (
    <>
      <Head>
        <style>{`
        @font-face {
          font-family: 'ALittleSunshine';
          src: url('./fonts/sunshine.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'LadylikeBB';
          src: url('./fonts/LadylikeBB.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      *{
        font-family: 'ALittleSunshine', sans-serif;
        letter-spacing: 0.25rem;
        font-size: 1rem;
        font-weight: 600;
      }
  body {
    // font-family: 'Lora', serif;
    // font-family: 'ALittleSunshine', sans-serif;
    background-color: #FFEBF3;
    padding: 20px;
    margin: 0;
  }

  .main-container {
    padding-top: 5rem;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .record-container {
    padding: 2rem;
    background-color: #F988BA;
    width: 100%;
    max-width: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  button {
    width: 100%;
    max-width: 10rem;
    margin: 0.5rem 0;
    padding: 10px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease-out;
  }

  button:hover {
    opacity: 0.8;
  }

  .save-button {
    width: 100%;
    background-color: #D25080;
    color: #FFF;
  }

  .delete-button {
    width: 100%;
    background-color: #FF4D6D;
    color: #FFF;
  }

  form {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  label {
    font-size: 1.5rem;
    gap: 0.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #FFF;
  }

  .editar {
    background-color: #D25080;
    color: #FFF;
    width: fit-content;
    padding: 1rem;
    position: absolute;
    right: 2.5%;
    top: 1%;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .editar:hover {
    background-color: #FF4D6D;
  }

  input {
    font-size: 1.25rem;
    color: #333;
    text-align: center;
    background-color: #FFD3E2;
    padding: 10px;
    border-radius: 4px;
    border: none;
    width: 10rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
`}</style>

      </Head>
      {!loaded ? <>
        <div>
          Carregante
        </div>
      </> : <>
        <button onClick={() => { setEditando(!editando) }} className="editar">{editando ? "Visualizar" : "Editar"}</button>
        <div className="titulo"></div>
        <div className='main-container'>
          <ul>
            {records.map((record) => (
              <div key={record.refFauna} className="record-container">
                <form onSubmit={(e) => { e.preventDefault(); }} className="form">
                  <label>
                    Nome:
                    <input
                      type="text"
                      required
                      name="nome"
                      defaultValue={record.nome}
                      onChange={(e) => {
                        record = { ...record, nome: e.target.value };
                        console.log(record);
                      }}
                      className="input"
                    />
                  </label>
                  <label>
                    Código:
                    <input
                      type="text"
                      required
                      name="codigo"
                      defaultValue={record.codigo}
                      onChange={(e) => {
                        record = { ...record, codigo: e.target.value };
                        console.log(record);
                      }}
                      className="input"
                    />
                  </label>

                </form>
                {
                  editando && <div className="buttons">
                    {/* <button
                    type="button"
                    onClick={(e) => { handleSubmit(e, record); }}
                    className="button save-button"
                  >
                    Salvar
                  </button> */}
                    <button
                      type="button"
                      onClick={(e) => { confirmarAcao({ funcao: excluirDado, valor: record.refFauna }) }}
                      className="button delete-button"
                    >
                      Excluir
                    </button>
                  </div>
                }

              </div>
            ))}
            {
              editando && <div className="record-container">
                <form onSubmit={(e) => { e.preventDefault(); }} className="form">
                  <label>
                    Nome:
                    <input
                      type="text"
                      required
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </label>
                  <label>
                    Código:
                    <input
                      type="text"
                      required
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={(e) => { handleSubmit(e, formData); }}
                    className="button save-button"
                  >
                    Criar
                  </button>
                </form>
              </div>
            }

          </ul>
        </div>
      </>}
    </>

  );
}
