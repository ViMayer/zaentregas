import { createData, getRefData, paginateIndex, updateRef } from "@/utils/connections"
export default async function criarTeste(req, res) {
    console.log("criarTeste")
    console.log(req.body)
    console.log("req.body")
    try {
        let { value } = req.body
        let criarDado = await createData({ collection: "registros", data: value })
        let dadoCriado = await getRefData({collection: "registros",ref:criarDado.ref.id})
        console.log(dadoCriado)
        console.log("dadoCriado")

        return res.status(200).send(dadoCriado)
    } catch (e) {
        console.log(e.message)
        console.log("e.message criarTeste")
        return res.status(400)
    }
}