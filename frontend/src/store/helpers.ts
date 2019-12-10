export function formatData<T>(entities: T[]) {
    const mappedData: { allIds: string[]; byId: { [key: string]: T } } = { allIds: [], byId: {} };

    entities.forEach((entity: any) => {
        mappedData.byId[entity.id] = entity;
        mappedData.allIds.push(entity.id);
    });

    return mappedData;
}

export const move = (arr: any[], old_index: number, new_index: number) => {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        let k = new_index - arr.length;
        while (k-- + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};
