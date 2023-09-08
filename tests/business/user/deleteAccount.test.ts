import { UserBusiness } from "../../../src/business/UserBusiness"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { InputDeleteAccountSchema } from "../../../src/dtos/InputDeleteAccount.dto"


const userBusiness = new UserBusiness(
  new UserDatabaseMock(),
  new IdGeneratorMock(),
  new HashManagerMock(),
  new TokenManagerMock()
)

describe("Testando o delete account", () => {

    test("Tokens inválidos devem retornar um erro", async () => {

        expect.assertions(1)

        try {
            const input = InputDeleteAccountSchema.parse(
                {
                    token: "token-invalido",
                    id: "idMockNormal02"
                }
            )

            await userBusiness.deleteAccount(input)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })
    
    test("Id inválidos devem retornar um erro", async () => {

        expect.assertions(1)

        try {
            const input = InputDeleteAccountSchema.parse(
                {
                    token: "tokenMockAdmin01",
                    id: "id-invalido"
                }
            )

            await userBusiness.deleteAccount(input)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    test("Usuario normal não pode excluir outro usuário, deve gerar erro caso tente fazer isso", async () => {

        expect.assertions(1)

        try {
            const input = InputDeleteAccountSchema.parse(
                {
                    token: "tokenMockNormal01",
                    id: "idMockNormal02"
                }
            )

            await userBusiness.deleteAccount(input)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    test("Usuário admin não pode excluir outro usuário admin, deve gerar erro ao tentar fazer isso", async () => {

        expect.assertions(1)

        try {
            const input = InputDeleteAccountSchema.parse(
                {
                    token: "tokenMockAdmin01",
                    id: "idMockAdmin02"
                }
            )

            await userBusiness.deleteAccount(input)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    test("Usuário admin não pode excluir um usuário master, deve gerar erro ao tentar fazer isso", async () => {

        expect.assertions(1)

        try {
            const input = InputDeleteAccountSchema.parse(
                {
                    token: "tokenMockAdmin01",
                    id: "idMockMaster"
                }
            )

            await userBusiness.deleteAccount(input)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    test("Sucesso de deleção de um usuário normal por ele mesmo", async () => {

        const input = InputDeleteAccountSchema.parse(
            {
                token: "tokenMockNormal02",
                id: "idMockNormal02"
            }
        )

       const output = await userBusiness.deleteAccount(input)

        expect(output).toEqual(
            {
                message: "Conta deletada com sucesso!"
            }
        )
    })

    test("Sucesso de deleção de um usuário normal por um usuário admin", async () => {

        const input = InputDeleteAccountSchema.parse(
            {
                token: "tokenMockAdmin01",
                id: "idMockNormal03"
            }
        )

       const output = await userBusiness.deleteAccount(input)

        expect(output).toEqual(
            {
                message: "Conta deletada com sucesso!"
            }
        )
    })

    test("Sucesso de deleção de um usuário admin por ele mesmo", async () => {

        const input = InputDeleteAccountSchema.parse(
            {
                token: "tokenMockAdmin01",
                id: "idMockAdmin01"
            }
        )

       const output = await userBusiness.deleteAccount(input)

        expect(output).toEqual(
            {
                message: "Conta deletada com sucesso!"
            }
        )
    })

    
    test("Sucesso de deleção de um usuário normal por um usuário master", async () => {

        const input = InputDeleteAccountSchema.parse(
            {
                token: "tokenMockMaster",
                id: "idMockNormal01"
            }
        )

       const output = await userBusiness.deleteAccount(input)

        expect(output).toEqual(
            {
                message: "Conta deletada com sucesso!"
            }
        )
    })

    test("Sucesso de deleção de um usuário admin por um usuário master", async () => {

        const input = InputDeleteAccountSchema.parse(
            {
                token: "tokenMockMaster",
                id: "idMockAdmin02"
            }
        )

       const output = await userBusiness.deleteAccount(input)

        expect(output).toEqual(
            {
                message: "Conta deletada com sucesso!"
            }
        )
    })

    test("Sucesso de deleção de um usuário master por ele mesmo", async () => {

        const input = InputDeleteAccountSchema.parse(
            {
                token: "tokenMockMaster",
                id: "idMockMaster"
            }
        )

       const output = await userBusiness.deleteAccount(input)

        expect(output).toEqual(
            {
                message: "Conta deletada com sucesso!"
            }
        )
    })


})