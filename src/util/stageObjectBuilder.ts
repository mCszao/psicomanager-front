type StageObject<> = {
    color: string | undefined;
    ptStage: string | undefined;
}

export default function stageObjectBuilder(stage: String): StageObject {
    const object: StageObject = {
        color: undefined,
        ptStage: undefined
    };
    switch (stage) {
        case 'OPENED':
            object.color = "blue";
            object.ptStage = "ABERTO"
            break;
        case 'CONCLUDED':
            object.color = "green";
            object.ptStage = "CONCLUIDO"
            break;
        case 'CANCELLED':
            object.color = "red";
            object.ptStage = "CANCELADO"
            break;
        case 'RESCHEDULED':
            object.color = "dark";
            object.ptStage = "REMARCADO"
            break;
        default:
            object.color = "yellow"
            object.ptStage = "Status não catalogado"
            break;
    }
    return object;
}