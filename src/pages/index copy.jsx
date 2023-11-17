// File: pages/index.js
import { useState, useEffect } from 'react';
import { api } from "@/services/api"

async function confirmarAcao({ funcao, valor, msg, tipo }) {
  msg = msg ? msg : "Tem certeza?"
  let confirmado = confirm(msg);
  if (confirmado == true) {
    if (tipo == "multiValue") {
      funcao(valor[0], valor[1])
    } else {
      funcao(valor)
    }
  } else {
    avisoAlerta("Ação cancelada")
  }
}

export default function Home() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ nome: '', codigo: '' });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    const res = await api.post(`/registros/criar`, {
      value
    });
  };
  const excluirDado = async (value) => {
    console.log(value)
    console.log("value")
  };
  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const res = await api.post(`/registros/ler`);
    let { dadosLidos } = res.data
    setRecords(dadosLidos);
  };
  return (
    <div>
      <ul>

        {records.map((record) => {
          let { refFauna, nome, codigo } = record
          return <div className="bg-pink-500 w-full h-full flex items-center justify-center">
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <label>
                Nome:
                <input type="text" required name="nome" defaultValue={record.nome} onChange={(e) => {
                  record = { ...record, nome: e.target.value }
                  console.log(record)
                  console.log("record")
                }} />
              </label>
              <label>
                Codigo:
                <input type="text" required name="codigo" defaultValue={record.codigo} onChange={(e) => {
                  record = { ...record, codigo: e.target.value }
                  console.log(record)
                  console.log("record")
                }} />
              </label>

              <button type="button" onClick={(e) => { handleSubmit(e, record) }}>Salvar</button>
              <button type="button" onClick={(e) => { confirmarAcao({ funcao: excluirDado, valor: record.refFauna }) }}>Excluir</button>
            </form>
          </div>
        }
        )}
        <div className="bg-pink-500 w-full h-full flex items-center justify-center">
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <label>
              Nome:
              <input type="text" required name="nome" value={formData.nome} onChange={handleInputChange} />
            </label>
            <label>
              Codigo:
              <input type="text" required name="codigo" value={formData.codigo} onChange={handleInputChange} />
            </label>
            <button type="button" onClick={(e) => { handleSubmit(e, formData) }}>Criar</button>
          </form>
        </div>
      </ul>
    </div>
  );
}
