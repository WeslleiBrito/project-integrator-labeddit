import { UserBusiness } from "../../../src/business/UserBusiness"
import { InputLoginSchema } from "../../../src/dtos/InputLogin.dto"
import { InputSignupSchema } from "../../../src/dtos/InputSignup.dto"
import { BaseError } from "../../../src/errors/BaseError"
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

  test("Deve retornar o código de erro número 404 qaundo o email for inválido", async () => {

    expect.assertions(3)

    try {
      const input = InputLoginSchema.parse(
        {
            email: "admin0111@gmail.com",
            password: "admin1"
        }
      )
      const output = await userBusiness.login(input)

    } catch (error) {
      expect(error).toBeDefined()

      if(error instanceof BaseError){
        expect(error.statusCode).toBe(404)
        expect(error.message).toBe("Email ou senha inválida.")
      }
    }
  })

  test("Deve retornar o código de erro número 401 qaundo a senha for inválido", async () => {

    expect.assertions(3)

    try {
      const input = InputLoginSchema.parse(
        {
            email: "admin01@gmail.com",
            password: "admin111"
        }
      )
      const output = await userBusiness.login(input)

    } catch (error) {
      expect(error).toBeDefined()

      if(error instanceof BaseError){
        expect(error.statusCode).toBe(401)
        expect(error.message).toBe("Email ou senha inválida.")
      }
    }
  })
})