import * as UserService from "../services/user.service";
import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

const userInput = {
    email: 'test@example.com',
    name: 'Jane Doe',
    password: 'Password123',
    passwordConfirmation: 'Password123'
}

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: 'jane.doe@example.com',
    name: 'Jane Doe'
}

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
        it("should return the user payload", async () => {
          const createUserServiceMock = jest
            .spyOn(UserService, "createUser")
            //@ts-ignore
                .mockReturnValueOnce(userPayload);
            
            const { statusCode, body } = await supertest(app)
              .post("/api/users")
                .send(userInput);
            
            expect(statusCode).toBe(200);

            expect(body).toEqual(userPayload);

            expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
        });
    });

    describe("given the passwords do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
            .spyOn(UserService, "createUser")
            //@ts-ignore
                .mockReturnValueOnce(userPayload);
            
            const { statusCode } = await supertest(app)
              .post("/api/users")
              .send({ ...userInput, passwordConfirmation: 'doesnotmatch' });
            
            expect(statusCode).toBe(400);

            expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });
      
      describe("given the user service throws", () => {
          it("should return a 409 error", () => {});
      })
  });
    
    describe("create user session", () => {
        describe('given the username and password are valid', () => {
            it('should return a signed accessToken & refreshToken', async () => {});
        })
    })
});
