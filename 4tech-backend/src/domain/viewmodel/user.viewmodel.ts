import { IsNotEmpty, Length } from 'class-validator'

export class UserViewModel {

    constructor(userLogin: string, userName: string, password: string){
        this.userLogin = userLogin,
        this.userName = userName,
        this.password = password
    }

    @IsNotEmpty() //Requer que não seja vazio
    @Length(3, 10) //Define o tamanho mínimo/máximo
    readonly userLogin: string;

    @IsNotEmpty()
    @Length(3, 10)
    readonly userName: string;
    
    @IsNotEmpty()
    @Length(3, 10)
    readonly password: string
}