import { UserBusiness } from "../../../src/business/UserBusiness"
import { InputSignupSchema } from "../../../src/dtos/InputSignup.dto"
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

  test("Deve criar um novo usuario", async () => {

    const input = InputSignupSchema.parse(
        {
            name: "Teste da silva",
            email: "teste@gmail.com",
            password: "teste123"
        }
    )

    const output = await userBusiness.signup(input)

    expect(output).toEqual(
        {
            message: "Cadastro efetuado com sucesso!",
            token: "tokenMockNew"
        }
    )
  })

  test("Deve gerar erro para email que já existe no banco de dados", async () => {
    expect.assertions(1)

    try {
      const input = InputSignupSchema.parse(
        {
            name: "Teste da silva",
            email: "normal01@gmail.com",
            password: "teste123"
        }
      )
      const output = await userBusiness.signup(input)
    } catch (error) {
      expect(error).toBeDefined()
    }
    

  })
})