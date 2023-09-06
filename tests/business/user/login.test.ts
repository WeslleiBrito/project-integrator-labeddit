import { UserBusiness } from "../../../src/business/UserBusiness"
import { InputLoginSchema } from "../../../src/dtos/InputLogin.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  test("Deve retornar um token", async () => {

    const input = InputLoginSchema.parse(
        {
            email: "admin01@gmail.com",
            password: "admin1"
        }
    )

    const output = await userBusiness.login(input)

    expect(output).toEqual(
        {
            token: "tokenMockAdmin01"
        }
    )
  })
})