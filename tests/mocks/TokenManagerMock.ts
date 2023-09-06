import {TokenPayload} from '../../src/services/TokenManager'
import { USER_ROLES } from '../../src/types/types'


export const tokens: {[key: string]: string} = {
    idMockNormal01: "tokenMockNormal01",
    idMockNormal02: "tokenMockNormal02",
    idMockNormal03: "tokenMockNormal03",
    idMockAdmin01: "tokenMockAdmin01",
    idMockAdmin02: "tokenMockAdmin02",
    idMockMaster: "tokenMockMaster",
    idMockNew: "tokenMockNew"
}

const payloads: {[key: string]: TokenPayload} = {
    tokenMockNormal01: {
        id: 'idMockNormal01',
        name: 'Normal 01',
        role: USER_ROLES.NORMAL
    },

    tokenMockNormal02: {
        id: 'idMockNormal02',
        name: 'Normal 02',
        role: USER_ROLES.NORMAL
    },

    tokenMockNormal03: {
        id: 'idMockNormal03',
        name: 'Normal 03',
        role: USER_ROLES.NORMAL
    },

    tokenMockAdmin01: {
        id: 'idMockAdmin01',
        name: 'Admin 01',
        role: USER_ROLES.ADMIN
    },

    tokenMockAdmin02: {
        id: 'idMockAdmin02',
        name: 'Normal 02',
        role: USER_ROLES.ADMIN
    },

    tokenMockMaster: {
        id: 'idMockMaster',
        name: 'Master',
        role: USER_ROLES.MASTER
    },
}

export class TokenManagerMock {

    public createToken = (payload: TokenPayload): string => {

        return tokens[payload.id]
    }

    public validateToken = (token: string): TokenPayload | null => {

        if(payloads[token]){
            return payloads[token]
        }

        return null
    }
}