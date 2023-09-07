import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { InputEditAccountSchema } from "../../../src/dtos/InputEditAccount.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"


const userBusiness = new UserBusiness(
  new UserDatabaseMock(),
  new IdGeneratorMock(),
  new HashManagerMock(),
  new TokenManagerMock()
)

describe("Teste do edit account", () => {

    test("Sucesso da edição",  async () => {

        const input = InputEditAccountSchema.parse(
            {
                token: "tokenMockNormal02",
                id: "idMockNormal02",
                name: "Novo nome"
            }
        )

        const output = await userBusiness.editAccount(input)

        expect(output).toEqual({message: "Editado com sucesso!"})
    })

    test("Deve gerar um erro caso não informe o id", async () => {

        expect.assertions(2)

        try {
            const input = InputEditAccountSchema.parse(
                {
                    token: "tokenMockNormal02",
                    name: "Novo nome"
                }
            )
    
            const output = await userBusiness.editAccount(input) 
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(ZodError)
        }
    })

    test("Deve gerar um erro caso não informe o token", async () => {

        expect.assertions(2)

        try {
            const input = InputEditAccountSchema.parse(
                {
                    id: "idMockNormal02",
                    name: "Novo nome"
                }
            )
    
            const output = await userBusiness.editAccount(input) 
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(ZodError)
        }
    })

    test("Deve gerar um erro caso o id do token seja diferente do id informado", async () => {

        expect.assertions(4)

        try {
            const input = InputEditAccountSchema.parse(
                {
                    token: "tokenMockNormal02",
                    id: "idMockNormal03",
                    name: "Novo nome"
                }
            )
    
            const output = await userBusiness.editAccount(input) 
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
            if(error instanceof BaseError){
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Apenas o proprietário da conta tem permissão para alterar alguma informação.")
            }
            
        }
    })

    test("Deve gerar um erro caso o token seja inválido", async () => {

        expect.assertions(2)

        try {
            const input = InputEditAccountSchema.parse(
                {
                    token: "token-invalido",
                    id: "idMockNormal04",
                    name: "Novo nome"
                }
            )
    
            const output = await userBusiness.editAccount(input) 
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)

        }
    })

    test("Deve gerar um erro caso o id não exista ou seja, caso a conta não exista", async () => {

        expect.assertions(2)

        try {
            const input = InputEditAccountSchema.parse(
                {
                    token: "tokenMockNormal02",
                    id: "idMockNormal05",
                    name: "Novo nome"
                }
            )
    
            const output = await userBusiness.editAccount(input) 
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)

        }
    })
})