export class UnexpectedError extends Error {
    constructor(){
        super('Algo errado aconteceu. Tente novamente em breve.')
        this.name = 'UnexpectedError'
    }
}