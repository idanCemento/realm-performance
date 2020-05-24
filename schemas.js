export const parentSchema = {
    name: 'parent',
    schemaVersion: 1,
    properties: {
        id: 'string',
        child: 'child'
    }
};

export const childSchema = {
    name: 'child',
    schemaVersion: 1,
    properties: {
        id: 'string'
    }
};

export const lightObjectSchema = {
    name: 'lightObject',
    schemaVersion: 1,
    properties: {
        id: 'string'
    }
};

