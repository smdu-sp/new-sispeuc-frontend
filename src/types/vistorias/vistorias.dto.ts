export interface VistoriaRequestDTO {
    processoId?: string
    imovelId?: string
    tipoVistoria?: string
    tipoTipologia?: string
    tipoUso?: string
    qtdePavimentos?: number
    unifamiliar?: boolean
    multifamiliar: boolean
    comercio: boolean
    servico: boolean
    industria: boolean
    usoFachadaBoaCondicao: boolean
    usoEsquadriaBoaCondicao: boolean
    usoPodaVegetacao: boolean
    areaConstruidaTotalConstatada?: number
    areaLoteTotalConstatada?: number
    indiceOcupacaoConstatado?: number
    areaCoberturaTotalConstatada?: number
    areaConstruidaNaoComputavel?: number
    descricao?: string
    dataVistoria?: Date
}

export interface VistoriaResponseDTO {
    id: number;
    processoId: string;
    imovelId: string;
    tipoVistoria: string;
    tipoTipologia: string;
    tipoUso: string;
    qtdePavimentos: number;
    unifamiliar: boolean;
    multifamiliar: boolean;
    comercio: boolean;
    servico: boolean;
    industria: boolean;
    usoFachadaBoaCondicao: boolean;
    usoEsquadriaBoaCondicao: boolean;
    usoPodaVegetacao: boolean;
    areaConstruidaTotalConstatada: number;
    areaLoteTotalConstatada: number;
    indiceOcupacaoConstatado: number;
    areaCoberturaTotalConstatada: number;
    areaConstruidaNaoComputavel: number;
    descricao: string;
    dataVistoria: Date;
    usuarioId: string,
    criadoEm: Date,
    atualizadoEm: Date,
    deletado: boolean,
    vistoriaImovelId: number
}
