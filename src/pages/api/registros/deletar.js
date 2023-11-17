import { deleteRef } from "@/utils/connections"
export default async function deletarTeste(req, res) {
    console.log("deletarTeste")
    console.log(req.body)
    console.log("req.body")
    try {
        let { ref } = req.body
        let dadoDeletado = await deleteRef({ collection: "registros", ref })
        return res.status(200).send(dadoDeletado)
    } catch (e) {
        console.log(e.message)
        console.log("e.message deletarTeste")
        return res.status(400)
    }
}