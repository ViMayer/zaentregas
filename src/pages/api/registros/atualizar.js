import { updateRef, getRefData, paginateIndex, updateRef } from "@/utils/connections"
export default async function atualizarTeste(req, res) {
    console.log("atualizarTeste")
    console.log(req.body)
    console.log("req.body")
    try {
        let { formData, ref } = req.body
        let dadoAtualizado = await updateRef({ collection: "registros", data: formData, ref })
        return res.status(200).send(dadoAtualizado)
    } catch (e) {
        console.log(e.message)
        console.log("e.message atualizarTeste")
        return res.status(400)
    }
}