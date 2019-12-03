export function formatData<T>(entities: T[]) {
    const mappedData: { allIds: string[]; byId: { [key: string]: T } } = { allIds: [], byId: {} };

    entities.forEach((entity: any) => {
        mappedData.byId[String(entity.id)] = entity;
        mappedData.allIds.push(entity.id);
    });

    return mappedData;
}
