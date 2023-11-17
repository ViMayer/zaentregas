
import { Client } from "faunadb";
import { query } from "faunadb";
let key = new Client({
    secret: process.env.FAUNADB_SECRET_KEY,
    domain: "db.us.fauna.com",
});

export const createData = async ({ collection, data }) => {
    let q = query
    let fauna = key
    let dadoCriado = await fauna.query(
        q.Create(
            q.Collection(collection),
            {
                data: { ...data }
            },
        )
    )
    console.log(dadoCriado.ref.id)
    console.log("dadoCriado.ref.id")
    return dadoCriado;
}
export const getRefData = async ({ collection, ref, returnInfo }) => {
    let q = query
    let fauna = key

    let retorno
    let getData = await fauna.query(
        q.Get(
            q.Ref(q.Collection(collection), ref)
        )
    )
    retorno = returnInfo === "data" ? getData.data : returnInfo === "ref" ? getData.ref.id : getData
    return retorno;
}

export const deleteRef = async ({ collection, ref }) => {
    let q = query
    let fauna = key
    let deleteRef = await fauna.query(q.Delete(q.Ref(q.Collection(collection), ref)))
    return deleteRef;
}
export const paginateIndex = async ({ pageSize, index, matchValue, dataOnly, refOnly, dataRefOnly, customSelect }) => {
    console.log(index)
    console.log("index")
    let q = query
    let fauna = key
    let results = [];
    pageSize = pageSize ? pageSize : 25;
    let last = null;
    let paginacao = { size: pageSize };
    let hasMore = true;
    let matchFunction = "q.Index('" + index + "')"
    let lambdaFunction = "q.Get(q.Var('doc'))"
    if (!!dataOnly) {
        lambdaFunction = "q.Select(['data']," + lambdaFunction + ")"
    }
    if (!!refOnly) {
        lambdaFunction = "q.Select(['ref','id']," + lambdaFunction + ")"
    }
    if (!!customSelect) {
        lambdaFunction = "q.Select(" + customSelect + "," + lambdaFunction + ")"
    }

    console.log("xx")

    while (hasMore) {
        let data = await fauna.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        eval(matchFunction)
                    ),
                    paginacao
                ),
                q.Lambda("doc", eval(lambdaFunction))
            )
        )
        console.log(data.data)
        console.log("data.data")
        if (dataRefOnly) {
            data.data.map(data => {
                results.push({
                    refFauna: data.ref.id,
                    ...data.data
                })
            })

        } else {
            results.push(...data.data)
        }
        console.log(results)
        console.log("results")
        console.log(last)
        console.log("last")
        console.log(data.data.length)
        console.log("data.data.length ")
        last = data.after;
        if (data.data.length < pageSize || !last) {
            hasMore = false;
        }

        paginacao = { size: pageSize + pageSize, after: last };
    }

    return results;
}

export const updateRef = async ({ collection, ref, data }) => {
    let q = query
    let fauna = key
    let updatedRef = await fauna.query(
        q.Update(
            q.Ref(q.Collection(collection), ref),
            {
                data: data
            },
        )
    )
    return updatedRef;
}