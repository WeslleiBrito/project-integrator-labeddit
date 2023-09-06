
const hashs: {[key: string]: string} = {
  normal1: "hashMockNormal01",
  normal2: "hashMockNormal02",
  normal3: "hashMockNormal03",
  admin1: "hashMockAdminl01",
  admin2: "hashMockAdminl02",
  master: "hashMockMaster",
}

export class HashManagerMock {
    public hash = async (
      plaintext: string
    ): Promise<string> => {
      return "hashMock"
    }

    public compare = async (
      plaintext: string,
      hash: string
    ): Promise<boolean> => {

      if(hashs[plaintext]){
        return true
      }

      return false
    }
}