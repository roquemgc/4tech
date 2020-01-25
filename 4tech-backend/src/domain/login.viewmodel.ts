import { IsNotEmpty, Length } from 'class-validator'

export class LoginViewModel {

    @IsNotEmpty() //Requer que não seja vazio
    @Length(3, 10) //Define o tamanho mínimo/máximo
    readonly userLogin: string;
    
    @IsNotEmpty()
    @Length(3, 10)
    readonly password: string
}