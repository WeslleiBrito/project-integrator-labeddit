import { tokens } from "./TokenManagerMock"

export class HashManagerMock {
    public hash = async (
      plaintext: string
    ): Promise<string> => {
      return "hash-mock"
    }

    public compare = async (
      plaintext: string,
      hash: string
    ): Promise<boolean> => {

      
      switch(plaintext) {
        case "normal1":
          return hash === tokens.idMockNormal02

        case "normal12":
          return hash === tokens.idMockNormal02
          
        default:
          return false
      }
    }
}