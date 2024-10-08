const users = [{
  username: 'novansyaah',
  name_card: 'Rahadian Novansyah',
  payments: [
    {
        provider: 'gopay',
          value: '089669494255',
    },
    {
        provider: 'dana',
        value: '089669494255',
    },
    {
        provider: 'jago',
        value: '502687237661'
    }
  ]  
}]

export const getUser = (username) => {
    return users.filter((user) => user.username === username)[0]
}