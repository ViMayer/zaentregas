import { paginateIndex } from "@/utils/connections"
export default async function lerTeste(req, res) {
    console.log("lerTeste")
    console.log(req.body)
    console.log("req.body")
    try {

        let dadosLidos = await paginateIndex({ index: "allRegistros", dataRefOnly: true })
        return res.status(200).json({ dadosLidos: dadosLidos })
    } catch (e) {
        console.log(e.message)
        console.log("e.message lerTeste")
        return res.status(400)
    }
}