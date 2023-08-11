export enum Status {
    Waiting = 'waiting',
    Updating = '',
    Pause = 'pausing updating',
    Complete = 'up to date',
}

export enum Icons {
    slack = '/img/slack.png',
    facebook = '/img/facebook.png',
    instagram = '/img/instagram.png',
    discord = '/img/discord.png',
    x = '/img/x.png',
}

export interface File {
    filename: string,
    size: number,
    status:{
        status:Status,
        completed:number
    },
    icon:Icons,
}
export enum Gender {
    Male = 'male',
    Female = 'female',
    NoAnswer = 'rather not to say'
}
export interface User {
    id: string,
    pwd: string,
    data: {
        name: {
          first: (string|null),
          middle: (string|null),
          last: (string|null)
        },
        email: (string|null),
        phone: (string|null),
        birthday: {
          year: (number|null),
          month: (number|null),
          day: (number|null)
        },
        country: (string|null),
        address: (string|null),
        gender: Gender,
        updatedFiles: (string|null)[]
    }
}