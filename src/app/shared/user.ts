/*
user data model
 */

export class User {

    constructor(private userName: string,
                private password: string,
                private email: string) { }

    // get data

    getUserName(): string {
        return this.userName;
    }

    getPassword(): string {
        return this.password;
    }

    getEmail(): string {
        return this.email;
    }

    // set data

    setUserName(username: string): void {
        this.userName = username;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setEmail(email: string): void {
        this.email = email;
    }
}
