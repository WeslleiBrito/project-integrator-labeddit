import {TokenPayload} from '../../src/services/TokenManager'

export const tokens = {
    idMockNormal01: "token-mock-normal-01",
    idMockNormal02: "token-mock-normal-02",
    idMockNormal03: "token-mock-normal-03",
    idMockAdmin01: "token-mock-admin-01",
    idMockAdmin02: "token-mock-admin-02",
    idMockMaster: "token-mock-master"
}

export class TokenManagerMock {
    public createToken = (payload: TokenPayload): string => {

        return tokens[payload.id]
    }
}