// - > Não implementada
export const pegarParcelaGrupoHistoricoPadrao = () => {
    return [1, 0.0, "linear", 0.0, { loja: 0.0, owner: 0.0, bonus: 0.0 }]
}
// - > Não implementada
export const pegarGrupoHistoricoPadrao = (email) => {
    email = email ?? "---@email.com"
    return [email, 0.0, "consultor", [pegarParcelaGrupoHistoricoPadrao()]]
};

export const getCurrentDate = () => {
    const data = new Date();
    let dia = data.getDate() + ""
    if (dia.length < 2) { dia = "0" + dia }
    let mes = data.getMonth() + 1 + ""
    if (mes.length < 2) { mes = "0" + mes }
    let ano = data.getFullYear()
    let dataAtual = `${dia}/${mes}/${ano}`
    return dataAtual
}
// - > Não implementada
export const criarHistoricoGrupo = (email) => {
    const data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();
    let dataAtual = `${dia}/${mes}/${ano}`
    let novoHistoricoGrupo = [dataAtual, [pegarGrupoHistoricoPadrao(email)]]
    return novoHistoricoGrupo
}

export const readData = (storageName) => {
    const savedData = JSON.parse(sessionStorage.getItem(storageName))
    // console.log("Valor lido de", storageName, ":", savedData);
    return savedData
};

export const saveData = (storageName, value) => {
    let stringedValue = JSON.stringify(value)
    console.log("Salvar em", storageName, ":", stringedValue);
    sessionStorage.setItem(storageName, stringedValue);
    return value
};

export const convertBinaryToImage = (binaryData) => {
    const base64String = btoa(binaryData);
    return `data:image/png;base64,${base64String}`;
};

export const brlToFloat = (brlString, fixed) => {
    if (typeof brlString != 'string') return brlString
    // Remove os pontos de separação, e troca a vírgula decimal por um ponto
    const stringLimpa = brlString.replace(/\.|[R]|[$]| /g, '').replace(',', '.');
    // Transforma e retorna string como valor de float
    let valorFloat = parseFloat(parseFloat(stringLimpa).toFixed(fixed || 0)); //"Sem 'fixed', duas casas decimais; com 'fixed' = 0 mantém, outro ajusta."
    return valorFloat;
}
export const floatToBrl = (input) => {
    let { float, style, currency } = input

    if (typeof input === "object") {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: style ?? 'currency',
            currency: currency ?? 'BRL',
        });
        return formatter.format(float)
    } else {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formatter.format(input)

    }


}

export const fragmentarVetor = (vetor, tamanhoFragmento) => {
    tamanhoFragmento = tamanhoFragmento ?? 25
    console.log("tamanhoFragmento", tamanhoFragmento)
    const vetorFragmentado = [];
    for (let i = 0; i < vetor.length; i += tamanhoFragmento) {
        vetorFragmentado.push(vetor.slice(i, i + tamanhoFragmento));
    }
    return vetorFragmentado;
}
export const formatarData = ({ data, origem }) => {
    if (origem.toUpperCase() === "USA") {
        const fragmentos = data.split('/');
        if (fragmentos.length !== 3) {
            console.error('Valor inválido de data. Para esta origem (', origem, ') use MÊS/DIA/ANO');
            return null;
        }
        const mes = fragmentos[0].padStart(2, '0');
        const dia = fragmentos[1].padStart(2, '0');
        const ano = fragmentos[2];
        let dataFormatada = `${dia}/${mes}/${ano}`;
        console.log("dataFormatada")
        console.log(dataFormatada)
        return dataFormatada
    } else {
        console.log("Erro em formatarData, valor de origem (", origem, ")inválida!")
        return data
    }
}

const removerAcentos = (inputString) => {
    return inputString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
export const normalizar = (input) => {
    if (typeof input === "string") {
        return removerAcentos(input);
    } else {
        const value = input.valor;
        const stringCase = input.caixa ?? "lower";

        if (stringCase !== "upper" && stringCase !== "lower") {
            console.warn(`Erro em normalizar 'case': ${stringCase} não é um tipo válido, retornado valor em minúsculo.`);
        }

        let normalizedValue = removerAcentos(value);

        const valor = stringCase === "lower" ? normalizedValue.toLowerCase() :
            stringCase === "upper" ? normalizedValue.toUpperCase() :
                normalizedValue;
        return valor
    }
};

export const formatarCapitular = ({ valor, tipo }) => {
    tipo = tipo ?? "default"
    if (typeof valor == "number") valor += ""
    if (typeof valor != "string") {
        console.log("ERRO EM FORMATAR LETRA CAPITULAR. TIPO:", tipo, "VALOR:", valor)
    }
    if (tipo != "default") {
        valorFormatado = valorFormatado.toLowerCase()
    }
    let valorFormatado = valor.charAt(0).toUpperCase() + valor.slice(1);
    console.log(valorFormatado)
    console.log("valorFormatado")
    return valorFormatado
}
export const formatarInput = ({ tipo, valor }) => {
    if (tipo.toUpperCase() == "DATA") {
        let data = valor.replace(/-/g, "/").split("/")
        data = data[2] + "/" + data[1] + "/" + data[0]
        return data
    }
    console.log("ERRO EM FORMATAR INPUT. TIPO:", tipo)
}

export const formatarCota = (cota) => {
    if (cota.includes("-")) {
        cota = cota.split("-")[0]
    }
    let faltando = 4 - cota.length // Adiciona zeros a esquerda do numero da cota caso esteja faltando
    if (faltando != 0) {
        let prefixo = ""
        for (let i = 0; i < faltando; i++) {
            prefixo += "0"
        }
        cota = prefixo + cota
    }
    return cota
}

export const gerarIdComissao = ({ grupo, cota, digito }) => {
    let id = ""
    let numeroEspecial = "9" // último número do id o qual não consegui descobrir a fórmula
    cota = formatarCota(cota)
    id = grupo + cota + digito + numeroEspecial
    // console.log(grupo, cota, digito, numeroEspecial)
    // console.log("grupo + cota + digito + numeroEspecial")
    return id
}

export const gerarSlugComissao = ({ nome, grupo, cota, digito }) => {
    cota = formatarCota(cota)
    let slug = ""
    let nomes = nome.split(" ")
    nome = nomes[0]
    let sufixo = ""
    if (nomes.length > 2) {
        if (nomes[1].length > 2) {
            sufixo = nomes[1]
        } else {

            sufixo = nomes[2]
        }
        sufixo = "~" + sufixo
    }
    slug = nome + sufixo + "-" + grupo + "-" + cota + "-" + digito
    return slug
}

export const trocarUltimoChar = ({ string, char }) => {
    if (typeof string !== 'string' || string.length === 0) {
        // Verifica se o valor recebido esta vazio
        return string; // Volta a string sem alterar
    }

    const lastIndex = string.length - 1;
    const stringWithNine = string.slice(0, lastIndex) + char;

    return stringWithNine;
}

export const dataParaMes = (dateString) => {
    let [month, year] = dateString.split('-');
    // if(month[0]=="0") month = month.replace("0","")
    // const date = new Date(`${year}-${month}`);
    month = parseFloat(month) + 1
    if (month < 10) {
        month = "0" + month
    } else if (month > 12) {
        month = "01"
    } else {
        month = "" + month
    }
    const date = new Date(`${year}-${month}`);
    const options = { month: 'long' };
    return date.toLocaleDateString('pt-BR', options);
}


export function debounce(func, delay) {
    let timeoutId;

    return function debouncedFunction(...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}