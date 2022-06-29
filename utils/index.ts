export const getValueFromGraphql = (input: any) => {
    if (!input) {
        return input;
    }
    return input[Object.keys(input)[0]];
};

export const getDataGraphqlResult = (data: any) => {
    const key = Object.keys(data).length > 0 ? Object.keys(data)[0] : null;
    if (key) return data[key];
    return null;
};

export const defaultImg =
    "https://long-space.sgp1.digitaloceanspaces.com/smartcard/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpeg";
