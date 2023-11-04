export const regexUuid = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';

export const regexUuidObject = new RegExp(regexUuid);

export const regexDocPath = '^[a-z0-9]+\/?(?:[a-z0-9-/]+)?$';

export const regexDocPathObject = new RegExp(regexDocPath);
